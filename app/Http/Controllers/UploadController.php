<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
//////////////////////////////////////
use App\Services\UploadService;

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
        $request->validate([
            'uploadedFile' => 'required|file|max:65536', // 64MB limit
        ]);

        $request->file('uploadedFile')->store('uploads', 'public');

        // 3. (Optional) Return to user
        return back()->with('message', 'File uploaded successfully!');
    }
}