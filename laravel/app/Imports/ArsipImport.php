<?php

namespace App\Imports;

use App\Models\Arsip;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ArsipImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new Arsip([
            'no_rak'        => $row['no_rak'],
            'no_box'        => $row['no_box'],
            'bidang'        => $row['bidang'],
            'jenis_arsip'   => $row['jenis_arsip'],
            'no_arsip'      => $row['no_arsip'],
            'bulan'         => $row['bulan'],
            'tahun'         => $row['tahun'],
            'warna'         => $row['warna'],
            'jumlah' => $row['jumlah'],
            'status'        => $row['status'],
        ]);
    }
}
