<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
/////////////////////////////////////////
use App\Http\Controllers\UserController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (Auth::check() && Auth::user()->hasVerifiedEmail()) {
        return Inertia::render('Main/Auth');
    }

    return Inertia::render('Main/Guest');
})->name('dashboard');

Route::get('/test', function () {
    abort(504);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/user', [UserController::class, 'index'])->name('user.index');
    Route::get('/user/{user}/edit', [UserController::class, 'edit'])->name('user.edit');
    Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::post('/user', [UserController::class, 'upload'])->name('user.upload');
    Route::post('/generate', [UserController::class, 'generate'])->name('generate');
    Route::post('/regenerate', [UserController::class, 'regenerate'])->name('regenerate');

    Route::get('/upload', [UploadController::class, 'index'])->name('upload.index');
    Route::get('/upload/{id}/edit', [UploadController::class, 'edit'])->name('upload.edit');
    Route::post('/upload', [UploadController::class, 'store'])->name('upload.post');
    Route::delete('/upload/{id}', [UploadController::class, 'destroy'])->name('upload.destroy');
});

require __DIR__ . '/auth.php';
