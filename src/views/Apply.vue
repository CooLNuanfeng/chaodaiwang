<template>
    <div class="page-warp">
        <div class="app-title">个人主体</div>
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">申请信息</van-divider>
        <van-cell-group>
            <van-field
                clickable
                required
                label="借款金额"
                placeholder="请输入借款金额"
                :value="money"
                @touchstart.native.stop="moneyShow = true"
            />
            <van-field
                clickable
                required
                label="借款期限"
                :value="term"
                placeholder="选择借款期限"
                @click="termFn"
            />
            <van-field
                clickable
                required
                label="还款方式"
                :value="rePayment"
                placeholder="选择借款期限"
                @click="rePaymentFn"
            />
            <van-field
                v-model="useMsg"
                label="借款用途"
                required
                type="textarea"
                placeholder="请入借款用途"
                rows="1"
                autosize
            />
            <van-field
                v-model="rePayOrigin"
                label="还款来源"
                required
                type="textarea"
                placeholder="请入还款来源"
                rows="1"
                autosize
            />
            <van-field
                v-model="code"
                label="推荐码"
                placeholder="请入推荐码"
            />
        </van-cell-group>
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">借款人信息</van-divider>
        <van-field
            readonly
            required
            label="申请人姓名"
            :value="userName"
        />
        <van-field
            readonly
            required
            label="申请人手机号"
            :value="userPhone"
        />
        <van-field
            readonly
            required
            label="证件类型"
            :value="cardType"
        />
        <van-field
            readonly
            required
            label="证件号码"
            :value="cardNumber"
        />
        <van-field
            required
            label="常住地址"
            :value="address"
            placeholder="请输入常驻地址、省市区+详细地址"
        />
        <van-field
            clickable
            required
            label="婚姻状况"
            :value="wedding"
            placeholder="选择婚姻状态"
            @click="weddingFn"
        />
        <van-field
            required
            label="⼦女情况"
            :value="children"
            placeholder="请输入子女情况"
        />
        <div v-show="mateFlag">
            <van-field
                :required="mateFlag"
                label="配偶姓名"
                :value="mateName"
                placeholder="请输入配偶姓名"
            />
            <van-field
                :required="mateFlag"
                label="配偶手机号"
                :value="matePhone"
                placeholder="请输入配偶手机号"
            />
        </div>
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">职业信息</van-divider>
        <van-field
            clickable
            required
            label="教育程度"
            :value="eduStatus"
            placeholder="选择学历信息"
            @click="eduFn"
        />
        
        <!-- 公用 pop  -->
        <van-number-keyboard
            v-model="money"
            title="精度为10，单位为元"
            :show="moneyShow"
            :maxlength="6"
            @blur="moneyShow = false"
        />
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
    NumberKeyboard,
} from 'vant';

export default {
    name: 'apply',
    data() {
        return {
            moneyShow: false, // 借款金额 数组输入控制
            money: '', // 借款金额
            term: '', // 借款期限
            rePayment: '', //还款方式
            useMsg: '', //借款用途
            rePayOrigin: '', //还款来源
            code: '', //推荐码

            userName: 'aa', // 姓名
            userPhone: '1834', //手机号
            cardType: '身份证', //证件类型
            cardNumber: '3702343443', //证件号码
            address: '', //常驻地址
            wedding: '', //婚姻状况
            children: '', //子女状况
            mateFlag: false, //配偶标记
            mateName: '', //配偶姓名
            matePhone: '', //配偶手机

            eduStatus: '', //教育程度

            curPick: '', //当前的 picker
            showPicker: false, //借款期限 pick 控制
            columns: [], //popPick colmun
        }
    },
    components: {
        [CellGroup.name]: CellGroup,
        [Divider.name]: Divider,
        [Field.name]: Field,
        [Button.name]: Button,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [NumberKeyboard.name]: NumberKeyboard
    },
    methods: {
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

        weddingFn(){
            this.curPick = 'wedding'
            this.columns = ['已婚','未婚','离异','丧偶']
            this.showPicker = true
        },
        eduFn(){
            this.curPick = 'edu'
            this.columns = ['⾼中以下','大专','本科','硕⼠以上']
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
                case 'wedding':
                    this.wedding = value;
                    if(value == '已婚'){
                        this.mateFlag = true
                    }else{
                        this.mateFlag = false
                    }
                    break;
                case 'edu':
                    this.eduStatus = value;
                    break;
            }
            this.showPicker = false;
        }
    }
}
</script>

<style>

</style>
