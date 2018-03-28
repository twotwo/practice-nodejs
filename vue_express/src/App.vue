<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import {doGet, doPost} from "./util/axios"

let req = {a:123};
let data = '';
doPost('/console', req)
  .then((resp) => {
    data = resp.data;
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  });


export default {
  name: 'App'
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
