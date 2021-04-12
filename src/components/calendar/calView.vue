<template>
    <div>
        <div class="Viewcontainer"> 
            <h2> Anzeige </h2>
            <div v-for="day in Terms" :key="day.id" >
                <div> 
                    <selectedDay :day="day"></selectedDay>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import moment from 'moment';
import { mapGetters } from "vuex";
import selectedDay from './selectedDay.vue';

export default {
    name: "calView",
    components: {
        selectedDay
    },

    data(){
        return {
        }
    },

    
    computed: {
        ...mapGetters("calendar", ['_getTerms', '_getSelectedDay']),
        Terms: function(){
            return this._getTerms;
        },
        selectedDay: function(){
            return this._selectedDay;
        }


    },
    watch: {
        Terms: function(){
            return this._getTerms;
        },
        selectedDay: function(){
            return this.getTerms;
        }
    },
        
    methods: {
        logData(){
            event.preventDefault();
            // this.initDates();
        },
    }
}
</script>
<style scoped> 
.Viewcontainer {
    display:flex;
    flex-direction: column;
}



</style>