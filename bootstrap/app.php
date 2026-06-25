<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // 1. GLOBAL WEB APPENDS (Inertia shared state initialization)
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // 2. ROUTE ALIASES (Your custom password reset wall)
        $middleware->alias([
            'force_reset' => \App\Http\Middleware\EnforcePasswordReset::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        // 1. NORMALIZATION LAYER: Force raw core Policy failures into real HTTP exceptions
        $exceptions->map(AuthorizationException::class, function (AuthorizationException $e) {
            return new AccessDeniedHttpException($e->getMessage() ?: 'Forbidden Access Matrix.', $e);
        });

        // 2. RENDERING LAYER: Intercept and build your custom terminal-style Blade view
        $exceptions->render(function (Throwable $e, Request $request) {

            if (!config('app.debug')) {

                // STRICT INERTIA FILTER: Only bypass if it is an active client-side link navigation
                if ($request->header('X-Inertia')) {
                    return null;
                }

                // Extract the true status code after normalization mapping runs
                $statusCode = $e instanceof HttpExceptionInterface ? $e->getStatusCode() : 500;
                $officialStatusText = \Symfony\Component\HttpFoundation\Response::$statusTexts[$statusCode] ?? 'Unknown';

                // Dynamic tracking strings for your telemetry dashboard matrix
                $dynamicOperation = $request->method() . '_REQUEST';
                $path = $request->path();

                // FIX 1: Limit and Shorten the target URL string path mapping (Max 25 Chars)
                if ($path === '/') {
                    $dynamicTarget = 'ROOT_CORE';
                } else {
                    $formattedTarget = strtoupper(str_replace(['/', '-'], ['_', '_'], $path));
                    $dynamicTarget = \Illuminate\Support\Str::limit($formattedTarget, 25, '...');
                }

                $dynamicStatus = ($statusCode === 403 || $statusCode === 401) ? 'ДОСТУП_БЛОКИРОВАН' : (($statusCode >= 500) ? 'КРИТИЧЕСКИЙ_СБОЙ_ЯДРА' : '...');

                // FIX 2: Limit and Shorten the full URL trace string (Max 45 Chars)
                $shortenedUrl = \Illuminate\Support\Str::limit($request->fullUrl(), 45, '...');

                $telemetryData = [
                    'МАРШРУТ СБОЯ: ' . $request->method() . ' ' . $shortenedUrl,
                    'СТАТУС ОТВЕТА: ' . $statusCode . ' (' . strtoupper(str_replace(' ', '_', $officialStatusText)) . ')',
                    'ВРЕМЯ ФИКСАЦИИ: ' . now()->toIso8601String(),
                    'IP-АДРЕС ИСТОЧНИКА: ' . $request->ip(),
                ];

                // FIX 3: Limit and Shorten the exception message string (Max 50 Chars)
                $rawMessage = $e->getMessage() ?: $officialStatusText;
                $shortenedMessage = \Illuminate\Support\Str::limit($rawMessage, 50, '...');

                // FORCE EXECUTION: Safely output your custom stylized blade template
                return response()->view('errors.minimal', [
                    'code' => $statusCode,
                    'rawMessage' => $rawMessage,
                    'message' => $shortenedMessage,
                    'operation' => $dynamicOperation,
                    'status' => $dynamicStatus,
                    'target' => $dynamicTarget,
                    'location' => 'NODE_' . $request->ip(),
                    'telemetry' => $telemetryData,
                ], $statusCode);
            }
        });
    })
    ->create();
