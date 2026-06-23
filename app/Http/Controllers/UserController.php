<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
//////////////////////////////////
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;
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

            // 2. If it doesn't exist, safely insert them
            User::create([
                'name'     => $name,
                'email'    => $email,
                'password' => null,
            ]);

            $insertedCount++;
        }

        // 3. Handle response routing based on conflict state
        if (!empty($conflicts)) {
            return back()->with('error', [
                'summary' => "ЧАСТИЧНАЯ_ОШИБКА: Импортировано {$insertedCount} шт.",
                'details' => $conflicts
            ]);
        }

        return back()->with('success', "ВСЕ СУБЪЕКТЫ ({$insertedCount} шт.) УСПЕШНО ИНДЕКСИРОВАНЫ");
    }

    // public function generate()
    // {
    //     // 1. Fetch the raw users who don't have a password
    //     $users = Users::query(['id', 'name', 'email'])
    //         ->whereNull('password')
    //         ->get();

    //     if ($users->isEmpty()) {
    //         return response()->json([]);
    //     }

    //     // This array will hold the plain text credentials to send back to React
    //     $frontendReportData = [];

    //     // 2. Start a Database Transaction to ensure all updates happen safely together
    //     \Illuminate\Support\Facades\DB::transaction(function () use ($users, &$frontendReportData) {
    //         foreach ($users as $user) {
    //             // Generate a secure, temporary random password (12 characters long)
    //             $plainPassword = \Illuminate\Support\Str::random(12);

    //             // Store the plain unhashed credentials for the frontend Excel sheet
    //             $frontendReportData[] = [
    //                 'id'    => $user->id,
    //                 'name'  => $user->name,
    //                 'email' => $user->email,
    //                 'plain_password' => $plainPassword, // Plain text here
    //             ];

    //             // 3. Securely hash the password and update the record in the database
    //             \Illuminate\Support\Facades\DB::table('users')
    //                 ->where('id', $user->id)
    //                 ->update([
    //                     'password' => \Illuminate\Support\Facades\Hash::make($plainPassword),
    //                     'updated_at' => now(),
    //                 ]);
    //         }
    //     });

    //     // 4. Return the collection of plain-text passwords back to your React frontend
    //     return response()->json($frontendReportData);
    // }
}
