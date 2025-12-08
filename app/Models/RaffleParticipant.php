<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RaffleParticipant extends Model
{
    protected $fillable = [
        'raffle_id',
        'attendee_name',
        'contact_number',
        'email',
        'qr_code_data',
        'is_winner',
        'scanned_at',
    ];

    protected $casts = [
        'is_winner' => 'boolean',
        'scanned_at' => 'datetime',
        'won_at' => 'datetime',
    ];
}
