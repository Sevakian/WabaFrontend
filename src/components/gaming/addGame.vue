<template>
<div>

    <form> 
        <div class="container">
            <h3> {{ pagetitle }}</h3>
            <div class="eingabe">
                <label> Name </label><br>
                <input required type="text" v-model="item.name" maxlength="100" placeholder="max 100"> 
            </div>

            <div class="eingabeCon"> 
                <div class="eingabe">
                    <label> Serie </label><br>
                    <input type="text" v-model="item.serie" maxlength="50" placeholder="max 50"> 
                </div>
                <div class="eingabe">
                    <label> Genre </label><br>
                    <input type="text" v-model="item.genre" maxlength="30" placeholder="max 30"> 
                </div>
            </div>

            <div class="eingabeCon">
                <div class="eingabe">
                    <label> Erscheinungsjahr </label><br>
                    <datepicker :propDate="item.jahr" @getDate="setDate"></datepicker>
                </div>
                <div class="eingabe">
                    <label> Entwickler </label><br>
                    <input type="text" v-model="item.entwickler" maxlength="30" placeholder="max 30"> 
                </div>
            </div>
            <div class="eingabeCon">
                <div class="eingabe">
                    <label> Dimension </label><br>
                    <input type="text" v-model="item.dimension" maxlength="10" placeholder="max 10"> 
                </div>
                <div class="eingabe">
                    <label> Bild </label><br>
                    <input type="file"  @change="setPicture($event)">
                </div>
            </div>

            <div class="eingabeCon"> 
                <div class="eingabe">
                    <label> Status </label><br>
                    <select v-model="item.status"> 
                        <option value=''> Nichts ausgewählt </option>
                        <option value="hab"> Hab </option>
                        <option value="hab digital"> Hab Digital </option>
                        <option value="hab physisch"> Hab Physisch </option>
                        <option value="verloren"> Verloren/Neu Kaufen </option>
                        <option value="kaufen"> Kaufen </option>
                        <option value="downloaden"> Downloaden </option>
                        <option value="merken"> Merken </option>
                        <!-- <option value="beobachten"> Beobachten </option> -->
                    </select>
                </div>
                <div class="eingabe">
                    <label> Größe </label><br>
                    <input type="text" v-model="item.size" maxlength="10" placeholder="max 10"> 
                </div>
            </div>
            <div class="eingabeCon"> 
                <div class="eingabe">
                    <label> Verkaufte Einheiten </label><br>
                    <input type="text" v-model="item.verkauft" maxlength="50" placeholder="max 50">
                </div>
            </div>
            <div class="eingabeCon"> 
                <div class="eingabe">
                    <label> Text </label><br>
                    <textarea rows="5" cols="40" v-model="item.textfeld" placeholder="max 50"></textarea>
                </div>
            </div>

            <div> 
                <div class="eingabe" > 
                    <label> Konsolen </label><br>
                </div>
                <div class="eingabecheck"> 
                    <div v-for="x in this.konsoles" :key="x.id">
                        <input :value="x.Konsoleid" v-model="item.selectedKonsoles" type="checkbox">
                        <label> {{ x.KonsoleName }}</label>
                    </div>
                </div>
            </div>

            <div class="eingabeCon">
                <button v-on:click="save()"> Speichern </button>
                <button @click="setselectGame(null)"> Neues Spiel </button>
                <button v-on:click="cancel()"> Abbrechen </button>
            </div>
        </div>
    </form>
</div>
</template>
    
<script>
import {mapActions, mapGetters} from 'vuex'
import datepicker from './../calendar/datepicker.vue'

export default {
    props: [
        'selected', 'title'
    ],
    components: {
        datepicker,
    },
    data(){
        return {
            item: {
                id: '',
                name: '',
                serie: '',
                genre: '',
                jahr: '',
                entwickler: '',
                dimension: '',
                bild:'',
                status: '',
                size: '',
                verkauft: '',
                textfeld: '',
      
                selectedKonsoles: [],
            }   
        }
    },
    

    computed: {
        ...mapGetters('game', ['_getKonsoles']),

        konsoles: function(){
            return this._getKonsoles
        },
        selectedItem: function(){
            return this.selected
        },
        pagetitle: function(){
            return this.title
        }
    },
    watch: {
        selectedItem: function(){
            // console.log(this.selectedItem);
            this.item.id = this.selectedItem.Spielid;
            this.item.name = this.selectedItem.Spielename;
            this.item.serie = this.selectedItem.Spieleserie;
            this.item.genre = this.selectedItem.Genre;
            this.item.jahr = this.selectedItem.Erscheinungsjahr;
            this.item.entwickler = this.selectedItem.Entwickler;
            this.item.dimension = this.selectedItem.Dimension;
            this.item.bild = this.selectedItem.Bild;
            this.item.status = this.selectedItem.Status;
            this.item.size = this.selectedItem.GrößeGB;
            this.item.verkauft = this.selectedItem.AnzahlVerkauft;
            this.item.textfeld = this.selectedItem.Text;
            this.item.selectedKonsoles = this.selectedItem.konsoles;


            // this.item.selectedKonsoles = this.selectedItem. ;
        }
    },
    methods: {
        ...mapActions ('game', ['getKonsoles', 'addGame', 'selectGame']),

        setPicture(event){
            this.item.bild = event.target.files[0].name;
            // console.log(this.item.bild)
        },

        setDate(e){
            if(e == 'Invalid date' ){
                this.item.jahr = ''
            }
            else {
                this.item.jahr = e
            }
            console.log(e);
            console.log(this.item.jahr);
        },

        setselectGame(val){
            event.preventDefault();
            this.selectGame(val);
        },

        cancel(){ 
            event.preventDefault();
            this.$emit('cancel')
        },
        save(){
            event.preventDefault();

            let id = this.item.id;
            let name = this.item.name;
            let serie = this.item.serie;
            let genre = this.item.genre;
            let jahr = this.item.jahr;
            let entwickler = this.item.entwickler;
            let dimension = this.item.dimension;
            let bild = this.item.bild;
            let status = this.item.status;
            let size = this.item.size;
            let verkauft = this.item.verkauft;
            let textfeld = this.item.textfeld;
    
            let selectedKonsoles = this.item.selectedKonsoles;

            if(id == ''){ id = null;}
            if(name == ''){ return;}
            if(serie == ''){ serie = null;}
            if(genre == ''){ genre = null;}
            if(jahr == ''){ jahr = null;}
            if(entwickler == ''){ entwickler = null;}
            if(dimension == ''){ dimension = null;}
            if(bild == ''){ bild = null;}
            if(status == ''){ status = null;} 
            if(size == ''){ size = null;}
            if(verkauft == ''){verkauft = null;}
            if(textfeld == ''){textfeld = null;}
 
            let item = {
                id,
                name,
                serie,
                genre,
                jahr,
                entwickler,
                dimension,
                bild,
                status,
                size,
                selectedKonsoles,
                verkauft,
                textfeld
            }
            // console.log(item);
            
            this.addGame(item);
        }   
    }
          
}
</script>
<style scoped>
    .eingabe{
    padding-top:5px;
    padding-bottom:5px;
    font-weight: bold;
    margin:5px;
    }
    .eingabecheck{
    padding-top:5px;
    padding-bottom:5px;
    margin:5px; 
    overflow:auto;
    height:300px;
    width:300px;
    border:1px solid #999;
    
    }

    .container {
        /* display:flex; */
    }

    .eingabeCon {
       display:flex;
    }
    input[type="checkbox"]:checked + label {
        color:white;
        background-color:black;
}
</style>


