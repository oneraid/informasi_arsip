<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


use App\Http\Controllers\ArsipController;

Route::get('arsip/import', [ArsipController::class, 'showImportForm'])->name('arsip.import.form');
Route::post('arsip/import', [ArsipController::class, 'import'])->name('arsip.import');

