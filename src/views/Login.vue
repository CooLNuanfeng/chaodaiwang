<template>
    <div class="page-warp">
        <van-cell-group>
            <van-field
                v-model="phone"
                label="手机号"
                required
                placeholder="请输入手机号"
                :error-message="errMsg"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
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
            >
                登录
            </van-button>
        </div>
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">{{getAppName}}</van-divider>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { 
    NavBar, 
    CellGroup, 
    Field, 
    Divider, 
    Button, 
    Checkbox 
} from 'vant';

export default {
    name: 'login',
    data(){
        return{
            checked: true,
            phone: '',
            password: '',
            errMsg: '',
            btnDisable: true
        }
    },
    components: {
        [CellGroup.name]: CellGroup,
        [NavBar.name]: NavBar,
        [Field.name]: Field,
        [Divider.name]: Divider,
        [Button.name]: Button,
        [Checkbox.name]: Checkbox
    },
    computed: {
        ...mapGetters(['getAppName'])
    },
    mounted(){
        
    }
}
</script>

<style lang="scss">

</style>
