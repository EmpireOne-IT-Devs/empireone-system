<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RaffleParticipant extends Model
{
    protected $fillable = [
        'raffle_event_id',
        'name',
        'employee_id',
        'account',
        'is_winner',
    ];

    protected $casts = [
        'is_winner' => 'boolean',
        'scanned_at' => 'datetime',
        'won_at' => 'datetime',
    ];
}
