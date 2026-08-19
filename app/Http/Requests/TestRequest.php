<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:3', 'max:255'],
            'description' => ['required', 'string', 'min:3', 'max:255'],
            'questions' => ['required', 'array'],
            'questions.*.id' => [
                'required', 
                'string', 
                'regex:/^q_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i'
            ],
            'questions.*.text' => ['required', 'string', 'min:3', 'max:255'],
            'questions.*.options' => ['required', 'array'],
            'questions.*.options.*.id' => [
                'required', 
                'string', 
                'regex:/^opt_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i'
            ],
            'questions.*.options.*.text' => ['required', 'string', 'min:3', 'max:255'],
            'questions.*.options.*.isCorrect' => ['required', 'boolean']
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Поле названия обязательно для заполнения.',
            'title.string' => 'Название должно быть строкой.',
            'title.min' => 'Название должно содержать не менее 3 символов.',
            'title.max' => 'Название не должно превышать 255 символов.',

            'description.required' => 'Поле описания обязательно для заполнения.',
            'description.string' => 'Описание должно быть строкой.',
            'description.min' => 'Описание должно содержать не менее 3 символов.',
            'description.max' => 'Описание не должно превышать 255 символов.',

            'questions.required' => 'Тест должен содержать вопросы.',
            'questions.array' => 'Вопросы должны быть представлены в виде массива.',

            'questions.*.id.required' => 'Каждый вопрос должен иметь идентификатор.',
            'questions.*.id.regex' => 'Неверный формат идентификатора вопроса.',

            'questions.*.text.required' => 'Текст вопроса обязателен.',
            'questions.*.text.string' => 'Текст вопроса должен быть строкой.',
            'questions.*.text.min' => 'Текст вопроса должен содержать не менее 3 символов.',
            'questions.*.text.max' => 'Текст вопроса не должен превышать 255 символов.',

            'questions.*.options.required' => 'У вопроса должны быть варианты ответов.',
            'questions.*.options.array' => 'Варианты ответов должны быть массивом.',

            'questions.*.options.*.id.required' => 'Каждый вариант ответа должен иметь идентификатор.',
            'questions.*.options.*.id.regex' => 'Неверный формат идентификатора варианта ответа.',

            'questions.*.options.*.text.required' => 'Текст варианта ответа обязателен.',
            'questions.*.options.*.text.string' => 'Текст варианта ответа должен быть строкой.',
            'questions.*.options.*.text.min' => 'Текст варианта ответа должен содержать не менее 3 символов.',
            'questions.*.options.*.text.max' => 'Текст варианта ответа не должен превышать 255 символов.',

            'questions.*.options.*.isCorrect.required' => 'Необходимо указать правильность варианта ответа.',
            'questions.*.options.*.isCorrect.boolean' => 'Поле правильности ответа должно быть логическим.',
        ];
    }
}