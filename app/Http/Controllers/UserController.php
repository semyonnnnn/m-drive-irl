<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Http\Resources\AuthUserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Enum\PermissionsEnum;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('User/Index', [
            'users' => AuthUserResource::collection(User::all())->collection->toArray()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => new AuthUserResource($user),
            'roles' => Role::all(),
            'roleLabels' => RolesEnum::labels(),
            'can' => [
                'manageAdmins' => $user->can(PermissionsEnum::ManageAdmins->value),
                'manageUsers' => $user->can(PermissionsEnum::ManageUsers->value),
                'assignTasks' => $user->can(PermissionsEnum::AssignTasks->value),
                'completeTasks' => $user->can(PermissionsEnum::CompleteTasks->value),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        if ($user->hasRole(RolesEnum::Root->value)) {
            return back()->with('error', 'Слыш, низзя!');
        }


        $data = $request->validate([
            'roles' => ['required', 'array'],
        ]);

        $user->syncRoles($data['roles']);

        return back()->with('success', 'Roles updated successfully.');
    }
}
