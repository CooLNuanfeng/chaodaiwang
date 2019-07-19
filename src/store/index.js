import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navLeftText: '',
    navLeftArrow: false,
    navTitle: '超贷王',
    appName: '超贷王',
    token: '',
    userId: '',
    loanApplyId: ''
  },
  getters: {
    getAppName: state => state.appName,
    getNavLeftText: state => state.navLeftText,
    getNavLeftArrow: state => state.navLeftArrow,
    getNavTitle: state => state.navTitle,
    getToken: state => state.token,
    getUserId: state => state.userId,
    getLoanApplyId: state => state.loanApplyId
  },
  mutations: {
    setNavLeftText: (state, text) => state.navLeftText = text,
    setNavLeftArrow: (state, status) => state.navLeftArrow = status,
    setNavTitle: (state, title) => state.navTitle = title,
    setToken: (state, token) => state.token = token,
    setUserId: (state, id) => state.userId = id,
    setLoanApplyId: (state, id) => state.loanApplyId = id,
  },
  actions: {
    getCurLoanApply: async ({commit})=>{
      const result = await axios.get('/borrow/loan/current')
      // console.log(result)
      commit('setLoanApplyId', result.data.loanApply.id)
      return result
    }
  }
})
