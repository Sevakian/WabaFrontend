import timestatapi from '../../api/timestatapi'
import moment from 'moment'

export default {
    namespaced: true,
    state: {
        //Table
        selectedTable: "",
        dateTables: [],
        maxLength: "",

        //
        addedDate: "-",

        //Date 
        allDates: [],
        timeline: [],
        timeLineSum: [],
    },

    getters: {
        //Table 
        _getDateTables: state => {
            return state.dateTables;
        },
        _getSelectedTable: state => {
            return state.selectedTable
        },

        //Date
        _getAllDates: state => {
            return state.allDates;
        },
        _getTimeline: state => {
            return state.timeline;
        },
        _getMaxLength: state => {
            return state.maxLength
        }
    },

    mutations: {  
        //Table  
        setLength(state, inLength){
            state.maxLength = inLength
        },
        setAllTables(state, inResult){
            let dateTables = [];
            for(var i = 0; i < inResult.length;i++){
                dateTables[i] = Object.values(inResult[i]).toString();
            }

            state.dateTables = dateTables;
   
        },

        setTable(state, inTable){
            state.selectedTable = inTable;
        },


        //Dates 

        setAllDates(state, inResult){
            state.allDates = inResult;
        },

        setTimeline(state, inResult){
            var allDates = inResult;
            var today = moment().format('YYYY-MM-DD');

            for(var i = 0; i < allDates.length; i++){
                allDates[i] = moment(allDates[i].datum).format('YYYY-MM-DD');
            }

            var newDate = allDates[0];
            var timeline = [];

            var duplo = {};
            allDates.forEach((i) => { 
                {
                duplo[i] = (duplo[i]||0) + 1;
                }
            });
            duplo = Object.entries(duplo)
            

            // let endindex = duplo.length-1;
            let index = 0;


            if(today > duplo[duplo.length-1][0]){
                duplo.push([today, 0])
                // console.log(duplo)
                // console.log(today);
            }
            // console.log(moment(duplo[duplo.length-1][0]))

            while(moment(newDate) <= moment(duplo[duplo.length-1][0])){
                
                if(newDate == duplo[index][0]){
                    timeline.push({date: newDate, inDate: true, val: duplo[index][1]})
                    index++;
                }
                else if(newDate != duplo[index][0]){
                    timeline.push({date: newDate, inDate: false, val: 0})
                }


                newDate = moment(newDate).add(1, 'd')._d;
                newDate = moment(newDate).format('YYYY-MM-DD');

            }
            // console.log(timeline);
            state.timeline = timeline;
            // console.log("state.timeline");
            // console.log(JSON.parse(JSON.stringify(state.timeline)))
        },

        setDate(state, inDate){
            state.addedDate = inDate
        },
    },

    actions: {
        async setMaxLength({commit}, inLength){
            commit("setLength", inLength)
        },
        //Tabelle
        async setTable({commit}, inTable){
            commit("setTable", inTable);
        },

        async setNewTable({dispatch}, newTable){
            console.log(newTable);
            await timestatapi.setDateTable(newTable);
            dispatch('getTables')
        },

        async getTables({commit}){
            var result = await timestatapi.getDateTables();
            commit("setAllTables", result);
        },

        //Datum

        async getAllDates({commit}, inTable){
            var result = await timestatapi.getAllDates(inTable)
            if(result.length == 0){
                return alert("Keine Daten vorhanden");
            }
            result = result.sort((a,b) => moment(a.datum).format('X') - moment(b.datum).format('X'))
            commit("setAllDates", result);
            commit("setTimeline", result);
        },
      
        async saveDate({commit, dispatch, getters}, toDate){
            await timestatapi.saveDate(getters._getSelectedTable, toDate);
            dispatch('getAllDates', getters._getSelectedTable);
            commit("setDate", toDate)
        }
    },

}