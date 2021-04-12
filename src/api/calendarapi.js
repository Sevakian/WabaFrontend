import axios from 'axios';

export default {
    apiUrl(){
        return 'http://localhost:5000';
    },
    getCalendarTables(){
        return new Promise((resolve, reject) => {

            axios({
                url: 'http://localhost:5000/api/calendar/tables',
                method: 'get',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                // console.log(response)
                resolve(response.data);
            })
            .catch((error) => {
                // console.log(error);
                reject(error);
            })
        })
    },

    setCalendarTable(newTable){
        return new Promise((resolve, reject) => {
            axios({
                url: 'http://localhost:5000/api/calendar/' + newTable,
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
            url: 'http://localhost:5000/api/calendar/' + inTable,
            method: 'get',
            headers:  {'Content-Type': 'application/json'},
        })
        .then((response) => {    
            // console.log(response.data.calendar);
            resolve(response.data);
        })
        .catch((error) => {
            // console.log(error);
            reject(error);
        })
        
    })},

    deleteDate(toTable, toId){
        return new Promise((resolve, reject) => {

            axios({
                url: 'http://localhost:5000/api/calendar/' + toTable + '/delete/' + toId,   
                method: 'delete',
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
        })
    },

    updateDate(toTable, toId, toTitle, toText, toVerwendung){
        // console.log(toTable, toId, toTitle, toText, toVerwendung)
        return new Promise((resolve, reject) => {

            axios({
                url: 'http://localhost:5000/api/calendar/' + toTable + '/update/' + toId + '/' + toTitle + '/' + toText + '/' + toVerwendung,   
                method: 'put',
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
        })
    },
    
    saveDate(toTable, toDate, toTitle, toTextarea, toVerwendung){
    return new Promise((resolve, reject) => {

        axios({
            url: 'http://localhost:5000/api/calendar/' + toTable + '/add/' + toDate + '/' +toTitle + '/' + toTextarea + '/' + toVerwendung,   
            method: 'post',
            // data: JSON.stringify({
            //     date: toDate,
            //     title: toTitle,
            //     text: toTextarea,
            //     verwendung: toVerwendung
            // }),
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

    getVerwendung(){
        return new Promise((resolve, reject) => {
            axios({
                url: 'http://localhost:5000/api/calendar/verwendung',
                method: 'get',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                // console.log("Console log save Date api frontend");
                // console.log(response);
                // console.log(response.data.calendar);
                resolve(response.data.calendar);
            })
            .catch((error) => {
                // console.log(error);
                reject(error);
            })
        })
    },
    
}