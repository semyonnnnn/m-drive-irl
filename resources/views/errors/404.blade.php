@php
    $status = '404 NOT FOUND';
    $code = '404';
    $title = 'ЦЕЛЬ НЕ ОБНАРУЖЕНА';
    $message = 'ЦЕЛЬ НЕ ОБНАРУЖЕНА';
    $target = 'СТРАНИЦА_НЕ_СУЩЕСТВУЕТ';
    $location = 'ВНЕ_ЗОНЫ_ДОСТУПА';
@endphp

@extends('errors::minimal')

@section('title', __($title))
@section('code', $code)
@section('message', __($message))
@section('target', $target)
@section('status', $status)
@section('location', $location)

@section('telemetry')
    @php
        $telemetry = [
            "ЗАПРОШЕННЫЙ РЕСУРС ОТСУТСТВУЕТ В СИСТЕМЕ",
            "МАРШРУТ ДОСТАВКИ НАРУШЕН",
            "URL: " . request()->getRequestUri(),
            "МЕТОД: " . request()->method(),
            "IP_ЗАПРОСА: " . request()->ip(),
            "ВРЕМЯ_ОТКАЗА: " . now()->format('H:i:s'),
            "СТАТУС: $status",
            "РЕКОМЕНДАЦИЯ: ПРОВЕРЬТЕ URL ИЛИ ВЕРНИТЕСЬ НА БАЗУ"
        ];
    @endphp
@endsection