<template>
    <div class="page-warp">
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">身份信息</van-divider>
        <van-cell-group>
            <van-field
            v-model="name"
            label="姓名"
            required
            placeholder="请输入姓名"
            @input="changeFn"
            />
            <van-field
                v-model="idNumber"
                type="number"
                label="身份证号"
                placeholder="请输入身份证号"
                required
                maxlength="18"
                @input="changeFn"
            />
        </van-cell-group>
        <div style="padding: 20px;">
          <van-button 
              :disabled="btnDisable"
              :block="true"
              type="info"
              @click="doNext"
          >
              确认身份信息
          </van-button>
        </div>
    </div>
</template>

<script>
import { 
    CellGroup, 
    Field, 
    Divider, 
    Button, 
    // Icon, 
} from 'vant'
import {mapActions} from 'vuex'
export default {
    name: 'confrimId',
    data(){
        return {
            name: '',
            idNumber: '',
            btnDisable: true,
        }
    },
    components: {
        [Button.name]: Button,
        [CellGroup.name]:CellGroup, 
        [Field.name]: Field, 
        [Divider.name]: Divider,
    },
    mounted(){
        this.$axios.get(`/borrow/idCard`).then(res => {
            // console.log(res);
            this.name = res.data.name
            this.idNumber = res.data.idNo
            this.changeFn()
        })
    },
    methods: {
        ...mapActions(['getCurLoanApply']),
        changeFn(){
            if(!this.name || !this.idNumber){
                this.btnDisable = true
            }else{
                this.btnDisable = false
            }
        },
        doNext(){
            this.$axios.post('/borrow/idCard',{
                name: this.name,
                idNo: this.idNumber
            }).then(res => {
                if(res.data){
                    this.getCurLoanApply().then(res => {
                        if(res.data.loanApply && res.data.loanApply.id){
                            // this.$router.push('/stepStatus')
                            this.$router.push('/infoList')
                        }else{
                            this.$router.push('/createApply')
                        }
                    })
                }
            })
            
        }
    }
}
</script>

<style>

</style>
