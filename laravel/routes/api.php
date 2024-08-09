<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\KeuanganController;

Route::apiResource('keuangan', KeuanganController::class);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('keuangan', [KeuanganController::class, 'index']);
Route::post('keuangan', [KeuanganController::class, 'store']);
Route::get('keuangan/{id}', [KeuanganController::class, 'show']);
Route::put('keuangan/{id}', [KeuanganController::class, 'update']);
Route::delete('keuangan/{id}', [KeuanganController::class, 'destroy']);
