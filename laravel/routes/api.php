<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\ArsipController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('peminjaman')->group(function () {
    Route::get('/', [PeminjamanController::class, 'index']);
    Route::post('/', [PeminjamanController::class, 'store']);
    Route::get('/{id}', [PeminjamanController::class, 'show']);
    Route::put('/{id}', [PeminjamanController::class, 'update']);
    Route::delete('/{id}', [PeminjamanController::class, 'destroy']);
});

Route::prefix('arsip')->group(function () {
    Route::get('/', [ArsipController::class, 'index']);  // Membuat peminjaman baru
    Route::post('/', [ArsipController::class, 'store']);  // Membuat peminjaman baru
    Route::get('/{id}', [ArsipController::class, 'show']);  // Menampilkan detail peminjaman
    Route::put('/{id}', [ArsipController::class, 'update']);  // Mengupdate peminjaman
    Route::delete('/{id}', [ArsipController::class, 'destroy']);  // Menghapus peminjaman

});





