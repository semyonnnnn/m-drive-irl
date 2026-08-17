<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
//////////////////////////////////////
use App\Services\MaterialService;
use App\Http\Requests\Material\MaterialStoreRequest;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Material/Index', [
            'materials' => (new MaterialService)->paginate()
        ]);
    }

    public function store(MaterialStoreRequest $r)
    {
        (new MaterialService)->uploadFile($r);

        return redirect()->back()->with('success', '[ОБРАБОТКА ЗАВЕРШЕНА] ПАКЕТ ИНТЕГРИРОВАН В СЕКТОР');
    }

    public function destroy(int $id)
    {
        \App\Models\Material::destroy($id);
    }

    public function show(int $id)
    {
        $material = \App\Models\Material::findOrFail($id);

        return Inertia::render('Material/Item', [
            'material' => $material
        ]);
    }
}
