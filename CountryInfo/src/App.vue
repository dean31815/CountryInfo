<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {

    },
    data() {
      return {}
    }
  }

</script>

<style>
  #app {
    background-color: #95a5a6;
    min-height: 100vh;
  }

  .block {
    display: block;
  }

  .center {
    text-align: center
  }

</style>
