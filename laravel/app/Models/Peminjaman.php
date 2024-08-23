<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    protected $table = 'peminjaman';

    protected $fillable = [
        'nama',              // Nama peminjam
        'nomor_telepon',     // Nomor telepon peminjam
        'email',             // Email peminjam
        'arsip_id',          // ID dari arsip yang dipinjam (Keuangan atau TataUsaha)
        'arsip_type',        // Nama model, bisa 'App\Models\Keuangan' atau 'App\Models\TataUsaha'
        'tanggal_peminjaman',
        'tanggal_pengembalian',
        'status',
        'keterangan',
    ];

    protected $casts = [
        'tanggal_peminjaman' => 'datetime',
        'tanggal_pengembalian' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function arsip()
    {
        return $this->morphTo();
    }
}
