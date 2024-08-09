<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tu', function (Blueprint $table) {
            $table->id();
            $table->string('no_rak');
            $table->string('no_box');
            $table->string('jenis_arsip');
            $table->string('no_arsip');
            $table->string('bulan');
            $table->string('tahun');
            $table->string('warna');
            $table->string('jumlah_folder');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tu');
    }
};
