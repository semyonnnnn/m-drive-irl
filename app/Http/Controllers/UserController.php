<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
//////////////////////////////////
use App\Enum\RolesEnum;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
// use Spatie\Permission\Models\Role;
use App\Http\Resources\UserResource;
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

    public function edit(User $user, Request $request)
    {
        $this->authorize('editAccess', [$user]);

        $labels = RolesEnum::labels();
        // Banish the root translation key from the map
        unset($labels[RolesEnum::Root->value]);

        $data = [
            'user' => Auth::user(),
            'roleLabels' => $labels,
            'editableUser' => new UserResource($user),
        ];

        $isAdminPage = $user->hasRole(RolesEnum::Admin->value);
        if (!$isAdminPage) {
            $relations = (new UserListService)->edit($user);

            $data['related_users'] = $relations['related_users'];
            $data['ours'] = $relations['ours'];
        }

        return response()->json($data);
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

        foreach ($users as $index => $user) {
            $email = $user['почта'];
            $name  = $user['имя'];

            // 1. Check if the email already exists
            $userExists = User::query()->where('email', $email)->exists();

            if ($userExists) {
                // Collect telemetry on the duplicate row (1-based index for humans)
                $conflicts[] = "[{$email}] - СУБЪЕКТ В БАЗЕ.";
                continue; // Skip this iteration and go to the next user
            }

            $created = User::create([
                'name'     => $name,
                'email'    => $email,
                'password' => null,
                'temp_password' => Str::random(12),
            ]);

            $created->assignRole(RolesEnum::Gakusei->value);

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
}
