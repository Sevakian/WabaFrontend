<template>
<form>
<div id="eingabe_container">

    <div> 
      <h2> Eingabe </h2>
      <h3 v-if="recentlyAdded" style="color:green"> Gespeichert: {{ addedDate }} </h3>
    </div>
    
    <div class="eingabe_container_item"> 
    <div> 
      <div class="datum_eingabe">
        <label for="year">Year: </label><br>
        <input type="text" v-model="dateItem.year" id="year" name="year">
      </div>
      <div class="datum_eingabe">
        <label for="month">Month: </label><br>
        <input type="text" v-model="dateItem.month" id="month" name="month">
      </div>
      <div class="datum_eingabe">
        <label for="day">Day: </label><br>
        <input type="text" v-model="dateItem.day" id="day" name="day">
      </div>
    </div>

    <div> 
      <div class="datum_eingabe">
        <label for="hour">Hour: </label><br>
        <input type="text" v-model="dateItem.hour" id="year" name="year">
      </div>

      <div class="datum_eingabe">
        <label for="minutes">Minutes: </label><br>
        <input type="text" v-model="dateItem.minutes" id="minutes" name="minutes">
      </div>
      <div class="datum_eingabe">
        <label for="seconds">Seconds: </label><br>
        <input type="text" v-model="dateItem.seconds" id="seconds" name="seconds">
      </div>
    </div>
    </div>


    
    <div> 
      <h4> {{ date }} </h4>
      <h3 v-if="invalidDate" style="color:red;"> Bitte geben sie das richtige Format ein (YYYY-MM-DD HH:mm:ss)</h3>
      <button v-on:click="save()"> Speichern </button> 

      <button v-on:click="update()"> Aktualisieren </button>
    </div>
    
  
</div>
</form>
</template>

<script>
import moment from 'moment';
import {mapState, mapActions } from "vuex";

export default {
  name: 'addDate',

  data() {
    return {
      invalidDate: false,
      recentlyAdded: false,

      dateItem: {
        year: moment().format("YYYY"),
        month: moment().format("MM"),
        day: moment().format("DD"),
        hour: moment().format("HH"),
        minutes: moment().format("mm"),
        seconds: "00"
      }
    }
  },

  computed: {
    ...mapState("timestats", ['addedDate']),

    date: function(){
      return  this.dateItem.year + "-" + 
              this.dateItem.month + "-" +
              this.dateItem.day + " " +
              this.dateItem.hour + ":" +
              this.dateItem.minutes + ":" + 
              this.dateItem.seconds;
    }
  },

  methods: {
    ...mapActions('timestats', ['saveDate']),

    save(){
      event.preventDefault();
      var formatDate = moment(this.date).format('YYYY-MM-DD HH:mm:ss')
      var valid = moment(formatDate, 'YYYY-MM-DD HH:mm:ss', true).isValid();
      if(!valid){
        return this.invalidDate = true;
      }
      else if(valid){
        this.invalidDate = false;
        this.recentlyAdded = true;
        this.saveDate(formatDate);
      }
    },
    update(){
      event.preventDefault();
      this.dateItem.year = moment().format("YYYY"),
      this.dateItem.month = moment().format("MM"),
      this.dateItem.day = moment().format("DD"),
      this.dateItem.hour = moment().format("HH"),
      this.dateItem.minutes = moment().format("mm"),
      this.dateItem.seconds = "00"
      }
    }
  }

</script>

<style scoped lang="less">

#eingabe_container {
  flex-direction:column;
}
.eingabe_container_item {
  display:flex;
  flex-direction:row;
}

.eingabe_container_item > div {
  padding-right:20px;
}
.datum_eingabe {
  padding-top:5px;
  padding-bottom:5px;
  font-weight: bold;
}
</style>
