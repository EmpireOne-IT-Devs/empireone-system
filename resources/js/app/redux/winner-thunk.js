
import { get_winners_service } from "../services/winners-service";

import { winnersSlice } from "./winner-slice";

export function get_winners_thunk() {
    return async function (dispatch, getState) {
        const res = await get_winners_service();
        dispatch(winnersSlice.actions.setWinners(res.data));
    };
}
