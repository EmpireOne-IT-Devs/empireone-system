<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RaffleWinner extends Model
{
    protected $fillable = [
        'raffle_event_id',
        'winner_id',
        'drawn_at',
        'prize_id'
    ];

    protected $casts = [
        'drawn_at' => 'datetime',
    ];
    public function raffle()
    {
        return $this->belongsTo(RaffleEvent::class);
    }

    public function participant()
    {
        return $this->belongsTo(RaffleParticipant::class, 'winner_id');
    }
}
