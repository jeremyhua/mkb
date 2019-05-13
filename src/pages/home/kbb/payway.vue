<template>
    <div id="payway">
        <!-- <bheader title="选择通道" class="fix-top"></bheader> -->
        <x-header :left-options="{backText: ''}">选择通道</x-header>
        <div class="fixed-content">
            <div class="pay-count fix">
                <span class="fl title">支付金额</span>
                <span class="count fr">¥<b>{{count}}</b></span>
            </div>
            <group title="请选择支付通道" v-if="currentData.length>0">
                <router-link class="link_item is_link fix" :to={path:item.path} v-for="(item,index) in currentData" :key="index" tag="div" >
                    <div class="img fl left" :style="{background: 'url('+ require(`../../../assets/images/pay/${item.key}-active.png`) +') no-repeat center',backgroundSize: '100%'}">
                    </div>
                    <div class="right fl clearfix">
                        <p class="fix">
                            <span class="item_title">{{item.name}}</span>
                            <span class="feilv">{{item.feilv}}</span>
                        </p>
                        <p>
                               <span class="tag" v-for="(tag,index) in item.tit_block.split(',')" :key="index">{{tag}}</span>
                        </p>
                        <p class="edu fix">{{item.tit_limit}}</p>
                        <!-- <p class="feilv fix">{{item.feilv}}</p> -->
                    </div>
                </router-link>
            </group>
            <div class="tipWord" v-if="tipWord">
                <div v-for="item in tipWord.split('/')" :key="item">{{item}}</div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { Group, CellBox,XHeader} from 'vux'
export default {
    name: "payway",
    components: {
        Group, CellBox,  XHeader
    },
    data() {
        return {
            type: this.$route.query.type,
            count: this.$route.query.count,
            paywayData:[
                /* {
                    title:'微信支付',
                    type: 'wetchatpay',
                    edu: '额度：0-8000元/笔，当天结算最高20万元',
                    feilv: '0.48%',
                    path: '/collectMoney/payway/nocardPayment',
                    tags:'秒到账/可收他人卡/推荐'
                },
                {
                    title:'支付宝',
                    type: 'alipay',
                    edu: '额度：0-8000元/笔，当天结算最高20万元',
                    feilv: '0.48%',
                    path: '/collectMoney/payway/nocardPayment',
                    tags:'秒到账/可收他人卡/推荐'
                },
                {
                    title:'QQ钱包',
                    type: 'qqpay',
                    edu: '额度：0-8000元/笔，当天结算最高20万元',
                    feilv: '0.48%',
                    path: '/collectMoney/payway/nocardPayment',
                    tags:'秒到账/可收他人卡/推荐'
                },
                {
                    title:'快捷支付A',
                    type: 'kuaijie',
                    edu: '额度：0-20001元/笔，当天结算最高10万元',
                    feilv: '0.55%',
                    path: '/collectMoney/payway/nocardPayment',
                    tags:'秒到账/可收他人卡/绑卡带积分'
                },
                {
                    title:'快捷支付B',
                    type: 'kuaijie',
                    edu: '额度：0-20001元/笔，当天结算最高10万元',
                    feilv: '0.55%',
                    path: '/collectMoney/payway/nocardPayment',
                    tags:'秒到账/可收他人卡/绑卡带积分'
                }, */
            ],
            currentData:[],
            tipWord:'若操作中遇到问题可咨询在线客服'/*提示/D+0秒到账时间：周一到周日9:00-20:20/00:00-9:00交易，当天9:30前结算/20:20以后交易，T+1结算*/
        }

    },
    
    created() {
        /* this.currentData = this.paywayData.filter(v=>v.key===this.type)
        console.log(this.currentData) */
    },
    mounted() {
        const key = this.type;
        let count = this.count;
        this.$axios.post('/api/api/payTypeBlock','data='+JSON.stringify({key}))
            .then(res=>{
                if(res.code==1){
                    const result = res.result;
                    result.map(v=>v['path']='/kbb/nocardPayment?block_id='+v['block_id']+'&count='+count+'');
                    this.paywayData = result;
                    this.currentData = this.paywayData.filter(v=>v.key===this.type)
                    //console.log(this.currentData)
                }else{
                    mui.toast(res.msg)
                }   
            })
    },
    methods: {

    }
}
</script>

<style scoped>
    #payway{width: 100%;height: 100%;background: #f2f2f2;}
    .pay-count{width: 100%;padding:10px 20px;font-size: 16px;color: #333;box-sizing: border-box;background-color: #fff;}
    .pay-count .count{font-size: 30px;font-weight: 700;color: #469dc8;    padding-top: 8px;line-height: 44px;}
    .pay-count .count b{font-size: 40px;font-weight: 700;}
    .pay-count .title{padding-top: 20px;}
    .link_item{width: 100%;padding: 10px 10px;box-sizing: border-box;margin-bottom: 10px;background-color: #fff;display: box; /* OLD - Android 4.4- */
        display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;      /* TWEENER - IE 10 */
        display: -webkit-flex;     /* NEW - Chrome */
        display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */}
    .link_item:last-child{margin-bottom: 0;}
    .link_item .right{-webkit-box-flex:9;-webkit-flex:9;flex:9;padding-right: 10px;
    -moz-box-flex:9;     /* OLD - Firefox 19- */ -ms-flex: 9          /* IE 10 */  }
     .link_item .left{-webkit-box-flex:1;-webkit-flex:1;flex:1;
    -moz-box-flex:1;     /* OLD - Firefox 19- */ -ms-flex:1          /* IE 10 */  }
    .link_item .img img{width: 30px;height: 30px;margin-right: 10px;}
    .link_item .item_title{font-size: 14px;color: #333;margin-right: 8px;}
    .link_item .edu{color: #666;font-size: 14px;}
    .link_item .feilv{color: #e93f4d;font-size: 14px;    padding: 3px 7px;border:1px solid #e93f4d;border-radius:5px; }
    .link_item .tag{padding: 1px 7px;border: 1px solid;border-radius: 10px;margin-right: 5px;font-size: 10px;}
    .link_item .tag:nth-child(2){border-color: #469dc8;color: #469dc8;}
    .link_item .tag:nth-child(3){border-color: #85c678;color: #85c678;}
    .link_item .tag:nth-child(4){border-color: #e9873f;color: #e9873f;margin-right: 0;}
    .tipWord{font-size: 14px;color: #666;padding-left: 10px;padding-top: 10px;}
    /* .link_item .img{height:100%;} */
    .img img{position: relative;top: 50%;transform: translateY(-50%);-ms-transform:translateY(-50%); 	/* IE 9 */-moz-transform:translateY(-50%); 	/* Firefox */-webkit-transform:translateY(-50%); /* Safari 和 Chrome */-o-transform:translateY(-50%); }
</style>
<style>
    #payway .weui-cells{background-color: transparent;}
    .fl{float:left;}
    .fr{float:right;}
    .fix{overflow:hidden;}
    .tag{display:inline-block;margin:8px 5px;}
</style>


