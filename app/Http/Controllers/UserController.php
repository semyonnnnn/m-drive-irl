<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
//////////////////////////////////
use App\Enum\RolesEnum;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
// use Spatie\Permission\Models\Role;
use App\Http\Resources\UserResource;
use App\Services\UserListService;
use App\Http\Requests\UploadUserRequest;
use App\Services\UserValidationService;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        return Inertia::render('User/Index', [
            'users' => (new UserListService)->paginate(),
            'roleLabels' => RolesEnum::labels(),
        ]);
    }

    public function edit(User $user, Request $request)
    {
        $this->authorize('editAccess', [$user]);

        $labels = RolesEnum::labels();
        // Banish the root translation key from the map
        unset($labels[RolesEnum::Root->value]);

        $data = [
            'user' => Auth::user(),
            'roleLabels' => $labels,
            'editableUser' => new UserResource($user),
        ];

        $isAdminPage = $user->hasRole(RolesEnum::Admin->value);
        if (!$isAdminPage) {
            $relations = (new UserListService)->edit($user);

            $data['related_users'] = $relations['related_users'];
            $data['ours'] = $relations['ours'];
        }

        return response()->json($data);
    }
    public function update(Request $request, User $user)
    {
        DB::table('non_existent_table_xyz')->get();
        if ($user->hasRole(RolesEnum::Root->value)) {
            return;
        }

        $isAdminPage = $user->hasRole(RolesEnum::Admin->value);
        $related_users = $request->get('related_users');

        // 1. Validate 'role' as a single string matching your frontend structure
        // dd($request->all());
        $data = (new UserValidationService())->validateUpdate($request);

        // dd('after validation');

        // dd('validation succeeded');

        // Optional: Keep this here for testing if needed
        // dd('after validation', $data['role']);

        $this->authorize('updateAccess', [$user]);

        // 2. Wrap the string into an array if your Policy expects an array of roles
        $this->authorize('assignRoles', [$user, [$data['role']]]);

        // if (!$isAdminPage) {
        //     (new UserListService)->update($related_users, $user, $data['role']);
        // }

        // 3. Pass the string wrapped in an array to syncRoles (Spatie expects an array/collection)
        $user->syncRoles([$data['role']]);

        // dd($user->name);
        return back()->with('success', "СУБЪЕКТ [{$user->name}]: ДАННЫЕ ОБНОВЛЕНЫ");
    }

    public function upload(UploadUserRequest $request)
    {
        $users = json_decode($request->payloadData, true);
        $conflicts = [];
        $insertedCount = 0;

        foreach ($users as $index => $user) {
            $email = $user['почта'];
            $name  = $user['имя'];

            // 1. Check if the email already exists
            $userExists = User::query()->where('email', $email)->exists();

            if ($userExists) {
                // Collect telemetry on the duplicate row (1-based index for humans)
                $conflicts[] = "[{$email}] - СУБЪЕКТ В БАЗЕ.";
                continue; // Skip this iteration and go to the next user
            }

            $created = User::create([
                'name'     => $name,
                'email'    => $email,
                'password' => null,
                'temp_password' => Str::random(12),
            ]);

            $created->assignRole(RolesEnum::Gakusei->value);

            $insertedCount++;
        }

        if (!empty($conflicts)) {
            return back()->with('error', [
                'summary' => "ЧАСТИЧНАЯ_ОШИБКА: Импортировано {$insertedCount} шт.",
                'details' => $conflicts
            ]);
        }

        return back()->with('success', "ВСЕ СУБЪЕКТЫ ({$insertedCount} шт.) УСПЕШНО ИНДЕКСИРОВАНЫ");
    }
}
