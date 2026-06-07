<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    protected $table = 'leaves';

    protected $fillable = [
        'employee_id',
        'leave_type',
        'date_range',
        'start_date',
        'end_date',
        'reason',
        'status'
    ];

    // Relasi untuk mengambil data karyawan yang mengajukan
    public function user()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
    public $timestamps = false;
}
