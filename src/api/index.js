import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
export const BACK_URL = "http://localhost:8080/";
// export const BACK_URL = "https://d635-2a02-2378-1042-2226-b805-90d9-6d16-8bd7.ngrok-free.app/";
export const apiEndpoint = (endpoint, token = true) => {
    let url = `${BACK_URL}hospital/${endpoint}`;
    const config = token ? {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('bearer_token')}`
        }
    } : {};
    return {
        fetch: () => axios.get(url, config),
        fetchById: id => axios.get(url + `/${id}`, config),
        post: newRecord => axios.post(url, newRecord, config),
        put: updatedRecord => axios.put(url, updatedRecord, config),
        delete: () => axios.delete(url, config),
        deleteById: id => axios.delete(url + `/${id}`, config),
    }
};
