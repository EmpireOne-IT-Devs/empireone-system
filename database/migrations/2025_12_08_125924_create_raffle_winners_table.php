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
        Schema::create('raffle_winners', function (Blueprint $table) {
            $table->id();
            $table->string('raffle_event_id')->nullable();
            $table->foreignId('raffle_id')->nullable()->constrained('raffles')->onDelete('cascade');
            $table->foreignId('winner_id')->constrained('raffle_participants')->onDelete('cascade');
            $table->string('prize_name')->nullable();
            $table->timestamp('drawn_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raffle_winners');
    }
};
