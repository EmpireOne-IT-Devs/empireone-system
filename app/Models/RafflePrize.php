<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RafflePrize extends Model
{
    protected $fillable = [
        'raffle_event_id',
        'winner_id',
        'name',
        'url',
        'status',
        'chances',
    ];
}
