<?php

namespace App\Http\Controllers;

use App\Models\RaffleEvent;
use App\Models\RafflePrize;
use Illuminate\Http\Request;

class RaffleEventController extends Controller
{
    public function index()
    {
        $events = RaffleEvent::orderBy('created_at', 'desc')->get();
        return response()->json($events);
    }

    public function show($id)
    {
        $event = RaffleEvent::where('id', $id)->with(['participants','winners'])->first();
        return response()->json($event);
    }
    public function store(Request $request)
    {
        $raffle = RaffleEvent::create($request->all());
        for ($i = 0; $i < $request->quantity; $i++) {
            RafflePrize::create([
                'raffle_event_id' => $raffle->id,
                'name' => $request->name,
                'status' => 'available',
            ]);
        }
        return response()->json(['message' => 'Raffle event created successfully'], 200);
    }
}
