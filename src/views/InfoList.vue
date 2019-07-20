<template>
    <div class="page-warp">
        <van-grid :column-num="3">
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
            <van-grid-item>
                <div class="info-box">
                    <p>影像件</p>
                    <van-icon v-if="docInfoFlag" size="40" name="passed" color="#07c160"/>
                    <van-icon v-else size="40" name="warning-o" color="#f44"/>
                </div>
            </van-grid-item>
            <van-grid-item>
                <div class="info-box">
                    <p>三方授权</p>
                    <van-icon size="40" name="passed" color="#07c160"/>
                    <van-icon size="40" name="warning-o" color="#f44"/>
                </div>
            </van-grid-item>
        </van-grid>
        
    </div>
</template>

<script>
import { Grid, GridItem, Icon } from 'vant';
import {mapActions} from 'vuex'
export default {
    name: 'infoList',
    data(){
        return {
            personalFlag: false,
            concatFlag: false,
            jobInfoFlag: false,
            docInfoFlag: false,
        }
    },
    components: {
        [GridItem.name]: GridItem,
        [Grid.name]: Grid,
        [Icon.name]: Icon
    },
    mounted(){
        this.getCurLoanApply().then(res => {
            if(res.data){
                this.personalFlag = res.data.personalInfoIsComplated
                this.concatFlag = res.data.contactInfoIsComplated
                this.jobInfoFlag = res.data.jobInfoIsComplated
                this.docInfoFlag = res.data.documentIsComplated
            }
        })
    },
    methods: {
        ...mapActions(['getCurLoanApply']),

    }
}
</script>


