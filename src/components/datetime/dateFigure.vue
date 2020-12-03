<template>
    <div>
    <div class="headline"> 
        <h3> Date: {{ currentDate }} </h3>

        <div v-if="this.inDate"> 
            <h3 class="active"> Verzeichnet: {{ inDate }}</h3>
        </div>
        <div v-if="this.duplicated"> 
            <h3> Doppelt: {{ duplicated }}</h3>
        </div>
    </div>

    <div class="output"> 
        <div v-for="m in timeline" :key="m.id">
            <div @mouseover="log(m)" v-if="m.inDate && !m.duplicate" class="output true"/> 
            <div @mouseover="log(m)" v-if="m.inDate && m.duplicate" class="output truePlus"/> 
            <div @mouseover="log(m)" v-else-if="!m.inDate" class="output false"/>  
        </div>
    </div>

    </div>
</template>

<script>
// import moment from 'moment';
import { mapActions, mapGetters } from "vuex";

export default {
    name: "dateFigure",
    data(){
        return {
           currentDate: "-", 
           inDate: "-",
           duplicated: "-",
        }
    },
    // created(){
    //     this.getAllDates();
    // },
    
    computed: {
        ...mapGetters("date", ['_getAllDates', '_getTimeline']),

        allDates: function(){
            return this._getAllDates;
        }, 
        timeline: function(){
            return this._getTimeline;
        }

    },

        
    methods: {
        ...mapActions('date', ['getAllDates']),

    log(date){
        console.log(date);
        this.currentDate = date.date;
        this.inDate = date.inDate;
        this.duplicated = date.duplicate;
    }
    }
}
</script>
<style> 
.output {
    width:2.5px;
    height:600px;
    display:flex;
    flex-direction:row;
}
.output.true {
    background-color:#8A2BE2;
}
.output.truePlus {
    background-color:#E22BDE;
}
.output.false {
    background-color:black;
}
.output:hover {
    background-color:white;
}
.headline{
    height:150px;
}
.active{
    color:#8A2BE2;
}

</style>