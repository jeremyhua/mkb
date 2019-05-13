<template>
    <div id="myProfit">
        <x-header title="我的利润" class="fixed-top" :left-options="{backText: ''}"></x-header>
        <div class="fixed-con-lg ">
            <div class="profit_con" :style="{background: 'url('+ require('../../../assets/images/pay/profit_01.png') +')',backgroundSize: '100% 100%'}">
                <div class="circleCont">
                    <x-circle :percent="percent2" :stroke-width="4" :trail-width="4" :stroke-color="strokeColor2" trail-color="rgba(255,255,255,0.2)">
                        <!--<span v-cloak>{{todaydata?parseFloat(todaydata.today_profit).toFixed(2):0}}</span>
                        <p>今日新增利润</p>-->
                        <span v-cloak>{{todaydata?todaydata.my_money:0}}</span>
                        <p>可提现分润</p>
                    </x-circle>
                </div>
                <router-link to="/kbb/withdrawal" class="tx">去钱包提现</router-link>
                <!--<p class="gain">账户累计利润  ￥{{parseFloat(todaydata.profit_count||0).toFixed(2)}}</p>-->
                <p class="gain"></p>
            </div>
            <h5 class="detailed">分润明细</h5>
            <group>
                <!-- <cell :title="item.change_time" is-link v-for="(item,index) in rewardList" :key="index" :link="'/repayment/myProfit/trading/'+item.log_id">
                    <span class="num">{{item.money}}元</span>
                    <span class="reward">{{item.type}}</span>
                </cell> -->
               <!-- <scroller lock-x  height="350px"  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200"> -->
                    
                    <div class="box2" v-if="rewardList.length>0">
                        <!-- <p v-for="i in bottomCount">placeholder {{i}}</p> -->

                        <cell :title="item.change_time" v-for="(item,index) in rewardList" :key="index">
                            <span class="num">{{item.money}}元</span>
                            <span class="reward">{{item.type}}</span>
                        </cell>
                        <!--<load-more tip="loading"></load-more>-->
                    </div>
                    <div class="nobox" v-if="rewardList.length<1">
                        赶紧去分享吧
                    </div>
                <!-- </scroller> -->
            </group>
        </div>
    </div>
</template>

<script>
import { XHeader,XCircle,Group,Cell ,LoadMore } from 'vux'

export default {
    name: "myProfit",
    data() {
        return {
            percent2: 0,
            strokeColor2: '#fff',
            id:'',
            rewardList:[],
            todaydata:'',
            onFetching: false,
            bottomCount:10
        }

    },
    components: {
        XHeader,XCircle,Group,Cell,LoadMore
    },
    created() {
        this.$axios.post('/api/Myprofit/my_profit','data='+JSON.stringify({page:1}))
            .then(res => {
                if(res.code==1){
                    this.rewardList=res.result.profit_list;
                    this.percent2 = res.result.todaydata
                    this.todaydata=res.result;
                    if( this.rewardList==0){
                        mui.toast("暂无数据")
                    }
                }
            })
    },
    mounted() {
        
    },
    methods: {

    }
}
</script>

<style scoped lang="less">
    #myProfit{width: 100%;height: 100%;background-color: #fff;}
    #myProfit .vux-header{background-color: #61b1ff;}
    .profit_con{width: 100%;height: auto;text-align: center;padding-top: 25px;}
    .circleCont{width: 210px;height: 210px;margin: 0 auto;}
    .circleCont .vux-circle .vux-circle-content span{font-size: 30px;color: #fff;}
    .circleCont .vux-circle .vux-circle-content p{color: #fff;font-size: 14px;}
    .profit_con .tx{display: inline-block;letter-spacing:1px;font-size: 14px;background-color: #fff;color: #4aa7fc;margin-top: 20px;padding: 5px 15px;border-radius: 15px;}
    .profit_con .gain{padding-top: 10px;padding-bottom: 10px;font-size: 16px;color: #fff;letter-spacing:2px;}
    .detailed{padding: 15px;font-size: 15px;color: #333;margin: 0;background-color: #f9f9f9;}   
    .weui-cells .weui-cell .weui-cell__ft .num{float: left;color: #4aa7fc;}
    .weui-cells .weui-cell .weui-cell__ft .reward{color: #333;}
</style>
<style>
#myProfit .vux-no-group-title{margin-top: 0 !important;margin-bottom: 10px;}
#myProfit .weui-cells .weui-cell .weui-cell__ft {width: 70%;overflow: hidden;}
#myProfit .weui-cell:before{left:0;}
[v-cloak] {
  display: none;
}
.nobox{ text-align: center; line-height: 100px; font-size: 12px; color: #c3c3c3;}
</style>

