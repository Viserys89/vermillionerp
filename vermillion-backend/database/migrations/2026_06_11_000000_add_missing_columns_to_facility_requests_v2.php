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
        Schema::table('facility_requests', function (Blueprint $table) {
            // Add item request columns
            if (!Schema::hasColumn('facility_requests', 'nama_barang')) {
                $table->string('nama_barang')->nullable()->after('user_id');
            }
            if (!Schema::hasColumn('facility_requests', 'link_toko')) {
                $table->string('link_toko')->nullable()->after('nama_barang');
            }
            if (!Schema::hasColumn('facility_requests', 'deskripsi')) {
                $table->text('deskripsi')->nullable()->after('link_toko');
            }

            // Add timestamps
            if (!Schema::hasColumn('facility_requests', 'created_at')) {
                $table->timestamp('created_at')->nullable();
            }
            if (!Schema::hasColumn('facility_requests', 'updated_at')) {
                $table->timestamp('updated_at')->nullable();
            }

            // Update existing columns to nullable
            $table->foreignId('facility_id')->nullable()->change();
            $table->date('request_date')->nullable()->change();
            $table->dateTime('start_datetime')->nullable()->change();
            $table->dateTime('end_datetime')->nullable()->change();
            $table->text('purpose')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('facility_requests', function (Blueprint $table) {
            $table->dropColumn(['nama_barang', 'link_toko', 'deskripsi', 'updated_at']);
        });
    }
};
