<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import UIkit from 'uikit';
  import Icons from 'uikit/dist/js/uikit-icons';
  UIkit.use(Icons);
  export default {
    name: 'App'
  }
</script>

<style>
#app {
  
}
</style>

<style lang="less">
    @import './assets/theme/theme.less';
</style>
