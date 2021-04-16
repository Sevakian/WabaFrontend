<template>
    <div class="container">
        <div class="container-left"> 
            <addTodo class="containerItem-left"></addTodo>
        </div>

        <div class="container-mid"> 
            <todoView class="containerItem-mid"></todoView>
        </div>
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