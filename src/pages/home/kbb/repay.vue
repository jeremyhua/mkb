<template>
    <div id="repay">
        <x-header title="还款" :left-options="{backText:''}">
             <router-link to="/kbb/repayMent" slot="left"></router-link>
        </x-header>
        <div class="repay-main " >                  
            <div class="topBox">
                <creditCard :creditCard="creditCard" myheight="160px"></creditCard>
            </div>
            <div style="padding:15px">
                <button-tab v-model="table_cont">
                    <button-tab-item @on-item-click="buttonClick('now')">当前任务</button-tab-item>
                    <button-tab-item @on-item-click="buttonClick('his')">历史任务</button-tab-item>
                    <button-tab-item @on-item-click="buttonClick('ord')">账单明细</button-tab-item>
                </button-tab>
            </div>
            <div class="table_cont">
                <table border="1" v-show="type=='now'">
                    <thead>
                        <th v-for="(item,index) in order_data.tabData[type]" :key="index">{{item}}</th>
                    </thead>
                    <tbody>
                        <tr v-if="order_data.nowList.length>0" v-for="(item,index) in order_data.nowList" :key="index">
                            <td>{{item.pro_id}}</td>
                            <td>{{item.total_money/100}}</td>
                            <td><router-link :to="{path:'/kbb/seeProgram',query:{pro_id:item.pro_id}}" class="iconfont icon-sousuo seeshow"></router-link></td>
                        </tr>
                    </tbody>
                </table>
                <table border="1" v-show="type=='his'">
                    <thead>
                        <th v-for="(item,index) in order_data.tabData[type]" :key="index">{{item}}</th>
                    </thead>
                    <tbody>
                        <tr v-if="order_data.hisList.length>0" v-for="(item,index) in order_data.hisList" :key="index">
                            <td>{{item.pro_id}}</td>
                            <td>还款任务</td>
                            <td>{{item.total_money/100}}</td>
                            <td>{{item.status==3?'已完成':'失败'}}</td>
                            <td><router-link :to="{path:'/kbb/seeProgram',query:{pro_id:item.pro_id}}" class="iconfont icon-sousuo"></router-link></td>
                        </tr>
                    </tbody>
                </table>
                <table border="1" v-show="type=='ord'">
                    <thead>
                        <th v-for="(item,index) in order_data.tabData[type]" :key="index">{{item}}</th>
                    </thead>
                    <tbody>
                        <tr v-if="order_data.ordList.length>0" v-for="(item,index) in order_data.ordList" :key="index">
                            <td>{{index+1}}</td>
                            <td>{{$moment.unix(item.cutime).format('YYYY-MM-DD hh-mm-ss')}}</td>
                            <td>{{item.money/100}}</td>
                            <td>{{item.type==1?'消费':'还款'}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="repay-footer">
            <router-link tag="div" class="newMission" :to="{path: '/kbb/newTask',query:{credit_id,bill_time:creditCard[0].bill_time,repay_time:creditCard[0].repay_time,bankCard:creditCard[0].credit_code}}">新增任务</router-link>
        </div>  
    </div>
</template>

<script>

import { XHeader , ButtonTab , ButtonTabItem  } from 'vux'
import creditCard from './../../../components/creditCard/creditCard'


export default {
    name: "repay",
    data() {
        return {
            credit_id : this.$route.query.credit_id,  
            // vux_credit_id: this.$store.state.card.creditCard||localStorage.getItem('credit_id'),
            vux_credit_id: localStorage.getItem('creditCard') ? JSON.parse(localStorage.getItem('creditCard')) : '',
            table_cont:0,
            type: 'now',  // his  ord
            order_data:{
                tabData:{
                    now:['编号','金额','详情'],
                    his:['编号','类别','金额','状态','详情'],
                    ord:['序号','时间','金额','类别']
                },
                nowList:[],
                hisList:[],
                ordList:[]
            }    
                                  
        }
    },
    computed: {
        creditCard(){
            let _creditCard =this.vux_credit_id.filter(v=>v.credit_id==this.credit_id);
            _creditCard.map(v=>v['path']='/kbb/setDate');
            return _creditCard;            
        }
    },
    components: {
        XHeader, creditCard ,ButtonTab , ButtonTabItem
    },
    created() {
        this.queryData(this.type)
    },
    mounted() {
        console.log(this.creditCard,"mounted")
        // console.log(this.order_data.tdList.filter(v=>v.type===this.type))
    },
    methods: {
        buttonClick(type) {
            this.type = type;
            this.queryData(type)
        },
        queryData(type){
            this.$axios.post('/api/api/creditProList','data='+JSON.stringify({type,creditCode:this.creditCard[0].credit_code}))
                .then(res=>{
                    // const data = res.data;
                    if(res.code==1){
                         this.order_data[`${res.result.type}List`] = res.result.list;
                    }else{
                        mui.toast(res.msg)
                    }
                })
        }
    }
}
</script>

<style scoped lang="less">
    .vux-header-left a[href]{display: block;float: left;position: absolute;width: 30px;height: 40px;top: 10px;left: -5px;z-index:100;}
    #repay,.animated{width: 100%;height: 100%;background-color: #fff;}
    .topBox{width: 100%;background-color: #f1f2f3;padding: 20px 15px;}
    .table_cont{padding: 0 15px;}
    .table_cont table{width: 100%;text-align: center;border: 1px solid #ddd;border-top:2px solid #469dc8;}
    .table_cont table thead th{font-size: 14px;color: #333;padding: 5px}
    .table_cont table tbody tr td{padding: 5px;font-size: 14px;color: #999;}
    .newMission{display: block;background-color: #469dc8;text-align: center;font-size: 16px;color: #fff;margin-top: 50px;
    height: 30px;line-height: 30px;border-radius: 5px;}
    .seeshow{display: block; width: 100%;}
    .icon-sousuo{color:#469dc8;}

    .vux-button-group{display: block;overflow: hidden;}
    .vux-button-group > a{ display: inline-block; width: 33%; margin:0; float:left;}
    .repay-main{margin-bottom:10px;padding-top: 15px;background-color: #f1f2f3;}
    .repay-footer{width: 100%;padding:15px;}
</style>
<style>
#repay .creditCard{margin:0;}
p{margin-bottom:0;}
button{padding:0;}
#repay .bank_info{padding: 20px;}
</style>