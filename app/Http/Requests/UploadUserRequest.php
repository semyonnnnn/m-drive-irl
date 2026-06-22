<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadUserRequest extends FormRequest
{
    /**
     * Prepare the data for validation by decoding the JSON string.
     */
    protected function prepareForValidation(): void
    {
        // Decode the JSON string into a PHP array so Laravel can validate its keys
        if ($this->has('payloadData') && is_string($this->payloadData)) {
            $decoded = json_decode($this->payloadData, true);

            // Only replace if it successfully decoded into an array
            if (is_array($decoded)) {
                $this->merge([
                    'payloadData_decoded' => $decoded,
                ]);
            }
        }
    }

    public function rules(): array
    {
        return [
            // 1. Keep validating the raw payload structure
            'payloadData' => ['required', 'string', 'json'],

            // 2. Validate the internal array structure we extracted in prepareForValidation
            'payloadData_decoded' => ['required', 'array', 'min:1'],

            // Validate that every single row is an array containing exactly our expected keys
            'payloadData_decoded.*' => ['required', 'array:имя,почта'],

            // Validate the row elements individually
            'payloadData_decoded.*.имя'   => ['required', 'string', 'max:255'],
            'payloadData_decoded.*.почта' => ['required', 'string', 'email', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'payloadData.required' => 'ДАННЫЕ_ОТСУТСТВУЮТ: Пакет матрицы данных пуст.',
            'payloadData.string'   => 'СБОЙ_ТИПА_ДАННЫХ: Ожидался строковый формат пакета.',
            'payloadData.json'     => 'ОШИБКА_СТРУКТУРЫ: Передан некорректный или повреждённый JSON.',

            // Custom structural messages
            'payloadData_decoded.required' => 'МАТРИЦА_ПУСТА: Отсутствуют индексируемые элементы.',
            'payloadData_decoded.array'    => 'СБОЙ_ФОРМАТА: Ожидалась плоская табличная матрица.',
            'payloadData_decoded.min'      => 'МАТРИЦА_ПУСТА: Файл должен содержать как минимум одну заполненную строку.',

            // Wildcard structural errors
            'payloadData_decoded.*.array'  => 'СБОЙ_СТРУКТУРЫ: Обнаружена поврежденная сигнатура строки.',
            'payloadData_decoded.*.имя.required'   => 'ПАКЕТ_ПОВРЕЖДЁН: Пропущено обязательное поле [имя].',
            'payloadData_decoded.*.почта.required' => 'ПАКЕТ_ПОВРЕЖДЁН: Пропущено обязательное поле [почта].',
            'payloadData_decoded.*.почта.email'    => 'СБОЙ_ВЕРИФИКАЦИИ: Некорректный синтаксис адреса электронной почты.',
        ];
    }
}
