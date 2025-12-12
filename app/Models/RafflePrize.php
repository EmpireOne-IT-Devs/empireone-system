<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    public function winner(): HasOne
    {
        return $this->hasOne(RaffleParticipant::class, 'id', 'winner_id');
    }
}
