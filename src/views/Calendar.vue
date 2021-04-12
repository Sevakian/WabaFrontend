<template>
  <div class="container">


    <div class="container-left"> 
    
      <calView class="containerItem-left"/>
      <br>

      <addDate class="containerItem-left"/>
      <br>

      <calSelector class="containerItem-left"/>
      <br>      
    </div>

    <div class="container-mid">
      <calFigure class="containerItem-mid"/>  
    </div>
  </div>
</template>

<script>
import addDate from '@/components/calendar/addDate.vue'
import calView from '@/components/calendar/calView.vue'
import calFigure from '@/components/calendar/calFigure.vue'
import calSelector from '@/components/calendar/calSelector.vue'

import {mapActions  } from "vuex";

export default {
  
  name: 'Calendar',
  components: {
    addDate,
    calView,
    calFigure,
    calSelector
  },
  
    methods: {
        ...mapActions('calendar', ['getAllDates', 'setTable', 'getTables', 'getVerwendungen']),
    },

  async created(){
        await this.getTables();
        var table = localStorage.getItem('selectedCalTable')
        this.setTable(table);
        await this.getAllDates(table);
        this.getVerwendungen();
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