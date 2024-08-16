<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keuangan extends Model
{
    use HasFactory;

    protected $table = 'keuangan';

    protected $fillable = [
        'no_rak',
        'no_box',
        'jenis_arsip',
        'no_arsip',
        'bulan',
        'tahun',
        'warna',
        'jumlah_folder',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relasi ke model Peminjaman
     */
    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'arsip_id');
    }
}
