import calendarapi from '../../api/calendarapi'

import moment from 'moment'

export default {
    namespaced: true,
    state: {
        //Table
        selectedTable: "",
        calendarTables: [],

        //
        Verwendungen: [],
        filterVerwendung: [],

        //Date 
        allDates: [],
        timeline: [],

        selectedDay: '',
        selectedDayFormat: '',
        Terms: [],
    },

    getters: {
        //Table 
        _getCalendarTables: state => {
            return state.calendarTables;
        },
        _getSelectedTable: state => {
            return state.selectedTable
        },

        //Date
        _getSelectedDayFormat: state => {
            return state.selectedDayFormat
        },
        _getSelectedDay: state=> {
            return state.selectedDay
        },
        _getTerms: state => {
            return state.Terms;
        },

        //All Dates
        _getAllDates: state => {
            return state.allDates;
        },
        _getTimeline: state => {
            return state.timeline;
        },

        _getVerwendungen: state => {
            // console.log(state.Verwendungen)
            return state.Verwendungen;
        },
    },

    mutations: { 
        setSelectedDay(state, inDay){
            console.log(inDay)
            state.selectedDayFormat = inDay;
            let day = moment(inDay).format('DD')
            let month = moment(inDay).format('MM')
            let year = moment(inDay).format('YYYY')
            switch(month){
                case "01": month = "Januar"; break;
                case "02": month = "Februar"; break;
                case "03": month = "März"; break;
                case "04": month = "April"; break;
                case "05": month = "Mai"; break;
                case "06": month = "Juni"; break;
                case "07": month = "Juli"; break;
                case "08": month = "August"; break;
                case "09": month = "September"; break;
                case "10": month = "Oktober"; break;
                case "11": month = "November"; break;
                case "12": month = "Dezember"; break;  
            }
            
            state.selectedDay = day + " " + month + " " + year
        },

        setTerms(state, inDay){
            // state.Terms = [];
            var results = state.allDates.filter(x => x.datum == inDay)
            state.Terms = results;
            // console.log(state.Terms);
        },

        voidTerms(state){
            state.Terms = null;
        },

        setVerwendungen(state, inResult){
            state.Verwendungen = inResult;
        },

        setFilterVerwendung(state, inVal){
            state.filterVerwendung = inVal
        },

        setTable(state, inTable){
            state.selectedTable = inTable;
        },

        setAllTables(state, inResult){
            let calendarTables = [];
            for(var i = 0; i < inResult.length;i++){
                calendarTables[i] = Object.values(inResult[i]).toString();
            }

            state.calendarTables = calendarTables;
   
        },

        //Dates 

        setAllDates(state, inResult){
            state.allDates = inResult;
        },

        setTimeline(state, inResult){
            var allDates = inResult;

            for(var i = 0; i < allDates.length; i++){
                allDates[i].inDate = true;
                allDates[i].datum = moment(allDates[i].datum).format('YYYY-MM-DD');
            }

            state.allDates = allDates;

            let newList = []
            let index = 0

            if(state.filterVerwendung.length != 0){
                for(let i = 0; i < state.filterVerwendung.length; i++){
                    for(let y = 0; y < allDates.length; y++){
                        if(state.filterVerwendung[i] == allDates[y].verwendung_id){
                            newList[index] = allDates[y];
                            index++;
                        }
                    }
                }
            }
            var newDate = allDates[0].datum;
            let endindex = allDates.length - 1;
            
            var today = moment().format('YYYY-MM-DD');
            let nextYear = moment(newDate).add(1, 'Y').format('YYYY');
            let nextMonth = moment(newDate).add(1, 'M').format('MM');

            var years = {};
            var months = {};
            var days = {};

            let yearIndex = 1; 
            let monthIndex = 1;
            let dayIndex = 1; 

            while(moment(newDate) <= moment(allDates[endindex].datum)){

                var date = moment(newDate).format('YYYY-MM-DD')
                let isToda = false;
                var result = newList.filter(x =>  x.datum == date)
               
                if(date == today){
                    isToda = true;
                }

                years[yearIndex] = {year: moment(newDate).format('YYYY'), data: months}
                months[monthIndex] = {month:moment(newDate).format('MM'), data: days}

                if(result.length != 0){
                    days[dayIndex] = {day: moment(newDate).format('DD'), date: moment(newDate).format('YYYY-MM-DD'), isToday: isToda, data: result}
                }
                else if(result.length == 0){
                    days[dayIndex] = {day: moment(newDate).format('DD'), date: moment(newDate).format('YYYY-MM-DD'), isToday: isToda, data: undefined}
                }
                  
                dayIndex++;

                newDate = moment(newDate).add(1, 'd').format('YYYY-MM-DD');

                if(moment(newDate).format('MM') == nextMonth){
                    monthIndex++;
                    dayIndex=1;
                    days = {};
                    nextMonth = moment(newDate).add(1, 'M').format('MM');
                }

                if(moment(newDate).format('YYYY') == nextYear){
                    yearIndex++;
                    monthIndex=1;
                    months = {}
                    nextYear = moment(newDate).add(1, 'Y').format('YYYY');
                }
            }
            state.timeline = years;
            // console.log(JSON.parse(JSON.stringify(state.timeline)));
            // console.log(state.allDates)
        },

    },

    actions: {
        //Tabelle
        async setTable({commit}, inTable){
            commit("setTable", inTable);
        },

        async setNewTable({dispatch}, newTable){
            console.log(newTable);
            await calendarapi.setCalendarTable(newTable);
            dispatch('getTables')
        },

        async getTables({commit}){
            var result = await calendarapi.getCalendarTables();
            console.log(result);
            commit("setAllTables", result);
        },

        // Verwendung
        async getVerwendungen({commit}){
            var result = await calendarapi.getVerwendung();
            commit('setVerwendungen', result);
        },

        async filterByVerwendung({commit, state}, val){
            await commit('setFilterVerwendung', val)
            commit('setTimeline', state.allDates)

        },


        //Datum
        async saveDate({dispatch, getters}, item){
            await calendarapi.saveDate(getters._getSelectedTable, item.date, item.title, item.textfeld, item.verwendung );
            await dispatch('getAllDates', getters._getSelectedTable);
            if(getters._getSelectedDayFormat != ''){
                dispatch('selectDay', getters._getSelectedDayFormat)
            }
        },

        async updateDate({getters, dispatch}, inItem){
            await calendarapi.updateDate(getters._getSelectedTable, inItem.datum_id, inItem.title, inItem.text, inItem.verwendung);
            await dispatch('getAllDates', getters._getSelectedTable);
            dispatch('selectDay', getters._getSelectedDayFormat)  
        },

        async deleteDate({getters, dispatch}, inId){
            await calendarapi.deleteDate(getters._getSelectedTable, inId);
            await dispatch('getAllDates', getters._getSelectedTable);
            dispatch('selectDay', getters._getSelectedDayFormat)            
        },

        
        async selectDay({commit}, inDay){
            await commit('voidTerms');
            commit('setSelectedDay', inDay);
            commit('setTerms', inDay);
        },


        async getAllDates({commit}, inTable){
            var result = await calendarapi.getAllDates(inTable)
            result = result.calendar;
            if(result.length == 0){
                return alert("Keine Daten vorhanden");
            }
            result = result.sort((a,b) => moment(a.datum).format('X') - moment(b.datum).format('X'))
            commit("setAllDates", result);
            commit("setTimeline", result);
        },
    },

}