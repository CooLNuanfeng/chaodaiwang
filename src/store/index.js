import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navLeftText: '',
    navLeftArrow: false,
    navTitle: '超贷王',
    appName: '超贷王',
    token: '',
  },
  getters: {
    getAppName: state => state.appName,
    getNavLeftText: state => state.navLeftText,
    getNavLeftArrow: state => state.navLeftArrow,
    getNavTitle: state => state.navTitle,
    getToken: state => state.token
  },
  mutations: {
    setNavLeftText: (state, text) => state.navLeftText = text,
    setNavLeftArrow: (state, status) => state.navLeftArrow = status,
    setNavTitle: (state, title) => state.navTitle = title,
    setToken: (state, token) => state.token = token
  },
  actions: {

  }
})
