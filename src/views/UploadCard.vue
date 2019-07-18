<template>
    <div class="page-warp">
        <div class="app-title">上传身份证正面</div>
        <div class="upload-style">
            <van-uploader 
                v-model="cardFront"
                :before-read="beforeRead" 
                :after-read="afterRead"
                name="front"
                @delete="delFn('front')"
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
                @delete="delFn('back')"
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
            }
            if(obj.name == 'back'){
                this.cardBack.push(file)
            }
            this.changeFn()
        },
        doSave(){
            console.log('save');
            
        }
    }
}
</script>

<style lang="scss">

</style>
