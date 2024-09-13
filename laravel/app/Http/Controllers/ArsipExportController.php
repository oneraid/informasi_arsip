<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exports\ArsipExport;
use Maatwebsite\Excel\Facades\Excel;

class ArsipExportController extends Controller
{
    public function exportExcel(Request $request)
    {
        $filters = $request->all();

        // Nama file hasil export
        $fileName = 'arsip.xlsx';

        // Melakukan ekspor data dengan filter
        return Excel::download(new ArsipExport($filters), $fileName);
    }
}
