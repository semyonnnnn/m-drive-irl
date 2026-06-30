<?php

use App\Http\Controllers\Auth\PasswordController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
//////////////////////////////////////////
use App\Http\Controllers\UserController;
use App\Http\Controllers\UploadController;
// use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    $user = Auth::user();

    if ($user) {
        if (!is_null($user->temp_password)) {
            return redirect()->route('forceReset.view');
        }

        return Inertia::render('Main/Auth');
    }

    return Inertia::render('Main/Guest');
})->name('dashboard');


// Route::get('/test', function () {
//     return DB::table('non_existent_table_xyz')->get();
// });

// 1. First Layer: User must be authenticated
Route::middleware(['auth'])->group(function () {

    // 2. Second Layer: Attach your custom middleware alias here 
    // This locks down every route in this block if temp_password !== null
    Route::middleware(['force_reset'])->group(function () {
        // 3. Third Layer: Final production verification gate
        Route::middleware(['verified'])->group(function () {
            Route::get('/user', [UserController::class, 'index'])->name('user.index');
            Route::get('/user/{user}/edit', [UserController::class, 'edit'])->name('user.edit');
            Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');
            Route::get('/user/{user}', function () {
                return redirect('/user');
            });
            Route::post('/user', [UserController::class, 'upload'])->name('user.upload');

            Route::get('/upload', [UploadController::class, 'index'])->name('upload.index');
            Route::get('/upload/{id}/edit', [UploadController::class, 'edit'])->name('upload.edit');
            Route::post('/upload', [UploadController::class, 'store'])->name('upload.post');
            Route::delete('/upload/{id}', [UploadController::class, 'destroy'])->name('upload.destroy');

            Route::post('/pass.download', [PasswordController::class, 'download'])->name('pass.download');
            Route::post('/pass.regenerate', [PasswordController::class, 'regenerate'])->name('pass.regenerate');
        });
    });
});

require __DIR__ . '/auth.php';
