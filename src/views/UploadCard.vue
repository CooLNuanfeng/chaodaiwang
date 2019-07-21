<template>
    <div class="page-warp">
        <div class="app-title">上传身份证正面</div>
        <div class="upload-style">
            <van-uploader 
                v-model="cardFront[0].file"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="front"
                :max-size="1024 * 1024"
                @delete="delFn('front',cardFront[0].id)"
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
                v-model="cardBack[0].file"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="back"
                :max-size="1024 * 1024"
                @delete="delFn('back',cardBack[0].id)"
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
            cardFront: [{}],
            cardBack: [{}],
            btnDisable: true,
            currentName: ''
        }
    },
    components: {
        [Uploader.name]: Uploader,
        [Icon.name]: Icon,
        [Button.name]: Button,
    },
    mounted(){
        // this.$axios.delete(`/borrow/file/46`)
    },
    methods: {
        ...mapActions(['getCurLoanApply']),
        delFn(name,id){
            this.$axios.delete(`/borrow/file/${id}`).then(() => {
                if(name == 'front'){
                    this.cardFront = [{}]
                }
                if(name == 'back'){
                    this.cardBack = [{}]
                }
                this.changeFn()
            })
        },
        changeFn(){
            if(this.cardFront[0].id && this.cardBack[0].id){
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
            this.currentName = obj.name
            if(obj.name == 'front'){
                this.cardFront.push({file})
                this.uploadCard('ID_CARD_FRONT', file)
            }
            if(obj.name == 'back'){
                this.cardBack.push({file})
                this.uploadCard('ID_CARD_BACK', file)
            }
        },
        oversizeFn(){
            Toast('图片尺寸不能超过1M');
        },
        uploadCard(type, file){
            // console.log(type, file);
            var formData = new FormData();
            // 将文件转二进制
            formData.append('file', file.file);
            this.$axios.post(`/borrow/file/${type}`,formData,{
                headers: { 'content-type': 'application/form-data' }
            }).then(res => {
                if(res.data){
                    Toast.success('上传成功');
                    if(this.currentName == 'front'){
                       this.cardFront[0].id = res.data
                    }
                    if(this.currentName == 'back'){
                       this.cardBack[0].id = res.data
                    }
                }
                this.changeFn()
            })
        },
        doSave(){
            this.$router.push('/confirmId')
        }
    }
}
</script>

<style lang="scss">

</style>
