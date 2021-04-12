<template>
<form>
<div id="eingabe_container">

    <div> 
      <h2> Neu Eintragen </h2>
    </div>
    <!-- <hr>
        <div class="datum_eingabe"> 
        <label for="title"> Verwendung hinzufügen </label><br>
        <input type="text" v-model="newVerwendung" id="verwendung" name="verwendung">
        <button v-on:click="saveVerwendung()"> Speichern </button> 
      </div>
      <hr> -->
    <div>
      <div class="datum_eingabe"> 
        <label for="title"> Titel </label><br>
        <input type="text" v-model="calItem.title" id="title" name="title" maxlength="30">
      </div>
      <div class="datum_eingabe"> 
          <datepicker :propDate="calItem.jahr" @getDate="setDate"></datepicker>
      </div>
      <div class="datum_eingabe"> 
        <label> Verwendung </label><br>
        <select v-model="calItem.verwendung" > 
          <option :value="null" > null </option>
          <option :value="x.verwendung_id" v-for="x in verwendungen" :key="x.verwendung_id" > {{x.text}} </option>
        </select> 
      </div>
      <div class="datum_eingabe">
        <label> Textfeld </label><br>
        <textarea v-model="calItem.textfeld" id="textfeld" name="textfeld" rows="6" cols="40" maxlength="300"></textarea>
      </div>
    </div>


    
    <div> 
      <button v-on:click="save()"> Speichern </button> 
            <button v-on:click="log()"> log </button> 
    </div>
    
  
</div>
</form>
</template>

<script>
import datepicker from './../calendar/datepicker.vue'
import moment from 'moment';
import {mapActions, mapGetters } from "vuex";

export default {
  name: 'addDate',
  components: {
        datepicker,
  },

  data() {
    return {

      // newVerwendung: "",
      calItem: {

        jahr: '',
        title: "",
        textfeld: "",
        verwendung: null,
      }
    }
  },

  computed: {
    ...mapGetters('calendar', ['_getVerwendungen', '_getSelectedDayFormat' ]),

    selectedDay: function(){
      return this._getSelectedDayFormat
    },
    verwendungen: function(){
      return this._getVerwendungen;
    },
  },

  watch: {
    selectedDay: function(){
      console.log(moment(this.selectedDay).isoWeekday())
      this.calItem.jahr = this.selectedDay
    }
  },

  methods: {
    ...mapActions('calendar', ['saveDate', 'setVerwendung']),

    // saveVerwendung(){
    //   event.preventDefault();
    //   if(this.newVerwendung==""){
    //     return;
    //   }
    //   this.setVerwendung(this.newVerwendung);
    // },
    log(){
      event.preventDefault();
      console.log(this.verwendungen);
    },

    setDate(e){
      // console.log(e);
        if(e == 'Invalid date' ){
            this.calItem.jahr = ''
        }
        else {
            this.calItem.jahr = e
        }
        // console.log(e);
        // console.log(this.calItem.jahr);
    },

    save(){
      event.preventDefault();
      let date = this.calItem.jahr
      let title = this.calItem.title;
      let textfeld = this.calItem.textfeld;
      let verwendung = this.calItem.verwendung

      if(title==""){
        title=null;
      }
      if(textfeld==""){
        textfeld=null;
      }
      let item = {
        date,
        title, 
        textfeld,
        verwendung 
      }

        this.saveDate(item);
    },

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
