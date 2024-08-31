<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arsip extends Model
{
    use HasFactory;

    protected $table = 'arsip';

    protected $fillable = [
        'no_rak',
        'no_box',
        'bidang',
        'jenis_arsip',
        'no_arsip',
        'bulan',
        'tahun',
        'warna',
        'jumlah',
        'status',
    ];

    public function peminjaman()
    {
        return $this->belongsToMany(Peminjaman::class, 'arsip_peminjaman')
                    ->withTimestamps(); // Pivot table name is 'arsip_peminjaman'
    }
}
