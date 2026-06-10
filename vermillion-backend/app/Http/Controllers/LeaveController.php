<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    public function index()
    {
        $leaves = Leave::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($leaves);
    }

public function store(Request $request)
{
    try {

        $request->validate([
            'leave_type' => 'required|in:Cuti,Izin',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string'
        ]);

        $leave = Leave::create([
            'employee_id' => $request->employee_id,
            'leave_type' => $request->leave_type,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
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
            'line' => $e->getLine(),
            'file' => $e->getFile()
        ], 500);

    }
}

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