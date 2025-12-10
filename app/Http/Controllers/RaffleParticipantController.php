<?php

namespace App\Http\Controllers;

use App\Models\RaffleParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RaffleParticipantController extends Controller
{
    public function index(Request $request)
    {
        $participants = RaffleParticipant::orderBy('created_at', 'desc')
            ->where('is_winner', 0)
            ->where('raffle_event_id', $request->query('raffle_event_id'))
            ->get();

        return response()->json($participants);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'raffle_event_id' => 'nullable|exists:raffle_events,id'
        ]);

        $qrData = Str::uuid()->toString();

        RaffleParticipant::create([
            'raffle_event_id' => $validated['raffle_event_id'] ?? 1,
            'name' => $validated['name'],
            'contact' => $validated['contact'] ?? null,
            'email' => $validated['email'] ?? null,
            'qr_code_data' => $qrData,
            'scanned_at' => now(),
            'is_winner' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Participant registered successfully',
        ], 200);
    }
}
