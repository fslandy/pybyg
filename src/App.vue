<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f5f5f5;
  width: 100vw;
  min-height: 100vh;
}
.flex_acsb{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex_acs{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.flex{
  display: flex;
}
</style>
