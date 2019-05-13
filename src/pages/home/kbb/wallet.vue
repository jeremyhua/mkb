<template>
    <div id="wallet">
        <bheader title="钱包"></bheader>
         <!--background: 'url('+ require('../../assets/img/wallet_06.png') +')'-->
        <div class="wallet_bg" :style="{backgroundColor: 'rgb(70, 157, 200)',backgroundSize: '100% 100%'}">
            <span v-cloak>¥{{Number(todaydata.my_money||0).toFixed(2)||"loading"}}</span>
            <router-link to="/kbb/withdrawal" class="balance theme-c">余额提现</router-link>
        </div>
        <grid :cols="2">
            <grid-item v-for="(item,index) in gridList" :key="index" :link="item.path">
                <img :src="item.img">
                <p>{{item.text}}</p>
             </grid-item>
        </grid>
    </div>
</template>

<script>
import bheader from "@/components/header/header-b";
import { Grid, GridItem } from 'vux';

import wallet_01 from '@/assets/images/pay/wallet_01.png'
import wallet_02 from '@/assets/images/pay/wallet_02.png'
import wallet_03 from '@/assets//images/pay/wallet_03.png'
import wallet_04 from '@/assets//images/pay/wallet_04.png'

export default {
    name: "wallet",
    data() {
        return {
            gridList:[
                {	
                	path:'/my/wallet/application',
					img:wallet_01,
                    text:'贷款'
                },
                {
                	path:'/my/wallet/cardCenter',
                    img:wallet_02,
                    text:'办卡赚钱'
                },
                {
                	path:'/my/wallet/guide',
                    img:wallet_03,
                    text:'新手指引'
                },
                {
                	path:'/my/wallet/shopCar',
                    img:wallet_04,
                    text:'在线商城'
                },
            ],
            todaydata:{}
        }

    },
    components: {
        Grid, GridItem ,bheader
    },
    created() {
		
    },
    mounted() {

        this.$http.post('/api/Myprofit/my_profit','').then(
            (res) => {
                if(res.data.code==1){
                    this.todaydata=res.data.result;
                }
            }
        )
    },
    methods: {

    }
}
</script>

<style scoped lang="less">
    #wallet,.animated{width: 100%;height: 100%;background-color: #f0f0f0;} 
    .wallet_bg{width: 100%;height: 170px;text-align: center;}
    .wallet_bg span{font-size: 36px;color: #fff;font-weight: 500;display: block;padding-top: 30px;padding-bottom: 20px;}
    .wallet_bg .balance{background-color: #fff;border-radius:20px;display: inline-block;padding: 4px 25px;font-size: 16px;color:#333;}
    .weui-grids{background-color: #fff;text-align: center;}
    .weui-grid{padding: 30px 10px;}
    .weui-grid img{width: 28px; height: 30px;}
    .weui-grid p{font-size: 14px;color: #000;}
    [v-cloak] {
    display: none;
    }
</style>
<style>  
    
</style>
