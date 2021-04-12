<template>
    <div> 
        <!-- <div :style="isActiveForm == true ? 'display:none;' : null"> 
        <h3> Name:  {{ selectedKonsole.KonsoleName }}</h3>
        <h3> Bild: {{ selectedKonsole.Bild }} </h3>
        <h3> Hersteller: {{ selectedKonsole.Hersteller }}</h3>
        <h3> Erscheinungsjahr: {{ selectedKonsole.Erscheinungsjahr }} </h3>
        <h3> Generation: {{ selectedKonsole.Generation }} </h3>
        <h3> Status: {{ selectedKonsole.Status }} </h3>
        <h3> Typ : {{ selectedKonsole.Typ }} </h3>
        </div>
        <div :style="isActiveForm == true ? null : 'display:none;'"> 
            <addKonsole :selected="this.selectedKonsole"></addKonsole>
        </div>
        <button @click="edit()"> 
            <span v-if="!isActiveForm"> Editieren </span> 
            <span v-else-if="isActiveForm"> Abbrechen </span>
        </button> -->
    </div>

</template>
<script>
// import {mapGetters} from 'vuex';
// import addKonsole from './addKonsole.vue';
// export default {
//     components: {
//         addKonsole
//     },
//     data(){
//         return {
//             isActiveForm: null,
//         }
//     },
//     methods: {
//         edit(){
//             this.isActiveForm = !this.isActiveForm;
//         }
//     },
//     computed: {
//         ...mapGetters('game', ['_getSelectedKonsole']),

//         selectedKonsole: function(){
//             return this._getSelectedKonsole[0]
//         },
//     },
//     watch: {
//         selectedKonsole: function(){
//             return this._getSelectedKonsole
//         }
//     }
// }
</script>