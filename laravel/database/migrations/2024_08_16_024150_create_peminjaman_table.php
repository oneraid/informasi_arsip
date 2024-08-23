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
        Schema::create('peminjaman', function (Blueprint $table) {
            $table->id();
            $table->string('nama'); // Nama peminjam
            $table->string('nomor_telepon'); // Nomor telepon peminjam
            $table->string('email'); // Email peminjam
            $table->unsignedBigInteger('arsip_id');
            $table->string('arsip_type'); // Menyimpan jenis arsip, seperti 'App\Models\Keuangan' atau 'App\Models\TataUsaha'
            $table->date('tanggal_peminjaman');
            $table->date('tanggal_pengembalian')->nullable();
            $table->string('status'); // Contoh: 'Dipinjam', 'Dikembalikan', dll.
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('peminjaman');
    }
};
