import axios from 'axios';

export function create_event_service(data) {
    try {
        const result = axios.post('/api/events', data);
        return result;
    } catch (error) {
        return error;
    }
}

export function get_events_service() {
    try {
        const result = axios.get('/api/events');
        return result;
    } catch (error) {
        return error;
    }
}

export function get_events_by_id_service() {
    try {
        const result = axios.get(
            '/api/events/' + window.location.pathname.split('/')[4],
        );
        return result;
    } catch (error) {
        return error;
    }
}
