<template>
    <div class="page-warp">
        <van-cell-group>
            <van-field
                v-model="phone"
                label="手机号"
                required
                placeholder="请输入手机号"
                maxlength="11"
                :error-message="errPhoneMsg"
                @input="inputFn"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                :error-message="errPwdMsg"
                required
                @input="inputFn"
            />
        </van-cell-group>
        <div style="padding: 20px;">
            <!-- <div class="app-checkbox">
                <van-icon name="checked" color="#1989fa" size="20"/>
                <router-link to="/protocol">同意用户注册协议</router-link>
            </div> -->
            <van-button 
                :disabled="btnDisable"
                :block="true"
                type="info"
                @click="doLogin"
            >
                登录
            </van-button>
            <div class="loginReg-tips">
                还没有账号, 去 <router-link to="/register">注册</router-link>
            </div>
        </div>
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">{{getAppName}}</van-divider>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {isPhone,checkPwdLen} from '../utils/util'
import { 
    CellGroup, 
    Field, 
    Divider, 
    Button, 
    Checkbox,
} from 'vant';

export default {
    name: 'login',
    data(){
        return{
            checked: true,
            phone: '',
            password: '',
            errPhoneMsg: '',
            errPwdMsg: '',
            btnDisable: true
        }
    },
    components: {
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Divider.name]: Divider,
        [Button.name]: Button,
        [Checkbox.name]: Checkbox
    },
    computed: {
        ...mapGetters(['getAppName'])
    },
    mounted(){
        
    },
    methods: {
        ...mapMutations(['setToken','setUserId']),
        inputFn(){
            if(this.phone && this.password){
                this.btnDisable = false
            }else{
                this.btnDisable = true
            }
        },
        doLogin(){
            if(!isPhone(this.phone)){
                this.errPhoneMsg = '请输入正确的手机号'
                return;
            }else{
                this.errPhoneMsg = ''
            }
            if(!checkPwdLen(this.password)){
                this.errPwdMsg = '密码为6-12位字符'
                return;
            }else{
                this.errPwdMsg = ''
            }
            this.$axios.post('/user/login',{
                phone: this.phone,
                password: this.password
            }).then(res=>{
                if(res.status == 200){
                    this.setToken(res.data.token);
                    this.setUserId(res.data.userId);
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('userId',res.data.userId);
                    this.$router.push('/uploadCard')
                }
            })
        }
    }
}
</script>

<style lang="scss">

</style>
