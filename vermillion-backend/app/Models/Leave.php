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
        'reason', 
        'status'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
}