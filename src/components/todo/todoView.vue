<template>
    <div>
        <div v-for="x in verwendungen" :key="x.id"> 
            <label class="checkbox">
            <input v-model="filterVerwendung" type="checkbox" :value="x.verwendung_id"> <span> {{ x.title }}</span>
            </label>

        </div>

        <!-- <button @click="log()"> click</button> -->
        <div v-for="x in todos" :key="x.id"> 
            <h2> {{x.index }}</h2>
            <div v-for="y in x.data" :key="y.id"> 
                <span> - </span><span @click="select(y.todo_id)" :style="getStyle(y.priorität)"> {{ y.title }} </span>
            
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data(){
        return {
            filterVerwendung: []
        }

    },
    computed: {
        ...mapGetters("todo", ["_getTodos", "_getVerwendungen"]),

        verwendungen: function(){
            return this._getVerwendungen;
        },
        todos: function(){
            return this._getTodos;
        }
    },
    watch: {
        verwendungen: function(){
            for(let i = 0; i < this.verwendungen.length; i++){
                this.filterVerwendung.push(this.verwendungen[i].verwendung_id)
            }
        },
        todos: function(){
            return this._getTodo;
        },
        filterVerwendung: async function(){
            this.filterByVerwendung(this.filterVerwendung)
            return this._getTodo;
        }
    },
    methods: {
        ...mapActions('todo', ['selectTodo', 'filterByVerwendung']),
        select(id){
            this.selectTodo(id);
        },
        getStyle(val){
            switch(val){
                case "Wichtig":
                    return "color:red;font-weight:bold;font-size:16px;";
                case "Neutral":
                    return "font-size:16px;";
                case "Unwichtig":
                    return "font-size:12px;";
            }
        },
        log(){
            console.log(this.todos);
        }
    }
}
</script>

<style scoped>

</style>