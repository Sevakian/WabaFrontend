<template>
    <div class="container">
        <div class="container-left"> 
            <addTodo class="containerItem-left"></addTodo>
        </div>

        <div class="container-mid"> 
            <todoView class="containerItem-mid"></todoView>
        </div>

        <!-- <ul> 
            <h3> Todos </h3>

            <li> Arzt besuchen wegen Rücken </li>
            <li> Arzt besuchen wegen hals Pilz </li>

            <br> 

            <li> Nicolai besuchen mit gitarre</li>
            <li> intelligence fusion </li>
            <li> PSP suchen? </li> 

            <br> 
            <br>
            <li> Für job bewerben </li>
            <br>
            <br>

            <li> Alle DS und 3DS Spiele suchen die "merken" und "nicht ausgewählt" sind und eventuell als download für Speicherkarte herhalten müssen </li>
            <li> Alle spiele die gedownloaded werden für pc (kombinierbar mit spiele die auf ds speicherkarte gedownloaded werden können)</li>
            <li> alle gameboy spiele anschauen </li>
            <li> best of 3ds und ds spiele youtube suchen</li>
  


            <br>


            <li> final fantasie </li>
            <li> fire emblen </li>
            <li> monster hunter </li>
            <br>

            <li> meme suchen rakete</li>
            <br>


            <hr>
            <h3> Programmieren </h3>
            <li> todo </li>
            <li> aktivitäts diagram ausgabe verbessern </li>
            <li> Kalendar liste der daten ausgeben</li><br>

            <li> vdatum anzahl urzeit anschauen</li>
            <li> gaming veröffentlich monat spiele häufigkeit</li>
            <hr>

        </ul>
        -->
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import addTodo from './../components/todo/addTodo'
import todoView from './../components/todo/todoView'

export default {
name: "todo",
components: { addTodo, todoView },

created(){
    this.getTodos()
    this.getVerwendungen()
},

methods: {
    ...mapActions('todo', [ 'getTodos', 'getVerwendungen']),
}

}
</script>
<style scoped>
.container  {
  display:flex;
  
}
.container-left{
  flex-direction:column;
}
.containerItem-left {
    display:flex;
    width:400px;
    border:1px solid black;
    padding:15px;
}

.container-mid {
  flex-direction:column;
}

.containerItem-mid {
  display:flex;
  flex-direction:column;
  width:1400px;
  border:1px solid black;
  padding: 15px;
  margin-left: 15px;


}
</style>