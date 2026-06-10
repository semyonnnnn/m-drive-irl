<?php

namespace App\Services;

use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class UploadService
{
    public function uploadFile(Request $request)
    {
        $file = $request->file('uploadedFile');
        $originalFullName = $file->getClientOriginalName();
        $baseName = pathinfo($originalFullName, PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();

        $time = time();
        $date = date("m_d_Y", $time);
        $hour = date("H", $time) . "h";
        $minute = date("i", $time) . "m";
        $timeStamp = $date . "_" . $hour . "_" . $minute;

        // Build the initial name
        $customName = $baseName . "___" . $timeStamp . '.' . $extension;
        $counter = 1;

        // Loop: Check database until we find a name that doesn't exist
        while (\App\Models\Material::query()->where('stored_name', $customName)->exists()) {
            // Append (counter) before the extension
            $customName = $baseName . "___" . $timeStamp . "({$counter})." . $extension;
            $counter++;
        }

        // Now $customName is guaranteed to be unique
        $file->storeAs('uploads', $customName, 'public');

        return \App\Models\Material::create([
            'display_name' => $originalFullName,
            'stored_name'  => $customName,
            'file_path'    => 'uploads/' . $customName,
            'file_size'    => $file->getSize(),
            'mime_type'    => $file->getMimeType(),
        ]);
    }
    
    public function paginate(){
           $materials = collect([
            ['id' => 'MTRL-001', 'title' => 'Введение в этику ИИ', 'img' => '3', 'type' => 'Видеокурс', 'typeIcon' => 'video'],
            ['id' => 'MTRL-002', 'title' => 'Квантовая логика v2', 'type' => 'Документ PDF', 'typeIcon' => 'file-lines', 'iconColor' => 'text-red-600/80'],
            ['id' => 'MTRL-003', 'title' => 'Матрица сетевой безопасности', 'img' => '5', 'type' => 'Лаб. руководство', 'typeIcon' => 'terminal', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-004', 'title' => 'Матанализ IV: Сводка', 'type' => 'Видеокурс', 'typeIcon' => 'video'],
            ['id' => 'MTRL-005', 'title' => 'Архитектура оборудования: Чертеж', 'img' => '7', 'type' => 'Подкаст', 'typeIcon' => 'volume-high', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-006', 'title' => 'Основы криптографии', 'type' => 'Документ PDF', 'typeIcon' => 'file-lines', 'iconColor' => 'text-red-600/80'],
            ['id' => 'MTRL-007', 'title' => 'Обработка сигналов: Лаб 4', 'type' => 'Лаб. руководство', 'typeIcon' => 'terminal', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-008', 'title' => 'Топология глубокого обучения', 'img' => '9', 'type' => 'Видеокурс', 'typeIcon' => 'video'],
            ['id' => 'MTRL-009', 'title' => 'Модели асинхронного ввода-вывода', 'type' => 'Системная матрица', 'typeIcon' => 'network-wired', 'iconColor' => 'text-amber-700/80'],
            ['id' => 'MTRL-010', 'title' => 'Микроядерная архитектура', 'type' => 'Аппаратная схема', 'typeIcon' => 'microchip', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-011', 'title' => 'Лексический анализатор компилятора', 'img' => '11', 'type' => 'Документ PDF', 'typeIcon' => 'file-lines', 'iconColor' => 'text-red-600/80'],
            ['id' => 'MTRL-012', 'title' => 'Автоматы и формальные языки', 'type' => 'Видеокурс', 'typeIcon' => 'video'],
            ['id' => 'MTRL-013', 'title' => 'Протокол шардирования баз данных', 'type' => 'Системная матрица', 'typeIcon' => 'network-wired', 'iconColor' => 'text-amber-700/80'],
            ['id' => 'MTRL-014', 'title' => 'Модуляция радиочастотных сигналов', 'img' => '13', 'type' => 'Лаб. руководство', 'typeIcon' => 'terminal', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-015', 'title' => 'Распределенный консенсус Raft', 'type' => 'Подкаст', 'typeIcon' => 'volume-high', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-016', 'title' => 'Матрица параллельной обработки', 'type' => 'Системная матрица', 'typeIcon' => 'network-wired', 'iconColor' => 'text-amber-700/80'],
            ['id' => 'MTRL-017', 'title' => 'Алгоритмы теории графов', 'img' => '15', 'type' => 'Документ PDF', 'typeIcon' => 'file-lines', 'iconColor' => 'text-red-600/80'],
            ['id' => 'MTRL-018', 'title' => 'Ядра архитектуры RISC-V', 'type' => 'Аппаратная схема', 'typeIcon' => 'microchip', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-019', 'title' => 'Растеризация графического движка', 'type' => 'Видеокурс', 'typeIcon' => 'video'],
            ['id' => 'MTRL-020', 'title' => 'Выделение памяти ядра', 'img' => '17', 'type' => 'Лаб. руководство', 'typeIcon' => 'terminal', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-021', 'title' => 'Трассировка конвейера TCP/IP', 'type' => 'Системная матрица', 'typeIcon' => 'network-wired', 'iconColor' => 'text-amber-700/80'],
            ['id' => 'MTRL-022', 'title' => 'Рекуррентные соотношения', 'type' => 'Документ PDF', 'typeIcon' => 'file-lines', 'iconColor' => 'text-red-600/80'],
            ['id' => 'MTRL-023', 'title' => 'Спецификации оптических сетей', 'img' => '19', 'type' => 'Аппаратная схема', 'typeIcon' => 'microchip', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-024', 'title' => 'Обратное распространение нейросети v4', 'type' => 'Видеокурс', 'typeIcon' => 'video'],
            ['id' => 'MTRL-025', 'title' => 'Киберфизические векторы', 'type' => 'Лаб. руководство', 'typeIcon' => 'terminal', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-026', 'title' => 'Ядро функционального программирования', 'img' => '21', 'type' => 'Подкаст', 'typeIcon' => 'volume-high', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-027', 'title' => 'Конкурентная сборка мусора', 'type' => 'Системная матрица', 'typeIcon' => 'network-wired', 'iconColor' => 'text-amber-700/80'],
            ['id' => 'MTRL-028', 'title' => 'Топология балансировки нагрузки', 'type' => 'Документ PDF', 'typeIcon' => 'file-lines', 'iconColor' => 'text-red-600/80'],
            ['id' => 'MTRL-029', 'title' => 'Структурный синтез ПЛИС (FPGA)', 'img' => '23', 'type' => 'Аппаратная схема', 'typeIcon' => 'microchip', 'iconColor' => 'text-zinc-500'],
            ['id' => 'MTRL-030', 'title' => 'Обзор статистической механики', 'type' => 'Видеокурс', 'typeIcon' => 'video']
        ]);

        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $perPage = 10;
        $currentItems = $materials->slice(($currentPage - 1) * $perPage, $perPage)->values()->all();

        $paginatedMaterials = new LengthAwarePaginator(
            $currentItems,
            $materials->count(),
            $perPage,
            $currentPage,
            ['path' => LengthAwarePaginator::resolveCurrentPath()]
        );

        return $paginatedMaterials;
    }
}