<template>
    <div>
    <div class="container"> 

    <div class="headline">
        <h3> Anzahl Insgesamt: {{ anzahl }}</h3>
        <h3> Summe Werte: {{ summe }} </h3>
        <h3> Quersumme: {{ quer }} </h3>
    </div>
    <div class="headline"> 
        <!-- <button @click="logi">Klick</button> -->
        <h3> Date: {{ currentDate }} </h3>
        <h3> Verzeichnet: {{ inDate }}</h3>
        <h3> Wert: {{ val }}</h3>
    </div>
    <div class="headline">
        <h3> Letzer Eintrag: {{ eintrag }}</h3>
    </div>
    </div>
    <div> 
    <div class="output"> 
        <div v-for="m in timeline" :key="m.id">
            <div @mouseover="log(m)" :style="getColor(m.val)" class="output"/> 
        </div>
    </div>
    </div>
    <div> 
    <h3> 2 Tage zusammengefasst </h3>
    <svg :viewBox="box" style="background:black;"> 
        <path stroke="#00ff00" stroke-width="0.5" fill="none" :d="grid2"></path>
       <path stroke="#00ff00" stroke-width="2.5" fill="none" :d="curve2"> 
       </path>
    </svg>
    <h3> 3 Tage zusammengefasst </h3>
    <svg :viewBox="box" style="background:black"> 
        <path stroke="#00ff00" stroke-width="0.5" fill="none" :d="grid3"></path>
       <path stroke="#00ff00" stroke-width="2.5" fill="none" :d="curve3"> 
       </path>
    </svg>
    <h3> 5 Tage zusammengefasst </h3>
    <svg :viewBox="box" style="background:black">
        <path stroke="#00ff00" stroke-width="0.5" fill="none" :d="grid4"></path>
       <path stroke="#00ff00" stroke-width="2.5" fill="none" :d="curve4"> 
       </path>
    </svg>
    <h3> 7 Tage / 1 Woche zusammengefasst</h3>
    <svg :viewBox="box" style="background:black"> 
        <path stroke="#00ff00" stroke-width="0.5" fill="none" :d="grid5"></path>
       <path stroke="#00ff00" stroke-width="2.5" fill="none" :d="curve5"> 
       </path>
    </svg>
    <h3> 15 Tage / Halber Monat zusammengefasst </h3>
    <svg :viewBox="box" style="background:black"> 
        <path stroke="#00ff00" stroke-width="0.5" fill="none" :d="grid6"></path>
       <path stroke="#00ff00" stroke-width="2.5" fill="none" :d="curve6"> 
       </path>
    </svg>
    <h3> 30 Tage / 1 Monat zusammengefasst </h3>
    <svg :viewBox="box" style="background:black"> 
        <path stroke="#00ff00" stroke-width="0.5" fill="none" :d="grid7"></path>
       <path stroke="#00ff00" stroke-width="2.5" fill="none" :d="curve7"> 
       </path>
    </svg>
    </div>

    </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from "vuex";


