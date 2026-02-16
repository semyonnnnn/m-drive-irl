<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
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

        return Inertia::render('User/Edit', [
            'user' => new AuthUserResource($user),
            'users' => AuthUserResource::collection(User::all())->collection->toArray(),
            'roles' => Role::all(),
            'roleLabels' => RolesEnum::labels()
        ]);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'roles' => ['required', 'array'],
            'roles.*' => ['string'],
        ]);

        $this->authorize('updateAccess', [$user]);
        $this->authorize('assignRoles', [$user, $data['roles']]);

        $user->syncRoles($data['roles']);



        return back()->with('success', 'Roles updated successfully.');
    }
}
