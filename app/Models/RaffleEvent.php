<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RaffleEvent extends Model
{
    protected $fillable = [
        'name',
        'description',
        'start_at',
        'end_at',
    ];

    public function participants(): HasMany
    {
        return $this->hasMany(RaffleParticipant::class);
    }
    public function winners(): HasMany
    {
        return $this->hasMany(RaffleWinner::class);
    }
    public function prizes(): HasMany
    {
        return $this->hasMany(RafflePrize::class);
    }
}
