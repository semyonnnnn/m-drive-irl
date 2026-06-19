<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'payloadData' => ['required', 'string', 'json'],
        ];
    }

    public function messages(): array
    {
        return [
            'payloadData.required' => 'ДАННЫЕ_ОТСУТСТВУЮТ: Пакет матрицы данных пуст.',
            'payloadData.string'   => 'СБОЙ_ТИПА_ДАННЫХ: Ожидался строковый формат пакета.',
            'payloadData.json'     => 'ОШИБКА_СТРУКТУРЫ: Передан некорректный или повреждённый JSON.',
        ];
    }
}
