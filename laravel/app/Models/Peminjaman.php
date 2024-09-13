<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    protected $table = 'peminjaman';


    protected $fillable = [
        'nama',
        'no_telp',
        'email',
        'keperluan',
        'tanggal_pinjam',
        'tanggal_kembali',
        'status',
    ];

    public function arsip()
    {
        return $this->belongsToMany(Arsip::class, 'arsip_peminjaman')
                    ->withTimestamps();
    }



}
