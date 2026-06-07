<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\HostController;
use App\Http\Controllers\FinanceController;
use App\Models\User;

Route::get('/employees', [EmployeeController::class, 'index']); // Baca Data
Route::post('/employees', [EmployeeController::class, 'store']); // Tambah Data
Route::put('/employees/{id}', [EmployeeController::class, 'update']); // Edit Data
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']); // Hapus Data

// API Izin & Cuti
Route::get('/leaves', [LeaveController::class, 'index']); // Dipakai HR
Route::post('/leaves', [LeaveController::class, 'store']); // Dipakai Host/Karyawan
Route::put('/leaves/{id}/status', [LeaveController::class, 'updateStatus']); // Dipakai HR
Route::post('/login', [AuthController::class, 'login']);

// API ARSIP LAPORAN
Route::get('/reports', [ReportController::class, 'index']);
Route::post('/reports', [ReportController::class, 'store']);
Route::delete('/reports/{id}', [ReportController::class, 'destroy']);

// API Host
Route::get('/host/{user_id}/dashboard', [HostController::class, 'getDashboard']);
Route::get('/host/{user_id}/reports', [HostController::class, 'getReports']);
Route::post('/host/{user_id}/reports', [HostController::class, 'submitReport']);

// API Finance
Route::get('/finance/dashboard', [FinanceController::class, 'getDashboard']);
Route::put('/finance/reports/{id}/status', [FinanceController::class, 'updateReportStatus']);
Route::get('/finance/income', [FinanceController::class, 'getIncomes']);
Route::get('/contacts', function () {
    // 1. Ambil semua user beserta relasinya ke host_profiles
    $users = User::with('hostProfile')->get();
    
    // 2. Format ulang datanya untuk frontend
    $contacts = $users->map(function ($user) {
        $teamName = null;
        
        // Cek jika role-nya Host, ambil dari hostProfile. Jika bukan, pakai nama role-nya.
        if (strtolower($user->role) === 'host') {
            $teamName = $user->hostProfile?->team ?? 'No Team'; 
        } else {
            $teamName = strtoupper($user->role); 
        }

        return [
            'id' => $user->id,
            'name' => $user->name,
            'phone' => $user->phone,
            'role' => $user->role,
            'team' => $teamName, 
        ];
    });
    
    return response()->json([
        'success' => true,
        'data' => $contacts
    ]);
});
