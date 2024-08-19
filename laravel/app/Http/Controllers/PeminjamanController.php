<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use App\Models\Keuangan;
use App\Models\TataUsaha;
use Illuminate\Http\Request;

class PeminjamanController extends Controller
{
    /**
     * Menampilkan daftar semua peminjaman.
     */
    public function index()
    {
        $peminjaman = Peminjaman::with('arsip')->get(); // Mengambil semua data peminjaman beserta arsip terkait
        return view('peminjaman.index', compact('peminjaman'));
    }

    /**
     * Menyimpan peminjaman baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'arsip_id' => 'required',
            'jenis_arsip' => 'required|in:keuangan,tatausaha',
            'nama_peminjam' => 'required|string|max:255',
            'kontak_peminjam' => 'nullable|string|max:255',
            'tanggal_pinjam' => 'required|date',
        ]);

        Peminjaman::create([
            'arsip_id' => $request->arsip_id,
            'nama_peminjam' => $request->nama_peminjam,
            'kontak_peminjam' => $request->kontak_peminjam,
            'tanggal_pinjam' => $request->tanggal_pinjam,
            'status' => 'dipinjam',
        ]);

        // Update status arsip di tabel yang sesuai
        if ($request->jenis_arsip === 'keuangan') {
            $arsip = Keuangan::find($request->arsip_id);
        } else {
            $arsip = TataUsaha::find($request->arsip_id);
        }

        $arsip->status = 'dipinjam';
        $arsip->save();

        return redirect()->route('peminjaman.index')->with('success', 'Peminjaman berhasil ditambahkan.');
    }

    /**
     * Mengupdate status pengembalian arsip.
     */
    public function update(Request $request, $id)
    {
        $peminjaman = Peminjaman::findOrFail($id);

        $request->validate([
            'tanggal_kembali' => 'required|date',
        ]);

        $peminjaman->update([
            'tanggal_kembali' => $request->tanggal_kembali,
            'status' => 'dikembalikan',
        ]);

        // Update status arsip di tabel keuangan
        $arsip = Keuangan::find($peminjaman->arsip_id);
        $arsip->status = 'tersedia';
        $arsip->save();

        return redirect()->route('peminjaman.index')->with('success', 'Peminjaman berhasil diperbarui.');
    }

    /**
     * Menampilkan detail peminjaman.
     */
    public function show($id)
    {
        $peminjaman = Peminjaman::with('arsip')->findOrFail($id);
        return view('peminjaman.show', compact('peminjaman'));
    }

    public function destroy($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);

        // Kembalikan status arsip menjadi tersedia sebelum dihapus
        $arsip = Keuangan::find($peminjaman->arsip_id);
        $arsip->status = 'tersedia';
        $arsip->save();

        $peminjaman->delete();

        return redirect()->route('peminjaman.index')->with('success', 'Peminjaman berhasil dihapus.');
    }
}
