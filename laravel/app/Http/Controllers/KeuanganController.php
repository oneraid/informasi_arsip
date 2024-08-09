<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Keuangan;
use Illuminate\Support\Facades\Validator;


class KeuanganController extends Controller
{
    public function index()
    {
        // Retrieve all records from the 'keuangan' table
        $arsips = Keuangan::all();

        return response()->json($arsips);
    }

    public function show($id)
    {
        // Find a record by its ID
        $arsip = Keuangan::findOrFail($id);

        return response()->json($arsip);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'no_rak' => 'required|string|max:255',
            'no_box' => 'required|string|max:255',
            'jenis_arsip' => 'required|string|max:255',
            'no_arsip' => 'required|string|max:255',
            'bulan' => 'required|string|max:255',
            'tahun' => 'required|string|max:255',
            'warna' => 'required|string|max:255',
            'jumlah_folder' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        // Create a new record in the 'keuangan' table
        $arsip = new Keuangan();
        $arsip->no_rak = $request->input('no_rak');
        $arsip->no_box = $request->input('no_box');
        $arsip->jenis_arsip = $request->input('jenis_arsip');
        $arsip->no_arsip = $request->input('no_arsip');
        $arsip->bulan = $request->input('bulan');
        $arsip->tahun = $request->input('tahun');
        $arsip->warna = $request->input('warna');
        $arsip->jumlah_folder = $request->input('jumlah_folder');
        $arsip->status = $request->input('status');
        $arsip->save();

        return response()->json([
            'message' => 'Arsip created successfully',
            'data' => $arsip
        ], 201);
    }

    public function update(Request $request, int $id)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'no_rak' => 'sometimes|string|max:255',
            'no_box' => 'sometimes|string|max:255',
            'jenis_arsip' => 'sometimes|string|max:255',
            'no_arsip' => 'sometimes|string|max:255',
            'bulan' => 'sometimes|string|max:255',
            'tahun' => 'sometimes|string|max:255',
            'warna' => 'sometimes|string|max:255',
            'jumlah_folder' => 'sometimes|string|max:255',
            'status' => 'sometimes|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        // Find the record by its ID
        $arsip = Keuangan::find($id);

        if ($arsip) {
            // Update only the fields that are present in the request
            $arsip->update($request->only([
                'no_rak',
                'no_box',
                'jenis_arsip',
                'no_arsip',
                'bulan',
                'tahun',
                'warna',
                'jumlah_folder',
                'status',
            ]));

            return response()->json([
                'status' => 200,
                'message' => 'Arsip updated successfully',
                'data' => $arsip
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No such Arsip found!'
            ], 404);
        }
    }


    public function destroy($id)
    {
        // Find the record by its ID and delete it
        $arsip = Keuangan::findOrFail($id);
        $arsip->delete();

        return response()->json([
            'message' => 'Arsip deleted successfully'
        ], 200);
    }
}
