<template>
    <div class="page-warp">
        <div class="app-title">上传身份证正面</div>
        <div class="upload-style">
            <van-uploader 
                v-model="cardFront"
                :before-read="beforeRead" 
                :after-read="afterRead"
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
            >
                <div class="upload-flex">
                    <van-icon name="plus" />身份证反面
                </div>
            </van-uploader>
        </div>
    </div>
</template>

<script>
import { Uploader, Toast, Icon } from 'vant'
export default {
    name: 'uploadCard',
    data(){
        return{
            cardFront: [],
            cardBack: []
        }
    },
    components: {
        [Uploader.name]: Uploader,
        [Icon.name]: Icon
    },
    methods: {
        beforeRead(file) {
            if (file.type == 'image/jpeg' || file.type == 'image/png') {
                return true;
            }else{
                Toast('请上传 jpg 或 png 格式图片');
                return false;
            }
            
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
        }
    }
}
</script>

<style lang="scss">

</style>
