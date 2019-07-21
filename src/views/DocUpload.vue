<template>
    <div class="page-warp">
        <div class="app-title">上传户⼝簿(最多上传3张)</div>
        <div class="upload-small">
            <van-uploader 
                multiple
                v-model="famliyRegister"
                name="famliyregister"
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
            <van-uploader 
                multiple
                v-model="marryRegister"
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
            <van-uploader 
                multiple
                v-model="houseRegister"
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
            <van-uploader 
                multiple
                v-model="creditRegister"
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
            <van-uploader 
                multiple
                v-model="incomeRegister"
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
    </div>
</template>

<script>
import { 
    Uploader,
    Button,  
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

            btnDisable: true,
        }
    },
    components: {
        [Uploader.name]: Uploader,
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
        // this.$axios.delete(`/borrow/loan/${this.loanApplyId}/file/58`)
    },
    methods: {
        ...mapMutations(['setLoanApplyInfoDoc']),
        ...mapGetters(['getLoanApplyId']),
        ...mapActions(['getCurLoanApply']),
        makeData(arr){
            arr.forEach(item => {
                let file = { url: 'https://img.yzcdn.cn/vant/cat.jpeg',id: item.id }
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
        },
        doSave(){
            console.log('save');
            // this.setLoanApplyInfoDoc(true)
            this.$router.replace('/infoList')
        }
    }
}
</script>

<style>

</style>
