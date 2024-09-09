<!-- routes/api.php -->
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\ArsipController;
use App\Http\Controllers\Auth\ResetEmailandPassword;


Route::prefix('peminjaman')->group(function () {
    Route::get('/', [PeminjamanController::class, 'index']);
    Route::post('/', [PeminjamanController::class, 'store']);
    Route::get('/{id}', [PeminjamanController::class, 'show']);
    Route::put('/{id}', [PeminjamanController::class, 'update']);
    Route::delete('/{id}', [PeminjamanController::class, 'destroy']);
    Route::get('/{id}/export-pdf', [PeminjamanController::class, 'exportToPdf']);
    Route::post('/export', [PeminjamanController::class, 'storeAndExport']);

});

Route::prefix('arsip')->group(function () {
    Route::get('/', [ArsipController::class, 'index']);  // Membuat peminjaman baru
    Route::post('/', [ArsipController::class, 'store']);  // Membuat peminjaman baru
    Route::get('/{id}', [ArsipController::class, 'show']);  // Menampilkan detail peminjaman
    Route::put('/{id}', [ArsipController::class, 'update']);  // Mengupdate peminjaman
    Route::delete('/{id}', [ArsipController::class, 'destroy']);  // Menghapus peminjaman
});


use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;


Route::post('/register', [RegisteredUserController::class, 'register']);
Route::post('/login', [AuthenticatedSessionController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'logout']);
    Route::post('update-password', [ResetEmailandPassword::class, 'updatePassword']);
    Route::post('update-email', [ResetEmailandPassword::class, 'updateEmail']);
});
