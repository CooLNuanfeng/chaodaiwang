<template>
    <div class="page-warp">
        <div class="app-title">上传户⼝簿</div>
        <div class="upload-style">
            <van-uploader 
                v-model="hukouImg"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="hukou"
                :max-size="1024 * 1024"
                @delete="delFn('hukou')"
                @oversize="oversizeFn"
            >
                <div class="upload-flex">
                    <van-icon name="plus" />户⼝簿
                </div>
            </van-uploader>
        </div>
        
        <div class="app-title">上传结婚证</div>
        <div class="upload-style">
            <van-uploader 
                v-model="weddingImg"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="wedding"
                :max-size="1024 * 1024"
                @delete="delFn('wedding')"
                @oversize="oversizeFn"
            >
                <div class="upload-flex">
                    <van-icon name="plus" />结婚证
                </div>
            </van-uploader>
        </div>
        <div class="app-title">上传房产证</div>
        <div class="upload-style">
            <van-uploader 
                v-model="houseImg"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="house"
                :max-size="1024 * 1024"
                @delete="delFn('house')"
                @oversize="oversizeFn"
            >
                <div class="upload-flex">
                    <van-icon name="plus" />房产证
                </div>
            </van-uploader>
        </div>
        <div class="app-title">上传征信报告</div>
        <div class="upload-style">
            <van-uploader 
                v-model="creditImg"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="credit"
                :max-size="1024 * 1024"
                @delete="delFn('credit')"
                @oversize="oversizeFn"
            >
                <div class="upload-flex">
                    <van-icon name="plus" />征信报告
                </div>
            </van-uploader>
        </div>
        <div class="app-title">上传近6个月收入流水</div>
        <div class="upload-style">
            <van-uploader 
                v-model="incomeImg"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="income"
                :max-size="1024 * 1024"
                @delete="delFn('income')"
                @oversize="oversizeFn"
            >
                <div class="upload-flex">
                    <van-icon name="plus" />月收入流水
                </div>
            </van-uploader>
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
    </div>
</template>

<script>
import { 
    Uploader, 
    Button, 
    Toast, 
    Icon, 
} from 'vant'

import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
    name: 'uploadDoc',
    data(){
        return{
            loanApplyId: '',
            hukouImg: [],
            weddingImg: [],
            houseImg: [],
            creditImg: [],
            incomeImg: [],
            btnDisable: true,
        }
    },
    components: {
        [Uploader.name]: Uploader,
        [Icon.name]: Icon,
        [Button.name]: Button,
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
        ...mapMutations(['setLoanApplyInfoDoc']),
        ...mapGetters(['getLoanApplyId']),
        ...mapActions(['getCurLoanApply']),
        fetchData(){
            this.$axios.get(`/borrow/loan/${this.loanApplyId}/file`).then(res => {
                console.log(res);
            })
        },
        delFn(name){
            if(name == 'hukou'){
                this.hukouImg = []
            }
            if(name == 'wedding'){
                this.weddingImg = []
            }
            if(name == 'house'){
                this.houseImg = []
            }
            if(name == 'credit'){
                this.creditImg = []
            }
            if(name == 'income'){
                this.incomeImg = []
            }
            this.btnDisable = true
        },
        changeFn(){
            if(!this.hukouImg.length || !this.creditImg.length || !this.incomeImg.length){
                this.btnDisable = true
            }else{
                this.btnDisable = false
            }
        },
        beforeRead(file) {
            if (file.type == 'image/jpeg' || file.type == 'image/png') {
                return true;
            }else{
                Toast('请上传 jpg 或 png 格式图片');
                return false;
            }
            
        },
        afterRead(file,obj) {
            // console.log(file,obj);
            if(obj.name == 'hukou'){
                this.hukouImg.push(file)
                this.uploadCard('HOUSEHOLD_REGISTER', file)
            }
            if(obj.name == 'wedding'){
                this.weddingImg.push(file)
                this.uploadCard('MARRIAGE_CERTIFICATE', file)
            }
            if(obj.name == 'house'){
                this.houseImg.push(file)
                this.uploadCard('HOUSE_CERTIFICATE', file)
            }
            if(obj.name == 'credit'){
                this.creditImg.push(file)
                this.uploadCard('CREDIT_REPORT', file)
            }
            if(obj.name == 'income'){
                this.incomeImg.push(file)
                this.uploadCard('NEARLY_6_MONTHLY_INCOME', file)
            }
            this.changeFn()
        },
        oversizeFn(){
            Toast('图片尺寸不能超过1M');
        },
        uploadCard(type, file){
            // console.log(type, file);
            var formData = new FormData();
            // 将文件转二进制
            formData.append('fileList', file.file);
            this.$axios.post(`/borrow/loan/${this.loanApplyId}/file/${type}`,formData,{
                headers: { 'content-type': 'application/form-data' }
            }).then(res => {
                if(res.data){
                    Toast.success('上传成功');
                }
            })
        },
        doSave(){
            console.log('save');
            this.setLoanApplyInfoDoc(true)
            this.$router.replace('/infoList')
        }
    }
}
</script>

<style lang="scss">

</style>
