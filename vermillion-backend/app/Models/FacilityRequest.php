<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class FacilityRequest extends Model
{
    protected $table = 'facility_request';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'nama_barang',
        'link_toko',
        'deskripsi',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }
}