<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\ArsipController;
use App\Http\Controllers\Auth\ResetEmailandPassword;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;


Route::prefix('peminjaman')->group(function () {
    Route::get('/', [PeminjamanController::class, 'index']);
    Route::post('/', [PeminjamanController::class, 'store']);
    Route::get('/{id}', [PeminjamanController::class, 'show']);
    Route::put('/{id}', [PeminjamanController::class, 'update']);
    Route::delete('/{id}', [PeminjamanController::class, 'destroy']);

    Route::get('/{id}/export-pdf', [PeminjamanController::class, 'exportToPdf']);
    Route::post('/export', [PeminjamanController::class, 'storeAndExport']);

    Route::post('/{id}/send-reminder', [PeminjamanController::class, 'sendReminderEmail']);

});

Route::prefix('arsip')->group(function () {
    Route::get('/', [ArsipController::class, 'index']);
    Route::post('/', [ArsipController::class, 'store']);
    Route::get('/{id}', [ArsipController::class, 'show']);
    Route::put('/{id}', [ArsipController::class, 'update']);
    Route::delete('/{id}', [ArsipController::class, 'destroy']);
    Route::put('/{id}/update-status', [ArsipController::class, 'updateStatus']);


    Route::get('/arsip-bidang', [ArsipController::class, 'getArsipByBidang']);


    Route::post('/import', [ArsipController::class, 'import']);
    Route::get('/export-excel', [ArsipController::class, 'exportArsip']);
});

Route::get('/arsip-by-year-and-bidang', [ArsipController::class, 'getArsipByYearAndBidang']);

use App\Http\Controllers\ArsipExportController;

Route::get('/export-excel', [ArsipExportController::class, 'exportExcel']);



Route::post('/register', [RegisteredUserController::class, 'register']);
Route::post('/login', [AuthenticatedSessionController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'logout']);
    Route::post('update-password', [ResetEmailandPassword::class, 'updatePassword']);
    Route::post('update-email', [ResetEmailandPassword::class, 'updateEmail']);
});
