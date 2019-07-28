<template>
    <div class="page-warp">
        <van-field
            clickable
            required
            readonly
            label="业务类型"
            v-model="business"
            placeholder="选择业务类型"
            @click="businessFn"
        />
        <van-field
            required
            label="抵押物所在省"
            placeholder="请输入抵押物所在省"
            v-model="province"
            @input="changFn"
        />
        <van-field
            required
            label="抵押物所在市"
            placeholder="请输入抵押物所在市"
            v-model="city"
            @input="changFn"
        />
        <van-field
            required
            label="抵押物所在区"
            placeholder="请输入抵押物所在区"
            v-model="district"
            @input="changFn"
        />
        <van-field
            required
            label="抵押物所在街道地址"
            placeholder="请输入抵押物所在街道地址"
            v-model="address"
            @input="changFn"
        />
        <van-field
            required
            label="抵押物所属行政区域"
            placeholder="抵押物所属行政区域(具体到乡镇)"
            v-model="region"
            @input="changFn"
        />
        <van-field
            clickable
            required
            readonly
            label="规划⽤途"
            v-model="planUse"
            placeholder="请选择规划⽤途"
            @click="planUseFn"
        />
        <van-field
            clickable
            required
            readonly
            label="实际⽤途"
            v-model="actualUse"
            placeholder="请选择实际⽤途"
            @click="actualUseFn"
        />
        <van-field
            clickable
            required
            readonly
            label="房型"
            v-model="houseType"
            placeholder="请选择房型"
            @click="houseTypeFn"
        />
        <van-field
            required
            label="楼层"
            type="number"
            placeholder="请输入所在楼层"
            v-model="floor"
            @input="changFn"
        />
        <van-field
            required
            label="总楼层"
            type="number"
            placeholder="请输入总楼层"
            v-model="allFloor"
            @input="changFn"
        />
        <van-field
            clickable
            required
            readonly
            label="是否有地下室"
            v-model="baseMent"
            placeholder="请选择是否有地下室"
            @click="baseMentFn"
        />
        <van-field
            clickable
            required
            readonly
            label="房屋朝向"
            v-model="houseOrientation"
            placeholder="请选择房屋朝向"
            @click="houseOrientationFn"
        />
        <van-field
            clickable
            required
            readonly
            label="是否有居民水电"
            v-model="resident"
            placeholder="请选择是否居民水电"
            @click="residentFn"
        />
        <van-field
            clickable
            required
            readonly
            label="使用状态"
            v-model="useStatus"
            placeholder="请选择使用状态"
            @click="useStatusFn"
        />
        <van-field
            required
            label="中介1名称"
            placeholder="请输入中介1名称"
            v-model="imOneName"
            @input="changFn"
        />
        <van-field
            required
            label="中介1电话"
            type="tel"
            maxlength="11"
            placeholder="请输入中介1电话"
            v-model="imOnePhone"
            @input="changFn"
        />
        <van-field
            required
            label="中介1近期成交价"
            type="number"
            placeholder="请输入中介1近期成交价"
            v-model="imOneRecentPrice"
            @input="changFn"
        />
        <van-field
            required
            label="中介1快速交价"
            type="number"
            placeholder="请输入中介1快速交价"
            v-model="imOneQuickPrice"
            @input="changFn"
        />
        <van-field
            required
            label="中介1出售周期"
            type="number"
            maxlength="2"
            placeholder="请输入中介1出售周期(月)"
            v-model="imOneSellPeriod"
            @input="changFn"
        />



        <van-field
            label="中介2名称"
            placeholder="请输入中介2名称"
            v-model="imTwoName"
            @input="changFn"
        />
        <van-field
            label="中介2电话"
            type="tel"
            maxlength="11"
            placeholder="请输入中介2电话"
            v-model="imTwoPhone"
            @input="changFn"
        />
        <van-field
            label="中介2近期成交价"
            type="number"
            placeholder="请输入中介2近期成交价"
            v-model="imTwoRecentPrice"
            @input="changFn"
        />
        <van-field
            label="中介2快速交价"
            type="number"
            placeholder="请输入中介2快速交价"
            v-model="imTwoQuickPrice"
            @input="changFn"
        />
        <van-field
            label="中介2出售周期"
            type="number"
            maxlength="2"
            placeholder="请输入中介2出售周期(月)"
            v-model="imTwoSellPeriod"
            @input="changFn"
        />
        <van-field
            label="其他主体名称"
            placeholder="请输入其他主体名称"
            v-model="otherName"
            @input="changFn"
        />
        <van-field
            label="其他主体电话"
            type="tel"
            maxlength="11"
            placeholder="请输入其他主体电话"
            v-model="otherPhone"
            @input="changFn"
        />
        <van-field
            label="其他主体关系"
            placeholder="请输入其他主体关系"
            v-model="otherRelation"
            @input="changFn"
        />
        <van-field
            label="其他主体信息"
            placeholder="请输入其他主体信息"
            v-model="otherInfo"
            @input="changFn"
        />
        <van-field
            clickable
            readonly
            label="其他主体婚姻状况"
            v-model="otherMarry"
            placeholder="请选择其他主体婚姻状况"
            @click="otherMarryFn"
        />
        <van-field
            label="其他主体工作单位"
            placeholder="请输入其他主体工作单位"
            v-model="otherCompany"
            @input="changFn"
        />
        <van-field
            label="其他主体收入"
            type="number"
            placeholder="请输入其他主体月收入(元)"
            v-model="otherIncome"
            @input="changFn"
        />
        <van-field
            label="其他备注信息"
            placeholder="请输入备注信息"
            v-model="remark"
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
    Button, 
    Picker,
    Popup,
    Toast,
    // RadioGroup, 
    // Radio,
} from 'vant'

