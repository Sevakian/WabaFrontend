<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"> Start </router-link> |
      <router-link to="/dateTime">DateTime</router-link> |
      <router-link to="/Calendar">Calendar</router-link> |
      <router-link to="/Gaming">Gaming</router-link> |
      <router-link to="/Todo">Todo </router-link> |  
      <router-link to="/track">Track</router-link> | 
      <router-link to="/svg">Svg</router-link> |     
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',


  data: () => ({
    
  }),
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
