<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use App\Models\Arsip;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\TemplateProcessor;
use Carbon\Carbon;
use Mpdf\Mpdf;


class PeminjamanController extends Controller
{
    // Get all peminjaman records
    public function index()
    {
        $peminjaman = Peminjaman::with('arsip')->get();
        return response()->json($peminjaman);
    }

    // Store a new peminjaman record
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nama' => 'required|string|max:255',
                'no_telp' => 'required|string|max:15',
                'email' => 'required|email|max:255',
                'keperluan' => 'required|string|max:255',
                'tanggal_pinjam' => 'required|date',
                'tanggal_kembali' => 'nullable|date',
                'status' => 'required|string|max:50',
                'arsip_ids' => 'required|array',
                'arsip_ids.*' => 'exists:arsip,id',
            ]);

            // Create the peminjaman record
            $peminjaman = Peminjaman::create($validatedData);

            // Attach the selected arsip to the peminjaman
            $peminjaman->arsip()->attach($validatedData['arsip_ids']);

            return response()->json($peminjaman->load('arsip'), 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return a JSON response with validation error details
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Catch any other exceptions and return a generic error message
            return response()->json([
                'message' => 'An error occurred while processing the request',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    // Show a specific peminjaman record
    public function show($id)
    {
        $peminjaman = Peminjaman::with('arsip')->findOrFail($id);
        return response()->json($peminjaman);
    }

    // Update a peminjaman record
    public function update(Request $request, $id)
    {
        $peminjaman = Peminjaman::findOrFail($id);

        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'no_telp' => 'required|string|max:15',
            'email' => 'required|email|max:255',
            'keperluan' => 'required|string|max:255',
            'tanggal_pinjam' => 'required|date',
            'tanggal_kembali' => 'nullable|date',
            'status' => 'required|string|max:50',
            'arsip_ids' => 'required|array',
            'arsip_ids.*' => 'exists:arsip,id',
        ]);

        $peminjaman->update($validatedData);

        // Sync the selected arsip with the peminjaman
        $peminjaman->arsip()->sync($validatedData['arsip_ids']);

        return response()->json($peminjaman->load('arsip'));
    }

    // Delete a peminjaman record
    public function destroy($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->arsip()->detach();
        $peminjaman->delete();

        return response()->json(['message' => 'Peminjaman deleted successfully.']);
    }

    public function storeAndExport(Request $request)
{
    // Validasi dan buat data peminjaman seperti pada metode store sebelumnya
    $validatedData = $request->validate([
        'nama' => 'required|string|max:255',
        'no_telp' => 'required|string|max:15',
        'email' => 'required|email|max:255',
        'keperluan' => 'required|string|max:255',
        'tanggal_pinjam' => 'required|date',
        'tanggal_kembali' => 'nullable|date',
        'status' => 'required|string|max:50',
        'arsip_ids' => 'required|array',
        'arsip_ids.*' => 'exists:arsip,id',
    ]);

    $peminjaman = Peminjaman::create($validatedData);
    $peminjaman->arsip()->attach($validatedData['arsip_ids']);

    // Setelah data tersimpan, ekspor ke DOCX
    return $this->exportToWord($peminjaman->id);
}

public function exportToWord($id)
{
    $templatePath = app_path('templates/peminjaman_template.docx');
    $templateProcessor = new TemplateProcessor($templatePath);
    $peminjaman = Peminjaman::with('arsip')->findOrFail($id);

    // Convert dates to Carbon instances if not already
    $tanggalPinjam = Carbon::parse($peminjaman->tanggal_pinjam);
    $tanggalKembali = $peminjaman->tanggal_kembali ? $tanggalKembali = Carbon::parse($peminjaman->tanggal_kembali) : null;

    // Set values in the template
    $templateProcessor->setValue('nama', $peminjaman->nama);
    $templateProcessor->setValue('email', $peminjaman->email);
    $templateProcessor->setValue('no_telp', $peminjaman->no_telp);
    $templateProcessor->setValue('keperluan', $peminjaman->keperluan);
    $templateProcessor->setValue('tanggal_pinjam', $tanggalPinjam->format('d-m-Y'));
    $templateProcessor->setValue('tanggal_kembali', $tanggalKembali ? $tanggalKembali->format('d-m-Y') : '-');

    // Process arsip data with line breaks for better formatting
    $arsipData = '';
    foreach ($peminjaman->arsip as $arsip) {
        $arsipData .= "No Rak: {$arsip->no_rak}<w:br/>";
        $arsipData .= "No Box: {$arsip->no_box}<w:br/>";
        $arsipData .= "Jenis Arsip: {$arsip->jenis_arsip}<w:br/>";
        $arsipData .= "No Arsip: {$arsip->no_arsip}<w:br/>";
        $arsipData .= "Bulan: {$arsip->bulan}<w:br/>";
        $arsipData .= "Tahun: {$arsip->tahun}<w:br/><w:br/>";
    }
    $templateProcessor->setValue('arsip', $arsipData);

    // Generate and send the file
    $fileName = 'peminjaman_' . $peminjaman->nama . '.docx';
    $tempFile = tempnam(sys_get_temp_dir(), $fileName);
    $templateProcessor->saveAs($tempFile);

    return response()->download($tempFile, $fileName)->deleteFileAfterSend(true);
}

public function exportToPDF($id)
{
    $peminjaman = Peminjaman::with('arsip')->findOrFail($id);

    // Buat konten HTML manual berdasarkan data peminjaman
    $html = '<h1>Data Peminjaman</h1>';
    $html .= '<p>Nama: ' . $peminjaman->nama . '</p>';
    $html .= '<p>Email: ' . $peminjaman->email . '</p>';
    $html .= '<p>No Telp: ' . $peminjaman->no_telp . '</p>';
    $html .= '<p>Keperluan: ' . $peminjaman->keperluan . '</p>';
    $html .= '<p>Tanggal Pinjam: ' . Carbon::parse($peminjaman->tanggal_pinjam)->format('d-m-Y') . '</p>';
    $html .= '<p>Tanggal Kembali: ' . ($peminjaman->tanggal_kembali ? Carbon::parse($peminjaman->tanggal_kembali)->format('d-m-Y') : '-') . '</p>';

    $html .= '<h2>Arsip</h2>';
    foreach ($peminjaman->arsip as $arsip) {
        $html .= "<p>No Rak: {$arsip->no_rak}</p>";
        $html .= "<p>No Box: {$arsip->no_box}</p>";
        $html .= "<p>Jenis Arsip: {$arsip->jenis_arsip}</p>";
        $html .= "<p>No Arsip: {$arsip->no_arsip}</p>";
        $html .= "<p>Bulan: {$arsip->bulan}</p>";
        $html .= "<p>Tahun: {$arsip->tahun}</p><br/>";
    }

    // Konversi HTML ke PDF menggunakan Mpdf
    $mpdf = new Mpdf();
    $mpdf->WriteHTML($html);

    $pdfFileName = 'peminjaman_' . $peminjaman->nama . '.pdf';
    return $mpdf->Output($pdfFileName, 'D');
}









}
