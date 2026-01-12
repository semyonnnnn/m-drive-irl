<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Document\DocumentController;
use App\Http\Controllers\File\FileController;

Route::get(
    '/',
    [MainController::class, 'index']
);



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('generate_doc', [DocumentController::class, 'generate'])->name('generate_doc');
    Route::get('create_doc', [DocumentController::class, 'create'])->name('create_doc');

    Route::get('doc', [FileController::class, 'create'])->name('upload_file');
    Route::post('doc', [FileController::class, 'store'])->name('store_file');
});

require __DIR__ . '/auth.php';
