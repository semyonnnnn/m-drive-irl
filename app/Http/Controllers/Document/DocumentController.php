<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use Inertia\Response;

class DocumentController extends Controller
{
    public function create(): Response
    {
        dd($_POST);
    }
}