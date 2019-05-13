<template>
        <div id="CreditCardReceipts">
            <x-header :left-options="{backText: ''}">刷卡收款</x-header>
            <!--background-color: 'url('+ require('../../assets/img/my-bg.jpg') +')'-->
        <div class="fixed-content">
            <div class="cHeader " :style="{backgroundColor: '#469dc8',backgroundSize: '100% 100%'}">
                <!-- <router-link to="/collectMoney/bills"  class="left-icon"><i class="iconfont icon-zhangdan"></i>账单</router-link> -->
                <!-- <span class="title">收款</span> -->
                <!-- <router-link to="/collectMoney/joinPartner" class="right-icon"><i class="iconfont icon-hehuoren"></i>加入合伙人</router-link> -->
            </div>
            <div class="collect-code clearfix">
                <div class="left-code fl">
                    <p class="iconfont icon-erweima" style="font-size:30px;line-height:30px;"></p>
                    <p>收款码</p>
                </div>
                <div class="right-count fr">
                    <p class="count-title">收款金额</p>
                    <p class="money">
                        <span class="small">¥</span>{{count}}
                    </p>
                </div>
            </div>
            <div class="ctip fix">
                <span class="fl">输入金额</span>
                <span class="fr">选择支付方式</span>
            </div>
            <grid :cols="4">
                <grid-item v-for="(item,index) in gridlist" :key="index" @on-item-click="onitemClick(item)" :class="{ [item.type]: item.type, activeType: item.type&&item.type==activeType, add:item.add, del:item.del}">
                    <span v-if="item.iconClass" slot="icon" class="iconfont grid-center" :class="item.iconClass"></span>
                    <img slot="icon" v-if="item.type" :src="require(`../../../assets/images/pay/${item.type==activeType?(item.type+'-active'):item.type}.png`)" alt="">
                    <span v-if="item.text" slot="label" class="grid-center">{{item.text}}</span>
                </grid-item>
            </grid>
            <box gap="20px 20px">
                <XButton type="primary"  @click.native="confirmPay">确认收款</XButton>
            </box>
        </div>
       </div>   
</template>

<script>
import { Grid, GridItem, XButton, Box ,XHeader} from 'vux'
export default {
    name : 'collectMoney',
     components: {
        Grid, GridItem, XButton, Box,XHeader
    },
    data() {
        return {
            gridlist:[
                {
                    text:'1',
                    add:true
                },
                {
                    text:'2',
                    add:true
                },
                {
                    text:'3',
                    add:true
                },
                {
                    text:'无卡支付',
                    type:'kuaijie'
                },
                {
                    text:'4',
                    add:true
                },
                {
                    text:'5',
                    add:true
                },
                {
                    text:'6',
                    add:true
                },
                {
                    text:'支付宝支付',
                    type:'alipay'
                },
                {
                    text:'7',
                    add:true
                },
                {
                    text:'8',
                    add:true
                },
                {
                    text:'9',
                    add:true
                },
                {
                    text:'微信支付',
                    type:'wetchatpay'
                },
                {
                    text:'.',
                    add:true
                },
                {
                    text:'0',
                    add:true
                },
                {
                    iconClass:'icon-shanchushangwu103401',
                    del:true
                },
                {
                    text:'qq钱包',
                    type:'qqpay'
                }
            ],
            activeType:'kuaijie',    //alipay  wetchatpay qqpay
            count:'0.00',
            versionNumber:5
        }
    },
   
    created() {
    },
    mounted() {
    },
    distoryed() {

    },
    methods: {
        onitemClick(item){
            if(item.add){ //添加
                if(this.count.indexOf('.')>-1 && item.text==='.'){
                    return ;
                }
                if(this.count==='0.00'){
                    return this.count=item.text;
                }
                if(this.count==='' && item.text==='.'){
                    return ;
                }
                if(this.count.indexOf('.')>-1 && this.count.split('.')[1].length>=2){
                    return ;
                }
                if(this.count.length>7){
                    return ;
                }
                return this.count+=''+item.text
            }
            if(item.del){//删除
                return this.count=this.count.substr(0,this.count.length-1)
            }
            if(item.type){//切换类型
                return this.activeType = item.type;
            }
        },
        confirmPay(){
            let count = this.count*1;
            if(count!==count){
                return mui.toast('金额格式不对')
            }
            if(count<100){
                return mui.toast('金额不少于105')
            }
            this.$router.push({path: '/kbb/payway',query:{type: this.activeType,count}})
        },
       
    
    },
    filters: {
    }
}
</script>

<style scoped lang="less">
    .fl{float:left;}
    .fr{float:right;}
    .fix{overflow:hidden;}
    #collectMoney{width: 100%;height: 100%;}
    .cHeader{position: relative;width: 100%;height: 80px;text-align: center;line-height: 40px;color: #fff;margin-top:-1px;}
    .cHeader .iconfont{margin-right:5px;font-size:22px;vertical-align: middle;}
    .cHeader .left-icon{position: absolute;font-size: 14px;left: 10px;top: 5px;color: #fff;}
    .cHeader .right-icon{position: absolute;font-size: 14px;right:10px;top: 5px;color: #fff;}
    .collect-code{position: relative;margin-top:-60px;width: 94%;height: 100px;background-color: #fff;padding: 14px 30px 0;margin-left:3%;box-sizing: border-box;border-radius: 15px;}
    .collect-code .left-code{color: #a3a3a3;text-align: center;font-size: 16px;}
    .collect-code .right-count{color: #a3a3a3;text-align: center;font-size: 16px;width: 70%;}
    .collect-code .right-count .count-title{text-align: right;}
    .collect-code .right-count .money{color: #469dc8;text-align: center;font-size: 36px;width: 100%;text-align: right;overflow-x: scroll;margin-bottom: 0;
    line-height: 36px;}
    .collect-code .right-count .money::-webkit-scrollbar{width: 1px;}  
    .collect-code .right-count .money .small{color: #469dc8;font-size: 30px;}
    .ctip{font-size: 14px;width: 100%;padding: 2px 30px;box-sizing: border-box;color: #949494;}
    .weui-grids{background-color: #fff;}
    .weui-grid{padding: 14px 10px;height: 78px;}
    .weui-grid__icon .iconfont{font-size: 30px;color: #ccc;line-height: 1;}
    .weui-grid__label .grid-center{color: #666;font-size: 12px;}
    .weui-btn_primary{background-color:#469dc8;}
    .weui-btn{font-size: 16px;}
    .add,.del{line-height: 45px;}
    .add .grid-center,.del .grid-center{font-size: 24px;color: #333;}
   
</style>
<style lang="css">
    .kuaijie .weui-grid__icon{width: 40px !important;}
    #CreditCardReceipts .weui-grid__icon + .weui-grid__label {margin-bottom: 4px;}
    .add .grid-center, .del .grid-center{font-size: 24px;color: #333;position: relative;top: 8px;}
     .del>div{height: 49px;margin-bottom: 10px;}
    .del>div>span{position: relative;top: 10px;}
    button{padding:0;}
</style>

