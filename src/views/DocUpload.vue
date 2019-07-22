<template>
    <div class="page-warp">
        <div class="app-title">上传户⼝簿(最多上传3张)</div>
        <div class="upload-small">
            <div class="upload-img" v-for="item in famliyRegister" :key="item.id" :data-id="item.id" @click="previewFn(item.id)">点击查看</div>
            <van-uploader 
                multiple
                v-model="famliyRegister"
                name="famliyregister"
                :preview-image="false"
                :max-size="maxSize"
                :max-count="maxCount"
                :before-read="beforeRead" 
                :after-read="afterRead"
                @delete="delFn"
                @oversize="oversizeFn"
            />
        </div>
        <div class="app-title">上传结婚证(最多上传3张)</div>
        <div class="upload-small">
            <div class="upload-img" v-for="item in marryRegister" :key="item.id" :data-id="item.id" @click="previewFn(item.id)">点击查看</div>
            <van-uploader 
                multiple
                v-model="marryRegister"
                :preview-image="false"
                name="marryregister"
                :max-size="maxSize"
                :max-count="maxCount"
                :before-read="beforeRead" 
                :after-read="afterRead"
                @delete="delFn"
                @oversize="oversizeFn"
            />
        </div>
        <div class="app-title">上传房产证(最多上传3张)</div>
        <div class="upload-small">
            <div class="upload-img" v-for="item in houseRegister" :key="item.id" :data-id="item.id" @click="previewFn(item.id)">点击查看</div>
            <van-uploader 
                multiple
                v-model="houseRegister"
                :preview-image="false"
                name="houseregister"
                :max-size="maxSize"
                :max-count="maxCount"
                :before-read="beforeRead" 
                :after-read="afterRead"
                @delete="delFn"
                @oversize="oversizeFn"
            />
        </div>
        <div class="app-title">上传征信报告(最多上传3张)</div>
        <div class="upload-small">
            <div class="upload-img" v-for="item in creditRegister" :key="item.id" :data-id="item.id" @click="previewFn(item.id)">点击查看</div>
            <van-uploader 
                multiple
                v-model="creditRegister"
                :preview-image="false"
                name="creditregister"
                :max-size="maxSize"
                :max-count="maxCount"
                :before-read="beforeRead" 
                :after-read="afterRead"
                @delete="delFn"
                @oversize="oversizeFn"
            />
        </div>
        <div class="app-title">上传近6个月收入流水(最多上传3张)</div>
        <div class="upload-small">
            <div class="upload-img" v-for="item in incomeRegister" :key="item.id" :data-id="item.id" @click="previewFn(item.id)">点击查看</div>
            <van-uploader 
                multiple
                v-model="incomeRegister"
                :preview-image="false"
                name="incomeregister"
                :max-size="maxSize"
                :max-count="maxCount"
                :before-read="beforeRead" 
                :after-read="afterRead"
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
        >
            <img :src="previewImgDataUrl" alt="" style="width:100%">
        </van-popup>
    </div>
</template>

<script>
import { 
    Uploader,
    Button,
    Popup,  
    Toast,
} from 'vant'

import {mapActions, mapGetters, mapMutations} from 'vuex'

const imgKeyMap = {
  "famliyregister": "HOUSEHOLD_REGISTER",
  "marryregister": "MARRIAGE_CERTIFICATE",
  "houseregister": "HOUSE_CERTIFICATE",
  "creditregister": "CREDIT_REPORT",
  "incomeregister": "NEARLY_6_MONTHLY_INCOME",
}

