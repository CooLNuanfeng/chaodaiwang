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
    loanApplyId: '',
    loanApplyInfo: null,
  },
  getters: {
    getAppName: state => state.appName,
    getNavLeftText: state => state.navLeftText,
    getNavLeftArrow: state => state.navLeftArrow,
    getNavTitle: state => state.navTitle,
    getToken: state => state.token,
    getUserId: state => state.userId,
    getLoanApplyId: state => state.loanApplyId,
    getLoanApplyInfo: state => state.loanApplyInfo,
  },
  mutations: {
    setNavLeftText: (state, text) => state.navLeftText = text,
    setNavLeftArrow: (state, status) => state.navLeftArrow = status,
    setNavTitle: (state, title) => state.navTitle = title,
    setToken: (state, token) => state.token = token,
    setUserId: (state, id) => state.userId = id,
    setLoanApplyId: (state, id) => state.loanApplyId = id,
    setLoanApplyInfoById: (state, info) => state.loanApplyInfo = info,
    setLoanApplyInfoPersonal: (state, flag) => state.loanApplyInfo.personalInfoIsComplated = flag,
    setLoanApplyInfoJob: (state, flag) => state.loanApplyInfo.jobInfoIsComplated = flag,
    setLoanApplyInfoContact: (state, flag) => state.loanApplyInfo.contactInfoIsComplated = flag,
    setLoanApplyInfoDoc: (state, flag) => state.loanApplyInfo.documentIsComplated = flag,
    setLoanApplyInfoAssets: (state, flag) => state.loanApplyInfo.assetIsComplated = flag
  },
  actions: {
    getCurLoanApply: async ({commit})=>{
      const result = await axios.get('/borrow/loan/current')
      // console.log(result)
      if(result.data.loanApply){
        commit('setLoanApplyId', result.data.loanApply.id)
        commit('setLoanApplyInfoById', result.data)
      }
      return result
    },
  }
})
