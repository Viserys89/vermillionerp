<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Complaint;

class ComplaintController extends Controller
{
    public function index()
    {
        return Complaint::all();
    }

    public function store(Request $request)
    {
        $complaint = Complaint::create([
            'employee_id' => $request->employee_id,
            'report_date' => $request->report_date,
            'issue_title' => $request->issue_title,
            'issue_description' => $request->issue_description,
            'status' => 'Pending'
        ]);

        return response()->json($complaint, 201);
    }

    public function update(Request $request, $id)
    {
        $complaint = Complaint::findOrFail($id);

        $complaint->update($request->all());

        return response()->json([
            'message' => 'Complaint updated'
        ]);
    }

    public function destroy($id)
    {
        Complaint::destroy($id);

        return response()->json([
            'message' => 'Complaint deleted'
        ]);
    }
}