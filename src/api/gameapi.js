import axios from 'axios';

export default {
    apiUrl(){
        return 'http://localhost:5000';
    },

    addKonsole(toName, toBild, toHersteller, toErscheinung, toGeneration, toStatus, toTyp, toVerkauft, toText){

        return new Promise((resolve, reject) => {
            axios({
                url: 'http://localhost:5000/api/gaming/konsole/add/' + toName + '/' + toBild + '/' + toHersteller + '/' + toErscheinung + '/' + toGeneration + '/' + toStatus + '/' + toTyp + '/' + toVerkauft + '/' + toText,
                method: 'post',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })},

    updateKonsole(toId, toName, toBild, toHersteller, toErscheinung, toGeneration, toStatus, toTyp, toVerkauft, toText){
        return new Promise((resolve, reject) => {

        axios({
            url: 'http://localhost:5000/api/gaming/konsole/' + toId + '/update/'
                                                                    + toName + '/'
                                                                    + toBild + '/'
                                                                    + toHersteller + '/'
                                                                    + toErscheinung + '/'
                                                                    + toGeneration + '/'
                                                                    + toStatus + '/'
                                                                    + toTyp + '/'
                                                                    + toVerkauft + '/'
                                                                    + toText + '/',
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
        
    })},

    getKonsoles(){

        return new Promise((resolve, reject) => {
            axios({
                url: 'http://localhost:5000/api/gaming/konsole/get',
                method: 'get',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })},

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        // toGame.id,
        // toGame.name,
        // toGame.serie,
        // toGame.genre
        // toGame.jahr,
        // toGame.entwickler,
        // toGame.dimension,
        // toGame.bild,
        // toGame.status,
        // toGame.size,

        // toGame.selectedKonsoles

        addGame(toName, toSerie, toGenre, toJahr, toEntwickler, toDimension, toBild, toStatus, toSize, toVerkauft, toText, toSelectedKonsole){
           
            let urlTemp = 'http://localhost:5000/api/gaming/game/add/'  + toName + '/' + toSerie + '/' + toGenre + '/'
                                                                        + toJahr + '/' + toEntwickler + '/' 
                                                                        + toDimension + '/' + toBild + '/' 
                                                                        + toStatus + '/' + toSize + '/' 
                                                                        + toVerkauft + '/' + toText + '/'
                                                                        

            if(toSelectedKonsole.length != 0){
                for(let i = 0; i < toSelectedKonsole.length; i++){
                    urlTemp = urlTemp + `${toSelectedKonsole[i]}+`;
                }
            }
            else if (toSelectedKonsole.length == 0){
                urlTemp = urlTemp + 'null';
            }

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

        updateGame(toId, toName, toSerie, toGenre, toJahr, toEntwickler, toDimension, toBild, toStatus, toSize, toVerkauft, toText, toSelectedKonsole){
            
            let urlTemp = 'http://localhost:5000/api/gaming/game/'  + toId + '/update/' 
                                                                    + toName + '/' + toSerie + '/' + toGenre + '/'
                                                                    + toJahr + '/' + toEntwickler + '/' 
                                                                    + toDimension + '/' + toBild + '/' 
                                                                    + toStatus + '/' + toSize + '/' 
                                                                    + toVerkauft + '/' + toText + '/'
                                                                    
            if(toSelectedKonsole.length != 0){
                for(let i = 0; i < toSelectedKonsole.length; i++){
                    urlTemp = urlTemp + `${toSelectedKonsole[i]}+`;
                }
            }
            else if (toSelectedKonsole.length == 0){
                urlTemp = urlTemp + 'null';
            }
            console.log(urlTemp);
            return new Promise((resolve, reject) => {
                axios({
                    url: urlTemp,
                    method: 'put',
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

        getGames(){
            return new Promise((resolve, reject) => {
                axios({
                    url: 'http://localhost:5000/api/gaming/game/get',
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
        }
}

