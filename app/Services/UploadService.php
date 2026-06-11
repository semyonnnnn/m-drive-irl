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
            'title' => $request->description,
            'stored_name'  => $customName,
            'file_path'    => 'uploads/' . $customName,
            'file_size'    => $file->getSize(),
            'type'    => $file->extension(),
            'img' => 'to be edited',
        ]);
    }
    
    public function paginate(){
        $materials = Material::all();
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