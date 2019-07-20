<template>
    <div class="page-warp">
        <div class="app-title">上传身份证正面</div>
        <div class="upload-style">
            <van-uploader 
                v-model="cardFront"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="front"
                :max-size="1024 * 1024"
                @delete="delFn('front')"
                @oversize="oversizeFn"
            >
                <div class="upload-flex">
                    <van-icon name="plus" />身份证正面
                </div>
            </van-uploader>
        </div>
        
        <div class="app-title">上传身份证反面</div>
        <div class="upload-style">
            <van-uploader 
                v-model="cardBack"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="back"
                :max-size="1024 * 1024"
                @delete="delFn('back')"
                @oversize="oversizeFn"
            >
                <div class="upload-flex">
                    <van-icon name="plus" />身份证反面
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

import {mapActions} from 'vuex'

export default {
    name: 'uploadCard',
    data(){
        return{
            cardFront: [],
            cardBack: [],
            btnDisable: true,
        }
    },
    components: {
        [Uploader.name]: Uploader,
        [Icon.name]: Icon,
        [Button.name]: Button,
    },
    methods: {
        ...mapActions(['getCurLoanApply']),
        delFn(name){
            if(name == 'front'){
                this.cardFront = []
            }
            if(name == 'back'){
                this.cardBack = []
            }
            this.btnDisable = true
        },
        changeFn(){
            if(this.cardFront.length && this.cardBack.length){
                this.btnDisable = false
            }else{
                this.btnDisable = true
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
            if(obj.name == 'front'){
                this.cardFront.push(file)
                this.uploadCard('ID_CARD_FRONT', file)
            }
            if(obj.name == 'back'){
                this.cardBack.push(file)
                this.uploadCard('ID_CARD_BACK', file)
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
            this.$axios.post(`/borrow/file/${type}`,formData,{
                headers: { 'content-type': 'application/form-data' }
            }).then(res => {
                if(res.data){
                    Toast.success('上传成功');
                }
            })
        },
        doSave(){
            // console.log('save');
            this.getCurLoanApply().then(res => {
                // console.log(res);
                if(res.data.loanApply && res.data.loanApply.id){
                    this.$router.push('/stepStatus')
                }else{
                    this.$router.push('/createApply')
                }
            })
        }
    }
}
</script>

<style lang="scss">

</style>
