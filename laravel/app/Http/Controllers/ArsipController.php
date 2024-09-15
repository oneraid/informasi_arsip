<?php

namespace App\Http\Controllers;

use App\Models\Arsip;
use Illuminate\Http\Request;
use App\Imports\ArsipImport;
use App\Exports\ArsipExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class ArsipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $arsip = Arsip::all();
        return response()->json($arsip);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'no_rak' => 'required|string|max:255',
            'no_box' => 'nullable|string|max:255',
            'bidang' => 'required|string|max:255',
            'jenis_arsip' => 'required|string|max:255',
            'no_arsip' => 'required|string|max:255',
            'bulan' => 'required|string|max:255',
            'tahun' => 'required|string|max:4',
            'warna' => 'nullable|string|max:255',
            'jumlah' => 'required|integer',
            'status' => 'required|string|max:255',
        ]);

        $arsip = Arsip::create($validatedData);

        return response()->json(['message' => 'Arsip created successfully', 'data' => $arsip], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $arsip = Arsip::find($id);

        if (!$arsip) {
            return response()->json(['message' => 'SHow'], 404);
        }

        return response()->json($arsip);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $arsip = Arsip::find($id);

        if (!$arsip) {
            return response()->json(['message' => 'Arsip not founds'], 404);
        }

        $validatedData = $request->validate([
            'no_rak' => 'required|string|max:255',
            'no_box' => 'nullable|string|max:255',
            'bidang' => 'required|string|max:255',
            'jenis_arsip' => 'required|string|max:255',
            'no_arsip' => 'required|string|max:255',
            'bulan' => 'required|string|max:255',
            'tahun' => 'required|string|max:4',
            'warna' => 'nullable|string|max:255',
            'jumlah' => 'required|integer',
            'status' => 'required|string|max:255',
        ]);

        $arsip->update($validatedData);

        return response()->json(['message' => 'Arsip updated successfully', 'data' => $arsip]);
    }

    public function updateStatus(Request $request, $id)
    {
        // Cari arsip berdasarkan ID
        $arsip = Arsip::find($id);

        // Jika arsip tidak ditemukan, kirimkan response 404
        if (!$arsip) {
            return response()->json(['message' => 'Arsip not found'], 404);
        }

        // Validasi hanya field status
        $validatedData = $request->validate([
            'status' => 'required|string|max:255',
        ]);

        // Update status arsip
        $arsip->status = $validatedData['status'];
        $arsip->save();

        // Kirimkan response sukses dengan data arsip yang terupdate
        return response()->json(['message' => 'Status updated successfully', 'data' => $arsip]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $arsip = Arsip::find($id);

        if (!$arsip) {
            return response()->json(['message' => 'Arsip not founds'], 404);
        }

        $arsip->delete();

        return response()->json(['message' => 'Arsip deleted successfully']);
    }

    public function showImportForm()
    {
        return view('import');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);

        Excel::import(new ArsipImport, $request->file('file'));

        return redirect()->back()->with('success', 'Data imported successfully.');
    }

    public function exportArsip(Request $request)
    {
        $filters = $request->all();

        // Nama file hasil export
        $fileName = 'arsip.xlsx';

        // Melakukan ekspor data dengan filter
        return Excel::download(new ArsipExport($filters), $fileName);
    }




    public function getArsipByBidang()
    {
        return response()->json(['message' => 'Route works']);
    }


    public function getArsipByYearAndBidang()
{
    $arsipData = Arsip::select(DB::raw('tahun, bidang, COUNT(id) as total_arsip'))
        ->groupBy('tahun', 'bidang')
        ->get();

    return response()->json($arsipData);
}









}
