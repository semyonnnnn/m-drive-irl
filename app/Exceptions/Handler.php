<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

class Handler extends ExceptionHandler
{
    public function render($request, Throwable $exception)
    {
        // Если это HTTP-исключение и отладка выключена
        if ($exception instanceof HttpExceptionInterface && !config('app.debug')) {
            $statusCode = $exception->getStatusCode();

            // Если есть отдельный шаблон для этого кода – используем его
            $view = "errors::{$statusCode}";
            if (view()->exists($view)) {
                return response()->view($view, ['exception' => $exception], $statusCode);
            }

            // Иначе – ваш минимальный шаблон (безопасно передаём нужные переменные)
            return response()->view('errors::minimal', [
                'code'     => $statusCode,
                'message'  => $exception->getMessage() ?: 'Ошибка сервера',
                'status'   => 'СБОЙ_СИСТЕМЫ',
                'target'   => 'НЕИЗВЕСТНЫЙ_ЗАПРОС',
                'location' => 'НЕОПРЕДЕЛЁННО',
            ], $statusCode);
        }

        return parent::render($request, $exception);
    }
}
