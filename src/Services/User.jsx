import {BASEURL} from "../Utils/Common";
import axios from 'axios'; // Axios'u içe aktarın

const url = BASEURL + "/users/";

export const getUserInfo = (id) => {
   return axios.get(url + id)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
} 

export const getUserImage = (email) => {
    return axios.get(BASEURL +"/admin" +"/photo/"+ email)
     .then(response => {
         return response.data;
     })
     .catch(error => {
         console.error('Error:', error);
     });
 } 
 

 export const getAllUsers = () => {
    return axios.get(url +"admin_users/")
     .then(response => {
         return response.data;
     })
     .catch(error => {
         console.error('Error:', error);
     });
 } 

 export const addUser = (userInfo) => {
     return axios.post(url, userInfo)
        .then(response => {
            return response.data;
        }) 
        .catch(error => {
            console.error('Error:', error);        
        });
    }


    export const getAllPrograms = (id) => {
        return axios.get(BASEURL +"/program/admin_users_with_program/" + id)
         .then(response => {
             return response.data;
         })
         .catch(error => {
             console.error('Error:', error);
         });
     } 
