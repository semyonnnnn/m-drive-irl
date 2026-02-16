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

    public function edit(User $user)
    {
        $isAdminPage = $user->hasRole(RolesEnum::Admin->value);

        $this->authorize('editAccess', [$user]);

        $data = [
            'user' => new AuthUserResource($user),
            'roles' => Role::all(),
            'roleLabels' => RolesEnum::labels(),
        ];

        if (!$isAdminPage) {
            $data['listOf'] = (new UserListService)->filter($user);
        }

        return Inertia::render('User/Edit', $data);

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
