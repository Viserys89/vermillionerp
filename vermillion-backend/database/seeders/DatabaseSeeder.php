<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\HostProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User HR
        User::create([
            'name' => 'HR Manager',
            'email' => 'hr@vermillion.com',
            'password' => Hash::make('password'),
            'role' => 'hr',
            'status' => 'active',
        ]);

        // User Finance
        User::create([
            'name' => 'Finance Manager',
            'email' => 'finance@vermillion.com',
            'password' => Hash::make('password'),
            'role' => 'finance',
            'status' => 'active',
        ]);

        // User Host
        $host = User::create([
            'name' => 'Ghassan Ariq',
            'email' => 'host@vermillion.com',
            'password' => Hash::make('password'),
            'role' => 'host',
            'status' => 'active',
        ]);

        // Profil Host ghassan
        HostProfile::create([
            'user_id' => $host->id,
            'team' => 'Ventura',
            'total_diamonds' => 125000, // Silver tier
        ]);

        // User Host 2
        $host2 = User::create([
            'name' => 'Mukhammad Vicky',
            'email' => 'vicky@vermillion.com',
            'password' => Hash::make('password'),
            'role' => 'host',
            'status' => 'active',
        ]);

        HostProfile::create([
            'user_id' => $host2->id,
            'team' => 'Provic',
            'total_diamonds' => 500000, // Platinum tier
        ]);
    }
}
