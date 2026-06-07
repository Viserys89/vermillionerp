<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HostProfile extends Model
{
    use HasFactory;

    protected $table = 'host_profiles';

    protected $fillable = [
        'user_id',
        'team',
        'total_diamonds',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}