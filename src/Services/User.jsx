import {BASEURL} from "../Utils/Common";
const axios = require('axios');

const url = BASEURL + "/users/";

export const getUserInfo = (id) => {
    axios.get(url + id)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
} 

