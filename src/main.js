import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import api from './utils/api'

import '@/assets/sass/common.scss'

Vue.config.productionTip = false

Vue.prototype.$axios = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
