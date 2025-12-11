<?php

namespace App\Http\Controllers;

use App\Models\RaffleParticipant;
use App\Models\RaffleWinner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RaffleWinnerController extends Controller
{
    public function index(Request $request)
    {
        $winners = RaffleWinner::where('raffle_event_id', $request->query('raffle_event_id'))
            ->with(['participant'])->get();

        return response()->json($winners);
    }

    /**
     * Record a new winner
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'participant_id' => 'required|exists:raffle_participants,id',
            'name' => 'nullable|string|max:255',
            'raffle_event_id' => 'nullable|exists:raffle_events,id'
        ]);

        $participant = RaffleParticipant::findOrFail($validated['participant_id']);

        // Check if participant is already a winner
        if ($participant->is_winner) {
            return response()->json([
                'success' => false,
                'message' => 'Participant has already won'
            ], 422);
        }

        try {
            $participant->update(['is_winner' => true]);
            $winner = RaffleWinner::create([
                'raffle_event_id' => $validated['raffle_event_id'],
                'winner_id' => $validated['participant_id'],
                'drawn_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Winner recorded successfully',
                'winner' => $winner->load(['participant', 'raffle'])
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to record winner: ' . $e->getMessage()
            ], 500);
        }
    }
}
