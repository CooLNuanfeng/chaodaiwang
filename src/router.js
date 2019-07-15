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
      // redirect: '/register',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        backText: '返回'
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
      component: () => import(/* webpackChunkName: "protocol" */ './views/Protocol.vue')
    },
    {
      path: '/uploadCard',
      name: 'uploadCard',
      component: () => import(/* webpackChunkName: "uploadCard" */ './views/UploadCard.vue')
    },
    {
      path: '/apply',
      name: 'apply',
      meta: {
        title: '借款申请',
        backText: '返回'
      },
      component: () => import(/* webpackChunkName: "apply" */ './views/Apply.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  // console.log(Store)
  if(to.meta){
    Store.commit('setNavLeftText',to.meta.backText)
    Store.commit('setNavLeftArrow', to.meta.backText ? true: false)
    Store.commit('setNavTitle', to.meta.title || Store.state.navTitle)
  }
  next()
})

export default router