export default {
    name: 'docUpload',
    data(){
        return {
            maxCount: 3,
            maxSize: 1024 * 1024,
            famliyRegister: [],
            marryRegister: [],
            houseRegister: [],
            creditRegister: [],
            incomeRegister: [],

            marryFlag: false,
            btnDisable: false,

            popShow: false,
            previewImgDataUrl: '',
        }
    },
    components: {
        [Uploader.name]: Uploader,
        [Popup.name]: Popup,
        [Button.name]: Button,
    },
    mounted(){
        this.loanApplyId = this.getLoanApplyId();
        if(this.loanApplyId){
            this.fetchData()
            this.getMarryInfo()
        }else{
            this.getCurLoanApply().then(res => {
                this.loanApplyId = res.data.loanApply.id
                this.fetchData()
                this.getMarryInfo()
            });
        }
        // this.$axios.delete(`/borrow/loan/${this.loanApplyId}/file/58`)
    },
    methods: {
        ...mapMutations(['setLoanApplyInfoDoc']),
        ...mapGetters(['getLoanApplyId']),
        ...mapActions(['getCurLoanApply']),
        getMarryInfo(){
            this.$axios.get(`/borrow/loan/${this.loanApplyId}/personal`).then(res => {
                if(res.data.maritalStatus == 'MARRIED'){
                    this.marryFlag = true
                }
            })
        },
        makeData(arr){
            arr.forEach(item => {
                let file = { url: '',id: item.id }
                switch(item.type){
                    case 'HOUSEHOLD_REGISTER':
                        this.famliyRegister.push(file)
                        break;
                    case 'MARRIAGE_CERTIFICATE':
                        this.marryRegister.push(file)
                        break;
                    case 'HOUSE_CERTIFICATE':
                        this.houseRegister.push(file)
                        break;
                    case 'CREDIT_REPORT':
                        this.creditRegister.push(file)
                        break;
                    case 'NEARLY_6_MONTHLY_INCOME':
                        this.incomeRegister.push(file)
                        break;
                        
                }
            })
        },
        fetchData(){
            // console.log('fetchData');
            this.$axios.get(`/borrow/loan/${this.loanApplyId}/file`).then(res => {
                // console.log(res.data);
                this.makeData(res.data)
                this.changeFn()
            })
        },
        previewFn(id){
            this.$axios.get(`/borrow/file/${id}`).then(res => {
                // console.log(res);
                this.previewImgDataUrl = 'data:image/png;base64,'+res.data
                this.popShow = true 
            })
        },
        beforeRead(files) {
            // console.log(files, 'before')
            if(files instanceof Array){
                files.forEach(file => {
                    if (file.type == 'image/jpeg' || file.type == 'image/png') {
                        return true;
                    }else{
                        Toast('请上传 jpg 或 png 格式图片');
                        return false;
                    }
                })
            }else{
                if (files.type == 'image/jpeg' || files.type == 'image/png') {
                    return true;
                }else{
                    Toast('请上传 jpg 或 png 格式图片');
                    return false;
                }
            }
            return true;
        },
        afterRead(files, obj) {
            // 此时可以自行将文件上传至服务器
            // console.log(files, 'after', obj);
            let upArr = [];
            if(files instanceof Array){
                upArr = upArr.concat(files)
            }else{
                upArr.push(files)
            }
            this.UploaderDoc(upArr, obj.name)
        },
        delFn(file){
            // console.log(file)
            this.$axios.delete(`/borrow/loan/${this.loanApplyId}/file/${file.id}`).then(res => {
                console.log(res);
                this.changeFn()
            })
        },
        oversizeFn(){
            Toast('图片大小不能超过1M');
        },
        UploaderDoc(arr,name){
            let formData = new FormData()
            arr.forEach(item => {
                formData.append('file', item.file)
                this.$axios.post(`/borrow/loan/${this.loanApplyId}/file/${imgKeyMap[name]}`,formData,{
                    headers: { 'content-type': 'application/form-data' }
                }).then(res => {
                    // console.log(res);
                    item.name = name
                    item.id = res.data
                })
            })
            this.changeFn()
        },
        changeFn(){
            if(!this.famliyRegister.length || !this.creditRegister.length || !this.incomeRegister.length){
                this.btnDisable = true
            }else if(this.marryFlag && !this.marryRegister.length){
                this.btnDisable = true
            }else{
                this.btnDisable = false
            }
        },
        doSave(){
            // console.log('save');
            this.setLoanApplyInfoDoc(true)
            this.$router.replace('/infoList')
        }
    }
}
</script>

<style>

</style>
