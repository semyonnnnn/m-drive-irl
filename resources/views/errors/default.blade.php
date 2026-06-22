@extends('errors::minimal')

@section('code', $exception->getStatusCode() ?? '???')
@section('title', 'ОШИБКА ' . ($exception->getStatusCode() ?? '???'))
@section('message', $exception->getMessage() ?: 'НЕИЗВЕСТНАЯ ОШИБКА СЕРВЕРА')
@section('target', 'НЕОПОЗНАННЫЙ_ЗАПРОС')
@section('status', 'КРИТИЧЕСКИЙ_СБОЙ')
@section('location', 'НЕОПРЕДЕЛЁННАЯ_ЗОНА')