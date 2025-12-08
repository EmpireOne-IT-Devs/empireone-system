<?php

namespace App\Http\Controllers;

use App\Models\RaffleParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RaffleParticipantController extends Controller
{
    public function index()
    {
        $participants = RaffleParticipant::orderBy('created_at', 'desc')
            ->get();

        return response()->json($participants);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'attendee_name' => 'required|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'raffle_id' => 'nullable|exists:raffles,id'
        ]);

        $qrData = Str::uuid()->toString();

        RaffleParticipant::create([
            'raffle_id' => $validated['raffle_id'] ?? 1,
            'attendee_name' => $validated['attendee_name'],
            'contact_number' => $validated['contact_number'] ?? null,
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
