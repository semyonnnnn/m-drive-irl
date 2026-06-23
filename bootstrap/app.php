<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (Throwable $e, Request $request) {

            if (!config('app.debug')) {

                // 1. STRICT INERTIA EXCEPTION: Only back out if it's a real, active SPA client-side request transition.
                // If it's a direct browser bar entry or a cold page load refresh, do NOT return null.
                if ($request->header('X-Inertia')) {
                    return null; // Let the React Inertia SPA handle modal popup errors locally
                }

                // 2. CORE TRANSLATION: Explicitly capture raw policy authentication exceptions
                // and force them to map to a true 403 status code before running checks.
                if ($e instanceof \Illuminate\Auth\Access\AuthorizationException || $e instanceof \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException) {
                    $statusCode = 403;
                } else {
                    $statusCode = $e instanceof HttpExceptionInterface ? $e->getStatusCode() : 500;
                }

                $officialStatusText = \Symfony\Component\HttpFoundation\Response::$statusTexts[$statusCode] ?? 'Unknown';

                // Dynamic tracking strings for your telemetry dashboard matrix
                $dynamicOperation = $request->method() . '_REQUEST';
                $path = $request->path();
                $dynamicTarget = $path === '/' ? 'ROOT_CORE' : strtoupper(str_replace(['/', '-'], ['_', '_'], $path));
                $dynamicStatus = ($statusCode === 403 || $statusCode === 401) ? 'ДОСТУП_БЛОКИРОВАН' : (($statusCode >= 500) ? 'КРИТИЧЕСКИЙ_СБОЙ_ЯДРА' : '...');

                $telemetryData = [
                    'МАРШРУТ СБОЯ: ' . $request->method() . ' ' . $request->fullUrl(),
                    'СТАТУС ОТВЕТА: ' . $statusCode . ' (' . strtoupper(str_replace(' ', '_', $officialStatusText)) . ')',
                    'ВРЕМЯ ФИКСАЦИИ: ' . now()->toIso8601String(),
                    'IP-АДРЕС ИСТОЧНИКА: ' . $request->ip(),
                ];

                // 3. FORCE EXECUTION: Safely output your custom stylized blade template
                return response()->view('errors.minimal', [
                    'code' => $statusCode,
                    'message' => $e->getMessage() ?: $officialStatusText,
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