import {mapActions, mapGetters, mapMutations} from 'vuex'

import {isPhone} from '../utils/util'

const businessMap = {
    'ONE':'一抵',
    'TWO':'二抵',
    'ONE_TO':'一抵转单',
    'TWO_TO':'二抵转单',
}
const planUseMap = {
    'ZHU_ZHAI': '住宅',
    'BIE_SHU': '别墅',
    'GONG_YU': '公寓',
    'OTHER': '其他',
}
const actualUseMap = {
    'JU_ZHU': '居住',
    'BAN_GONG': '办公',
    'OTHER': '其他',
}

const houseTypeMap = {
    'ONE_ONE': '一室一厅',
    'TWO_ONE': '两室一厅',
    'THREE_ONE': '三室一厅',
    'FOUR_ONE': '四室一厅',
    'FOUR_TWO': '四室两厅',
    'OTHER': '其他',
}

const boolenMap = {
    'YES': '是',
    'NO': '否',
}

const houseOrientationMap = {
    'DONG': '东',
    'NAN': '南',
    'XI': '西',
    'BEI': '北',
    'DONG_NAN': '东南',
    'DONG_BEI': '东北',
    'XI_NAN': '西南',
    'XI_BEI': '西北',
}

const useStatusMap = {
    'ZI_ZHU': '自住',
    'KONG_ZHI': '空置',
    'CHU_ZU': '出租',
    'WU_XI_YI_JIE_YONG': '无协议借用',
    'SAN_FANG_ZHUAN_ZU': '委托第三方转租',
    'OTHER': '其他',
}

const marryMap = {
    'MARRIED':'已婚',
    'UNMARRIED':'未婚',
    'DIVORCE':'离异',
    'WIDOWHOOD':'丧偶',
}

