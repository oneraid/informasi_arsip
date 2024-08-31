<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use App\Models\Arsip;
use Illuminate\Http\Request;

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
}
