import { createSlice } from "@reduxjs/toolkit";

export const participantsSlice = createSlice({
    name: "participants",
    initialState: {
        participants: [],
        participant: {},
    },
    reducers: {
        setParticipants: (state, action) => {
            state.participants = action.payload;
        },
        setParticipant: (state, action) => {
            state.participant = action.payload;
        },
    },
});
export const { setParticipants, setParticipant } = participantsSlice.actions;

export default participantsSlice.reducer;
