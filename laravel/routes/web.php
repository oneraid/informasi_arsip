<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArsipController;


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';

// Route::get('/arsip/import', [ArsipController::class, 'showImportForm'])->name('arsip.import.form');
// Route::post('/arsip/import', [ArsipController::class, 'import'])->name('arsip.import');
