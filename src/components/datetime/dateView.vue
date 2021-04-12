<template>
    <div>
        <div class="item"> 
            <h4> Timeline </h4>
            <div v-for="u in timeline" :key="u.id">
                <span v-if="u.inDate" class="active"><b> {{ u.date }} </b> <span v-if="u.val>1"> {{ u.val }}x </span> </span>
                <span v-else-if="!u.inDate"> {{ u.date }}</span>
            </div>
        </div>
        <div class="item"> 
            <h4> Sum Dates </h4>
            <div v-for="m in timeline" :key="m.id">
                <span v-if="m.inDate && m.val <= 1"> {{ m.date }} </span>
                <span v-else-if="m.inDate && m.val > 1">{{ m.date }} - <span class="active"> {{ m.val }}x</span></span>
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
import { mapGetters } from "vuex";

export default {
    name: "dateView",
    data(){
        return {
            
        }
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

        logData(){
            event.preventDefault();
            // this.initDates();
            console.log(this.timeline)
        },
    }
}
</script>
<style scoped> 

.item {
    width:133px;
}
.active {
    color:#009900;
}

</style>