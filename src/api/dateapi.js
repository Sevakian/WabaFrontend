import axios from 'axios';

export default {
    apiUrl(){
        return 'http://localhost:5000';
    },

    getAllDates(){
    return new Promise((resolve, reject) => {

        axios({
            url: 'http://localhost:5000/api/date',
            method: 'get'
        })
        .then((response) => {    
            // console.log(response);
            resolve(response.data);
        })
        .catch((error) => {
            // console.log(error);
            reject(error);
        })
        
    })},


    
    saveDate(toDate){
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:5000/api/date/' + toDate,
            method: 'post',
            headers:  {'Content-Type': 'application/json'},
        })
        .then((response) => {
            console.log("Console log save Date api frontend");
            console.log(response);
            resolve(response);
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        })
    })},
}