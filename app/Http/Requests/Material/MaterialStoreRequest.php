<?php

namespace App\Http\Requests\Material;

use Illuminate\Foundation\Http\FormRequest;


class MaterialStoreRequest extends FormRequest
{
    public function rules(): array
    {
            return [
            // Validate file presence, size (64MB = 65536 KB), and specific types
            'uploadedFile' => [
                'required', 
                'file', 
                'max:65536', 
                'mimes:pdf,docx,doc,xlsx,xls,csv'
            ],
            // Ensure description is provided and limit its length
            'description'  => 'required|string|max:500',
        ];
    }

    public function messages(): array
    {
      return [
            'uploadedFile.required' => '[ОШИБКА] ПАКЕТ ДАННЫХ НЕ ОБНАРУЖЕН',
            'uploadedFile.max'      => '[ОШИБКА] ОБЪЕМ ПАКЕТА ПРЕВЫШАЕТ 64MB',
            'uploadedFile.mimes'    => '[ОШИБКА] ФОРМАТ ДАННЫХ НЕ ПОДДЕРЖИВАЕТСЯ (ДОПУСТИМЫ: PDF, DOCX, XLSX)',
            'description.required'  => '[ОШИБКА] ИДЕНТИФИКАТОР_ОПИСАНИЯ НЕ ЗАПОЛНЕН',
            'description.max'       => '[ОШИБКА] СЛИШКОМ ДЛИННОЕ ОПИСАНИЕ',
            'description.string'    => '[ОШИБКА] ТРЕБУЕТСЯ ТЕКСТОВОЕ ПОЛЕ',
        ];
    }

}