<template>
  <div class="about">
    <h1>This is an track page</h1>
    <button @click="start()"> klick </button>
    <button @click="log()"> log </button>
    <div v-for="b in this.list" :key="b.id"> {{ b }}</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'name',
  data(){
    return {
    }
  },

  computed: {
    ...mapGetters("track", ['getTrackList']),
    list: function(){
      return this.getTrackList
    }
  },

  methods: {
    ...mapActions('track', ['init']),
    log(){
      console.log(this.list);
    },
    
    start(){
      this.init();

      var i = 0;

      while(i <= 1000){ ((i) => {
          setTimeout(() => { console.log("Beat");
          
            var j = 0;
            while(j < 3){((j) => {
                setTimeout(() => { console.log(j+1);
                }, 111 * j)
              })(j++)
            }
          }, 444 * i)
        }
      )(i++)}
    }


  }
}
</script>
<style> 
.output2 {
    width:2.5px;
    height:600px;
    display:flex;
    flex-direction:row;
}

.output2.ya {
    background-color:#8A2BE2;
}
</style>