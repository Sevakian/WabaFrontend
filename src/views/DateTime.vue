<template>
  <div class="container">

    <div class="container-left"> 
      <addDate class="containerItem-left"/><br>

      <dateView class="containerItem-left"/>
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

// import {mapState, mapActions, mapGetters } from "vuex";

export default {
  name: 'DateTime',
  components: {
    addDate,
    dateView,
    dateFigure,
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