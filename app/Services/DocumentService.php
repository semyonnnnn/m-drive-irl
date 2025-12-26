<?php

namespace App\Services;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;



##################################

use App\Http\Requests\DocCreate\DocCreateRequest;

class DocumentService
{


    public function generate(DocCreateRequest $request)
    {
        $attributes = $request->validated();

        $text = $attributes['description'];
        // dd($text);

        $phpWord = new PhpWord();
        $section = $phpWord->addSection();
        $section->addText($text);

        $filename = $attributes['doc_name'];


        $filename .= '.docx';
        // dd($filename);

        return response()->streamDownload(function () use ($phpWord) {
            $writer = IOFactory::createWriter($phpWord, 'Word2007');
            $writer->save('php://output');
        }, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Cache-Control' => 'max-age=0',
        ]);
    }

}