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
            'date_range' => 'required|string',
            'reason' => 'required|string'
        ]);

        $leave = Leave::create([
            'employee_id' => $request->employee_id,
            'leave_type' => $request->leave_type,
            'date_range' => $request->date_range,
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