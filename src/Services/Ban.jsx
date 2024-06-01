import {BASEURL} from "../Utils/Common";
const axios = require('axios');

const url = BASEURL + "/ban/";

export const banUser = (id) => {
    axios.post(url + id, data)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
} 

export const unbanUser = (id) => {
    axios.post(url + id + "/unban", data)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
} 