<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"> Start </router-link> |
      <router-link to="/DateTime">DateTime</router-link> |
      <router-link to="/about">About</router-link>
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
