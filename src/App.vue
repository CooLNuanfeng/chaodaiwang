<template>
  <div id="app">
    <van-nav-bar
        fixed
        :left-text="getNavLeftText"
        :left-arrow="getNavLeftArrow"
        :title="getNavTitle"
        @click-left="navLeftClick"
    />
    <router-view/>
  </div>
</template>
<script>
import { 
    NavBar, 
} from 'vant'
import {mapGetters} from 'vuex';
export default {
  name: 'app',
  data(){
    return {
       
    }
  },
  components: {
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapGetters(['getNavLeftText','getNavLeftArrow', 'getNavTitle'])
  },
  methods: {
    navLeftClick(){
      this.$router.back()
    }
  }
}
</script>

