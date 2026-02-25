<?php

namespace App\Services;

use Illuminate\Http\Request;
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

        $gakuseis = array_filter($users, function ($user) {
            return $user->hasRole(RolesEnum::Gakusei->value);
        });
        $senseis = array_filter($users, function ($user) {
            return $user->hasRole(RolesEnum::Sensei->value);
        });

        if ($user->hasRole(RolesEnum::Sensei->value)) {
            return $gakuseis;
        }

        //default for gakusei
        return $senseis;
    }

    public function distribute(array $related_users, User $user)
    {
        //check if this already exists in db 
        // 4 - 8
        // 4 - 8
        if (!$related_users) {
            return;
        }

        dd($related_users);

        // User::find(2)->gakusei()->attach($user);
        if ($user->hasRole(RolesEnum::Sensei->value)) {
            foreach ($related_users as $related) {
                // dd($related);
                $user && $user->gakusei()->syncWithoutDetaching($related['id']);
            }
            return;
        }
        return $user->sensei()->attach($related_users[0]['id']);
    }

}