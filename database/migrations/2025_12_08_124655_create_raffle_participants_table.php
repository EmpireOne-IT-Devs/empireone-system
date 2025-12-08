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
        Schema::create('raffle_participants', function (Blueprint $table) {
            $table->id();
            $table->string('raffle_event_id')->nullable();
            $table->foreignId('raffle_id')->constrained()->onDelete('cascade');
            $table->string('attendee_name');
            $table->string('contact_number');
            $table->string('email')->unique();
            $table->string('qr_code_data')->unique();
            $table->boolean('is_winner')->default(false);
            $table->timestamp('scanned_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raffle_participants');
    }
};
