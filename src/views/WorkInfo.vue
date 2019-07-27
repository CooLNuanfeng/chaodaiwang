<template>
    <div class="page-warp">
        <van-field
            type="number"
            required
            label="个人月收入"
            placeholder="请输入个人月收入"
            v-model="salary"
            @input="changFn"
        />
        <van-field
            readonly
            required
            label="发薪日期"
            v-model="salaryDay"
            placeholder="请选择发薪日期"
            @click="salaryDayFn"
        />
        <van-field
            readonly
            required
            label="职业"
            v-model="job"
            placeholder="请选择职业类型"
            @click="jobFn"
        />
        <van-field
            required
            label="单位名称"
            v-model="companyName"
            placeholder="请输入单位名称"
            @input="changFn"
        />
        <van-field
            required
            label="单位性质"
            v-model="companyType"
            placeholder="请输入单位性质"
            @input="changFn"
        />
        <van-field
            type="tel"
            required
            label="办公电话"
            v-model="companyPhone"
            placeholder="办公电话"
            @input="changFn"
        />
        <van-field
            type="tel"
            required
            label="电话分机号"
            v-model="companyPhoneExt"
            placeholder="电话分机号"
            @input="changFn"
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
    Toast, 
} from 'vant';
import {isCellPhone, isExtPhone} from '../utils/util'
import {mapActions, mapGetters, mapMutations} from 'vuex'

const jobMap = {
    'EMPLOYEES_OF_ENTERPRISE': '企业员工',
    'CIVIL_SERVANTS': '公务员',
    'TEACHERS': '教师',
    'DOCTOR_NURSE_PHARMACIST': '医生/护士/药剂师',
    'ACCOUNTANTS': '会计师',
    'LAWYERS': '律师',
    'ARCHITECTS': '建筑师',
    'INDIVIDUAL_OPERATORS': '个体经营者',
    'ENTERPRISE_PARTNER': '企业合伙人/股东/实际控股⼈',
    'FREE': '⾃由职业者',
    'OTHER': '其他',
}

export default {
    name: 'workInfo',
    data(){
        return {
            loanApplyId: '',
            salary: '', //月收入
            salarykey: '',
            salaryDay: '', //发薪日期
            job: '', //职业
            jobkey: '', //职业key
            companyName: '', //单位名称
            companyType: '', //单位性质
            companyPhone: '', //单位电话
            companyPhoneExt: '',

            curPick: '', //当前的 picker
            showPicker: false, // pick 控制
            columns: [], //popPick colmun

            btnDisable: true,
        }
    },
    components: {
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Button.name]: Button,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
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
    methods: {
        ...mapMutations(['setLoanApplyInfoJob']),
        ...mapGetters(['getLoanApplyId']),
        ...mapActions(['getCurLoanApply']),
        makeData(data){
            this.salary = data.monthlyIncome
            this.salarykey = data.incomePayDate.substring(0,data.incomePayDate.length-1)
            this.salaryDay = data.incomePayDate
            this.job = jobMap[data.occupation]
            this.jobkey = data.occupation
            this.companyName = data.companyName
            this.companyType = data.companyCategory
            this.companyPhone = data.tel
            this.companyPhoneExt = data.telExt
            this.changFn()
        },
        fetchData(){
            this.$axios.get(`/borrow/loan/${this.loanApplyId}/job`).then(res => {
                if(res.data){
                    this.makeData(res.data)
                }    
            })
        },
        salaryDayFn(){
            this.curPick = 'salary'
            this.columns = []
            for(let i=1; i<32; i++){
                this.columns.push({
                    key: i,
                    text: i + '号'
                })
            }
            this.showPicker = true
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
                case 'salary':
                    this.salarykey = item.key
                    this.salaryDay = item.text
                    break;
            }
            this.showPicker = false;
            this.changFn()
        },
        changFn(){
            if(!this.salary || !this.salaryDay || !this.job || !this.companyName || !this.companyType || !this.companyPhone || !this.companyPhoneExt){
                this.btnDisable = true
            }else{
                this.btnDisable = false
            }
        },
        doSave(){
            if(!isCellPhone(this.companyPhone) || !isExtPhone(this.companyPhoneExt)){
                Toast('电话格式不正确')
                return
            }

            this.$axios.post(`/borrow/loan/${this.loanApplyId}/job`,{
                "monthlyIncome": this.salary,//月收入
                "incomePayDate": this.salaryDay,//发薪日
                "occupation": this.jobkey,
                "companyName": this.companyName,//单位名称
                "companyCategory": this.companyType,//单位性质
                "tel": this.companyPhone,//办公电话
                "telExt": this.companyPhoneExt//办公电话分机号
            }).then(res => {
                if(res.data){
                    this.$router.replace('/infoList')
                    this.setLoanApplyInfoJob(true)
                }
            })
        }
    }
}
</script>

<style>

</style>
