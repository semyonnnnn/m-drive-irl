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
    public function edit(User $user)
    {
        $isSensei = $user->hasRole(RolesEnum::Sensei->value);
        $users = User::all();

        $gakuseis = $users->filter(
            fn($u) =>
            $u->hasRole(RolesEnum::Gakusei->value)
        );

        $senseis = $users->filter(
            fn($u) =>
            $u->hasRole(RolesEnum::Sensei->value)
        );

        if ($isSensei) {

            $ours_g = $user->gakusei()->get();
            $theirs = $gakuseis
                ->filter(function ($gakusei) use ($user) {
                    $senseiIds = $gakusei->sensei()->allRelatedIds();

                    return $senseiIds->isNotEmpty()
                        && !$senseiIds->contains($user->id);
                })
                ->map(function ($gakusei) {
                    $sensei = $gakusei->sensei()->first(); // assuming 1 sensei per gakusei
    
                    return [
                        'id' => $gakusei->id,
                        'name' => $gakusei->name,
                        'sensei' => $sensei ? [
                            'id' => $sensei->id,
                            'name' => $sensei->name,
                        ] : null,
                    ];
                })
                ->values(); // important: reindex

            return [
                'related_users' => AuthUserResource::collection($gakuseis)->resolve(),
                'ours' => AuthUserResource::collection($ours_g)->resolve(),
                'theirs' => $theirs,
            ];
        }

        $ours_s = $user->sensei()->get();

        return [
            'related_users' => AuthUserResource::collection($senseis)->resolve(),
            'ours' => AuthUserResource::collection($ours_s)->resolve(),
            'theirs' => []
        ];
    }

    public function update(array $related_users, User $user)
    {
        $isSensei = $user->hasRole(RolesEnum::Sensei->value);
        $isGakusei = $user->hasRole(RolesEnum::Gakusei->value);

        if (!$isSensei && !$isGakusei) {
            return;
        }

        $requestedIds = collect($related_users)->pluck('id')->filter()->values();

        if ($isSensei) {
            $forbidden = User::whereIn('id', $requestedIds)
                ->whereHas('sensei', fn($q) => $q->where('users.id', '!=', $user->id))
                ->whereNotIn('id', $user->gakusei()->pluck('users.id'))
                ->pluck('id');

            if ($forbidden->isNotEmpty()) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'related_users' => 'У некоторых учеников уже есть наставники'
                ]);
            }

            $user->gakusei()->detach();

            if ($requestedIds->isNotEmpty()) {
                $user->gakusei()->attach($requestedIds);
            }

        } else if ($isGakusei) {
            $user->sensei()->detach();
            $user->sensei()->attach($requestedIds[0]);
            $user->sensei()->sync($requestedIds[0]);
        }
    }

}