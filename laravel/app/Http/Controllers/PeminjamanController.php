<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peminjaman;
use App\Models\Keuangan;
use App\Models\TataUsaha;

class PeminjamanController extends Controller
{
    // Menampilkan daftar peminjaman
    public function index()
    {
        $peminjaman = Peminjaman::with('arsip')->get();
        return view('peminjaman.index', compact('peminjaman'));
    }

    // Menampilkan formulir untuk membuat peminjaman baru
    public function create()
    {
        $keuangan = Keuangan::all();
        $tataUsaha = TataUsaha::all();
        return view('peminjaman.create', compact('keuangan', 'tataUsaha'));
    }

    // Menyimpan peminjaman baru ke database
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string',
            'nomor_telepon' => 'required|string',
            'email' => 'required|email',
            'arsip_id' => 'required|integer',
            'arsip_type' => 'required|string',
            'tanggal_peminjaman' => 'required|date',
            'tanggal_pengembalian' => 'nullable|date',
            'status' => 'required|string',
            'keterangan' => 'nullable|string',
        ]);

        Peminjaman::create($validatedData);

        return redirect()->route('peminjaman.index')->with('success', 'Peminjaman berhasil ditambahkan.');
    }

    // Menampilkan formulir untuk mengedit peminjaman
    public function edit(Peminjaman $peminjaman)
    {
        $keuangan = Keuangan::all();
        $tataUsaha = TataUsaha::all();
        return view('peminjaman.edit', compact('peminjaman', 'keuangan', 'tataUsaha'));
    }

    // Memperbarui peminjaman di database
    public function update(Request $request, Peminjaman $peminjaman)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string',
            'nomor_telepon' => 'required|string',
            'email' => 'required|email',
            'arsip_id' => 'required|integer',
            'arsip_type' => 'required|string',
            'tanggal_peminjaman' => 'required|date',
            'tanggal_pengembalian' => 'nullable|date',
            'status' => 'required|string',
            'keterangan' => 'nullable|string',
        ]);

        $peminjaman->update($validatedData);

        return redirect()->route('peminjaman.index')->with('success', 'Peminjaman berhasil diperbarui.');
    }

    // Menghapus peminjaman dari database
    public function destroy(Peminjaman $peminjaman)
    {
        $peminjaman->delete();
        return redirect()->route('peminjaman.index')->with('success', 'Peminjaman berhasil dihapus.');
    }
}
