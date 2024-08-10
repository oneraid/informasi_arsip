<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\KeuanganController;
use App\Http\Controllers\TataUsahaController;

Route::apiResource('keuangan', KeuanganController::class);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('keuangan', [KeuanganController::class, 'index']);
Route::post('keuangan', [KeuanganController::class, 'store']);
Route::get('keuangan/{id}', [KeuanganController::class, 'show']);
Route::put('keuangan/{id}', [KeuanganController::class, 'update']);
Route::delete('keuangan/{id}', [KeuanganController::class, 'destroy']);


Route::get('/tatausaha', [TataUsahaController::class, 'index']);
Route::post('/tatausaha', [TataUsahaController::class, 'store']);
Route::get('/tatausaha/{id}', [TataUsahaController::class, 'show']);
Route::put('/tatausaha/{id}', [TataUsahaController::class, 'update']);
Route::delete('/tatausaha/{id}', [TataUsahaController::class, 'destroy']);
