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
            <div class="app-checkbox">
                <van-checkbox 
                    v-model="checked"
                >
                    <router-link to="/protocol">同意用户注册协议</router-link>
                </van-checkbox>
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
} from 'vant';


export default {
    name: 'register',
    data(){
        return{
            checked: true,
            phone: '',
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
        [Checkbox.name]: Checkbox
    },
    computed: {
        ...mapGetters(['getAppName'])
    },
    
    methods: {
        ...mapMutations(['setToken','setUserId']),
        inputFn(){
            if(this.phone && this.password && this.repassword){
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
                password: this.password
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
