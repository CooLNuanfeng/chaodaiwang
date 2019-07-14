<template>
    <div class="page-warp">
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
