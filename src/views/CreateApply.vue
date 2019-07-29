<template>
    <div class="page-warp">
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">申请信息</van-divider>
        <van-cell-group>
            <van-field
                type="number"
                required
                label="借款金额"
                placeholder="请输入借款金额,单位为元, 精度为10"
                v-model="money"
                @input="changeFn"
            />
            <van-field
                readonly
                clickable
                required
                label="借款期限"
                v-model="term"
                placeholder="选择借款期限"
                @click="termFn"
                @change="changeFn"
            />
            <van-field
                clickable
                readonly
                required
                label="还款方式"
                v-model="rePayment"
                placeholder="选择还款方式"
                @click="rePaymentFn"
                @change="changeFn"
            />
            <van-field
                v-model="useMsg"
                label="借款用途"
                required
                type="textarea"
                placeholder="请入借款用途"
                rows="1"
                autosize
                @input="changeFn"
            />
            <van-field
                v-model="rePayOrigin"
                label="还款来源"
                required
                type="textarea"
                placeholder="请入还款来源"
                rows="1"
                autosize
                @input="changeFn"
            />
            <van-field
                required
                v-model="code"
                label="推荐码"
                placeholder="请入推荐码"
            />
        </van-cell-group>

        <div style="padding: 20px;">
            <van-button 
                :disabled="btnDisable"
                :block="true"
                type="info"
                @click="doNext"
            >
                提交
            </van-button>
        </div>
        <!-- 公用 pop  -->
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
import { 
    CellGroup, 
    Field, 
    Divider, 
    Button, 
    Picker,
    Popup,
    Toast, 
    Icon,
} from 'vant';

import { mapMutations } from 'vuex'

export default {
    name: 'currentApply',
    data(){
        return{
            money: '', // 借款金额
            term: '', // 借款期限
            rePayment: '', //还款方式
            useMsg: '', //借款用途
            rePayOrigin: '', //还款来源
            code: '', //推荐码

            curPick: '', //当前的 picker
            showPicker: false, //借款期限 pick 控制
            columns: [], //popPick colmun

            btnDisable: true
        }
    },
    components: {
        [CellGroup.name]: CellGroup,
        [Divider.name]: Divider,
        [Field.name]: Field,
        [Button.name]: Button,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [Icon.name]: Icon,
    },
    methods: {
        ...mapMutations(['setLoanApplyId']),
        changeFn(){
            if(!this.money || !this.term || !this.rePaymentFn || !this.useMsg || !this.rePayOrigin || !this.code){
                this.btnDisable = true
            }else{
                this.btnDisable = false
            }
        },
        termFn(){
            this.curPick = 'term'
            this.columns = ['6个⽉','12个月','24个月','36个月']
            this.showPicker = true
        },
        rePaymentFn(){
            this.curPick = 'rePayment'
            this.columns = ['等额本息','先息后本']
            this.showPicker = true
        },
        onConfirm(value) {
            let current = this.curPick;
            switch(current){
                case 'rePayment':
                    this.rePayment = value;
                    break;
                case 'term':
                    this.term = value;
                    break;
            }
            this.showPicker = false;
        },
        doNext(){
            if(this.money%10){
                Toast.open('借款金额最小精度为10元')
                return;
            }
            this.$axios.post('/borrow/loan',{
                amount: this.money,
                termType: 'MONTHLY',
                term: parseInt(this.term),
                repaymentMethod: this.rePayment == '等额本息'? 'AMORTIZATION': 'PAY_AT_THE_END',
                purpose: this.useMsg,
                repaymentSource: this.rePayOrigin,
                referralCode: this.code
            }).then(res => {
                if(res.data){
                    this.$router.push('/infoList')
                }
            })
        }
    }
}
</script>

<style>

</style>
