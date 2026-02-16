<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
///////////////////////////////////////
use App\Models\User;
use App\Enum\RolesEnum;
use App\Http\Resources\AuthUserResource;

class UserListService
{
    public function filter(User $user)
    {
        $users = AuthUserResource::collection(User::all())->collection->toArray();


        if ($user->hasRole(RolesEnum::Sensei->value)) {
            return array_filter($users, function ($user) {
                return $user->hasRole(RolesEnum::Gakusei->value);
            });
        }


        //default for gakusei
        return array_filter($users, function ($user) {
            return $user->hasRole(RolesEnum::Sensei->value);
        });
    }

}