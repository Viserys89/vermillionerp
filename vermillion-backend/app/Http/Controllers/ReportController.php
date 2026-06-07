<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
    public function index()
    {
        return response()->json(
            Report::orderBy('created_at', 'desc')->get()
        );
    }

public function store(Request $request)
{
    $request->validate([
        'name' => 'required',
        'report_date' => 'required',
        'type' => 'required',
        'file' => 'required|file'
    ]);

    $path = $request->file('file')->store('reports', 'public');

    Report::create([
        'name' => $request->name,
        'report_date' => $request->report_date,
        'type' => $request->type,
        'file_path' => $path,
    ]);

    return response()->json([
        'message' => 'Laporan berhasil disimpan'
    ]);
}

   public function destroy($id)
{
    $report = Report::findOrFail($id);
    
    // Hapus file dari storage
    if (Storage::disk('public')->exists($report->file_path)) {
        Storage::disk('public')->delete($report->file_path);
    }

    $report->delete();

    return response()->json(['message' => 'Laporan berhasil dihapus']);
}
}