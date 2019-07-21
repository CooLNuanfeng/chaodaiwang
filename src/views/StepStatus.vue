<template>
  <div class="page-warp">
    <van-steps 
      :active="active"
      :active-color="color"
      :active-icon="status"
    >
      <van-step>上传身份证</van-step>
      <van-step>认证中</van-step>
      <van-step>{{statusText}}</van-step>
    </van-steps>
    <div style="padding: 20px;">
      <van-button 
          :disabled="btnDisable"
          :block="true"
          type="info"
          @click="doNext"
      >
          下一步
      </van-button>
    </div>
  </div>
</template>

<script>
import { 
    Step, 
    Steps,
    Button, 
    Icon, 
} from 'vant'
import { mapActions } from 'vuex';

export default {
  name: 'stepStatus',
  data(){
    return{
      active: 1,
      color: '#07c160',
      statusText: '',
      status: '',

      name: '',
      idNumber: '',
      btnDisable: true
    }
  },
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  mounted(){
    this.$axios.get('/borrow/realName/status').then(res => {
      if(res.data){
        this.active = 2
        this.statusText = '认证成功',
        this.status = 'success'
        this.btnDisable = false
      }else{
        this.active = 2
        this.statusText = '认证失败',
        this.color = '#f44'
        this.status = 'info'
        this.btnDisable = true
      }
    })
  },
  methods: {
    ...mapActions(['getCurLoanApply']),
    doNext(){
      this.getCurLoanApply().then(res => {
        if(res.data.loanApply){
          this.$router.push('/infoList')
        }else{
          this.$router.push('/createApply')
        }
      })
    }
  }
}
</script>

<style>

</style>

