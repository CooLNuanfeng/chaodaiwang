<template>
    <div class="page-warp">
        <div class="app-title">上传户⼝簿</div>
        <div class="upload-style">
            <van-uploader 
                v-model="hukouImg[0].file"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="hukou"
                :max-size="1024 * 1024"
                @delete="delFn('hukou',hukouImg[0].id)"
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
                v-model="weddingImg[0].file"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="wedding"
                :max-size="1024 * 1024"
                @delete="delFn('wedding',weddingImg[0].id)"
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
                v-model="houseImg[0].file"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="house"
                :max-size="1024 * 1024"
                @delete="delFn('house',houseImg[0].id)"
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
                v-model="creditImg[0].file"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="credit"
                :max-size="1024 * 1024"
                @delete="delFn('credit',creditImg[0].id)"
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
                v-model="incomeImg[0].file"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="income"
                :max-size="1024 * 1024"
                @delete="delFn('income',incomeImg[0].id)"
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
            hukouImg: [{}],
            weddingImg: [{}],
            houseImg: [{}],
            creditImg: [{}],
            incomeImg: [{}],
            btnDisable: true,
            currentName: '',
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
        // this.$axios.delete(`/borrow/loan/${this.loanApplyId}/file/55`)
    },
    methods: {
        ...mapMutations(['setLoanApplyInfoDoc']),
        ...mapGetters(['getLoanApplyId']),
        ...mapActions(['getCurLoanApply']),
        makeData(data){
            data.forEach(item => {
                if(item.type === 'HOUSEHOLD_REGISTER'){
                    // this.hukouImg[0].file = 
                }
            });
        },
        fetchData(){
            this.$axios.get(`/borrow/loan/${this.loanApplyId}/file`).then(res => {
                console.log(res);
                this.makeData(res.data)
            })
        },
        delFn(name, id){
            this.$axios.delete(`/borrow/loan/${this.loanApplyId}/file/${id}`).then(res => {
                if(res.data){
                    if(name == 'hukou'){
                        this.hukouImg = [{}]
                    }
                    if(name == 'wedding'){
                        this.weddingImg = [{}]
                    }
                    if(name == 'house'){
                        this.houseImg = [{}]
                    }
                    if(name == 'credit'){
                        this.creditImg = [{}]
                    }
                    if(name == 'income'){
                        this.incomeImg = [{}]
                    }
                    this.changeFn()
                }
            })
        },
        changeFn(){
            if(!this.hukouImg[0].file || !this.creditImg.length || !this.incomeImg.length){
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
            this.currentName = obj.name
            if(obj.name == 'hukou'){
                this.hukouImg.push({file})
                this.uploadCard('HOUSEHOLD_REGISTER', file)
            }
            if(obj.name == 'wedding'){
                this.weddingImg.push({file})
                this.uploadCard('MARRIAGE_CERTIFICATE', file)
            }
            if(obj.name == 'house'){
                this.houseImg.push({file})
                this.uploadCard('HOUSE_CERTIFICATE', file)
            }
            if(obj.name == 'credit'){
                this.creditImg.push({file})
                this.uploadCard('CREDIT_REPORT', file)
            }
            if(obj.name == 'income'){
                this.incomeImg.push({file})
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
            formData.append('file', file.file);
            this.$axios.post(`/borrow/loan/${this.loanApplyId}/file/${type}`,formData,{
                headers: { 'content-type': 'application/form-data' }
            }).then(res => {
                if(res.data){
                    Toast.success('上传成功');
                    if(this.currentName == 'hukou'){
                        this.hukouImg[0].id = res.data
                    }
                    if(this.currentName == 'wedding'){
                        this.weddingImg[0] = res.data
                    }
                    if(this.currentName == 'house'){
                        this.houseImg[0] = res.data
                    }
                    if(this.currentName == 'credit'){
                        this.creditImg[0] = res.data
                    }
                    if(this.currentName == 'income'){
                        this.incomeImg[0] = res.data
                    }
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
