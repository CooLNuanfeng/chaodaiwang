<template>
    <div class="page-warp">
        <div class="app-title">个人主体</div>
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">申请信息</van-divider>
        <van-cell-group>
            <van-field
                type="number"
                required
                label="借款金额"
                placeholder="请输入借款金额"
                v-model="money"
            />
            <van-field
                readonly
                clickable
                required
                label="借款期限"
                v-model="term"
                placeholder="选择借款期限"
                @click="termFn"
            />
            <van-field
                clickable
                readonly
                required
                label="还款方式"
                v-model="rePayment"
                placeholder="选择还款方式"
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
            v-model="userName"
        />
        <van-field
            readonly
            required
            label="申请人手机号"
            v-model="userPhone"
        />
        <van-field
            readonly
            required
            label="证件类型"
            v-model="cardType"
        />
        <van-field
            readonly
            required
            label="证件号码"
            v-model="cardNumber"
        />
        <van-field
            required
            label="常住地址"
            v-model="address"
            placeholder="请输入常驻地址、省市区+详细地址"
        />
        <van-field
            clickable
            required
            readonly
            label="婚姻状况"
            v-model="wedding"
            placeholder="选择婚姻状态"
            @click="weddingFn"
        />
        <van-field
            required
            label="⼦女情况"
            v-model="children"
            placeholder="请输入子女情况"
        />
        <div v-show="mateFlag">
            <van-field
                :required="mateFlag"
                label="配偶姓名"
                v-model="mateName"
                placeholder="请输入配偶姓名"
            />
            <van-field
                :required="mateFlag"
                label="配偶手机号"
                v-model="matePhone"
                placeholder="请输入配偶手机号"
            />
        </div>
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">职业信息</van-divider>
        <van-field
            clickable
            required
            readonly
            label="教育程度"
            v-model="eduStatus"
            placeholder="选择学历信息"
            @click="eduFn"
        />
        <van-field
            type="number"
            required
            label="个人月收入"
            placeholder="请输入个人月收入"
            v-model="salary"
        />
        <van-field
            required
            label="发薪日期"
            v-model="salaryDay"
            placeholder="请输入发薪日期"
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
        />
        <van-field
            required
            label="单位性质"
            v-model="companyType"
            placeholder="请输入单位性质"
        />
        <van-field
            type="tel"
            required
            label="办公电话"
            v-model="companyPhone"
            placeholder="办公电话"
        />
        
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">联系人</van-divider>
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

        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">授权项</van-divider>

        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">影像件</van-divider>
        <div class="app-title"><span class="red">*</span>户⼝簿影像件</div>
        <div class="upload-style">
            <van-uploader 
                multiple
                v-model="hukouImg"
                :before-read="beforeRead" 
                :after-read="afterRead"
            >
                <div class="upload-flex">
                    <van-icon name="plus" />户⼝簿影像件
                </div>
            </van-uploader>
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
    Uploader, 
    Toast, 
    Icon,
} from 'vant';

export default {
    name: 'apply',
    data() {
        return {
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
            salary: '', //月收入
            salaryDay: '', //发薪日期
            job: '', //职业
            companyName: '', //单位名称
            companyType: '', //单位性质
            companyPhone: '', //单位电话

            contactName: '', //联系人姓名
            contactPhone: '', //联系人电话
            relation: '', //借款人关系

            curPick: '', //当前的 picker
            showPicker: false, //借款期限 pick 控制
            columns: [], //popPick colmun
 
            hukouImg: [], //户口图

        }
    },
    components: {
        [CellGroup.name]: CellGroup,
        [Divider.name]: Divider,
        [Field.name]: Field,
        [Button.name]: Button,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [Uploader.name]: Uploader,
        [Icon.name]: Icon,
    },
    methods: {
        beforeRead(file) {
            if (file.type == 'image/jpeg' || file.type == 'image/png') {
                return true;
            }else{
                Toast('请上传 jpg 或 png 格式图片');
                return false;
            }
            
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
        },
        relationFn(){
            this.curPick = 'relation'
            this.columns = ['⽗⺟','兄弟姐妹','朋友','同学','其他']
            this.showPicker = true
        },
        jobFn(){
            this.curPick = 'job'
            this.columns = ['企业员⼯','公务员','教师','医⽣/护士/药剂师','会计师','律师','建筑师','个体经营者','企业合伙⼈人/股东/实际控制⼈','⾃自由职业者','其他']
            this.showPicker = true
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
                case 'job':
                    this.job = value;
                    break;
                case 'relation':
                    this.relation = value;
                    break;
            }
            this.showPicker = false;
        }
    }
}
</script>

<style>

</style>
