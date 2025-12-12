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
        prizes: [],
        prize:{}
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
        setPrizes: (state, action) => {
            state.prizes = action.payload;
        },
        setPrize: (state, action) => {
            state.prize = action.payload;
        }
    },
});
export const {
    setEvents,
    setEvent,
    setParticipants,
    setParticipant,
    setWinners,
    setWinner,
    setPrizes,
    setPrize
} = raffleSlice.actions;

export default raffleSlice.reducer;
