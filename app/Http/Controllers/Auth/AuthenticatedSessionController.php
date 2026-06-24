<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Inertia\Inertia;
// use Illuminate\Validation\ValidationException;
// use Illuminate\Support\Facades\Route;
// use Illuminate\Http\JsonResponse;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): RedirectResponse
    {
        return redirect('/');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): RedirectResponse
    {
        // 1. Change type hint from LoginRequest to standard Illuminate\Http\Request
        // This stops ANY background authentication hooks from firing early
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // 2. Query target user from the database matrix
        $user = User::query()->where('email', $request->email)->first();

        if ($user) {
            // DEBUG TRIGGER: If this hits, look at your Laravel logs to see what's actually inside the DB field
            \Illuminate\Support\Facades\Log::info('Login verification state trace', [
                'has_temp' => !is_null($user->temp_password),
                'db_val'   => $user->temp_password,
                'input'    => $request->password,
                'match'    => $user->temp_password === $request->password
            ]);

            if (!is_null($user->temp_password) && $user->temp_password === $request->password) {
                Auth::login($user);

                $request->session()->regenerate();

                return redirect()->route('forceReset.view');
            }

            // 3. Secure fallback loop for hashed users
            if (Hash::check($request->password, $user->password)) {
                Auth::login($user);

                $request->session()->regenerate();

                return redirect()->intended(route('forceReset.view', absolute: false));
            }
        }

        // 4. Default authentication failure execution pathway
        throw \Illuminate\Validation\ValidationException::withMessages([
            'email' => __('auth.failed'),
        ]);
    }



    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function forceReset(User $user)
    {
        return Inertia::render('User/Reset', [
            'user' => $user
        ]);
    }
}
