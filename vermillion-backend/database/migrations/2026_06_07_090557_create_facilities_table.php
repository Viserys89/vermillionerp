<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('facilities', function (Blueprint $table) {
        $table->id();

        $table->string('facility_name', 150);

        $table->enum('facility_type', [
            'Studio',
            'PC',
            'Laptop',
            'Kamera',
            'Mikrofon',
            'Lighting',
            'Meeting Room',
            'Kendaraan',
            'Lainnya'
        ]);

        $table->integer('quantity')->default(1);

        $table->integer('available_quantity')->default(1);

        $table->text('description')->nullable();

        $table->enum('status', [
            'Tersedia',
            'Dipakai',
            'Maintenance',
            'Nonaktif'
        ])->default('Tersedia');

        $table->timestamp('created_at')->useCurrent();
    });
}
};
