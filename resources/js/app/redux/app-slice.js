import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        user: {},
        openMobile: false,
        isMobile: false,
        state: 'expanded',
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setOpenMobile: (state, action) => {
            state.openMobile = !state.openMobile;
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        setState: (state, action) => {
            state.state = action.payload;
        }
    },
});
export const { setUser, setOpenMobile, setIsMobile, setState } = appSlice.actions;

export default appSlice.reducer;
