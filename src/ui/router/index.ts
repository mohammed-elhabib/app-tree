import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import TreeView from '@/ui/views/TreeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: TreeView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router