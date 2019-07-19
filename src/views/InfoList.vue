<template>
    <div class="page-warp">
        <van-grid :column-num="3">
            <van-grid-item to="/personal">
                <div class="info-box">
                    <p>个人信息</p>
                    <van-icon size="40" name="passed" />
                    <van-icon size="40" name="warning-o" />
                </div>
            </van-grid-item>
            <van-grid-item to="/conact">
                <div class="info-box">
                    <p>联系人信息</p>
                    <van-icon size="40" name="passed" />
                    <van-icon size="40" name="warning-o" />
                </div>
            </van-grid-item>
            <van-grid-item to="/workinfo">
                <div class="info-box">
                    <p>工作信息</p>
                    <van-icon size="40" name="passed" />
                    <van-icon size="40" name="warning-o" />
                </div>
            </van-grid-item>
            <van-grid-item>
                <div class="info-box">
                    <p>影像件</p>
                    <van-icon size="40" name="passed" />
                    <van-icon size="40" name="warning-o" />
                </div>
            </van-grid-item>
            <van-grid-item>
                <div class="info-box">
                    <p>三方授权</p>
                    <van-icon size="40" name="passed" />
                    <van-icon size="40" name="warning-o" />
                </div>
            </van-grid-item>
        </van-grid>
        
    </div>
</template>

<script>
import { Grid, GridItem, Icon } from 'vant';

export default {
    name: 'infoList',
    components: {
        [GridItem.name]: GridItem,
        [Grid.name]: Grid,
        [Icon.name]: Icon
    }
}
</script>


