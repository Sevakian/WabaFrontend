import axios from 'axios';

export default {
    apiUrl(){
        return 'http://localhost:5000';
    },
    getTodos(){
        return new Promise((resolve, reject) => {
            axios({
                url: 'http://localhost:5000/api/todos/todo/',
                method: 'get',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
        })  
    },

    getVerwendungen(){
        return new Promise((resolve, reject) => {
            axios({
                url: 'http://localhost:5000/api/todos/verwendung/',
                method: 'get',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
        })  
    },

    addTodo(toTitle, toText, toVerwendung, toPrio, toStatus){
        let urlTemp = 'http://localhost:5000/api/todos/todo/add/'  + toTitle + '/' 
        + toText + '/' + toVerwendung + '/' 
        + toPrio + '/' + toStatus + '/' 

        return new Promise((resolve, reject) => {
            axios({
                url: urlTemp,
                method: 'post',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
        })  

    },

    updateTodo(toId, toTitle, toText, toVerwendung, toPrio, toStatus){
        let urlTemp = 'http://localhost:5000/api/todos/todo/' + toId + '/update/' + toTitle + '/' + toText + '/' + toVerwendung + '/' + toPrio + '/' + toStatus + '/'

        return new Promise((resolve, reject) => {
            axios({
                url: urlTemp,
                method: 'put',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                console.log(response)
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error)
                reject(error);
            })
        })  
    },

}

