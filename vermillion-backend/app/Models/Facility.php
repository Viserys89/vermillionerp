<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    protected $table = 'facilities';
    public $timestamps = false;
    protected $fillable = [
        'facility_name',
        'facility_type',
        'quantity',
        'available_quantity',
        'description',
        'status'
    ];

    public function requests()
    {
        return $this->hasMany(FacilityRequest::class, 'facility_id');
        
    }
}