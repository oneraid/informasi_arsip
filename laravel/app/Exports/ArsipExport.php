<?php

namespace App\Exports;

use App\Models\Arsip;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ArsipExport implements FromCollection, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    protected $filters;

    // Constructor untuk menerima filter dari request
    public function __construct($filters)
    {
        $this->filters = $filters;
    }

    // Query untuk mendapatkan data sesuai dengan filter yang diberikan
    public function collection()
    {
        $query = Arsip::query();

        if (isset($this->filters['no_rak'])) {
            $query->where('no_rak', 'like', '%' . $this->filters['no_rak'] . '%');
        }
        if (isset($this->filters['no_box'])) {
            $query->where('no_box', 'like', '%' . $this->filters['no_box'] . '%');
        }
        if (isset($this->filters['no_arsip'])) {
            $query->where('no_arsip', 'like', '%' . $this->filters['no_arsip'] . '%');
        }
        if (isset($this->filters['bulan'])) {
            $query->where('bulan', 'like', '%' . $this->filters['bulan'] . '%');
        }
        if (isset($this->filters['tahun'])) {
            $query->where('tahun', 'like', '%' . $this->filters['tahun'] . '%');
        }
        if (isset($this->filters['bidang'])) {
            $query->where('bidang', $this->filters['bidang']);
        }

        return $query->get();
    }

    // Menambahkan header kolom ke dalam file Excel
    public function headings(): array
    {
        return [
            'No Rak',
            'No Box',
            'Bidang',
            'Jenis Arsip',
            'No Arsip',
            'Bulan',
            'Tahun',
            'Jumlah Folder',
            'Warna',
            'Status',
        ];
    }

    // Mengatur data yang akan diekspor ke dalam format yang tepat
    public function map($arsip): array
    {
        return [
            $arsip->no_rak,
            $arsip->no_box,
            $arsip->bidang,
            $arsip->jenis_arsip,
            $arsip->no_arsip,
            $arsip->bulan,
            $arsip->tahun,
            $arsip->jumlah,
            $arsip->warna,
            $arsip->status,
        ];
    }

    // Menambahkan border dan alignment pada sheet
    public function styles(Worksheet $sheet)
    {
        // Menambahkan border untuk semua sel yang terisi
        $sheet->getStyle('A1:J' . ($sheet->getHighestRow()))->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    'color' => ['argb' => '000000'],
                ],
            ],
        ]);

        // Mengatur alignment (posisi teks dalam sel)
        $sheet->getStyle('A1:J' . ($sheet->getHighestRow()))->getAlignment()->setHorizontal('center');
        $sheet->getStyle('A1:J' . ($sheet->getHighestRow()))->getAlignment()->setVertical('center');

        // Menambahkan padding kiri agar teks tidak terlalu menempel di pinggir
        $sheet->getStyle('A1:J' . ($sheet->getHighestRow()))->getAlignment()->setIndent(1);
    }
}
