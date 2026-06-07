<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leaves', function (Blueprint $table) {
            // Mengubah kolom yang sudah ada menjadi nullable
            $table->string('start_date')->nullable()->change();
            $table->string('end_date')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('leaves', function (Blueprint $table) {
            $table->string('start_date')->nullable(false)->change();
            $table->string('end_date')->nullable(false)->change();
        });
    }
};