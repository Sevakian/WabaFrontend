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
    name: 'dateSelector',
    data() {
        return {
            newTable: "",
        }
    },

    watch: {
        selectedTable: function(){
            localStorage.setItem('selectedTable', this.selectedTable);
            this.getAllDates(this.selectedTable);
        } 
    },
    
    computed: {
        ...mapGetters("date", ['_getDateTables', '_getSelectedTable']),

        dateTables: function(){
            return this._getDateTables;
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
        ...mapActions("date", ['setTable', 'getAllDates', 'setNewTable']),

        save(){
            event.preventDefault();
            this.setNewTable(this.newTable)
            alert("Gespeichert");
        }

    }

}
</script>

