<template>
    <div class="page-warp">
        <van-grid :column-num="2">
            <van-grid-item to="/personal">
                <div class="info-box">
                    <p>个人信息</p>
                    <van-icon v-if="personalFlag" size="40" name="passed" color="#07c160"/>
                    <van-icon v-else size="40" name="warning-o" color="#f44"/>
                </div>
            </van-grid-item>
            <van-grid-item to="/conact">
                <div class="info-box">
                    <p>联系人信息</p>
                    <van-icon v-if="concatFlag" size="40" name="passed" color="#07c160"/>
                    <van-icon v-else size="40" name="warning-o" color="#f44"/>
                </div>
            </van-grid-item>
            <van-grid-item to="/workinfo">
                <div class="info-box">
                    <p>工作信息</p>
                    <van-icon v-if="jobInfoFlag" size="40" name="passed" color="#07c160"/>
                    <van-icon v-else size="40" name="warning-o" color="#f44"/>
                </div>
            </van-grid-item>
            <van-grid-item to="/docUpload">
                <div class="info-box">
                    <p>影像件</p>
                    <van-icon v-if="docInfoFlag" size="40" name="passed" color="#07c160"/>
                    <van-icon v-else size="40" name="warning-o" color="#f44"/>
                </div>
            </van-grid-item>
            <!-- <van-grid-item>
                <div class="info-box">
                    <p>三方授权</p>
                    <van-icon size="40" name="passed" color="#07c160"/>
                    <van-icon size="40" name="warning-o" color="#f44"/>
                </div>
            </van-grid-item> -->
        </van-grid>
        <div style="padding: 20px;">
            <van-button 
                :disabled="btnDisable"
                :block="true"
                type="info"
                @click="doSubmit"
            >
                提交审核
            </van-button>
        </div>
    </div>
</template>

<script>
import { Grid, GridItem, Icon, Button } from 'vant';
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'infoList',
    data(){
        return {
            loanApplyId: '',
            personalFlag: false,
            concatFlag: false,
            jobInfoFlag: false,
            docInfoFlag: false,
            btnDisable: true,
        }
    },
    components: {
        [GridItem.name]: GridItem,
        [Grid.name]: Grid,
        [Icon.name]: Icon,
        [Button.name]: Button
    },
    beforeRouteEnter (to, from, next) {  
        next(vm => {
            // console.log('beforeRouteEnter next');
            vm.fetchData()
        })
    },
    methods: {
        ...mapGetters(['getLoanApplyId','getLoanApplyInfo']),
        ...mapActions(['getCurLoanApply']),
        fetchData(){
            this.getCurLoanApply().then(res => {
                if(res.data){
                    this.loanApplyId = res.data.loanApply.id
                    this.makeData(res.data)
                }
            })
        },
        makeData(data){
            this.personalFlag = data.personalInfoIsComplated
            this.concatFlag = data.contactInfoIsComplated
            this.jobInfoFlag = data.jobInfoIsComplated
            this.docInfoFlag = data.documentIsComplated
            this.buttonStatus()
        },
        buttonStatus(){
            if(this.personalFlag && this.concatFlag && this.jobInfoFlag && this.docInfoFlag){
                this.btnDisable = false
            }else{
                this.btnDisable = true
            }
        },
        doSubmit(){
            this.$axios.post(`/borrow/loan/${this.loanApplyId}/submite`).then(res => {
                if(res.data){
                    this.$router.push('/stepStatus')
                }
            })
        }
    }
}
</script>


