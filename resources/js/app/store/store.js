import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../redux/app-slice';
import raffleSlice from '../redux/raffle-slice';
const store = configureStore({
    reducer: {
        app: appSlice,
        raffles: raffleSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
