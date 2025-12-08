<?php

namespace App\Http\Controllers;

use App\Models\RaffleParticipant;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class RaffleController extends Controller
{
    protected $fillable = [
        'raffle_name',
        'description',
        'status',
        'start_date',
        'end_date'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];
}
