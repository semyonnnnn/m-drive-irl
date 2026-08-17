<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
//////////////////////////////////////
use App\Services\UploadService;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Test/Index', [
            // 'materials' => (new UploadService)->paginate()
        ]);
    }

    public function store(Request $request)
    {

    }

    public function destroy(int $id)
    {
        \App\Models\Test::destroy($id);
    }

    public function create(){
        return Inertia::render('Test/Create');
    }

    public function show(int $id)
    {
        $test = \App\Models\Test::findOrFail($id);

        return Inertia::render('Test/Item', [
            'test' => $test
        ]);
    }
}
