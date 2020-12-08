<template>
  <div id="app">
    <p>Welcome to Youtubify</p>
    <ChannelSearch msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ChannelSearch from './components/ChannelSearch.vue'

export default {
  name: 'App',

  components: {
    ChannelSearch
  },
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
