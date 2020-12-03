<template>
    <div>
        <div class="item"> 
            <h4> AllTimeline </h4>
            <div v-for="u in timeline" :key="u.id">
                <span v-if="u.inDate" class="active"><b> {{ u.date }} </b> </span>
                <span v-else-if="!u.inDate"> {{ u.date }}</span>
            </div>
        </div>
        <div class="item"> 
            <h4> Timeline </h4>
            <div v-for="m in timeline" :key="m.id">
                <span v-if="m.inDate && !m.duplicate"> {{ m.date }} </span>
                <span v-else-if="m.inDate && m.duplicate" class="duplicated"> <b> {{ m.date }} </b></span>
            </div>
        </div>
        <div class="item">
            <h4> All Dates </h4>
            <div v-for="x in allDates" :key="x.id">>
                <span> {{ x }}</span>
            </div>
        </div>
    </div>
</template>

<script>
// import moment from 'moment';
import { mapActions, mapGetters } from "vuex";

export default {
    name: "dateDisplay",
    data(){
        return {
            
        }
    },
    created(){
        this.getAllDates();
    },
    
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

        logData(){
            event.preventDefault();
            // this.initDates();
            console.log(this.timeline)
        },
    }
}
</script>
<style> 

.item {
    width:133px;
}
.active {
    color:#8A2BE2;
}
.duplicated {
    color: #E22BDE;
}
</style>