<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Services\DocumentService;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Requests\DocCreate\DocCreateRequest;


class DocumentController extends Controller
{
    public function create(): Response
    {
        dd('CREATE');
    }
    public function generate(DocCreateRequest $request)
    {
        return (new DocumentService)->generate($request);
    }
}