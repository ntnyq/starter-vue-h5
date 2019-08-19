import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@styles/style'
import '@plugins/vant'
import '@plugins/bus'
import '@icons'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  ...App,
}).$mount('#app')
