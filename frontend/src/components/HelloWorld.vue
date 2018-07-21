<template>
  <div class="hello">
    <div class="uk-position-relative">
      <div class="uk-cover-container" style="height:calc(100vh)">
          <canvas width="0" height="100%"></canvas>
          <img src="../assets/demo_BG.jpg" alt="" uk-cover>
      </div>
      <div class="uk-position-top">
          <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
              <div class="uk-navbar-right uk-light">
                  <ul class="uk-navbar-nav">
                      <li class="uk-active"><a href="#">Active</a></li>
                      <li><a href="#">Item</a></li>
                      <li>
                          <a href="#">Parent</a>
                          <div class="uk-navbar-dropdown">
                              <ul class="uk-nav uk-navbar-dropdown-nav">
                                  <li class="uk-active"><a href="#">Active</a></li>
                                  <li><a href="#">Item</a></li>
                                  <li class="uk-nav-header">Header</li>
                                  <li><a href="#">Item</a></li>
                                  <li><a href="#">Item</a></li>
                                  <li class="uk-nav-divider"></li>
                                  <li><a href="#">Item</a></li>
                              </ul>
                          </div>
                      </li>
                  </ul>
              </div>
          </nav>
      </div>
    </div>
    <h1 class="uk-text-center">{{ msg }}</h1>
    <h2 class="uk-text-center">Essential Links</h2>
    <ul class="uk-list uk-text-center uk-align-center">
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2 class="uk-text-center">Ecosystem</h2>
    <ul class="uk-list uk-text-center uk-align-center">
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
