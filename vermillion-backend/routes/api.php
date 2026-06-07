<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\FacilityRequestController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\HostController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\ReportController;


// API LOGIN

Route::post('/login', [
    AuthController::class,
    'login'
]);


// API KARYAWAN


Route::get('/employees', [
    EmployeeController::class,
    'index'
]);

Route::post('/employees', [
    EmployeeController::class,
    'store'
]);

Route::put('/employees/{id}', [
    EmployeeController::class,
    'update'
]);

Route::delete('/employees/{id}', [
    EmployeeController::class,
    'destroy'
]);


// API IZIN & CUTI


Route::get('/leaves', [
    LeaveController::class,
    'index'
]);

Route::post('/leaves', [
    LeaveController::class,
    'store'
]);

Route::put('/leaves/{id}/status', [
    LeaveController::class,
    'updateStatus'
]);


// API PENGADUAN


Route::get('/complaints', [
    ComplaintController::class,
    'index'
]);

Route::post('/complaints', [
    ComplaintController::class,
    'store'
]);

Route::put('/complaints/{id}', [
    ComplaintController::class,
    'update'
]);

Route::delete('/complaints/{id}', [
    ComplaintController::class,
    'destroy'
]);


// API FASILITAS


Route::apiResource(
    'facilities',
    FacilityController::class
);


// API REQUEST FASILITAS

Route::apiResource(
    'facility-requests',
    FacilityRequestController::class
);

Route::put(
    '/facility-requests/{id}/approve',
    [FacilityRequestController::class, 'approve']
);

Route::put(
    '/facility-requests/{id}/reject',
    [FacilityRequestController::class, 'reject']
);

Route::get(
    '/facility-requests/user/{id}',
    [FacilityRequestController::class, 'getByUser']
);


// API LAPORAN


Route::get('/reports', [
    ReportController::class,
    'index'
]);

Route::post('/reports', [
    ReportController::class,
    'store'
]);

Route::delete('/reports/{id}', [
    ReportController::class,
    'destroy'
]);


// API HOST


Route::get(
    '/host/{user_id}/dashboard',
    [HostController::class, 'getDashboard']
);

Route::get(
    '/host/{user_id}/reports',
    [HostController::class, 'getReports']
);

Route::post(
    '/host/{user_id}/reports',
    [HostController::class, 'submitReport']
);


// API FINANCE


Route::get(
    '/finance/dashboard',
    [FinanceController::class, 'getDashboard']
);

Route::put(
    '/finance/reports/{id}/status',
    [FinanceController::class, 'updateReportStatus']
);

Route::get(
    '/finance/income',
    [FinanceController::class, 'getIncomes']
);


// API PROFILE


Route::middleware('auth:sanctum')->get(
    '/profile',
    function (Request $request) {
        return response()->json(
            $request->user()
        );
    }
);