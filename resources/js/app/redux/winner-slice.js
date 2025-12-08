import { createSlice } from "@reduxjs/toolkit";

export const winnersSlice = createSlice({
    name: "winners",
    initialState: {
        winners: [],
        winner: {},
    },
    reducers: {
        setWinners: (state, action) => {
            state.winners = action.payload;
        },
        setWinner: (state, action) => {
            state.winner = action.payload;
        },
    },
});
export const { setWinners, setWinner } = winnersSlice.actions;

export default winnersSlice.reducer;
