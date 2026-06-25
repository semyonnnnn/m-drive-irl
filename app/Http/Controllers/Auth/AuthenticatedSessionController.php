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
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::query()->where('email', $request->email)->first();

        if ($user) {
            // 1. Check temporary plaintext password matrix
            if (!is_null($user->temp_password) && $user->temp_password === $request->password) {
                Auth::login($user);
                $request->session()->regenerate();

                return redirect()->route('forceReset.view');
            }

            // 2. Fallback to standard production hash verification
            if ($user->password && Hash::check($request->password, $user->password)) {
                Auth::login($user);
                $request->session()->regenerate();

                // If they still haven't cleared their temp password for some reason, lock them down
                if (!is_null($user->temp_password)) {
                    return redirect()->route('forceReset.view');
                }

                return redirect()->intended(route('dashboard', absolute: false));
            }
        }

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

    public function forceReset(Request $request)
    {
        return Inertia::render('User/Reset', [
            'user' => $request->user()
        ]);
    }
}
