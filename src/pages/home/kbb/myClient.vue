<template>
    <div id="myClient">
        <x-header :left-options="{backText: ''}"  title="我的体系"></x-header>
        <div class="clientCont " :style="{background: '#469dc8',backgroundSize: '100% 100%'}">
            <div class="client">
                <x-circle :percent="percent2" :stroke-width="4" :trail-width="4" :stroke-color="strokeColor2" trail-color="rgba(255,255,255,0.2)">
                   <span>{{my_invite_num}}人</span>
                   <p>累计客户数</p>
                </x-circle>
            </div>           
            <span class="add_to">今日累计新增{{my_today_invite_num}}个客户</span>
        </div>
        <p class="kh_detail">客户明细</p>
        <group>
            <cell title="分享好友" is-link :link="{path:'/kbb/sharing'}">
                <span class="t_add">今日新增</span>
                <span class="num1">{{my_today_invite_num}}人</span>
            </cell>
             <cell title="我的分润" is-link :link="{path:'/kbb/myProfit'}">
                <span class="t_add">可提现分润</span>
                <span class="num1">￥{{parseFloat(todaydata.my_money||0).toFixed(2)}}元</span>
            </cell>
             <cell title="晋级制度" is-link :link="{path:'/kbb/joinPartner'}">
                <span class="t_add"></span>
                <span class="num1"></span>
            </cell>
        </group>
    </div>
</template>

<script>
import axios from 'axios'
import { XHeader,XCircle,Group,Cell } from 'vux'

export default {
    name: "myClient",
    data() {
        return {
            percent2: 0,
            strokeColor2: '#fff',
            my_invite_num:0, 
            my_today_invite_num:0,
            todaydata:'',
        }
    },
    components: {
        XHeader,XCircle,Group,Cell
    },
    created() {

    },
    mounted() {
        this.$axios.post('/api/my_invite/my_invite_info')
            .then(res=>{
                //console.log(res.data)
                if(res.code==1){
                    this.my_invite_num = res.result.my_invite_num;
                    this.percent2 = res.result.my_invite_num;
                    this.my_today_invite_num = res.result.my_today_invite_num;
                }else{
                    mui.toast(res.msg);
                }

            });
         this.$axios.post('/api/Myprofit/my_profit','data='+JSON.stringify({page:1}))
            .then(res => {
                if(res.code==1){
                    this.todaydata=res.result;
                    if( this.rewardList==0){
                        mui.toast("暂无数据")
                    }
                }
            })
    },
    methods: {

    }
}
</script>

<style scoped lang="less">
    #myClient{width: 100%;height: 100%;background-color: #fff;}
    #myClient .vux-header{background-color: #469dc8;}
    .clientCont{width: 100%;height: auto;padding-top: 30px;text-align: center;}
    .client{width: 210px;height: 210px;margin: 0 auto;margin-bottom: 25px;}
    .client span{font-size: 44px;color: #fff;}
    .client p{font-size: 14px;color: #fff;}
    .clientCont .add_to{display: inline-block;padding: 5px 20px;border-radius: 20px;border:1px solid #fff;color: #fff;font-size: 15px;margin-bottom: 15px;}
    .kh_detail{margin: 0;padding: 10px 15px;color: #999;font-size: 15px;background-color: #f9f9f9;}
    .weui-cells .weui-cell .weui-cell__ft .num{float: left;color: #469dc8;}
    .weui-cells .weui-cell .weui-cell__ft .num1{color: #469dc8;}
    .weui-cells .weui-cell .weui-cell__ft .t_add{padding-right: 10px;color:#333;}
</style>
<style>
#myClient .vux-no-group-title{margin-top: 0 !important;}
#myClient .vux-no-group-title .vux-cell-bd p label{font-size: 14px;color: #333;}
#myClient .weui-cells .weui-cell .weui-cell__ft {width: 75%;overflow: hidden;}
</style>
