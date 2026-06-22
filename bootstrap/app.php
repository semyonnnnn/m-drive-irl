<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Illuminate\Http\Request;
use Throwable;

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
                $statusCode = $e instanceof HttpExceptionInterface ? $e->getStatusCode() : 500;
                $officialStatusText = \Symfony\Component\HttpFoundation\Response::$statusTexts[$statusCode] ?? 'Unknown';

                // 1. Dynamic Operation Type
                $dynamicOperation = $request->method() . '_REQUEST';

                // 2. Dynamic Target Path
                $path = $request->path();
                $dynamicTarget = $path === '/' ? 'ROOT_CORE' : strtoupper(str_replace(['/', '-'], ['_', '_'], $path));

                // 3. Dynamic Status Message based on the HTTP code type
                if ($statusCode >= 500) {
                    $dynamicStatus = 'КРИТИЧЕСКИЙ_СБОЙ_ЯДРА'; // Server Crash
                } elseif ($statusCode === 403 || $statusCode === 401) {
                    $dynamicStatus = 'ДОСТУП_БЛОКИРОВАН'; // Auth Failure
                } else {
                    $dynamicStatus = '...'; // Not Found / Other 4xx
                }

                // 4. Dynamic Telemetry Loop
                $telemetryData = [
                    'МАРШРУТ СБОЯ: ' . $request->method() . ' ' . $request->fullUrl(),
                    'СТАТУС ОТВЕТА: ' . $statusCode . ' (' . strtoupper(str_replace(' ', '_', $officialStatusText)) . ')',
                    'ВРЕМЯ ФИКСАЦИИ: ' . now()->toIso8601String(),
                    'IP-АДРЕС ИСТОЧНИКА: ' . $request->ip(),
                ];

                return response()->view('errors.minimal', [
                    'code' => $statusCode,
                    'message' => $e->getMessage() ?: $officialStatusText,
                    'operation' => $dynamicOperation, // Pass new dynamic operation
                    'status' => $dynamicStatus,       // Pass new dynamic status
                    'target' => $dynamicTarget,       // Pass new dynamic target
                    'location' => 'NODE_' . $request->ip(),
                    'telemetry' => $telemetryData,
                ], $statusCode);
            }
        });
    })
    ->create();
