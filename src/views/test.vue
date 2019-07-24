<template>
    <div class="page-warp">
        <van-divider dashed :style="{ borderColor: '#ddd', padding: '0 20px' }">身份信息</van-divider>
        <van-cell-group>
             <van-field
                v-model="name"
                label="姓名"
                required
                placeholder="请输入姓名"
                @input="changeFn"
            />
            <van-field
                :value="idNumber"
                readonly
                clickable
                @touchstart.native.stop="numberKeyboardShow = true"
                label="身份证号"
                placeholder="请输入身份证号"
                required
            />
            <van-number-keyboard
                v-model="idNumber"
                :show="numberKeyboardShow"
                extra-key="X"
                :maxlength="18"
                @input="changeFn"
                @blur="numberKeyboardShow = false"
            />
        </van-cell-group>
    </div>
</template>

<script>
import { 
    CellGroup, 
    Field, 
    Divider, 
    Button, 
    NumberKeyboard,
} from 'vant'

export default {
    name: 'test',
    data(){
        return {
            name: '',
            btnDisable: true,
            idNumber: '',
            numberKeyboardShow: false,
        }
    },
    components: {
        [Button.name]: Button,
        [CellGroup.name]:CellGroup, 
        [Field.name]: Field, 
        [NumberKeyboard.name]: NumberKeyboard,
        [Divider.name]: Divider,
    },
    mounted(){
        this.$axios.get(`/borrow/idCard`).then(res => {
            // console.log(res);
            this.name = res.data.name
            this.idNumber = res.data.idNo
            this.changeFn()
        })
    },
    methods: {
        changeFn(){
            console.log('change');
            
        }
    }
}
</script>

<style>

</style>
