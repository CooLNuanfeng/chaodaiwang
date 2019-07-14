<template>
    <div>
        <van-nav-bar
            left-text="返回"
            left-arrow
            :title="getAppName"
        />
        <div class="app-contain">
            用户注册协议
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { 
    NavBar, 
} from 'vant';

export default {
    name: 'protocol',
    components: {
        [NavBar.name]: NavBar,
    },
    computed: {
        ...mapGetters(['getAppName'])
    },
}
</script>

<style>

</style>
