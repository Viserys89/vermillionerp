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
    Schema::create('facility_requests', function (Blueprint $table) {
        $table->id();

        $table->foreignId('user_id')
            ->constrained('users');

        $table->foreignId('facility_id')
            ->constrained('facilities');

        $table->date('request_date');

        $table->dateTime('start_datetime');

        $table->dateTime('end_datetime');

        $table->text('purpose');

        $table->enum('status', [
            'Pending',
            'Approved',
            'Rejected',
            'Completed',
            'Cancelled'
        ])->default('Pending');

        $table->foreignId('approved_by')
            ->nullable()
            ->constrained('users');

        $table->text('notes')->nullable();

        $table->timestamp('created_at')->useCurrent();
    });
}
};
