<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnforcePasswordReset
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // If logged in and still possessing a temp password
        if ($user && !is_null($user->temp_password)) {
            if (
                !$request->routeIs('forceReset.view') &&
                !$request->routeIs('password.update') &&
                !$request->routeIs('logout')
            ) {

                return redirect()->route('forceReset.view');
            }
        }

        return $next($request);
    }
}
