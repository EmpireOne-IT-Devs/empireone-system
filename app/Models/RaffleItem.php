<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RaffleItem extends Model
{
    protected $fillable = [
        'winner_id',
        'name',
        'url',
        'status',
        'chances',
    ];
}
