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

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        return Inertia::render('User/Index', [
            'users' => AuthUserResource::collection(User::all())->collection->toArray(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        if ($user->id == 1) {
            return abort(403);
        }

        return Inertia::render('User/Edit', [
            'user' => new AuthUserResource($user),
            'roleLabels' => RolesEnum::labels()
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
            'role' => ['required', 'string'],
        ]);

        $user->syncRoles($data['role']);

        return back()->with('success', 'Roles updated successfully.');
    }
}
