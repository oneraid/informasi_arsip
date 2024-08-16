<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    protected $table = 'peminjaman';

    protected $fillable = [
        'arsip_id',
        'nama_peminjam',
        'kontak_peminjam',
        'tanggal_pinjam',
        'tanggal_kembali',
        'status',
    ];

    /**
     * Relasi ke model Keuangan
     */
    public function arsip()
    {
        return $this->belongsTo(Keuangan::class, 'arsip_id');
    }
}
