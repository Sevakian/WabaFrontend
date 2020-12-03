import dateapi from '../../api/dateapi'
import moment from 'moment'

export default {
    namespaced: true,
    state: {
        addedDate: "-",
        allDates: [],
        timeline: [],
    },

    getters: {
        _getAllDates: state => {
            return state.allDates;
        },
        _getTimeline: state => {
            return state.timeline;
        }
    },

    mutations: {        
        setAllDates(state, inResult){
            state.allDates = inResult;
        },

        setTimeline(state, inResult){
            var allDates = inResult;
            var endindex = allDates.length;

            for(var i = 0; i < endindex; i++){
                allDates[i] = moment(allDates[i].datum).format('YYYY-MM-DD');
            }

            var newDate = allDates[0];
            var timeline = [];

            let duplicateDates = allDates.filter((item, index) => allDates.indexOf(item) != index);
            
            console.log("duplicateDates");
            console.log(duplicateDates);

            while(moment(newDate) < moment(allDates[endindex])){
            
                var result = allDates.find(element => element == newDate);

                if(result == undefined){
                    timeline.push({date: newDate, inDate: false, duplicate: false});
                }
                else if (result != undefined){
                    var duplicateVal = duplicateDates.find(element => element == newDate)

                    if(duplicateVal == newDate){
                        timeline.push({date: newDate, inDate: true, duplicate: true});
                    }
                    else {
                        timeline.push({date: newDate, inDate: true, duplicate: false});
                    }
                    
                }

                newDate = moment(newDate).add(1, 'd')._d;
                newDate = moment(newDate).format('YYYY-MM-DD');

            }
            state.timeline = timeline;

            console.log("state.timeline");
            console.log(JSON.parse(JSON.stringify(state.timeline)))
        },

        setDate(state, inDate){
            state.addedDate = inDate
        },
    },

    actions: {
        async getAllDates({commit}){
            var result = await dateapi.getAllDates()
            commit("setAllDates", result);
            commit("setTimeline", result);
            },
      
        async saveDate({commit}, toDate){
            var response = await dateapi.saveDate(toDate);
            console.log("Response save Date");
            console.log(response);
            commit("setDate", toDate)
        }
    },

}