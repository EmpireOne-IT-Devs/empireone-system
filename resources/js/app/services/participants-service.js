import axios from "axios";

export function create_participant_service(data) {
    try {
        const result = axios.post("/api/participants", data);
        return result;
    } catch (error) {
        return error;
    }
}

export function get_participants_service() {
    try {
        const result = axios.get("/api/participants?raffle_event_id=" + window.location.pathname.split('/')[4]);
        return result;
    } catch (error) {
        return error;
    }
}
