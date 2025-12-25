<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Document\DocumentController;

Route::get(
    '/',
    [MainController::class, 'index']
);


Route::get('create_doc', function () {
    return Inertia::render('CreateDoc/Index');
})->middleware(['auth', 'verified'])->name('create_doc');
Route::post('create_doc', [DocumentController::class, 'create'])->middleware(['auth', 'verified'])->name('create_doc');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
