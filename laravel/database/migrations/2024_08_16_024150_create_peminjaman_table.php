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
            $table->unsignedBigInteger('arsip_id'); // Foreign key ke tabel keuangan atau arsip lainnya
            $table->string('nama_peminjam'); // Nama peminjam arsip
            $table->string('kontak_peminjam')->nullable(); // Kontak peminjam, misalnya nomor telepon atau email
            $table->timestamp('tanggal_pinjam')->nullable(); // Tanggal peminjaman
            $table->timestamp('tanggal_kembali')->nullable(); // Tanggal pengembalian
            $table->enum('status', ['dipinjam', 'dikembalikan'])->default('dipinjam'); // Status peminjaman
            $table->timestamps();

            // Relasi ke tabel keuangan atau arsip lainnya
            $table->foreign('arsip_id')->references('id')->on('keuangan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peminjaman');
    }
};
