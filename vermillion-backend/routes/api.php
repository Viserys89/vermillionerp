<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\FacilityRequestController;



Route::get('/employees', [EmployeeController::class, 'index']); // Baca Data
Route::post('/employees', [EmployeeController::class, 'store']); // Tambah Data
Route::put('/employees/{id}', [EmployeeController::class, 'update']); // Edit Data
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']); // Hapus Data
// API Izin & Cuti
Route::get('/leaves', [LeaveController::class, 'index']); // Dipakai HR
Route::post('/leaves', [LeaveController::class, 'store']); // Dipakai Host/Karyawan
Route::put('/leaves/{id}/status', [LeaveController::class, 'updateStatus']); // Dipakai HR
Route::post('/login', [AuthController::class, 'login']);



//api pengaduan
Route::get('/complaints', [ComplaintController::class, 'index']);
Route::post('/complaints', [ComplaintController::class, 'store']);
Route::put('/complaints/{id}', [ComplaintController::class, 'update']);
Route::delete('/complaints/{id}', [ComplaintController::class, 'destroy']);




//api fasilitas
Route::apiResource(
    'facilities',
    FacilityController::class
);

Route::apiResource(
    'facility-requests',
    FacilityRequestController::class
);

Route::put(
    'facility-requests/{id}/approve',
    [FacilityRequestController::class, 'approve']
);

Route::put(
    'facility-requests/{id}/reject',
    [FacilityRequestController::class, 'reject']
);

Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return response()->json($request->user());
});