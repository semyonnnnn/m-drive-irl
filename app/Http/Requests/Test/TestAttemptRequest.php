<?php

namespace App\Http\Requests\Test;

use Illuminate\Foundation\Http\FormRequest;

class TestAttemptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => ['required', 'numeric'],
            'answers' => ['required', 'array'],
            'answers.*' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'answers.required' => 'Ответы на тест обязательны для заполнения.',
            'answers.array' => 'Неверный формат данных ответов.',
            'answers.*.required' => 'Каждый вопрос должен содержать выбранный вариант ответа.',
            'answers.*.string' => 'Идентификатор варианта ответа должен быть строкой.',
        ];
    }
}
