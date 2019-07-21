<template>
    <div class="page-warp">
        <div class="app-title">上传户⼝簿(最多上传3张)</div>
        <div class="upload-small">
            
            <van-uploader 
                multiple
                :preview-image="false"
                v-model="famliyRegister"
                name="famliyregister"
                result-type="text"
            />
        </div>
    </div>
</template>

<script>
import { 
    Uploader,
    Button,  
} from 'vant'

export default {
    name: 'test',
    data(){
        return {
            maxCount: 3,
            maxSize: 1024 * 1024,
            famliyRegister: [],
            btnDisable: false,
        }
    },
    components: {
        [Uploader.name]: Uploader,
        [Button.name]: Button,
    },
}
</script>

<style>

</style>
