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

            $ours = $user->gakusei()->get();

            $theirs = $gakuseis->filter(function ($gakusei) use ($user) {

                $senseiIds = $gakusei->sensei()->allRelatedIds();

                return $senseiIds->isNotEmpty()
                    && !$senseiIds->contains($user->id);
            });

            return [
                'related_users' => $gakuseis,
                'ours' => $ours,
                'theirs' => $theirs,
            ];
        }

        return AuthUserResource::collection($senseis);
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
            // Find students that already belong to another sensei
            $forbidden = User::whereIn('id', $requestedIds)
                ->whereHas('sensei', fn($q) => $q->where('users.id', '!=', $user->id))
                ->pluck('id');

            // Keep only allowed students
            $allowedIds = $requestedIds->diff($forbidden);

            // Detach all current students
            $user->gakusei()->detach();

            // Attach allowed students
            if ($allowedIds->isNotEmpty()) {
                $user->gakusei()->attach($allowedIds);
            }

            // Optionally, warn about forbidden students
            if ($forbidden->isNotEmpty()) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'related_users' => 'Some students already belong to another Sensei and were not added.'
                ]);
            }
        }

        if ($isGakusei) {
            // Just sync all requested senseis for the student
            $user->sensei()->sync($requestedIds);
        }
    }

}