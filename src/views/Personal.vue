<template>
    <div class="page-warp">
        <van-field
            required
            label="居住省份"
            placeholder="请输入居住省份"
            v-model="province"
            @input="changFn"
        />
        <van-field
            required
            label="居住城市"
            placeholder="请输入居住城市"
            v-model="city"
            @input="changFn"
        />
        <van-field
            required
            label="居住区域"
            placeholder="请输入居住区"
            v-model="area"
            @input="changFn"
        />
        <van-field
            required
            label="居住详细地址"
            placeholder="请输入居住详细地址"
            v-model="address"
            @input="changFn"
        />
        <van-field
            clickable
            required
            readonly
            label="教育程度"
            v-model="edu"
            placeholder="选择学历信息"
            @click="eduFn"
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
        <div v-show="mateFlag">
            <!-- <van-field
                label="⼦女情况"
                v-model="children"
                placeholder="请输入子女情况"
            /> -->
            <van-field
                :required="mateFlag"
                label="配偶姓名"
                v-model="mateName"
                placeholder="请输入配偶姓名"
                @input="changFn"
            />
            <van-field
                :required="mateFlag"
                label="配偶手机号"
                type="tel"
                maxlength="11"
                v-model="matePhone"
                placeholder="请输入配偶手机号"
                @input="changFn"
            />
        </div>
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
    // Toast, 
} from 'vant';

import {mapActions, mapGetters} from 'vuex'

const weddingMap = {
    'MARRIED':'已婚',
    'UNMARRIED':'未婚',
    'DIVORCE':'离异',
    'WIDOWHOOD':'丧偶',
}
const eduMap = {
    'HIGH_SCHOOL_AND_BELOW':'⾼中以下',
    'JUNIOR_COLLEGE':'大专',
    'UNDERGRADUATE':'本科',
    'MASTER_AND_ABOVE':'硕士及以上',
}

export default {
    name: 'personal',
    data(){
      return {
            loanApplyId: '',
            province: '', 
            city: '',
            area: '',
            address: '',
            edu: '', //教育状况
            eduStatus: '', //教育key
            wedding: '', //婚姻状况
            weddingStatus: '', //婚姻key
            children: '', //子女状况
            mateFlag: false, //配偶标记
            mateName: '', //配偶姓名
            matePhone: '', //配偶手机

            curPick: '', //当前的 picker
            showPicker: false, //pick 控制
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
        ...mapGetters(['getLoanApplyId']),
        ...mapActions(['getCurLoanApply']),
        makeData(data){
            this.province = data.residenceAddrProvince
            this.city = data.residenceAddrCoty
            this.area = data.residenceAddrDistrict
            this.address = data.residenceAddrDetail
            this.weddingStatus = data.maritalStatus
            this.wedding = weddingMap[data.maritalStatus]
            this.eduStatus = data.educateLevel
            this.edu = eduMap[data.educateLevel]
            this.children = data.childrenStatus
            this.mateFlag = data.maritalStatus === 'MARRIED' ? true: false
            this.mateName = data.spouseName ? data.spouseName : ''
            this.matePhone = data.spousePhone ? data.spousePhone : ''
            this.changFn()
        },
        fetchData(){
            this.$axios.get(`/borrow/loan/${this.getLoanApplyId()}/personal`).then(res=>{
                console.log(res);
                this.makeData(res.data)
            })
        },
        weddingFn(){
            this.curPick = 'wedding'
            this.columns = [
                {'key': 'MARRIED', 'text':'已婚'},
                {'key': 'UNMARRIED', 'text':'未婚'},
                {'key': 'DIVORCE', 'text':'离异'},
                {'key': 'WIDOWHOOD', 'text':'丧偶'},
            ]
            this.showPicker = true
        },
        eduFn(){
            this.curPick = 'edu'
            this.columns = [
                {'key': 'HIGH_SCHOOL_AND_BELOW', 'text':'⾼中以下'},
                {'key': 'JUNIOR_COLLEGE', 'text':'大专'},
                {'key': 'UNDERGRADUATE', 'text':'本科'},
                {'key': 'MASTER_AND_ABOVE', 'text':'硕士及以上'},
            ]
            this.showPicker = true
        },
        onConfirm(item) {
            let current = this.curPick;
            switch(current){
                case 'wedding':
                    this.wedding = item.text
                    this.weddingStatus = item.key
                    if(item.key == 'MARRIED'){
                        this.mateFlag = true
                    }else{
                        this.mateFlag = false
                    }
                    break;
                case 'edu':
                    this.eduStatus = item.key
                    this.edu = item.text
                    break;
            }
            this.showPicker = false;
            this.changFn()
        },
        changFn(){
            if(!this.address || !this.province || !this.city || !this.eduStatus || !this.wedding){
                this.btnDisable = true
            }else if(this.mateFlag){
                if(!this.mateName || !this.matePhone){
                    this.btnDisable = true
                }else{
                    this.btnDisable = false
                }
            }else{
                this.btnDisable = false
            }
        },
        doSave(){
            this.$axios.post(`/borrow/loan/${this.getLoanApplyId()}/personal`,{
                "residenceAddrProvince": this.province,//居住省份
                "residenceAddrCoty": this.city,//居住城市
                "residenceAddrDistrict": this.city,//居住区
                "residenceAddrDetail": this.address,//居住详细地址
                "educateLevel": this.eduStatus,
                "maritalStatus": this.weddingStatus,
                // "childrenStatus": this.children,//子女状态，暂时为空
                "spouseName": this.mateFlag ? this.mateName : '',//配偶姓名,婚姻状态为已婚时必填
                "spousePhone": this.mateFlag ? this.matePhone : ''//配偶手机号,婚姻状态为已婚时必填
            }).then(res=>{
                console.log(res);
                if(res.data){
                    this.$router.push('/infoList')
                }
            })
        },
    }
}
</script>

<style>

</style>
