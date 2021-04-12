import gameapi from '../../api/gameapi'
import moment from 'moment'


export default {
    namespaced: true,
    state: {
        selectedKonsole: [{
            Konsoleid: '',
            KonsoleName: '',
            Bild: '',
            Hersteller: '',
            Erscheinungsjahr: '',
            Generation: '',
            Status: '',
            Typ: '',
            AnzahlVerkauft: '',
            Text: '',
            konsoles: []
        }],

        selectedGame: [{
            Spielid: '',
            Spielename: '',
            Spieleserie: '',
            Genre: '',
            Erscheinungsjahr: '',
            Entwickler: '',
            Dimension: '',
            Bild: '',
            Status: '',
            AnzahlVerkauft: '',
            Text: '',
            GrößeGB: '',
  
        }],

        konsoles: [],
        games: [],

        filterKonsol: [],
        filterStatus: [],
        filterVal: '',
    },

    getters: {
        _getKonsoles: state => {
            return state.konsoles;
        },
        _getGames: state => {
            return state.games;
        },

        _getSelectedKonsole: state => {
            return state.selectedKonsole;
        },
        _getSelectedGame: state => {
            return state.selectedGame;
        },
        _getGameList: state => {
            let gamesList_0 = state.games
            let gamesList_1 = [];
            let gamesList_2 = [];
            let gamesList_3 = [];
     
            let index = 0;

            if(state.filterKonsol.length != 0){
                for(let c = 0; c < gamesList_0.length; c++){
                   if(gamesList_0[c].konsoles.some((val) => state.filterKonsol.indexOf(val) !== -1)){
                       gamesList_1[index] = gamesList_0[c];
                       index++;
                   }
                }
            }
            else if(state.filterKonsol.length == 0){
                gamesList_1 = gamesList_0;
            }

            index = 0;
            if(state.filterVal != '' || state.filterVal.length != 0){

                for(let i = 0; i < state.filterVal.length; i++){
                  for(let j = 0; j < gamesList_1.length; j++){
                    if(gamesList_1[j].Spieleserie == null){
                        gamesList_1[j].Spieleserie = '';
                    }
                    if(gamesList_1[j].Genre == null){
                        gamesList_1[j].Genre = '';
                    }
                    if(gamesList_1[j].Entwickler == null){
                        gamesList_1[j].Entwickler = '';
                    }
                    if(gamesList_1[j].Dimension == null){
                        gamesList_1[j].Dimension = '';
                    }
                    if(
                        gamesList_1[j].Spielename.toLowerCase().includes(state.filterVal[i].toLowerCase()) ||
                        gamesList_1[j].Spieleserie.toLowerCase().includes(state.filterVal[i].toLowerCase()) ||
                        gamesList_1[j].Genre.toLowerCase().includes(state.filterVal[i].toLowerCase()) ||
                        gamesList_1[j].Dimension.toLowerCase().includes(state.filterVal[i].toLowerCase()) ||
                        gamesList_1[j].Entwickler.toLowerCase().includes(state.filterVal[i].toLowerCase()) 
                        ){
                      gamesList_2[index] = gamesList_1[j];
                      index++;
                    }
                  }
                }
                gamesList_2 = [...new Set(gamesList_2)];
            }
            else if(state.filterVal == '' || state.filterVal.length == 0){
                gamesList_2 = gamesList_1
            }

            index = 0;
            if(state.filterStatus.length != 0){
                for(let j = 0; j < state.filterStatus.length; j++){
                    for(let i = 0; i < gamesList_2.length; i++){

                        if(gamesList_2[i].Status == null){
                            gamesList_2[i].Status = '';
                        }
                        if(gamesList_2[i].Status.toLowerCase() == state.filterStatus[j].toLowerCase()){
                            gamesList_3[index] = gamesList_2[i];
                            index++;
                        }
                    }

                }
                gamesList_3 = [...new Set(gamesList_3)]
            }
            else if(state.filterStatus.length == 0){
                gamesList_3 = gamesList_2
            }

            return gamesList_3;
          },
    },

    mutations: { 
        setValFilter(state, val){
            state.filterVal = val
        },

        setKonsolFilter(state, val){
            state.filterKonsol = val
        },
        setStatusFilter(state, val){
            state.filterStatus = val
        },
        setSelectedGame(state, id){
            if(id == null){
                state.selectedGame = [{
                    Spielid: '',
                    Spielename: '',
                    Spieleserie: '',
                    Genre: '',
                    Erscheinungsjahr: '',
                    Entwickler: '',
                    Dimension: '',
                    Bild: '',
                    Status: '',
                    GrößeGB: '',
                    AnzahlVerkauft: '',
                    Text:'',
                    konsoles: []
                }]
            }
            else if (id != null){
                state.selectedGame = state.games.filter(x => x.Spielid == id)
            }
        },
        setSelectedKonsole(state, id){
            if(id == null){
                state.selectedKonsole = [{
                    Konsoleid: '',
                    KonsoleName: '',
                    Bild: '',
                    Hersteller: '',
                    Erscheinungsjahr: '',
                    Generation: '',
                    Status: '',
                    Typ: '',
                    AnzahlVerkauft: '',
                    Text: '',
                }]
            }
            else if(id != null){
                state.selectedKonsole = state.konsoles.filter(x => x.Konsoleid == id)
            }

        },
        setKonsoles(state, inKonsole){
            for(let i = 0; i < inKonsole.length;i++){
                if(inKonsole[i].Erscheinungsjahr != null){
                    inKonsole[i].Erscheinungsjahr = moment(inKonsole[i].Erscheinungsjahr).format('YYYY-MM-DD')
                }
            }
            state.konsoles = inKonsole
        },
        setGames(state, inGames){
            // console.log(inGames)
            for(let i = 0; i < inGames.length;i++){
                if(inGames[i].Erscheinungsjahr != null){
                    inGames[i].Erscheinungsjahr = moment(inGames[i].Erscheinungsjahr).format('YYYY-MM-DD')
                }
            }
            state.games = inGames;
        }
    },

    actions: { 
        filterByVal({commit}, val){
            commit("setValFilter", val)
        },

        filterByKonsol({commit}, val){
            commit("setKonsolFilter", val)
        },
        filterByStatus({commit}, val){
            commit("setStatusFilter", val)
        },
        async selectGame({commit}, id){
            commit('setSelectedGame', id);
        },

        async selectKonsole({commit}, id){
            commit('setSelectedKonsole', id);
        },

        async addGame({dispatch}, toGame){
            if(toGame.id == null){
                await gameapi.addGame(
                    toGame.name,
                    toGame.serie,
                    toGame.genre,
                    toGame.jahr,
                    toGame.entwickler,
                    toGame.dimension,
                    toGame.bild,
                    toGame.status,
                    toGame.size,
                    toGame.verkauft,
                    toGame.textfeld,
                    toGame.selectedKonsoles,

                )
            }
            else if(toGame.id != null){
                await gameapi.updateGame(
                    toGame.id,
                    toGame.name,
                    toGame.serie,
                    toGame.genre,
                    toGame.jahr,
                    toGame.entwickler,
                    toGame.dimension,
                    toGame.bild,
                    toGame.status,
                    toGame.size,
                    toGame.verkauft,
                    toGame.textfeld,
                    toGame.selectedKonsoles,

                )
            }
            dispatch('getGames')
        },
        async getGames({commit}){
            let results = await gameapi.getGames();
            commit('setGames', results)
        },

        async addKonsole({dispatch}, toKonsole){
            if(toKonsole.id == null){
                await gameapi.addKonsole(toKonsole.name, toKonsole.bild, toKonsole.hersteller, toKonsole.jahr, toKonsole.gen, toKonsole.status, toKonsole.typ, toKonsole.verkauft, toKonsole.textfeld);
            }
            else if (toKonsole.id != null){
                await gameapi.updateKonsole(    toKonsole.id,
                                                toKonsole.name ,
                                                toKonsole.bild ,
                                                toKonsole.hersteller ,
                                                toKonsole.jahr ,
                                                toKonsole.gen ,
                                                toKonsole.status ,
                                                toKonsole.typ ,
                                                toKonsole.verkauft,
                                                toKonsole.textfeld

                );
            }
            dispatch('getKonsoles')
        },

        async getKonsoles({commit}){
            let results = await gameapi.getKonsoles();
            commit('setKonsoles', results)
        }
    },

}