import Vue from 'vue'
import Router from 'vue-router'
import MeshApp from '@/components/MeshApp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MeshApp',
      component: MeshApp
    }
  ]
})
