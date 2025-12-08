import { get_participants_service } from "../services/participants-service";
import { participantsSlice } from "./participants-slice";

export function get_participants_thunk() {
    return async function (dispatch, getState) {
        const res = await get_participants_service();
        dispatch(participantsSlice.actions.setParticipants(res.data));
    };
}
