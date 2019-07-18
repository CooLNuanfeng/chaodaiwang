<template>
  <div class="page-warp">
    <van-steps 
      :active="active"
      :active-color="color"
      :active-icon="status"
    >
      <van-step>上传身份认证</van-step>
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

export default {
  name: 'stepStatus',
  data(){
    return{
      active: 2,
      color: '#07c160', //#f44
      statusText: '认证成功',
      status: 'success',
      btnDisable: false
    }
  },
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  methods: {
    doNext(){
      console.log('next');
      
    }
  }
}
</script>

<style>

</style>

