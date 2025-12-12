import axios from "axios";

export function create_prize_service(data) {
    try {
        const result = axios.post("/api/prizes", data);
        return result;
    } catch (error) {
        return error;
    }
}

export function get_prizes_service() {
    try {
        const result = axios.get("/api/prizes?raffle_event_id=" + window.location.pathname.split('/')[4]);
        return result;
    } catch (error) {
        return error;
    }
}
