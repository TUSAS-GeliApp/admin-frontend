import {BASEURL} from "../Utils/Common";
import axios from 'axios'; // Axios'u içe aktarın

const url = BASEURL + "/program/";


export const getAllProgramsInfo = () => {
    return axios.get(url +"admin_program")
     .then(response => {
         return response.data;
     })
     .catch(error => {
         console.error('Error:', error);
     });
 } 
 
 export const activeProgram = (id) => {
    return axios.post(url + id+ "/active" ,{})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

export const deactiveProgram = (id) => {
    return axios.patch(url + id + "/deactive", {})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

export const deleteUserFromProgram = (userId, programId) => {
    console.log("userid: " + userId,"program_id:"+programId )
    return axios.delete(url + programId + "/user", 
    {headers: {
      'Content-Type': 'application/json'
    },
    data: {user_id: userId}})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

export const getProgram = (id) => {
    return axios.get(url +"admin_program/" +id)
     .then(response => {
         return response.data;
     })
     .catch(error => {
         console.error('Error:', error);
     });
 } 

 export const getRegisteredUsers = (id) => {
    return axios.get(url +"all_program_user_admin/"+id)
     .then(response => {
         return response.data;
     })
     .catch(error => {
         console.error('Error:', error);
     });
 } 
