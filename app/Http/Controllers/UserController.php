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

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        return Inertia::render('User/Index', [
            'users' => AuthUserResource::collection(User::all())->collection->toArray(),
            'roleLabels' => RolesEnum::labels()
        ]);
    }

    public function edit(User $user)
    {
        $this->authorize('editAccess', [$user]);

        $isAdminPage = $user->hasRole(RolesEnum::Admin->value);

        $data = [
            'user' => new AuthUserResource($user),
            'roles' => Role::all(),
            'roleLabels' => RolesEnum::labels(),
        ];

        if (!$isAdminPage) {
            $data['related_users'] = (new UserListService)->filter($user);
        }

        return Inertia::render('User/Edit', $data);

    }

    public function update(Request $request, User $user)
    {
        $isAdminPage = $user->hasRole(RolesEnum::Admin->value);
        if ($isAdminPage) {
            return back();
        }

        $related_users = $request->get('related_users');
        $data = $request->validate([
            'roles' => ['required', 'array'],
            'roles.*' => ['string'],
        ]);

        $this->authorize('updateAccess', [$user]);
        $this->authorize('assignRoles', [$user, $data['roles']]);



        $user->syncRoles($data['roles']);
        (new UserListService)->distribute($related_users, $user);


        return back()->with('success', 'Roles updated successfully.');
    }
}
