<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Facility;
use App\Models\User;
class FacilityRequest extends Model
{
    protected $table = 'facility_requests';
    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'facility_id',
        'request_date',
        'start_datetime',
        'end_datetime',
        'purpose',
        'status',
        'approved_by',
        'notes'
    ];

    public function facility()
    {
        return $this->belongsTo(Facility::class, 'facility_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}