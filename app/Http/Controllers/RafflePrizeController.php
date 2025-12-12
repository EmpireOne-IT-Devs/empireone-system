<?php

namespace App\Http\Controllers;

use App\Models\RafflePrize;
use Illuminate\Http\Request;

class RafflePrizeController extends Controller
{
    public function index(Request $request)
    {
        $winners = RafflePrize::where('raffle_event_id', $request->query('raffle_event_id'))->with(['winner'])->get();

        return response()->json($winners);
    }
}
