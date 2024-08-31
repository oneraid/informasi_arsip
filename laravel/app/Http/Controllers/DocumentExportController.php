<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpOffice\PhpWord\TemplateProcessor;

class DocumentExportController extends Controller
{
    public function exportToWord(Request $request)
{
    // Path ke file template
    $templatePath = app_path('templates/peminjaman_template.docx');

    // Buat instance TemplateProcessor
    $templateProcessor = new TemplateProcessor($templatePath);

    // Ambil data dari request atau model
    $nama = $request->input('nama');
    $email = $request->input('email');
    $noTelp = $request->input('no_telp');
    $tanggalPinjam = $request->input('tanggal_pinjam');
    $tanggalKembali = $request->input('tanggal_kembali');

    // Set nilai pada placeholder
    $templateProcessor->setValue('nama', $nama);
    $templateProcessor->setValue('email', $email);
    $templateProcessor->setValue('no_telp', $noTelp);
    $templateProcessor->setValue('tanggal_pinjam', $tanggalPinjam);
    $templateProcessor->setValue('tanggal_kembali', $tanggalKembali);

    // Tentukan nama file yang akan dihasilkan
    $fileName = 'peminjaman_' . $nama . '.docx';

    // Simpan file yang sudah diproses
    $tempFile = tempnam(sys_get_temp_dir(), $fileName);
    $templateProcessor->saveAs($tempFile);

    // Return file untuk didownload
    return response()->download($tempFile, $fileName)->deleteFileAfterSend(true);
}
}

