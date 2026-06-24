<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
//////////////////////////////////
use App\Enum\RolesEnum;
use App\Models\User;
use Spatie\Permission\Models\Role;
use App\Http\Resources\AuthUserResource;
use App\Services\UserListService;
use App\Http\Requests\UploadUserRequest;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        return Inertia::render('User/Index', [
            'users' => (new UserListService)->paginate(),
            'roleLabels' => RolesEnum::labels(),
        ]);
    }

    public function edit(User $user)
    {
        $this->authorize('editAccess', [$user]);


        $data = [
            'user' => new AuthUserResource($user),
            'roles' => Role::all(),
            'roleLabels' => RolesEnum::labels(),
        ];

        $isAdminPage = $user->hasRole(RolesEnum::Admin->value);
        if (!$isAdminPage) {
            $relations = (new UserListService)->edit($user);

            $data['related_users'] = $relations['related_users'];
            $data['ours'] = $relations['ours'];
        }


        return Inertia::render('User/Edit', $data);
    }

    public function update(Request $request, User $user)
    {
        // dd($user->hasRole(RolesEnum::Gakusei->value));
        if ($user->hasRole(RolesEnum::Root->value)) {
            return;
        }

        $isAdminPage = $user->hasRole(RolesEnum::Admin->value);

        $related_users = $request->get('related_users');
        $data = $request->validate([
            'roles' => ['required', 'array'],
            'roles.*' => ['string'],
        ]);

        $this->authorize('updateAccess', [$user]);
        $this->authorize('assignRoles', [$user, $data['roles']]);



        // if (!$isAdminPage) {
        //     (new UserListService)->update($related_users, $user, $request['roles'][0]);
        // }
        $user->syncRoles($data['roles']);


        return back()->with('success', 'Roles updated successfully.');
    }

    public function upload(UploadUserRequest $request)
    {
        $users = json_decode($request->payloadData, true);
        $conflicts = [];
        $insertedCount = 0;

        foreach ($users as $index => $userData) {
            $email = $userData['почта'];
            $name  = $userData['имя'];

            // 1. Check if the email already exists
            $userExists = User::query()->where('email', $email)->exists();

            if ($userExists) {
                // Collect telemetry on the duplicate row (1-based index for humans)
                $conflicts[] = "[{$email}] - СУБЪЕКТ В БАЗЕ.";
                continue; // Skip this iteration and go to the next user
            }

            User::create([
                'name'     => $name,
                'email'    => $email,
                'password' => null,
            ]);

            $insertedCount++;
        }

        if (!empty($conflicts)) {
            return back()->with('error', [
                'summary' => "ЧАСТИЧНАЯ_ОШИБКА: Импортировано {$insertedCount} шт.",
                'details' => $conflicts
            ]);
        }

        return back()->with('success', "ВСЕ СУБЪЕКТЫ ({$insertedCount} шт.) УСПЕШНО ИНДЕКСИРОВАНЫ");
    }

    public function generate()
    {
        $users = DB::table('users')
            ->select(['id', 'name', 'email'])
            ->whereNull('password')
            ->get();

        if ($users->isEmpty()) {
            return response()->json([]);
        }

        return $this->processAndAssignPasswords($users);
    }

    // 2. REGENERATE: For all non-root users
    public function regenerate()
    {
        $users = User::withoutRole(RolesEnum::Root->value)
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
            $plainPassword = Str::random(12);

            $frontendReportData[] = [
                'id'             => $user->id,
                'name'           => $user->name,
                'email'          => $user->email,
                'plain_password' => $plainPassword,
            ];

            $upsertData[] = [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email, // Required for upsert integrity
                'password'   => $plainPassword,
                'updated_at' => $now,
            ];
        }

        // Wrap the single bulk query inside a quick transaction
        DB::transaction(function () use ($upsertData) {
            DB::table('users')->upsert(
                $upsertData,
                ['id'], // Match by primary key
                ['password', 'updated_at'] // Only change these columns
            );
        });

        // CRITICAL: Must return this back to your frontend!
        return response()->json($frontendReportData);
    }
}
