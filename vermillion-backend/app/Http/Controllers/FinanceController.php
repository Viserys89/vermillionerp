<?php

namespace App\Http\Controllers;

use App\Models\HostReport;
use App\Models\User;
use App\Models\HostProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FinanceController extends Controller
{
    public function getDashboard(Request $request)
    {
        $query = HostReport::with(['host.hostProfile', 'evidences']);

        // Filter berdasarkan tanggal
        if ($request->date) {
            $query->whereDate('report_date', $request->date);
        }

        // Filter berdasarkan shift
        if ($request->shift && $request->shift !== 'Pilih Shift') {
            $query->where('shift_schedule', $request->shift);
        }

        // Filter berdasarkan status
        if ($request->status && $request->status !== 'Pilih Status') {
            $query->where('status', $request->status);
        }

        // Filter berdasarkan nama host
        if ($request->search) {
            $query->whereHas('host', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }

        $reports = $query->orderBy('created_at', 'desc')->get();
        $total_diamonds = HostReport::where('status', 'Disetujui')->sum('diamond_earned');

        return response()->json([
            'total_diamonds' => (int) $total_diamonds,
            'reports' => $reports,
        ]);
    }

    public function updateReportStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Disetujui,Ditolak',
        ]);

        DB::beginTransaction();
        try {
            $report = HostReport::findOrFail($id);
            $old_status = $report->status;
            
            $report->status = $request->status;
            $report->save();

            if ($request->status === 'Disetujui' && $old_status !== 'Disetujui') {
                $profile = HostProfile::firstOrCreate(['user_id' => $report->host_id]);
                $profile->total_diamonds += $report->diamond_earned;
                $profile->save();
            } 
            elseif ($request->status !== 'Disetujui' && $old_status === 'Disetujui') {
                $profile = HostProfile::where('user_id', $report->host_id)->first();
                if ($profile) {
                    $profile->total_diamonds -= $report->diamond_earned;
                    $profile->save();
                }
            }

            DB::commit();
            return response()->json(['message' => 'Status laporan berhasil diubah']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Terjadi kesalahan', 'error' => $e->getMessage()], 500);
        }
    }

    public function getIncomes(Request $request)
    {
        $month = $request->month ?: Carbon::now()->month;
        $year = $request->year ?: Carbon::now()->year;

        $hosts = User::where('role', 'host')->get();
        $incomes = [];

        foreach ($hosts as $host) {
            // Hitung data berdasarkan periode (bulan & tahun) dari host_reports yang disetujui
            $reports = HostReport::where('host_id', $host->id)
                ->where('status', 'Disetujui')
                ->whereMonth('report_date', $month)
                ->whereYear('report_date', $year)
                ->get();

            $total_diamonds = $reports->sum('diamond_earned');
            $total_shifts = $reports->count();
            
            $profile = HostProfile::where('user_id', $host->id)->first();
            $team = $profile ? $profile->team : '-';
            
            // Kalkulasi: Gaji Pokok Rp 100.000 + (Rp 25.000 per 5.000 diamond)
            $basic_salary = 100000;
            $bonus = floor($total_diamonds / 5000) * 25000;
            $total_income = ($total_shifts > 0) ? ($basic_salary + $bonus) : 0;

            $incomes[] = [
                'id' => $host->id,
                'name' => $host->name,
                'team' => $team,
                'total_diamonds' => $total_diamonds,
                'total_shifts' => $total_shifts,
                'total_income' => $total_income,
                'period' => Carbon::create($year, $month)->format('F Y'),
            ];
        }

        // Filter search di level collection (atau bisa di query)
        if ($request->search) {
            $incomes = array_values(array_filter($incomes, function($item) use ($request) {
                return str_contains(strtolower($item['name']), strtolower($request['search'])) || 
                       str_contains(strtolower($item['team']), strtolower($request['search']));
            }));
        }

        return response()->json($incomes);
    }
}
