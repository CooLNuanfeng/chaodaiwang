<template>
    <div class="page-warp">
        <div style="margin-bottom: 20px;" v-if="contactList.length">
            <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">联系人列表</van-divider>
            <div class="contact-list-item" v-for="item in contactList" :key="item.id">
                <p>联系人姓名： {{item.name}}</p>
                <p>联系人电话： {{item.phone}}</p>
                <p>与借款人关系： {{relationMap[item.relation]}} <van-button type="danger" size="mini" @click="delItem(item.id)">删除</van-button></p>
            </div>
        </div>
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">添加联系人</van-divider>
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
            maxlength="11"
            placeholder="请输入联系人手机号"
        />
        <van-field
            readonly
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
                @click="doAdd"
            >
                添加联系人
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
    Panel,
    Divider,
    Row, 
    Col,
    Toast, 
} from 'vant';

import {isPhone} from '../utils/util'

import {mapActions, mapGetters, mapMutations} from 'vuex'


export default {
    name: 'conact',
    data(){
        return {
            loanApplyId: '',
            contactName: '', //联系人姓名
            contactPhone: '', //联系人电话
            relation: '', //借款人关系
            relationKey: '',

            contactList: [], //联系人列表

            curPick: '', //当前的 picker
            showPicker: false, // pick 控制
            columns: [], //popPick colmun

            btnDisable: true,
            relationMap: {
                'PARENT':'父母',
                'SIBLING':'兄弟姐妹',
                'FRIEND':'朋友',
                'CLASSMATE':'同事',
                'OTHER':'其他',
            }
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
        [Row.name]: Row,
        [Col.name]: Col,
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Button.name]: Button,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [Panel.name]: Panel,
        [Divider.name]: Divider,
    },
    methods: {
        ...mapMutations(['setLoanApplyInfoContact']),
        ...mapGetters(['getLoanApplyId']),
        ...mapActions(['getCurLoanApply']),
        fetchData(){
            this.$axios.get(`/borrow/loan/${this.loanApplyId}/contactPerson`).then(res => {
                if(res.data){
                    this.contactList = res.data
                }
            })
        },
        relationFn(){
            this.curPick = 'relation'
            this.columns = [
                {'key': 'PARENT', 'text':'父母'},
                {'key': 'SIBLING', 'text':'兄弟姐妹'},
                {'key': 'FRIEND', 'text':'朋友'},
                {'key': 'CLASSMATE', 'text': '同事'},
                {'key': 'OTHER', 'text':'其他'},
            ]
            this.showPicker = true
        },
        onConfirm(item) {
            let current = this.curPick;
            switch(current){
                case 'relation':
                    this.relation = item.text
                    this.relationKey = item.key
                    break;
            }
            this.showPicker = false;
            this.changFn()
        },
        changFn(){
            if(!this.contactName || !this.contactPhone || !this.relation){
                this.btnDisable = true
            }else{
                this.btnDisable = false
            }
        },
        delItem(id){
            console.log(id);
            this.$axios.delete(`/borrow/loan/${this.loanApplyId}/contactPerson/${id}`).then(res => {
                console.log(res);
                if(res.data){
                    this.contactList = this.contactList.filter(item => item.id !== id)
                }
                if(!this.contactList.length){
                    this.setLoanApplyInfoContact(false)
                }
            })
        },
        doAdd(){
            if(!isPhone(this.contactPhone)){
                Toast('手机号格式不正确')
                return
            }
            this.$axios.post(`/borrow/loan/${this.loanApplyId}/contactPerson`,[
                {
                    name: this.contactName,
                    phone: this.contactPhone,
                    relation: this.relationKey
                }
            ]).then(res => {
                if(res.data){
                    this.contactName = ''
                    this.contactPhone = ''
                    this.relationKey = ''
                    this.relation = ''
                    this.btnDisable = true
                    this.fetchData()
                    this.setLoanApplyInfoContact(true)
                }
            })
        }
    }
}
</script>

<style>

</style>
