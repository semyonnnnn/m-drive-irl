<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadUserListRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'file' => ['required', 'file', 'mimes:xlsx', 'max:10240'],
        ];
    }


    //!JSON JSON JSON JSON JSON JSON JSON JSON JSON JSON
    /**
     * Get custom error messages for validator failures.
     */
    public function messages(): array
    {
        return [
            // 'file.required' => 'ФАЙЛ_ОТСУТСТВУЕТ: Выберите файл для загрузки.',
            // 'file.mimes'    => 'ОШИБКА_ФОРМАТА: разрешён только .XLSX.',
            // 'file.max'      => 'ПРЕВЫШЕН_ЛИМИТ: Файл не должен превышать 10 МБ.',
        ];
    }
}