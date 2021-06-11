<template>
<div>
    <h2> Liste der bevorstehenden Termine </h2>
    <h3> {{ today }} - Heute </h3>
    <table> 
        <tr v-for="x in allDates" :key="x.id" @click="select(x.datum)">
            <td> {{ convertDate(x.datum) }} </td> 
            <td> {{ x.title }} </td>
            <td> In {{ getDifference(x.datum)}} Tagen</td>
            <td :style="getColor(x.verwendung_id)"> {{ getText(x.verwendung_id)}} </td>
        </tr>
    </table>
</div>
</template>
<script>
import moment from 'moment'
import { mapGetters, mapActions } from "vuex";

export default {
    methods: {
        ...mapActions('calendar', ['selectDay']),

        select(d){
            let date = moment(d).format('YYYY-MM-DD')
            this.selectDay(date)
        },

        getText(id){
            switch(id){
                case 1:
                    return "Standard";
                case 2: 
                    return "Arbeit";
                case 3: 
                    return "Termin";
                case 4: 
                    return "Gaming";
                case 5: 
                    return "Feiertage";
                case 6: 
                    return "Ereignisse";
            }
        },

        getColor(val){
            switch(val){
                case 1:
                    return "background-color:#00ff00;";
                case 2: 
                    return "background-color:#F90;";
                case 3: 
                    return "background-color:#F00;";
                case 4: 
                    return "background-color:#630;color:white;";
                case 5: 
                    return "background-color:#9FF;";
                case 6: 
                    return "background-color:#FF0;";
                default:
                    return "background-color:#00ff00"
            }
        },
        convertDate(param){
            let toda = moment(param).format("YYYY-MM-DD");
            let day = moment(toda).format('DD');
            let month = moment(toda).format('MM');
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
            let year = moment(toda).format('YYYY')
            return day + " " + month + " " + year;
        },

        getDifference(param){
            let date = moment(param).format("YYYY-MM-DD");
            let today = moment().format("YYYY-MM-DD")
            let result = moment(date).diff(today, 'days')
            return result
        }
    },
    computed: {
        ...mapGetters("calendar",  ['_getAllDates']),

        allDates: function(){
            let newList = []
            let dates = this._getAllDates

            for(let i = 0; i < dates.length; i++){
                if(moment().format("YYYY-MM-DD") <= moment(this._getAllDates[i].datum).format("YYYY-MM-DD")){
                    newList.push(this._getAllDates[i])
                }
            }
            return newList
        },

        today: function(){
            let toda = moment().format("YYYY-MM-DD");
            let day = moment(toda).format('DD');
            let month = moment(toda).format('MM');
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
            let year = moment(toda).format('YYYY')
            return day + " " + month + " " + year;
        }
    },

    watch: {
        allDates: function(){
            let newList = []
            let dates = this._getAllDates

            for(let i = 0; i < dates.length; i++){
                if(moment().format("YYYY-MM-DD") <= moment(this._getAllDates[i].datum).format("YYYY-MM-DD")){
                    newList.push(this._getAllDates[i])
                }
            }
            return newList
        },
    }, 
}
</script>
<style scoped>
    table {
        border-collapse: collapse;

    }
    td, th {
        padding: 0.5rem;
        text-align: left;
        border: 1px solid #999;
    }
</style>