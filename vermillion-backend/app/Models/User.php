<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    // Menyesuaikan dengan kolom di database vermillion_erp
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'dob',
        'address',
        'role',
        'status',
        'contract',
        'bank_account',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function hostProfile()
    {
        return $this->hasOne(HostProfile::class);
    }

    public function hostReports()
    {
        return $this->hasMany(HostReport::class, 'host_id');
    }

    public function complaints()
    {
        return $this->hasMany(Complaint::class, 'employee_id');
    }

    public function leaves()
    {
        return $this->hasMany(Leave::class, 'employee_id');
    }
}