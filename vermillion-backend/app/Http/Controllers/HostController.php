<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\HostReport;
use App\Models\HostProfile;
use App\Models\ReportEvidence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HostController extends Controller
{
    public function getDashboard($user_id)
    {
        $user = User::with(['hostProfile', 'complaints', 'leaves'])->find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Pastikan profile ada, jika tidak ada buat default
        $profile = $user->hostProfile ?: HostProfile::firstOrCreate(['user_id' => $user->id], ['team' => '-', 'total_diamonds' => 0]);

        $total_diamonds = $profile->total_diamonds;
        $team = $profile->team;
        
        $tier = 'Bronze';
        if ($total_diamonds > 450000) {
            $tier = 'Platinum';
        } elseif ($total_diamonds > 200000) {
            $tier = 'Gold';
        } elseif ($total_diamonds > 50000) {
            $tier = 'Silver';
        }

        $pengaduan_count = $user->complaints->count();
        $request_count = $user->leaves->count();

        return response()->json([
            'team' => $team,
            'total_diamonds' => $total_diamonds,
            'tier' => $tier,
            'pengaduan_count' => $pengaduan_count,
            'request_count' => $request_count,
        ]);
    }

    public function getReports($user_id)
    {
        $reports = HostReport::with('evidences')->where('host_id', $user_id)->orderBy('created_at', 'desc')->get();
        return response()->json($reports);
    }

    public function submitReport(Request $request, $user_id)
    {
        $request->validate([
            'report_date' => 'required|date',
            'shift_schedule' => 'required|string',
            'diamond_earned' => 'required|numeric',
            'images.*' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        DB::beginTransaction();
        try {
            $report = HostReport::create([
                'host_id' => $user_id,
                'report_date' => $request->report_date,
                'shift_schedule' => $request->shift_schedule,
                'diamond_earned' => $request->diamond_earned,
                'status' => 'Menunggu',
            ]);

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('evidences', 'public');
                    ReportEvidence::create([
                        'report_id' => $report->id,
                        'image_path' => $path,
                    ]);
                }
            }

            DB::commit();
            return response()->json(['message' => 'Laporan berhasil dikirim', 'data' => $report], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal mengirim laporan', 'error' => $e->getMessage()], 500);
        }
    }
}
