<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Collection;
///////////////////////////////////////////////
use App\Models\User;
use App\Enum\RolesEnum;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = User::query()->find($request->user()->id);
        $validated = $request->validate([
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $user->password = $validated['password'];
        $user->temp_password = null;
        $user->save();

        return redirect()->route('dashboard');
    }

    public function download()
    {
        $users = User::select(['name', 'email', 'temp_password'])
            ->where('password', '=', null)->get();

        if ($users->isEmpty()) {
            // This fires the onError pipeline and populates the errors object in React
            return back()->withErrors([
                'err_message' => 'Нет пользователей с временными паролями'
            ]);
        }

        return back()->with('success', 'hooray');
    }

    // 2. REGENERATE: For all non-root users
    public function regenerate()
    {
        $users = User::withoutRole(RolesEnum::Root->value)
            ->withoutRole(RolesEnum::Admin->value)
            ->select(['id', 'name', 'email'])
            ->get();

        if ($users->isEmpty()) {
            return response()->json([]);
        }

        return $this->processAndAssignPasswords($users);
    }

    // 3. Shared Processor (Fast, Memory-safe, Single Transaction)
    protected function processAndAssignPasswords(Collection $users)
    {
        $frontendReportData = [];
        $upsertData = [];
        $now = now()->toDateTimeString();

        foreach ($users as $user) {
            // Since you are generating the password on the frontend now,
            // we just assign a placeholder password string here to clear the NULL state in the DB
            $plainPassword = Str::random(12);

            $frontendReportData[] = [
                'id'             => $user->id,
                'name'           => $user->name,
                'email'          => $user->email,
                'plain_password' => $plainPassword, // Pass the backend text copy just in case
            ];

            $upsertData[] = [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'password'   => $plainPassword, // Automatically hashed by User model casting!
                'updated_at' => $now,
            ];
        }

        DB::transaction(function () use ($upsertData) {
            User::upsert($upsertData, ['id'], ['password', 'updated_at']);
        });

        // FIXED: Flash the data to the session and return an Inertia-friendly back redirect
        return back()->with('generated_users', $frontendReportData);
    }
}
