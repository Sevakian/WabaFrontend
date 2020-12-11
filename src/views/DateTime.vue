<template>
  <div class="container">


    <div class="container-left"> 
    
      <dateSelector class="containerItem-left"/>
      <br>

      <addDate class="containerItem-left"/>
      <br>

      <dateView class="containerItem-left"/>
      <br>
      
    </div>

    <div class="container-mid">
      <dateFigure class="containerItem-mid"/>  
    </div>
  </div>
</template>

<script>
import addDate from '@/components/datetime/addDate.vue'
import dateView from '@/components/datetime/dateView.vue'
import dateFigure from '@/components/datetime/dateFigure.vue'
import dateSelector from '@/components/datetime/dateSelector.vue'

import {mapActions  } from "vuex";

export default {
  
  name: 'DateTime',
  components: {
    addDate,
    dateView,
    dateFigure,
    dateSelector
  },
  
    methods: {
        ...mapActions('date', ['getAllDates', 'setTable', 'getTables']),
    },

    created(){
        var table = localStorage.getItem('selectedTable')
        this.setTable(table);
        this.getAllDates(table);
        this.getTables();
    },
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