<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"> Start </router-link> |
      <router-link to="/Timestats">Timestats</router-link> |
      <router-link to="/Calendar">Calendar</router-link> |
      <router-link to="/Gaming">Gaming</router-link> |
      <router-link to="/Todo">Todo </router-link> |  
      <!-- <router-link to="/track">Track</router-link> |  -->
      <!-- <router-link to="/svg">Svg</router-link> |      -->
      <span style="color:#ff9900;font-size:50px;"> 𓂀 </span>
    </div>
    <router-view style="overflow-x:scroll"/>
    
  </div>
</template>

<script>

export default {
  name: 'App',


  data: () => ({
    
  }),

  created: function(){
    this.$router.push('/')
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  background-color:#004d80;
  padding: 30px;
  padding-top:3px;
  border: 1px solid black;

  a {
    font-weight: bold;
    color: #ff9900;

    &.router-link-exact-active {
      color:white;
    }
  }
}

</style>
