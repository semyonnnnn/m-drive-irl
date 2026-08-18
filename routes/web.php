<?php

use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// 1. First Layer: User must be authenticated
Route::middleware(['auth'])->group(function () {

    // 2. Second Layer: Force password reset gate
    Route::middleware(['force_reset'])->group(function () {

        // 3. Third Layer: Email verification gate
        Route::middleware(['verified'])->group(function () {

            // USERS RESOURCE
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::post('/users/upload', [UserController::class, 'upload'])->name('users.upload');
            Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
            Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
            Route::get('/users/{user}', function () {
                return redirect()->route('users.index');
            })->name('users.show');

            // MATERIALS RESOURCE
            Route::get('/materials', [MaterialController::class, 'index'])->name('materials.index');
            Route::post('/materials', [MaterialController::class, 'store'])->name('materials.store');
            Route::get('/materials/{material}', [MaterialController::class, 'show'])->name('materials.show');
            Route::delete('/materials/{material}', [MaterialController::class, 'destroy'])->name('materials.destroy');

            // TESTS RESOURCE
            Route::get('/tests', [TestController::class, 'index'])->name('tests.index');
            Route::get('/tests/create', [TestController::class, 'create'])->name('tests.create');
            Route::post('/tests', [TestController::class, 'store'])->name('tests.store');
            Route::get('/tests/{test}', [TestController::class, 'show'])->name('tests.show');
            Route::delete('/tests/{test}', [TestController::class, 'destroy'])->name('tests.destroy');

            // UTILITIES / ACTIONS
            Route::post('/passwords/download', [PasswordController::class, 'download'])->name('passwords.download');
            Route::post('/passwords/regenerate', [PasswordController::class, 'regenerate'])->name('passwords.regenerate');
        });
    });
});

require __DIR__ . '/auth.php';