import {BASEURL} from "../Utils/Common";
import axios from 'axios'; // Axios'u içe aktarın


const url = BASEURL + "/ban/";
export const banUser = (id) => {
    return axios.post(url + id, {})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

export const unbanUser = (id) => {
    return axios.patch(url + id + "/unban", {})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}
