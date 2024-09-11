<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\TemplateProcessor;
use Carbon\Carbon;
use Mpdf\Mpdf;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReminderMail;


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

        // Setelah data tersimpan, ekspor ke DOCX dan kemudian ke PDF
        return $this->exportToPdf($peminjaman->id);
    }

    public function exportToPdf($id)
{
    // Generate DOCX first
    $docxFile = $this->exportToWord($id, true);
    $peminjaman = Peminjaman::with('arsip')->findOrFail($id);

    // Convert DOCX to HTML
    $phpWord = \PhpOffice\PhpWord\IOFactory::load($docxFile);
    $htmlWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'HTML');

    $htmlContent = '';
    ob_start();
    $htmlWriter->save('php://output');
    $htmlContent = ob_get_contents();
    ob_end_clean();

    // Modify arsip data to use <ul><li> tags for PDF
    $arsipData = "<ul>";
    foreach ($peminjaman->arsip as $arsip) {
        $arsipData .= "<li>{$arsip->jenis_arsip} {$arsip->no_arsip} ({$arsip->bulan} {$arsip->tahun})</li>";
    }
    $arsipData .= "</ul>";

    // Replace placeholder with the formatted arsip list
    $htmlContent = str_replace("[arsip_placeholder]", $arsipData, $htmlContent);

    // Convert HTML to PDF
    $options = new Options();
    $options->set('isRemoteEnabled', true);

    $dompdf = new Dompdf($options);
    $dompdf->loadHtml($htmlContent);
    $dompdf->setPaper('A4', 'portrait');
    $dompdf->render();

    // Output the PDF as a download
    return $dompdf->stream('peminjaman_' . $peminjaman->nama . '.pdf', ['Attachment' => true]);
}


    public function exportToWord($id, $returnFilePath = false)
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
        $arsipData = "<ul>";
        foreach ($peminjaman->arsip as $arsip) {
            $arsipData .= "<li>{$arsip->jenis_arsip} {$arsip->no_arsip} ({$arsip->bulan} {$arsip->tahun})</li>";
        }
        $arsipData .= "</ul>";
        $templateProcessor->setValue('arsip', $arsipData);

        // Generate and save the file
        $fileName = 'peminjaman_' . $peminjaman->nama . '.docx';
        $tempFile = tempnam(sys_get_temp_dir(), $fileName);
        $templateProcessor->saveAs($tempFile);

        // Return file path if converting to PDF
        if ($returnFilePath) {
            return $tempFile;
        }

        // Otherwise, return the DOCX as a download
        return response()->download($tempFile, $fileName)->deleteFileAfterSend(true);
    }

    public function sendReminderEmail($id)
{
    try {
        $peminjaman = Peminjaman::with('arsip')->findOrFail($id);

        // Send email
        Mail::to($peminjaman->email)->send(new ReminderMail($peminjaman));

        return response()->json(['message' => 'Reminder email sent successfully!']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Failed to send email', 'error' => $e->getMessage()], 500);
    }
}


}
