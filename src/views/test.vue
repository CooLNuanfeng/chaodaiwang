<template>
    <div class="page-warp">
        <van-cell-group>
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
    NumberKeyboard, 
} from 'vant'

export default {
    name: 'test',
    data(){
        return {
            idNumber: '',
            numberKeyboardShow: false,
        }
    },
    components: {
        [CellGroup.name]:CellGroup, 
        [Field.name]: Field, 
        [NumberKeyboard.name]: NumberKeyboard,
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
