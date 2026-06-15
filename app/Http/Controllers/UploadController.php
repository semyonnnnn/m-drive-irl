<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
//////////////////////////////////////
use App\Services\UploadService;
use App\Services\UploadValidationService;

class UploadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Upload/Index', [
            'materials' => (new UploadService)->paginate()
        ]);
    }

   public function store(Request $request)
    {
        (new UploadValidationService)->storeValidate($request);
        (new UploadService)->uploadFile($request);
        
        return redirect()->back()->with('success', '[ОБРАБОТКА ЗАВЕРШЕНА] ПАКЕТ ИНТЕГРИРОВАН В СЕКТОР');
    }
    
    public function destroy(int $id)
    {
        \App\Models\Material::destroy($id);
    }

    public function edit(int $id){
        $material = \App\Models\Material::findOrFail($id);

        return Inertia::render('Upload/SingleItem', [
            'material' => $material
        ]);
    }
}