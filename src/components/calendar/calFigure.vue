<template>
    <div>


        <div class="container"> 
            <!-- <button @click="log()"> log</button> -->
            <h1> Heute: {{ today }}</h1>
            <h1> Ausgewählt: {{ selectedDay }} </h1>
            <h3> {{ day }} {{ month }} {{ year }}</h3>
        </div>
        <hr>

        <div class="verwendungen"> 
        <!-- <div class="verwendungTitle" v-for="x in verwendungen" :key="x.id"> 
            <div class="kasten" :style="getVColor(x.farbe)"> </div> <span> {{ x.text }}</span>
        </div> -->
        <div v-for="x in verwendungen" :key="x.id"> 
            <label class="checkbox">
            <input v-model="filterVerwendung" type="checkbox" :value="x.verwendung_id" :style="getVColor(x.farbe)"> <span> {{ x.text }}</span>
            </label>

        </div>
        <label> 

        </label>
        </div>

        <hr>
        <div class="container"> 
            <div v-for="y in timeline" :key="y.id">
            <h3> {{ y.year }}</h3>
            <div @mouseover="logYear(y.year)" class="year"> 

                <div  v-for="m in y.data" :key="m.id">
                <span class="monthTitle"> {{ setMonth(m.month) }} </span>
                <div    @mouseover="logMonth(m.month)" 
                        :style="isActiveMonth == y.year + m.month ? activateMonth() : null" 
                        class="month">

                    <div v-for="d in m.data" :key="d.id">
                    
                    <div    @mouseover="logDay(d)" 
                            class="day"
                            :class="setDayClass(d.date)" 
                            @click="select(y, m, d)" 
                            :style="isActiveDay == y.year + m.month + d.day ? activateDay()  : getColor(d)">

                    </div>
                    </div>

                </div>
                </div>

            </div>
            </div>

        </div>

    </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from "vuex";


export default {
    name: "calFigure",
    data(){
        return {
            filterVerwendung: [],

            isActiveDay: null,
            isActiveMonth: null,
            isActiveYear: null,

            year: "",
            month: "",
            day: "",
        }
    },
    
    computed: {
        ...mapGetters("calendar",  ['_getTimeline', '_getSelectedDay', '_getVerwendungen']),

        verwendungen: function(){
            return this._getVerwendungen;
        },

        timeline: function(){
            return this._getTimeline;
        },
        selectedDay: function(){
            return this._getSelectedDay;
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
        timeline: function(){
            return this._getTimeline;
        
        },
        selectedDay: function(){
            return this._getTimeline;
        },
        verwendungen: function(){
            for(let i = 0; i < this.verwendungen.length; i++){
                this.filterVerwendung.push(this.verwendungen[i].verwendung_id)
            }
        },

        filterVerwendung: function(){
            this.filterByVerwendung(this.filterVerwendung);
        }
    },
        
    methods: {
        ...mapActions('calendar', ['selectDay', 'filterByVerwendung']),

        log(){
            console.log(this.verwendungen);
        },
        logYear(y){
                this.year = y;
        },
        logMonth(m){
            switch(m){
                case "01": this.month = "Januar"; break;
                case "02": this.month = "Februar"; break;
                case "03": this.month = "März"; break;
                case "04": this.month = "April"; break;
                case "05": this.month = "Mai"; break;
                case "06": this.month = "Juni"; break;
                case "07": this.month = "Juli"; break;
                case "08": this.month = "August"; break;
                case "09": this.month = "September"; break;
                case "10": this.month = "Oktober"; break;
                case "11": this.month = "November"; break;
                case "12": this.month = "Dezember"; break;  

            }
        },
        setMonth(m){
            switch(m){
                case "01": return "Januar"; 
                case "02": return "Februar";
                case "03": return "März";
                case "04": return "April"; 
                case "05": return "Mai";
                case "06": return "Juni";
                case "07": return "Juli";
                case "08": return "August"; 
                case "09": return "September"; 
                case "10": return "Oktober"; 
                case "11": return "November";
                case "12": return "Dezember"; 
            }
        },

        logDay(d){
            this.day = d.day;

        },
        select(y, m, d){
            let date = moment(y.year + "-" + m.month + "-" + d.day).format('YYYY-MM-DD')
            this.selectDay(date)

            this.isActiveDay = y.year + m.month + d.day;
            this.isActiveMonth = y.year + m.month;
            this.isActiveYear = y.year
        },
        setDayClass(d){
            if(moment(d).isoWeekday() == 6|| moment(d).isoWeekday() == 7){
                return 'weekend';
            }
            else{
                return;
            }
        },
        activateDay(){
            return "border:1px solid yellow;background-color:white;"
        },
        activateMonth(){
            return "background-color:#0092f3;"
        },
        getVColor(val){
            return `background-color:${val};`
        },

        getColor(val){
            // console.log(val);
            if(val.isToday && val.data != undefined){
                return "background-color:#ffffff;width:37px;border:3px solid red;height:40px;!important"
            }        
            else if(val.isToday && val.data == undefined){
                return "background-color:#ffffff;width:40px;height:40px;"
            } 
            if(val.data != undefined){
                if(val.data.length > 1){
                    return "background-color:#FF1493;";
                }
                switch(val.data[0].verwendung_id){
                    case 1:
                        return "background-color:#00ff00;";
                    case 2: 
                        return "background-color:#F90;";
                    case 3: 
                        return "background-color:#F00;";
                    case 4: 
                        return "background-color:#630;";
                    case 5: 
                        return "background-color:#9FF;";
                    case 6: 
                        return "background-color:#FF0;";
                    default:
                        return "background-color:#00ff00"
                }
            }
            else {
                return "background-color:black;"
            }
        },
    }
}
</script>
<style scoped> 
/* .output {
    width:2.5px;
    height:600px;
    display:flex;
    flex-direction:row;
} */
.year {
    border:1px solid black;
    margin-bottom:20px;
    padding:20px;
    display:flex;
    flex-wrap: wrap;
    width: 900px;
    background-color:#004d80;
    
}
.monthTitle {
    color:white;
}
.month {
    display:flex;
    align-items:center;
    padding-top:10px;
    padding-bottom:10px;
    height:60px;
    background-color:#004d80;
}
.month:hover {
background-color:#006eb8;
}

.day {
 border:1px solid black;
 width:11px;
 height:30px;
 margin:0.5px;
}
.weekend {
height:40px;
}
.day:hover {
    background-color:#ffffff;
    border:1px solid white;
}

.output:hover {
    background-color:white !important;
}
.container {
    /* display:block; */
}

.headline{
    width: 100%;
}

.verwendungen {
    display:flex;
    flex-direction:row;
}

.checkbox {
    display: inline-flex;
    position: relative;
}

.checkbox > span {
    color: #34495E;
    padding: 0.5rem 0.25rem;
}

.checkbox > input {
    
    height: 25px;
    width: 25px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: 1px solid #34495E;
    border-radius: 4px;
  }
.checkbox > input:checked {
    border: 1px solid #41B883;
    background-color: #34495E;
}

.checkbox > input:checked + span::before {
    content: '\2713';
    display: block;
    text-align: center;
    color: black;
    position: absolute;
    left: 0.7rem;
    top: 0.2rem;
}

.checkbox > input:active {
    border: 2px solid #34495E;
}


</style>