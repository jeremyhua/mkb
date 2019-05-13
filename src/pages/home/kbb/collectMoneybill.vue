<template>
    <div id="bills">
        <x-header title="交易明细" :left-options="{backText: ''}"></x-header>
        <div class="fixed-con-lg ">
            <div class="info fix" :style="{background: 'url('+ require('../../../assets/images/pay/wallet_05.png') +')',backgroundSize: '100% 100%'}">
                <box gap="0px 20px">
                    <div class="fix" style="padding-top:20px"><span class="fl">交易总额</span><span class="fr">{{moment().format('YYYY-MM-DD')}}</span></div>
                    <div class="big">{{moneySum}}</div>
                </box>
            </div>
            <group title="本月">
                <cell  v-for="(item,index) in getMoneyList" :key="++index" :link="{path: '/kbb/collectMoney/billDetails?id='+item.get_id}" class="fix billslist">
                    <div class="text-c fl">
                        <div>{{item.week}}</div>
                        <div>{{item.ctime}}</div>
                    </div>
                    <img class="fl payIcon" :src="require('../../../assets/images/pay/kuaijie-active.png')" width="40">
                    <div class="fl default-c amount">{{item.money}}</div>
                    <div class="fr">
                        <div class="gray-c">{{item.tips}}</div>
                        <div class="default-c">交易详情</div>
                    </div>
                </cell>
                <div class="nobox" v-if="getMoneyList.length<1">
                    <img :src="require('../../../assets/images/pay/noIcon.png')" >
                    <p>没有信息哦</p>
                </div>
            </group>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Group, Cell , Box, XHeader} from 'vux'
export default {
    name: "bills",
    data() {
        return {
            users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
            getMoneyList:[],
            moneySum:0
        }
    },
    components: {
        Box, Group, Cell , XHeader
    },
    created() {

    },
    mounted() {
      /*   let appid = hex_md5("byzk_shop_zl"+this.users.userId||"0");
        let reqUrl="http://wwww.qyy2018.com/#/collectMoney/bills?appid="+appid;
        console.log(reqUrl); */
        const {userId, session_id} = this.users;
        console.log({userId, session_id},this.users);
        this.$axios.post('/api/Partner/getMoneyList')
            .then(res=>{
                if(res.code==1){
                     this.getMoneyList = res.result.list;
                     this.moneySum = res.result.money_sum;
                }else{
                    mui.toast(res.msg);
                }
            });
    },
    methods: {
    }
}
</script>
<style scoped>
#bills{width: 100%;height: 100%;background-color: #fff;}
.info{height: 130px;width: 100%;font-size: 14px;color: #fff;}
.info .big{font-size: 30px;font-weight: 700;margin-top: 20px;}
.iconfont{display:block;margin-right:10px;color:#8ca6c8;font-size:24px;}
.billslist .payIcon{margin: 10px 30px 0; }
.billslist .amount{line-height: 48px; }
</style>
<style>
#bills .weui-cell__ft{width: 100%;}
.nobox{ text-align: center;  color: #c3c3c3; padding: 25% 0px;}
.text-c{text-align: center;}
.grey-c{color: #666;}
.default-c{color: #333;}
.theme-c{color: #2f9cff;}
.w100{width: 100%;}
.lh50{line-height: 50px;}
.lh30{line-height: 30px;}
.mb10{margin-bottom: 10px;}
.bd-line{border-bottom: 1px solid #ddd;}

.font14{font-size: 14px;}
.fl{float:left;}
.fr{float:right;}
.fix{overflow: hidden;}

.clearfix:after{
	overflow:hidden;
 	display:block;
 	content:"";
	clear:both;
	height:0;
}
.fixed-top.vux-header{position: fixed;top: 0;width: 100%;z-index: 900;}
.fixed-con{position: fixed;top: 46px;bottom:54px;overflow-y: scroll;width: 100%;}
.fixed-con-lg{position: fixed;top: 67px;bottom:0px;overflow-y: scroll;width: 100%;}
.fixed-bottom{position: fixed;bottom: 0;height: 54px;width: 100%;}
.fixed-con::-webkit-scrollbar{width: 0px;}  
.fixed-con-lg::-webkit-scrollbar{width: 0px;}
</style>
