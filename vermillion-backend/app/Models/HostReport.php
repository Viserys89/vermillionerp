<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HostReport extends Model
{
    use HasFactory;

    protected $table = 'host_reports';

    protected $fillable = [
        'host_id',
        'shift_schedule',
        'diamond_earned',
        'report_date',
        'status',
    ];

    public function host()
    {
        return $this->belongsTo(User::class, 'host_id');
    }

    public function evidences()
    {
        return $this->hasMany(ReportEvidence::class, 'report_id');
    }
}