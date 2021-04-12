<template>
<div>
    <form> 
        <div class="container">
            <div class="eingabe">
                <label> Title </label><br>
                <input required type="text" v-model="item.title" maxlength="50" placeholder="max 50"> 
            </div>


            <div class="eingabeCon"> 
                <div class="eingabe">
                    <label> Priorität </label><br>
                    <select v-model="item.priorität"> 
                        <option value="Wichtig"> Wichtig </option>
                        <option value="Neutral"> Neutral </option>
                        <option value="Unwichtig"> Unwichtig </option>
                    </select>
                </div>
            </div>
            <div class="eingabeCon"> 
                <div class="eingabe">
                    <label> Verwendung </label><br>
                    <select v-model="item.verwendung"> 
                        <option :value="x.verwendung_id" v-for="x in this.verwendungen" :key="x.verwendung_id"> {{x.title}}</option>
                    </select>
                </div>
            </div>

            <div class="eingabeCon"> 
                <div class="eingabe">
                    <label> Text </label><br>
                    <textarea rows="5" cols="40" v-model="item.text" maxlength="300" placeholder="max 300"></textarea>
                </div>
            </div>
            <div class="eingabe">
                <input type="radio" value="erledigt" v-model="item.status">
                <label> Erledigt </label><br>
                <input type="radio" value="erledigen" v-model="item.status" checked> 
                <label> Erledigen </label><br>
            </div>

            <div class="eingabeCon">
                <button v-on:click="save()"> Speichern </button>
                <button @click="setselectTodo(null)"> Neues Todo </button>
                <button v-on:click="cancel()"> Abbrechen </button>
            </div>
        </div>
    </form>
</div>
</template>
    
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
        return {
            item: {
                id: '',
                title: '',
                text: '',
                verwendung: 6,
                priorität: 'Neutral',
                status: 'erledigen'
            }   
        }
    },
    
    computed: {
        ...mapGetters('todo', ['_getVerwendungen', '_getSelectedTodo']),

        verwendungen: function(){
            return this._getVerwendungen
        },
        selectedTodo: function(){
            return this._getSelectedTodo[0]
        }

    },
    watch: {
        selectedTodo: function(){
            this.item.id = this.selectedTodo.todo_id;
            this.item.title = this.selectedTodo.title;
            this.item.text = this.selectedTodo.text;
            this.item.verwendung = this.selectedTodo.verwendung_id;
            this.item.priorität = this.selectedTodo.priorität;
            this.item.status = this.selectedTodo.status;

        }
    },
    methods: {
        ...mapActions ('todo', ['addTodo', 'selectTodo']),

        setselectTodo(val){
            event.preventDefault();
            this.selectTodo(val);
        },

        cancel(){ 
            event.preventDefault();
            this.$emit('cancel')
        },
        save(){
            event.preventDefault();

            let id = this.item.id;
            let title = this.item.title;
            let text = this.item.text;
            let verwendung = this.item.verwendung;
            let priorität = this.item.priorität;
            let status = this.item.status;

            if(id == ''){ id = null;}
            if(title == ''){ return;}
            if(text == ''){ text = null;}
            if(verwendung == ''){ verwendung = null;}
            if(priorität == ''){ priorität = null;}
            if(status == ''){ status = null;}
         
 
            let item = {
                id,
                title,
                text,
                verwendung,
                priorität,
                status
            }
            
            this.addTodo(item);
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


