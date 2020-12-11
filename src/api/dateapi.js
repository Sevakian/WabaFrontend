import axios from 'axios';

export default {
    apiUrl(){
        return 'http://localhost:5000';
    },
    getDateTables(){
        return new Promise((resolve, reject) => {

            axios({
                url: 'http://localhost:5000/api/date/tables',
                method: 'get',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                // console.log(error);
                reject(error);
            })
        })
    },

    setDateTable(newTable){
        return new Promise((resolve, reject) => {
            axios({
                url: 'http://localhost:5000/api/date/' + newTable,
                method: 'post',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                // console.log("Console log save Date api frontend");
                // console.log(response);
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })},

    getAllDates(inTable){
    return new Promise((resolve, reject) => {

        axios({
            url: 'http://localhost:5000/api/date/' + inTable,
            method: 'get',
            // headers:  {'Content-Type': 'application/json'},
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


    
    saveDate(toTable, toDate){
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:5000/api/date/' + toTable + "/" + toDate,
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