<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leaves', function (Blueprint $table) {
            // Drop date_range if it exists
            if (Schema::hasColumn('leaves', 'date_range')) {
                $table->dropColumn('date_range');
            }
            
            // Add start_date if it doesn't exist
            if (!Schema::hasColumn('leaves', 'start_date')) {
                $table->date('start_date')->after('leave_type');
            }
            
            // Add end_date if it doesn't exist
            if (!Schema::hasColumn('leaves', 'end_date')) {
                $table->date('end_date')->after('start_date');
            }
        });
    }

    public function down(): void
    {
        Schema::table('leaves', function (Blueprint $table) {
            if (Schema::hasColumn('leaves', 'start_date')) {
                $table->dropColumn('start_date');
            }
            if (Schema::hasColumn('leaves', 'end_date')) {
                $table->dropColumn('end_date');
            }
            if (!Schema::hasColumn('leaves', 'date_range')) {
                $table->string('date_range')->after('leave_type');
            }
        });
    }
};