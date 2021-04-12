<template>
<div> 
    <div>
        <div>
            <h3> {{ selectedTable }}</h3>
        </div>
        <form>
        <p>
            <select  v-model="selectedTable"> 
            <option  :value="x" v-for="x in dateTables" :key="x.id" > {{x}} </option>
            </select>
        </p>

        <p> 
            <input type="text" v-model="newTable" id="newTable" placeholder="Neue Tabelle" name="newTable"> 
            <button v-on:click="save()"> Speichern </button>
        </p>
        </form>
    </div>
</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: 'calSelector',
    data() {
        return {
            newTable: "",
        }
    },

    watch: {
        selectedTable: function(){
            localStorage.setItem('selectedCalTable', this.selectedTable);
            this.getAllDates(this.selectedTable);
        } 
    },
    
    computed: {
        ...mapGetters("calendar", ['_getCalendarTables', '_getSelectedTable']),

        dateTables: function(){
            return this._getCalendarTables;
        },


        selectedTable: {
            get: function(){
                return this._getSelectedTable;
            },
            set: function(newVal){
                this.setTable(newVal);
            }
        }
    },
    methods: {
        ...mapActions("calendar", ['setTable', 'getAllDates', 'setNewTable']),

        save(){
            event.preventDefault();
            this.setNewTable(this.newTable)
            alert("Gespeichert");
        }

    }

}
</script>

