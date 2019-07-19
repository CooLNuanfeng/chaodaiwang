import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Store from './store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'home',
      meta: {
        title: '',
      },
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        backText: ''
      },
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册',
        backText: '返回'
      },
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/protocol',
      name: 'protocol',
      meta: {
        title: '用户协议',
        backText: '返回'
      },
      component: () => import(/* webpackChunkName: "protocol" */ './views/Protocol.vue')
    },
    {
      path: '/uploadCard',
      name: 'uploadCard',
      meta: {
        title: '身份证实名认证',
        backText: '返回'
      },
      component: () => import(/* webpackChunkName: "uploadCard" */ './views/UploadCard.vue')
    },
    {
      path: '/createApply',
      name: 'createApply',
      meta: {
        title: '借款申请',
        backText: '返回'
      },
      component: () => import(/* webpackChunkName: "createApply" */ './views/CreateApply.vue')
    },
    {
      path: '/stepStatus',
      name: 'stepStatus',
      meta: {
        title: '认证进度',
        backText: '返回'
      },
      component: () => import(/* webpackChunkName: "stepStatus" */ './views/StepStatus.vue')
    },
    {
      path: '/infoList',
      name: 'infoList',
      meta: {
        title: '完善信息',
        backText: '返回'
      },
      component: () => import(/* webpackChunkName: "infoList" */ './views/InfoList.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      meta: {
        title: '个人信息',
        backText: '返回'
      },
      component: () => import(/* webpackChunkName: "personal" */ './views/Personal.vue')
    },
    {
      path: '/workinfo',
      name: 'workinfo',
      meta: {
        title: '工作信息',
        backText: '返回'
      },
      component: () => import(/* webpackChunkName: "workinfo" */ './views/WorkInfo.vue')
    },
    {
      path: '/conact',
      name: 'conact',
      meta: {
        title: '联系人信息',
        backText: '返回'
      },
      component: () => import(/* webpackChunkName: "conact" */ './views/Conact.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if(to.meta){
    Store.commit('setNavLeftText',to.meta.backText)
    Store.commit('setNavLeftArrow', to.meta.backText ? true: false)
    Store.commit('setNavTitle', to.meta.title || Store.state.appName)
  }
  next()
})

export default router