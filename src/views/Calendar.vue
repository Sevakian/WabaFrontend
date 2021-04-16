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
    <div> 
      <calList class="containerItem-right"/>
    </div>
          
  </div>
</template>

<script>
import addDate from '@/components/calendar/addDate.vue'
import calView from '@/components/calendar/calView.vue'
import calFigure from '@/components/calendar/calFigure.vue'
import calSelector from '@/components/calendar/calSelector.vue'
import calList from '@/components/calendar/calList.vue'

import {mapActions  } from "vuex";

export default {
  
  name: 'Calendar',
  components: {
    addDate,
    calView,
    calFigure,
    calSelector,
    calList
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
  width:950px;
  border:1px solid black;
  padding: 15px;
  margin-left: 15px;
}
.containerItem-right {
  /* display:flex; */
  /* width:500px; */
  /* overflow:scroll; */
  padding-left: 10px;
  height:1000px;
  position:sticky;

}

</style>