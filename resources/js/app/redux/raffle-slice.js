import { createSlice } from '@reduxjs/toolkit';

export const raffleSlice = createSlice({
    name: 'raffle',
    initialState: {
        events: [],
        event: {},
        participants: [],
        participant: {},
        winners: [],
        winner: {},
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
        },
        setEvent: (state, action) => {
            state.event = action.payload;
        },
        setParticipants: (state, action) => {
            state.participants = action.payload;
        },
        setParticipant: (state, action) => {
            state.participant = action.payload;
        },
        setWinners: (state, action) => {
            state.winners = action.payload;
        },
        setWinner: (state, action) => {
            state.winner = action.payload;
        },
    },
});
export const {
    setEvents,
    setEvent,
    setParticipants,
    setParticipant,
    setWinners,
    setWinner,
} = raffleSlice.actions;

export default raffleSlice.reducer;
