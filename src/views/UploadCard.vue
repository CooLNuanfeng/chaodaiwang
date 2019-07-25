<template>
    <div class="page-warp">
        <div class="app-title">上传身份证正面</div>
        <div class="upload-style">
            <div v-if="cardFront.length">
                <div class="upload-img" v-for="item in cardFront" :key="item.id" :data-id="item.id" @click="previewFn(item.id)">点击查看<van-icon name="delete" size="20" color="#fff" @click.stop="delFn(item.id, 'cardfront')"/></div>
            </div>
            <van-uploader 
                :multiple="false"
                v-model="cardFront"
                name="cardfront"
                :preview-image="false"
                :max-size="maxSize"
                :max-count="maxCount"
                :before-read="beforeRead" 
                :after-read="afterRead"
                @delete="delFn"
                upload-text="上传身份证正面"
                @oversize="oversizeFn"
            />
        </div>
        
        <div class="app-title">上传身份证反面</div>
        <div class="upload-style">
            <div v-if="cardBack.length">
                <div class="upload-img" v-for="item in cardBack" :key="item.id" :data-id="item.id" @click="previewFn(item.id)">点击查看<van-icon name="delete" size="20" color="#fff" @click.stop="delFn(item.id, 'cardback')"/></div>
            </div>
            <van-uploader 
                :multiple="false"
                v-model="cardBack"
                name="cardback"
                :preview-image="false"
                :max-size="maxSize"
                :max-count="maxCount"
                :before-read="beforeRead" 
                :after-read="afterRead"
                upload-text="上传身份证反面"
                @delete="delFn"
                @oversize="oversizeFn"
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
        <van-popup
            v-model="popShow"
        >   <van-loading  v-show="loading"/>
            <img v-show="previewImgDataUrl" :src="previewImgDataUrl" alt="" style="width:100%">
        </van-popup>
    </div>
</template>

<script>
import { 
    Uploader, 
    Button, 
    Toast, 
    Icon,
    Loading,
    Popup,
} from 'vant'

import {mapActions} from 'vuex'

export default {
    name: 'uploadCard',
    data(){
        return{
            maxSize: 1024 * 1024 * 10,
            maxCount: 1,
            cardFront: [],
            cardBack: [],
            btnDisable: true,
            popShow: false,
            previewImgDataUrl: '',
            loading: true
        }
    },
    components: {
        [Uploader.name]: Uploader,
        [Icon.name]: Icon,
        [Button.name]: Button,
        [Popup.name]: Popup,
        [Loading.name]: Loading,
    },
    mounted(){
        this.$axios.get(`/borrow/file`).then(res => {
            if(res.data){
                this.makeData(res.data)
            }
        })
    },
    methods: {
        ...mapActions(['getCurLoanApply']),
        makeData(arr){
            arr.forEach(item => {
                let file = { url: '',id: item.id }
                switch(item.type){
                    case 'ID_CARD_FRONT':
                        this.cardFront.push(file)
                        break;
                    case 'ID_CARD_BACK':
                        this.cardBack.push(file)
                        break;    
                }
            })
            this.changeFn()
        },
        previewFn(id){
            this.popShow = true 
            this.loading = true
            this.previewImgDataUrl = ''
            this.$axios.get(`/borrow/file/${id}`).then(res => {
                // console.log(res);
                this.previewImgDataUrl = 'data:image/png;base64,'+res.data
                this.loading = false
            })
        },
        delFn(id,name){
            // console.log(id,name);
            
            this.$axios.delete(`/borrow/file/${id}`).then(() => {
                if(name == 'cardfront'){
                    this.cardFront = []
                }
                if(name == 'cardback'){
                    this.cardBack = []
                }
                this.changeFn()
            })
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
            if(obj.name == 'cardfront'){
                // this.cardFront.push(file)
                this.uploadCard('ID_CARD_FRONT', file)
            }
            if(obj.name == 'cardback'){
                // this.cardBack.push(file)
                this.uploadCard('ID_CARD_BACK', file)
            }
        },
        oversizeFn(){
            Toast('图片尺寸不能超过10M');
        },
        uploadCard(type, file){
            // console.log(type, file);
            var formData = new FormData();
            // 将文件转二进制
            formData.append('file', file.file);
            this.$axios.post(`/borrow/file/${type}`,formData,{
                headers: { 'content-type': 'application/form-data' }
            }).then(res => {
                // console.log(res)
                if(res.data){
                    Toast.success('上传成功');
                    file.id = res.data
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
