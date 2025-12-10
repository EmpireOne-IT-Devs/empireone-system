import axios from "axios";

export function create_winners_service(data) {
    try {
        const result = axios.post("/api/winners", data);
        return result;
    } catch (error) {
        return error;
    }
}

export function get_winners_service() {
    try {
        const result = axios.get(`/api/winners?raffle_event_id=${window.location.pathname.split('/')[4]}`);
        return result;
    } catch (error) {
        return error;
    }
}
