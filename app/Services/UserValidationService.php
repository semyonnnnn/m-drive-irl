<?php

namespace App\Services;

use App\Enum\RolesEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserValidationService
{
    /**
     * Validate user update payloads using system telemetry constraints.
     *
     * @param  Request  $request
     * @return array
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validateUpdate(Request $request): array
    {
        // Extract raw backing values from your RolesEnum case files
        $allowedRoles = array_column(RolesEnum::labels(), 'value');

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:20'],
            'email' => ['required', 'string', 'email', 'max:20'],
            'role' => ['required', 'string', Rule::in($allowedRoles)],
        ], $this->getTacticalErrorMessages());

        return $validator->validate();
    }

    /**
     * Direct military-telemetry error message overrides.
     *
     * @return array
     */
    private function getTacticalErrorMessages(): array
    {
        return [
            // ИМЯ / НАИМЕНОВАНИЕ
            'name.required' => 'ОТКАЗ_СИСТЕМЫ // КОД_01: НАИМЕНОВАНИЕ_СУБЪЕКТА_ОТСУТСТВУЕТ',
            'name.string'   => 'КРИТИЧЕСКИЙ_СБОЙ // ДАННЫЕ_НАИМЕНОВАНИЯ_ПОВРЕЖДЕНЫ_НЕ_СТРОКА',
            'name.max'      => 'ОШИБКА_МАТРИЦЫ // ИНДЕКС_ПРЕВЫШЕН: МАКС_20_СИМВОЛОВ',

            // ПОЧТА / КАНАЛ СВЯЗИ
            'email.required' => 'ОТКАЗ_СИСТЕМЫ // КОД_02: АДРЕС_КАНАЛА_СВЯЗИ_НЕ_ОБНАРУЖЕН',
            'email.string'   => 'КРИТИЧЕСКИЙ_СБОЙ // ФОРМАТ_КАНАЛА_СВЯЗИ_АНУЛИРОВАН',
            'email.email'    => 'ОШИБКА_ТЕЛЕМЕТРИИ // СТРУКТУРА_EMAIL_НЕ_ВАЛИДНА',
            'email.max'      => 'ОШИБКА_МАТРИЦЫ // ИНДЕКС_ПРЕВЫШЕН: МАКС_20_СИМВОЛОВ',

            // РОЛЬ / ДОСТУП
            'role.required' => 'ОТКАЗ_СИСТЕМЫ // КОД_03: ТОКЕН_ДОСТУПА_НЕ_НАЗНАЧЕН',
            'role.string'   => 'КРИТИЧЕСКИЙ_СБОЙ // СИСТЕМНАЯ_РОЛЬ_ИМЕЕТ_НЕВЕРНЫЙ_ТИП',
            'role.in'       => 'БЛОКИРОВКА_ЯДРА // СТАТУС_УРОВНЯ_ВНЕ_ДОПУСТИМОГО_ДИАПАЗОНА_ЦЕЛИ',
        ];
    }
}
