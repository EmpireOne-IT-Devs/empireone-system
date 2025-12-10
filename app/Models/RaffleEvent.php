<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RaffleEvent extends Model
{
    protected $fillable = [
        'name',
        'description',
        'start_at',
        'end_at',
    ];
}
