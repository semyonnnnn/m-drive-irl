{{-- resources/views/errors/403.blade.php --}}
@include('errors.minimal', [
    'code' => 403,
    'status' => 'ДОСТУП_БЛОКИРОВАН',
    'operation' => request()->method() . '_REQUEST',
    'target' => request()->path() === '/' ? 'ROOT_CORE' : strtoupper(str_replace(['/', '-'], ['_', '_'], request()->path())),
    'location' => 'NODE_' . request()->ip(),
    'message' => $exception->getMessage() ?: 'Forbidden Access Matrix.',
    'telemetry' => [
        'МАРШРУТ СБОЯ: ' . request()->method() . ' ' . request()->fullUrl(),
        'СТАТУС ОТВЕТА: 403 (FORBIDDEN)',
        'ВРЕМЯ ФИКСАЦИИ: ' . now()->toIso8601String(),
        'IP-АДРЕС ИСТОЧНИКА: ' . request()->ip(),
    ]
])


@section('title', __('Forbidden'))
@section('code', '403')
@section('message', __($exception->getMessage() ?: 'Forbidden'))
