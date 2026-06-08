<?php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
/////////////////////////////////////////
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\Document\DocumentController;
use App\Http\Controllers\File\FileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (Auth::check() && Auth::user()->hasVerifiedEmail()) {
        return Inertia::render('Main/Auth');
    }

    return Inertia::render('Main/Guest');
})->name('dashboard');



Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::post('doc', [DocumentController::class, 'generate'])->name('doc.generate');
    // Route::get('doc', [DocumentController::class, 'create'])->name('doc.create');

    Route::get('file', [FileController::class, 'create'])->name('file.upload');
    // Route::post('file', [FileController::class, 'store'])->name('file.store');

    // Route::get('/user', [UserController::class, 'index'])->name('user.index');
    // Route::get('/user/{user}/edit', [UserController::class, 'edit'])->name('user.edit');
    // Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');

    Route::get('/upload', [UploadController::class, 'index'])->name('upload.index');
    Route::post('/upload', [UploadController::class, 'store'])->name('upload.post');
});

// Route::get('/test', function(){
//     return Storage::disk('public')->response('mockup/woman.png');
// });

require __DIR__ . '/auth.php';
