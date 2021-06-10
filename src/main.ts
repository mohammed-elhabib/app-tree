import Vue from 'vue'
import App from './App.vue'
import router from './ui/router'
import store from './store'
import vuetify from './plugins/vuetify'
import TreeNode from "@/ui/components/TreeNode.vue"
Vue.component("tree-node",TreeNode)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
