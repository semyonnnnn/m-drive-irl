<?php

namespace App\Http\Controllers\File;
use App\Http\Controllers\Controller;

class FileController extends Controller
{
    public function index()
    {
    }
    public function create()
    {
        dd('hi from create in filecontroller');
    }
}