export default {
    name: "dateFigure",
    data(){
        return {
           currentDate: "-", 
           inDate: "-",
           val: "-",

           curve2: "",
           curve3: "",
           curve4: "",
           curve5: "",
           curve6: "",
           curve7: "",

           grid1: "",
           grid2: "",
           grid3: "",
           grid4: "",
           grid5: "",
           grid6: "",
           grid7: "",

           box: "",
           maxLength: "",

           quer: "",
           anzahl: "",
           summe: "",
           eintrag: "",

        }
    },

    computed: {
        ...mapGetters("timestats", ['_getTimeline', '_getAllDates']),

        timeline: function(){
            return this._getTimeline;
        },

        allDates: function(){
            return this._getAllDates;
        }, 
    },

    watch: {
        timeline: function(){
            this.box = this.getBox(this.timeline, 30, 66);

            this.curve2 = this.calculateCurve(this.timeline, 2, 6);

            // this.curve2 = this.curve2 + this.calculateCurve(this.timeline, 3, 8)
            // this.curve2 = this.curve2 + this.calculateCurve(this.timeline, 5, 12);
            // this.curve2 = this.curve2 + this.calculateCurve(this.timeline, 7, 16);
            // this.curve2 = this.curve2 + this.calculateCurve(this.timeline, 15, 33); 
            // this.curve2 = this.curve2 + this.calculateCurve(this.timeline, 30, 66);  

            this.grid2 = this.getGrid(this.maxLength, 6);

            this.curve3 = this.calculateCurve(this.timeline, 3, 8);
            this.grid3 = this.getGrid(this.maxLength, 8);

            this.curve4 = this.calculateCurve(this.timeline, 5, 12); 
            this.grid4 = this.getGrid(this.maxLength, 12);

            this.curve5 = this.calculateCurve(this.timeline, 7, 16);
            this.grid5 = this.getGrid(this.maxLength, 16);

            this.curve6 = this.calculateCurve(this.timeline, 15, 33); 
            this.grid6 = this.getGrid(this.maxLength, 33);

            this.curve7 = this.calculateCurve(this.timeline, 30, 66);   
            this.grid7 = this.getGrid(this.maxLength, 66);

            this.quer = this.querSumme(this.timeline);
            this.anzahl = this.anzahlWerte(this.timeline);
            this.summe = this.summWerte(this.timeline);
            this.eintrag = this.letzerEintrag(this.allDates)
        },
        maxLength: function(){
            this.setMaxLength(this.maxLength);
        }
    },
        
    methods: {
        ...mapActions('timestats', ['setMaxLength']),

        anzahlWerte(param){
            let line = param;
            return line.length
        },

        querSumme(param){
            let line = param;
            let sum = 0;
            for(let i = 0; i < line.length; i++){
                sum = sum + line[i].val;
            }
            sum = sum / line.length
            sum = sum.toFixed(4)
            return sum;
        },

        summWerte(param){
            let line = param;
            let sum = 0;
            for(let i = 0; i < line.length; i++){
                sum = sum + line[i].val;
            }
            return sum;
        },

        letzerEintrag(param){
            let letzerEintrag = param[param.length-1]

            let toda = moment(letzerEintrag).format("YYYY-MM-DD");
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

        getBox(timeline, limitVal, addVal){
            let line = timeline;
            let i = 0;
            let steps = 0;
            let limit = limitVal;
            let newLine = [];
            let result = 0;


            while(i < line.length){
                if(steps != limit){
                    result = result + line[i].val;
                    steps++;
                }   
                else if(steps == limit){
                    newLine.push(result)
                    result = 0;
                    steps = 0;
                }
                i++
            }
            let length = newLine.length * addVal
            this.maxLength = length;

            return `0 0 ${length} 220`;
        },

        calculateCurve(param, limitVal, addVal){
            let line = param;
            let i = 0;
            let steps = 0;
            let limit = limitVal;
            let newLine = [];
            let result = 0;
            let additor = addVal;

            while(i < line.length){
                if(steps != limit){
                    result = result + line[i].val;
                    steps++;
                }   
                else if(steps == limit){
                    newLine.push(result)
                    result = 0;
                    steps = 0;
                }
                i++
            }
            //////////////////////////////////////////////////////

            steps = 0; steps = parseFloat(steps.toFixed(3))
            var code = "";  
            let num = 200; 
            i = 0;
            code = code +   `M -1 ${num} `  

            while(i < newLine.length){     
              let nowVal = newLine[i];
              code = code +  `S ${steps - 0.8333} `
              nowVal = parseInt(nowVal.toString() + "0")
              nowVal = num - nowVal
              
              code = code + ` ${nowVal} `
              code = code + `${steps} ${num - parseInt(newLine[i].toString() + "0")}`
              steps = steps + additor;         
              i++;
            }
            return code;
        },

        getGrid(maxLength, addVal){
            var code = "";  
            let num = 200; 

            //rechts nach links
            while(num != 0){
                code = code + `M 0 ${num} L ${maxLength} ${num}`
                num = num - 10;
            }

            // oben nach unten
            let counter = 0;
            while (counter <= maxLength){
                code = code + `M ${counter} 0 L ${counter} 200`
                counter = counter + addVal;
            }
            return code;
        },

        getColor(val){
            switch(val){
                case 0: return "background-color:black;"; 
                case 1: return "background-color:#004d00;"; 
                case 2: return "background-color:#009900;";
                case 3: return "background-color:#00ff00;";
                case 4: return "background-color:#99ffcc;"; 
                case 5: return "background-color:#ffffff;"; 
                case 6: return "background-color:#ffffff;";
                case 7: return "background-color:#ffffff;";
                case 8: return "background-color:#ffffff;"; 
                case 9: return "background-color:#ffffff;";
                case 10: return "background-color:#ffffff;"; 
                default: return "background-color:#ffffff;";
            }
        },

        log(date){
            this.currentDate = date.date;
            this.inDate = date.inDate;
            this.val = date.val;
        }
    }
}
</script>
<style scoped> 
.output {
    width:2px;
    height:400px;
    display:flex;
    flex-direction:row;
}
.output:hover {
    background-color:white !important;
}
.container {
    display:flex;
}
.headline{
    height:150px;
    width: 400px;
    display:inline;
}


</style>