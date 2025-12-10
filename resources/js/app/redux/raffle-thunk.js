import { get_events_service } from '../services/events-service';
import { get_participants_service } from '../services/participants-service';
import { get_winners_service } from '../services/winners-service';
import { raffleSlice } from './raffle-slice';
export function get_events_thunk() {
    return async function (dispatch, getState) {
        const res = await get_events_service();
        dispatch(raffleSlice.actions.setEvents(res.data));
    };
}

export function get_participants_thunk() {
    return async function (dispatch, getState) {
        const res = await get_participants_service();
        dispatch(raffleSlice.actions.setParticipants(res.data));
    };
}

export function get_winners_thunk() {
    return async function (dispatch, getState) {
        const res = await get_winners_service();
        dispatch(raffleSlice.actions.setWinners(res.data));
    };
}