export default {
    name: 'assetsUpload',
    data(){
        return {
            loanApplyId: '',

            business: '', //类型
            businessKey: '',
            province: '', //省
            city: '', //市
            district: '', //区
            address: '', //街道地址
            region: '', //行政区域
            planUse: '', //规划用途
            planUseKey: '',
            actualUse: '', //实际用途
            actualUseKey: '',
            houseType: '', //房型
            houseTypeKey: '',
            floor: '', //楼层
            allFloor: '', //总楼层
            baseMent: '', //地下室
            baseMentKey: '',
            houseOrientation: '', //房屋朝向
            houseOrientationKey: '',
            resident: '', //居民水电
            residentKey: '',
            useStatus: '', //使用状态
            useStatusKey: '',
            imOneName: '', //中介1名称
            imOnePhone: '', //中介1电话
            imOneRecentPrice: '', //中介1近期成交价
            imOneQuickPrice: '', //中介1快速成交价
            imOneSellPeriod: '', //中介1出售周期

            imTwoName: '',//中介2
            imTwoPhone: '',
            imTwoRecentPrice: '',
            imTwoQuickPrice: '',
            imTwoSellPeriod: '',
            otherName: '',
            otherPhone: '',
            otherRelation: '', //其他主体关系
            otherInfo: '', //其他主体信息
            otherMarry: '', //其他主体婚姻状况
            otherMarryKey: '',
            otherCompany: '',
            otherIncome: '', 
            remark: '',


            btnDisable: true,
            showPicker: false,
            columns: [],
            curPick: '',

        }
    },
    components: {
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Button.name]: Button,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        // [RadioGroup.name]: RadioGroup,
        // [Radio.name]: Radio,
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
        ...mapMutations(['setLoanApplyInfoAssets']),
        ...mapGetters(['getLoanApplyId']),
        ...mapActions(['getCurLoanApply']),
        makeData(data){
            this.businessKey = data.type
            this.business = businessMap[data.type]
            this.province = data.addrProvince
            this.city = data.addrCity
            this.district = data.addrDistrict
            this.address = data.addrDetail
            this.region = data.subordinateRegion
            this.planUseKey = data.plannedPurpose
            this.planUse = planUseMap[data.plannedPurpose]
            this.actualUseKey = data.actualPurpos
            this.actualUse = actualUseMap[data.actualPurpos]
            this.houseTypeKey = data.layout
            this.houseType = houseTypeMap[data.layout]
            this.floor = data.floor
            this.allFloor = data.totalFloor
            this.baseMentKey = data.isBasement ? 'YES': 'NO'
            this.baseMent = boolenMap[this.baseMentKey]
            this.houseOrientationKey = data.orientation
            this.houseOrientation = houseOrientationMap[data.orientation]
            this.residentKey = data.isResident ? 'YES': 'NO'
            this.resident = boolenMap[this.residentKey]
            this.useStatusKey = data.useStatus
            this.useStatus = useStatusMap[data.useStatus]
            this.imOneName = data.intermediaryOneName
            this.imOnePhone = data.intermediaryOnePhone
            this.imOneRecentPrice = data.intermediaryOneRecentPrice
            this.imOneQuickPrice = data.intermediaryOneQuickPrice
            this.imOneSellPeriod = data.intermediaryOneSellPeriod
            this.imTwoName = data.intermediaryTwoName
            this.imTwoPhone = data.intermediaryTwoPhone
            this.imTwoRecentPrice = data.intermediaryTwoRecentPrice
            this.imTwoQuickPrice = data.intermediaryTwoQuickPrice
            this.imTwoSellPeriod = data.intermediaryTwoSellPeriod
            this.otherName = data.otherOwnerName
            this.otherPhone = data.otherOwnerPhone
            this.otherRelation = data.otherOwnerRelation
            this.otherInfo = data.otherOwnerInfo
            this.otherMarryKey = data.otherOwnerMaritalStatus
            this.otherMarry = marryMap[data.otherOwnerMaritalStatus]
            this.otherCompany = data.otherOwnerCompanyName
            this.otherIncome = data.otherOwnerMonthlyIncome,
            this.remark = data.remark
            this.changFn()
        },
        fetchData(){
            this.$axios.get(`/borrow/loan/${this.loanApplyId}/collateralAssets`).then(res => {
                // console.log(res);
                this.makeData(res.data)
            })
        },
        businessFn(){
            this.curPick = 'business'
            this.columns = [
                {'key': 'ONE', 'text':'一抵'},
                {'key': 'TWO', 'text':'二抵'},
                {'key': 'ONE_TO', 'text':'一抵转单'},
                {'key': 'TWO_TO', 'text':'二抵转单'},
            ];
            this.showPicker = true
        },
        changFn(){
            if(!this.businessKey || !this.province || !this.city || !this.district || !this.address || !this.region || !this.planUseKey || !this.actualUseKey || !this.houseTypeKey || !this.floor || !this.allFloor || !this.baseMentKey || !this.houseOrientationKey || !this.residentKey || !this.useStatusKey || !this.imOneName || !this.imOnePhone || !this.imOneRecentPrice || !this.imOneQuickPrice || !this.imOneSellPeriod){
                this.btnDisable = true
            }else{
                this.btnDisable = false
            }
        },
        planUseFn(){
            this.curPick = 'planUse'
            this.columns = [
                {'key': 'ZHU_ZHAI', 'text':'住宅'},
                {'key': 'BIE_SHU', 'text':'别墅'},
                {'key': 'GONG_YU', 'text':'公寓'},
                {'key': 'OTHER', 'text':'其他'},
            ];
            this.showPicker = true
        },
        actualUseFn(){
            this.curPick = 'actualUse'
            this.columns = [
                {'key': 'JU_ZHU', 'text':'居住'},
                {'key': 'BAN_GONG', 'text':'办公'},
                {'key': 'OTHER', 'text':'其他'},
            ];
            this.showPicker = true
        },
        houseTypeFn(){
            this.curPick = 'houseType'
            this.columns = [
                {'key': 'ONE_ONE', 'text':'一室一厅'},
                {'key': 'TWO_ONE', 'text':'两室一厅'},
                {'key': 'THREE_ONE', 'text':'三室一厅'},
                {'key': 'FOUR_ONE', 'text':'四室一厅'},
                {'key': 'FOUR_TWO', 'text':'四室两厅'},
                {'key': 'OTHER', 'text':'其他'},
            ];
            this.showPicker = true
        },
        baseMentFn(){
            this.curPick = 'baseMent'
            this.columns = [
                {'key': 'YES', 'text':'是'},
                {'key': 'NO', 'text':'否'},
            ];
            this.showPicker = true
        },
        houseOrientationFn(){
            this.curPick = 'houseOrientation'
            this.columns = [
                {'key': 'DONG', 'text':'东'},
                {'key': 'NAN', 'text':'南'},
                {'key': 'XI', 'text':'西'},
                {'key': 'BEI', 'text':'北'},
                {'key': 'DONG_NAN', 'text':'东南'},
                {'key': 'DONG_BEI', 'text':'东北'},
                {'key': 'XI_NAN', 'text':'西南'},
                {'key': 'XI_BEI', 'text':'西北'},
            ];
            this.showPicker = true
        },
        residentFn(){
            this.curPick = 'resident'
            this.columns = [
                {'key': 'YES', 'text':'是'},
                {'key': 'NO', 'text':'否'},
            ];
            this.showPicker = true
        },
        useStatusFn(){
            this.curPick = 'useStatus'
            this.columns = [
                {'key': 'ZI_ZHU', 'text':'自住'},
                {'key': 'KONG_ZHI', 'text':'空置'},
                {'key': 'CHU_ZU', 'text':'出租'},
                {'key': 'WU_XI_YI_JIE_YONG', 'text':'无协议借用'},
                {'key': 'SAN_FANG_ZHUAN_ZU', 'text':'委托第三方转租'},
                {'key': 'OTHER', 'text':'其他'},
            ];
            this.showPicker = true
        },
        otherMarryFn(){
            this.curPick = 'otherMarry'
            this.columns = [
                {'key': 'MARRIED', 'text':'已婚'},
                {'key': 'UNMARRIED', 'text':'未婚'},
                {'key': 'DIVORCE', 'text':'离异'},
                {'key': 'WIDOWHOOD', 'text':'丧偶'},
            ];
            this.showPicker = true
        },

        doSave(){
            if(!isPhone(this.imOnePhone)){
                Toast('中介1手机号格式不正确')
                return
            }

            if(this.imTwoPhone && !isPhone(this.imTwoPhone)){
                Toast('中介2手机号格式不正确')
                return
            }
            if(this.otherPhone && !isPhone(this.otherPhone)){
                Toast('其他主体手机号格式不正确')
                return
            }

            this.$axios.post(`/borrow/loan/${this.loanApplyId}/collateralAssets`,{
                "type": this.businessKey,
                "addrProvince": this.province,
                "addrCity": this.city,
                "addrDistrict": this.district,
                "addrDetail": this.address,
                "subordinateRegion": this.region,
                "plannedPurpose": this.planUseKey,
                "actualPurpos": this.actualUseKey,
                "layout": this.houseTypeKey,
                "floor": this.floor,
                "totalFloor": this.allFloor,
                "isBasement": this.baseMentKey == 'YES' ? true : false,
                "orientation": this.houseOrientationKey,
                "isResident": this.residentKey == 'YES' ? true : false,
                "useStatus": this.useStatusKey,
                "intermediaryOneName": this.imOneName,
                "intermediaryOnePhone": this.imOnePhone,
                "intermediaryOneRecentPrice": this.imOneRecentPrice,
                "intermediaryOneQuickPrice": this.imOneQuickPrice,
                "intermediaryOneSellPeriod": this.imOneSellPeriod,
                "intermediaryTwoName": this.imTwoName,
                "intermediaryTwoPhone": this.imTwoPhone,
                "intermediaryTwoRecentPrice": this.imTwoRecentPrice,
                "intermediaryTwoQuickPrice": this.imTwoQuickPrice,
                "intermediaryTwoSellPeriod": this.imTwoSellPeriod,
                "otherOwnerName": this.otherName,
                "otherOwnerPhone": this.otherPhone,
                "otherOwnerRelation": this.otherRelation,
                "otherOwnerInfo": this.otherInfo,
                "otherOwnerMaritalStatus": this.otherMarryKey,
                "otherOwnerCompanyName": this.otherCompany,
                "otherOwnerMonthlyIncome": this.otherIncome,
                "remark": this.remark
            }).then(res => {
                if(res.data){
                    this.setLoanApplyInfoAssets(true)
                    this.$router.replace('/infoList')
                }
            })
        },

        onConfirm(item){
            let current = this.curPick;
            switch(current){
                case 'business':
                    this.business = item.text
                    this.businessKey = item.key
                    break;
                case 'planUse':
                    this.planUse = item.text
                    this.planUseKey = item.key
                    break;
                case 'actualUse':
                    this.actualUse = item.text
                    this.actualUseKey = item.key
                    break;
                case 'houseType':
                    this.houseType = item.text
                    this.houseTypeKey = item.key
                    break;
                case 'baseMent':
                    this.baseMent = item.text
                    this.baseMentKey = item.key
                    break;
                case 'houseOrientation':
                    this.houseOrientation = item.text
                    this.houseOrientationKey = item.key
                    break; 
                case 'resident':
                    this.resident = item.text
                    this.residentKey = item.key
                    break;
                case 'useStatus':
                    this.useStatus = item.text
                    this.useStatusKey = item.key
                    break;
                case 'otherMarry':
                    this.otherMarry = item.text
                    this.otherMarryKey = item.key
                    break;
            }
            this.showPicker = false;
            this.changFn()
        }
    }
}
</script>

<style>

</style>
