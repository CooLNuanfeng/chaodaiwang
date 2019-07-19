<template>
    <div class="page-warp">
        <van-field
            required
            label="联系人姓名"
            v-model="contactName"
            placeholder="请输入联系人姓名"
        />
        <van-field
            required
            label="联系人手机号"
            v-model="contactPhone"
            placeholder="请输入联系人手机号"
        />
        <van-field
            required
            label="与借款人关系"
            v-model="relation"
            placeholder="请选择关系类型"
            @click="relationFn"
        />
        <div style="padding: 20px;">
            <van-button 
                :disabled="btnDisable"
                :block="true"
                type="info"
                @click="doSave"
            >
                保存
            </van-button>
        </div>

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
    Button, 
    Picker,
    Popup,
    // Toast, 
} from 'vant';

export default {
    name: 'conact',
    data(){
        return {
            loanApplyId: '',
            contactName: '', //联系人姓名
            contactPhone: '', //联系人电话
            relation: '', //借款人关系

            curPick: '', //当前的 picker
            showPicker: false, // pick 控制
            columns: [], //popPick colmun

            btnDisable: true,
        }
    },
    mounted(){
        this.loanApplyId = this.getLoanApplyId();
        if(this.loanApplyId){
            this.fetchData()
        }else{
            this.getCurLoanApply().then(res => {
                this.loanApplyId = res.data.loanApply.id
                this.fetchData()
            });
        }
    },
    components: {
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Button.name]: Button,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
    },
    methods: {
        fetchData(){

        },
        jobFn(){
            this.curPick = 'job'
            this.columns = [
                {'key': 'EMPLOYEES_OF_ENTERPRISE', 'text':'企业员工'},
                {'key': 'CIVIL_SERVANTS', 'text':'公务员'},
                {'key': 'TEACHERS', 'text':'教师'},
                {'key': 'DOCTOR_NURSE_PHARMACIST', 'text':'医生/护士/药剂师'},
                {'key': 'ACCOUNTANTS', 'text':'会计师'},
                {'key': 'LAWYERS', 'text':'律师'},
                {'key': 'ARCHITECTS', 'text':'建筑师'},
                {'key': 'INDIVIDUAL_OPERATORS', 'text':'个体经营者'},
                {'key': 'ENTERPRISE_PARTNER', 'text':'企业合伙人/股东/实际控股⼈'},
                {'key': 'FREE', 'text':'⾃由职业者'},
                {'key': 'OTHER', 'text':'其他'},
            ]
            this.showPicker = true
        },
        onConfirm(item) {
            let current = this.curPick;
            switch(current){
                case 'job':
                    this.jobkey = item.key
                    this.job = item.text
                    break;
            }
            this.showPicker = false;
            this.changFn()
        },
        changFn(){

        }
    }
}
</script>

<style>

</style>
