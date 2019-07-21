<template>
    <div class="page-warp">
        <van-cell-group>
            <van-field
                v-model="phone"
                label="手机号"
                required
                maxlength="11"
                placeholder="请输入手机号"
                :error-message="errPhoneMsg"
                @input="inputFn"
            />
            <van-field
                v-model="smsCode"
                center
                required
                clearable
                label="短信验证码"
                maxlength="6"
                placeholder="请输入短信验证码"
                @input="inputFn"
            >
                <van-button slot="button" size="small" type="primary" :disabled="waiting" @click="getCodeFn">{{msgText}}</van-button>
            </van-field>
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                :error-message="errPwdMsg"
                required
                @input="inputFn"
            />
            <van-field
                v-model="repassword"
                type="password"
                label="确认密码"
                placeholder="请输入再次输入密码"
                :error-message="errRepwdMsg"
                required
                @input="inputFn"
            />
        </van-cell-group>
        <div style="padding: 20px;">
            <div class="app-checkbox" style="display:none;">
                <van-icon name="checked" color="#1989fa" size="20"/>
                <router-link to="/protocol">同意用户注册协议</router-link>
            </div>
            <van-button 
                :disabled="btnDisable"
                :block="true"
                type="info"
                @click="doRegister"
            >
                注册
            </van-button>
            <div class="loginReg-tips">
                已有账号, 去 <router-link to="/login">登录</router-link>
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
    Toast,
    Icon,
} from 'vant';
import { setInterval, clearInterval } from 'timers';


export default {
    name: 'register',
    data(){
        return{
            checked: true,
            phone: '',
            smsCode: '',
            waiting: false,
            msgText: '发送验证码',
            password: '',
            repassword: '',
            errPhoneMsg: '',
            errPwdMsg: '',
            errRepwdMsg: '',
            btnDisable: true
        }
    },
    components: {
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Divider.name]: Divider,
        [Button.name]: Button,
        [Checkbox.name]: Checkbox,
        [Icon.name]: Icon,
    },
    computed: {
        ...mapGetters(['getAppName'])
    },
    
    methods: {
        ...mapMutations(['setToken','setUserId']),
        getCodeFn(){
            if(!this.phone){
                Toast('请输入手机号')
                return
            }
            this.$axios.post('/user/register/code',{
                phone: this.phone
            }).then(res => {
                if(res.data){
                    this.waiting = true
                    this.msgText = '60s'
                    this.countIntertimer()
                }
            })
        },
        countIntertimer(){
            let count = 60
            let timer = setInterval(()=>{
                count--;
                this.msgText = count + 's'
                if(count<=0){
                    clearInterval(timer)
                    this.waiting = false
                    this.msgText = '重新发送'
                }
            },1000);
        },
        inputFn(){
            if(this.phone && this.password && this.repassword && this.smsCode){
                this.btnDisable = false
            }else{
                this.btnDisable = true
            }
        },
        doRegister(){
            if(!isPhone(this.phone)){
                this.errPhoneMsg = '请输入正确的手机号'
                return
            }else{
                this.errPhoneMsg = ''
            }

            if(!checkPwdLen(this.password)){
                this.errPwdMsg = '密码为6-12位字符'
                return
            }else{
                this.errPwdMsg = ''
            }

            if(this.repassword !== this.password){
                this.errRepwdMsg = '两次输入的密码不同'
                return
            }else{
                this.errRepwdMsg = ''
            }
            this.$axios.post('/user/register',{
                phone: this.phone,
                password: this.password,
                mobileCode: this.smsCode
            }).then(res => {
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

<style>

</style>
