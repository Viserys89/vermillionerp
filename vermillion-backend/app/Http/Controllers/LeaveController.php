<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    // 1. [HR] Melihat semua pengajuan izin
    public function index()
    {
        // Mengambil data izin sekaligus data user-nya, urut dari yang paling baru
        $leaves = Leave::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($leaves);
    }

    // 2. [HOST/KARYAWAN] Mengajukan izin baru
    public function store(Request $request)
    {
        try {
            $request->validate([
                'employee_id' => 'required',
                'leave_type' => 'required|in:Cuti,Izin',
                'date_range' => 'required|string',
                'reason' => 'required|string'
            ]);

            // Logika memecah string "20 Juli - 20 Agustus"
            // Kita ambil bagian sebelum " - " dan setelah " - "
            $dates = explode(' - ', $request->date_range);
            $startDate = $dates[0] ?? null;
            $endDate = $dates[1] ?? null;

            $leave = Leave::create([
                'employee_id' => $request->employee_id,
                'leave_type' => $request->leave_type,
                'date_range' => $request->date_range,
                'start_date' => $startDate, // Menambah data ke kolom yang diminta database
                'end_date' => $endDate,     // Menambah data ke kolom yang diminta database
                'reason' => $request->reason,
                'status' => 'Pending'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pengajuan berhasil dikirim.',
                'data' => $leave
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // 3. [HR] Mengubah status izin (Approve/Reject)
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Approved,Rejected,Pending'
        ]);

        $leave = Leave::findOrFail($id);
        $leave->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Status pengajuan berhasil diperbarui.',
            'data' => $leave
        ]);
    }
}
