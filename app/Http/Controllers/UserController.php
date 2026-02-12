<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Enum\PermissionsEnum;
//////////////////////////////////
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Resources\AuthUserResource;
use Illuminate\Support\Facades\Auth;

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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $authIsRoot = Auth::user()->hasRole(RolesEnum::Root->value);
        $authIsAdmin = Auth::user()->hasRole(RolesEnum::Admin->value);
        $isAdminPage = $user->hasRole(RolesEnum::Admin->value);

        //can't go to root edit page
        if ($user->hasRole(RolesEnum::Root->value)) {
            return abort(403);
        }
        //only root or admins can go here
        if (!$authIsAdmin && !$authIsRoot) {
            return abort(403);
        }
        //admins cannot go to admins edit
        if ($authIsAdmin && $isAdminPage) {
            return abort(403);
        }

        return Inertia::render('User/Edit', [
            'user' => new AuthUserResource($user),
            'roles' => Role::all(),
            'roleLabels' => RolesEnum::labels()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $authIsRoot = Auth::user()->hasRole(RolesEnum::Root->value);
        $authIsAdmin = Auth::user()->hasRole(RolesEnum::Admin->value);
        $isAdminPage = $user->hasRole(RolesEnum::Admin->value);

        //nothing for root
        if ($user->hasRole(RolesEnum::Root->value)) {
            return back()->with('error', 'Слыш, низзя!');
        }
        //no root, no admin? go away
        if (!$authIsAdmin && !$authIsRoot) {
            return back()->with('error', 'Слыш, низзя!');
        }
        //only root can manage admins
        if ($authIsAdmin && $isAdminPage) {
            return back()->with('error', 'Слыш, низзя!');
        }

        $data = $request->validate([
            'roles' => ['required', 'array'],
            'roles.*' => ['string'],
        ]);

        if (in_array(RolesEnum::Root->value, $data['roles'])) {
            return back()->with('error', 'Слыш, низзя!');
        }
        if (!$authIsRoot && in_array(RolesEnum::Admin->value, $data['roles'])) {
            return back()->with('error', 'Слыш, низзя!');
        }

        $user->syncRoles($data['roles']);

        //update this with laravel's policies

        return back()->with('success', 'Roles updated successfully.');
    }
}
