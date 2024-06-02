import {BASEURL} from "../Utils/Common";
import axios from 'axios'; // Axios'u içe aktarın

const url = BASEURL + "/notifications/";


export const sendNotifications = (id, message) => {
    return axios.post(url + id, {message})
       .then(response => {
           return response.data;
       }) 
       .catch(error => {
           console.error('Error:', error);        
       });
   }
