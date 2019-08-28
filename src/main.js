import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@plugins/vant'
import '@styles/style'
import '@plugins/bus'
import '@filters'
import '@icons'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  ...App,
}).$mount('#app')
