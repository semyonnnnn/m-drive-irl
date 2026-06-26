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
        $users = User::withoutRole(RolesEnum::Root->value)
            ->select(['name', 'email', 'temp_password'])
            ->where('password', '=', null)->get();

        if ($users->isEmpty()) {
            // This fires the onError pipeline and populates the errors object in React
            return back()->withErrors([
                'err_message' => 'инициализируйте субъекты'
            ]);
        }

        return back()->with('generated_users', $users);
    }

    // 2. REGENERATE: For all non-root users
    public function regenerate()
    {
        $users = User::withoutRole(RolesEnum::Root->value)
            ->withoutRole(RolesEnum::Admin->value)
            ->select(['id', 'name', 'email', 'password'])
            ->get();

        if ($users->isEmpty()) {
            return back()->withErrors([
                'err_message' => 'инициализируйте субъекты'
            ]);
        }

        $generated_users = $this->processAndAssignPasswords($users);
        return back()->with('generated_users', $generated_users);
    }

    // 3. Shared Processor (Fast, Memory-safe, Single Transaction)
    protected function processAndAssignPasswords(Collection $users)
    {
        $generated_users = [];
        $now = now()->toDateTimeString();

        foreach ($users as $user) {
            $temp_password = Str::random(12);

            $generated_users[] = [
                'name' => $user->name,
                'email' => $user->email,
                'password' => null,
                'temp_password' => $temp_password,
                'updated_at' => $now,
            ];
        }

        if (!empty($generated_users)) {
            User::query()->upsert(
                $generated_users,
                ['id'],
                ['password', 'temp_password', 'updated_at']
            );
        }

        return $generated_users;
    }
}
