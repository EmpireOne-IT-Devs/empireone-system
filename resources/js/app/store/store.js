import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../redux/app-slice';
import participantsSlice from '../redux/participants-slice';
import winnersSlice from '../redux/winner-slice';
const store = configureStore({
    reducer: {
        app: appSlice,
        participants: participantsSlice,
        winners: winnersSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
