<template>
<div>
    <!-- hi -->
    <!-- <button @click="log()"> klick</button> -->
    <!-- <div> 
      <label for="datum"> Datum ID </label><br>
      <input disabled v-model="editItem.datum_id" type="text" id="datum" name="datum">
    </div>
    <div> 
      <label for="datum"> Datum </label><br>
      <input disabled v-model="editItem.datum" type="text" id="datum" name="datum">
    </div> -->
    <div class="datum_eingabe"> 
      <label for="title"> Titel </label><br>
      <input v-model="editItem.title" type="text" id="title" name="title" maxlength="30">
    </div>
    <div class="datum_eingabe">  
      <label> Verwendung </label><br>
      <select v-model="editItem.verwendung"> 
        <option :value="null" > null </option>
        <option :value="v.verwendung_id" v-for="v in verwendungen" :key="v.verwendung_id" > {{v.text}} </option>
      </select> 
    </div>
    <div class="datum_eingabe">
      <label> Textfeld </label><br>
      <textarea v-model="editItem.textfeld" id="textfeld" name="textfeld" rows="6" cols="40" maxlength="300"></textarea>
    </div>  
    <div class="datum_eingabe"> 
      <button @click="update()"> Save </button>
      <button @click="remove()"> Delete </button>
    </div>
</div> 
</template>
<script>
import { mapGetters, mapActions } from "vuex";


export default {
    name: 'selectedDay',
    props: {day: Object},
    data() {
        return {
            editItem: {
                datum_id: this.day.datum_id,
                datum: this.day.datum,
                title: this.day.title,
                textfeld: this.day.text,
                verwendung: this.day.verwendung_id,
            }
        }
    },
    computed: {
    ...mapGetters('calendar', ['_getVerwendungen']),

      verwendungen: function(){
        return this._getVerwendungen;
      },
    },
    methods: {
      ...mapActions('calendar', ['deleteDate', 'updateDate']),

      remove(){
        this.deleteDate(this.day.datum_id);
      },
      update(){
        let datum_id = this.editItem.datum_id;
        let datum = this.editItem.datum;
        let title = this.editItem.title;
        let text = this.editItem.textfeld;
        let verwendung = this.editItem.verwendung; 

        if(title == ""){
          title = null;
        }
        if(text == ""){
          text = null;
        }
 
        let item = {
          datum_id, datum, title, text, verwendung
        }
        
        this.updateDate(item)
      },
      log(){
        console.log(this.verwendungen);
        // console.log(this.day);
      }
    }
}
</script>

<style scoped lang="less">

// #eingabe_container {
//   flex-direction:column;
// }
// .eingabe_container_item {
//   display:flex;
//   flex-direction:row;
// }

// .eingabe_container_item > div {
//   padding-right:20px;
// }
.datum_eingabe {
  padding-top:5px;
  padding-bottom:5px;
  font-weight: bold;
}
</style>
