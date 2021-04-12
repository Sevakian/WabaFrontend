<template>
    <div>
    <div class="container"> 
    <div class="headline"> 
        <!-- <button @click="logi">Klick</button> -->
        <h3> Date: {{ currentDate }} </h3>
        <h3> Verzeichnet: {{ inDate }}</h3>
        <h3> Wert: {{ val }}</h3>

    </div>
    <div class="headline">
        <h3> Anzahl Insgesamt: {{ anzahl }}</h3>
        <h3> Summe Werte: {{ summe }} </h3>
        <h3> Quersumme: {{ quer }} </h3>
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
    <!-- <svg viewBox="0 0 1400 220" style="background:black"> 
       <path stroke="#00ff00" stroke-width="1.5" fill="none" :d="curve0"> 
       </path>
    </svg> -->
    <!-- <h3> 1 Tag </h3>
    <svg viewBox="0 0 1400 220" style="background:black"> 
       <path stroke="#00ff00" stroke-width="1.5" fill="none" :d="curve1"> 
       </path>
    </svg> -->
    <h3> 2 Tage zusammengefasst </h3>
    <svg viewBox="0 0 1400 220" style="background:black"> 
       <path stroke="#00ff00" stroke-width="1.5" fill="none" :d="curve2"> 
       </path>
    </svg>
    <h3> 3 Tage zusammengefasst </h3>
    <svg viewBox="0 0 1400 220" style="background:black"> 
       <path stroke="#00ff00" stroke-width="1.5" fill="none" :d="curve3"> 
       </path>
    </svg>
    <h3> 5 Tage zusammengefasst </h3>
    <svg viewBox="0 0 1400 220" style="background:black"> 
       <path stroke="#00ff00" stroke-width="1.5" fill="none" :d="curve4"> 
       </path>
    </svg>
    <h3> 7 Tage / 1 Woche zusammengefasst</h3>
    <svg viewBox="0 0 1400 220" style="background:black"> 
       <path stroke="#00ff00" stroke-width="1.5" fill="none" :d="curve5"> 
       </path>
    </svg>
    <h3> 15 Tage / Halber Monat zusammengefasst </h3>
    <svg viewBox="0 0 1400 220" style="background:black"> 
       <path stroke="#00ff00" stroke-width="1.5" fill="none" :d="curve6"> 
       </path>
    </svg>
    <h3> 30 Tage / 1 Monat zusammengefasst </h3>
    <svg viewBox="0 0 1400 220" style="background:black"> 
       <path stroke="#00ff00" stroke-width="1.5" fill="none" :d="curve7"> 
       </path>
    </svg>
    </div>

    </div>
</template>

<script>
// import moment from 'moment';
import { mapGetters } from "vuex";


export default {
    name: "dateFigure",
    data(){
        return {
           currentDate: "-", 
           inDate: "-",
           val: "-",

        //    curve0: "",
           curve1: "",
           curve2: "",
           curve3: "",
           curve4: "",
           curve5: "",
           curve6: "",
           curve7: "",

           quer: "",
           anzahl: "",
           summe: "",

        }
    },
    
    computed: {
        ...mapGetters("date", ['_getTimeline']),

        timeline: function(){
            return this._getTimeline;
        },
    },

    watch: {
        timeline: function(){
            // console.log(this.timeline);
            // this.curve0 = this.calculateCurve0(this.timeline);
            this.curve1 = this.calculateCurve1(this.timeline);
            this.curve2 = this.calculateCurve2(this.timeline, 2, 6)
            this.curve3 = this.calculateCurve2(this.timeline, 3, 8);  
            this.curve4 = this.calculateCurve2(this.timeline, 5, 12); 
            this.curve5 = this.calculateCurve2(this.timeline, 7, 16);
            this.curve6 = this.calculateCurve2(this.timeline, 15, 33);   
            this.curve7 = this.calculateCurve2(this.timeline, 30, 66);   


            this.quer = this.querSumme(this.timeline);
            this.anzahl = this.anzahlWerte(this.timeline);
            this.summe = this.summWerte(this.timeline)
        }
    },
        
    methods: {

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
        
        // calculateCurve0(param){
        //     let line = param;
        //     let i = 0; 

        //     let steps = 0;
        //     var code = "";
        //     let num = 200;
            
        //     code = code + `M -1 ${num} `

        //     while(i < line.length){
        //         code = code + `L${steps} `
        //         num = 200 - parseInt(line[i].val.toString() + "0") * 3;
        //         code = code + `${num} `
        //         i++; 
        //         steps = steps + 2;
        //     }

        //     return code;
        // },

        calculateCurve1(param){
            // console.log(param)
            let line = param; 
            let i = 0;  

            let steps = 0; steps = parseFloat(steps.toFixed(3))
            var code = "";  
            let num = 200; 

            code = code +   `M -1 ${num} `  

            while(i < line.length){     
              let nowVal = line[i].val;
              code = code +  `S ${steps - 0.8333} `
              nowVal = parseInt(nowVal.toString() + "0")
              nowVal = num - nowVal
              
              code = code + ` ${nowVal} `
              code = code + `${steps} ${num - parseInt(line[i].val.toString() + "0")}`
              steps = steps + 2;         
              i++;
            }
            return code;
        },
        calculateCurve2(param, limitVal, addVal){
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
            // console.log(steps);
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
            console.log(limitVal)
            console.log(newLine)
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