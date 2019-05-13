<template>
    <div id="billDetails">
        <x-header title="交易详情" :left-options="{backText: ''}"></x-header>
        <div class="fixed-con-lg">
            <group title="交易详情">
                <cell>
                    <div class="fix w100 lh50 bd-line mb10">
                        <span class="fl">交易金额：<b class="theme-c">{{getdetails.money}}</b></span>
                        <span class="fr"><span class="success fl"></span> {{getdetails.tips}}</span>
                    </div>
                    <div class="fix lh30">
                        <span class="fl">交易单号</span>
                        <span class="fr">{{getdetails.order_no}}</span>
                    </div>
                    <div class="fix lh30">
                        <span class="fl">交易方式</span>
                        <span class="fr">{{getdetails.name}}</span>
                    </div>
                    <div class="fix lh30">
                        <span class="fl">手续费</span>
                        <span class="fr theme-c">￥{{getdetails.fee}}(含提现费{{getdetails.mercfee}}元）</span>
                    </div>
                    <div class="fix lh30">
                        <span class="fl">交易时间</span>
                        <span class="fr">{{getdetails.ctime}}</span>
                    </div>

                </cell>
            </group>
            <group title="结算状态">
                <cell>
                    <div class="fix lh30">
                        <span class="fl">计算金额</span>
                        <span class="fr theme-c">￥{{getdetails.sjmoney}}</span>
                    </div>
                    <div class="fix lh50 trad_status" v-for="(item,index) in getMoneyLog" :key="index">
                        <span class="fl theme-c status_word"><span :class="item.status==1?'success-circle fl':'cancel fl'"></span> {{item.msg}}</span>
                        <span class="fr ">{{$moment.unix(item.ctime).format('YYYY-MM-DD HH:mm:ss')}}</span>
                    </div>                                                   
                    <div class="fix lh30">
                        <span class="fl">结算到</span>
                        <span class="fr">{{getdetails.bank_card}}</span>
                    </div>
                    <div class="fix lh30">
                        <span class="fl">创建时间</span>
                        <span class="fr">{{getdetails.ctime}}</span>
                    </div>

                </cell>
            </group>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Group, Cell , Box, XHeader} from 'vux'
export default {
    name: "billDetails",
    data() {
        return {
            getdetails:[],
            getMoneyLog:[]
        }
    },
    components: {
         Box, Group, Cell , XHeader
    },
    created() {

    },
    mounted() {
        var _this=this;
        this.$axios.post('/api/Partner/getMoneyDetail',"data="+JSON.stringify({id:_this.$route.query.id})).then(
            function(res){
                //console.log(res)
                if(res.code==1){
                    _this.getdetails=res.result;
                    _this.getMoneyLog=res.result.getMoneyLog;
                }else{
                     mui.toast(res.msg)
                }
            }
        )
    },
    methods: {

    }
}
</script>

<style scoped>
#billDetails{width: 100%;height: 100%;background: #f2f2f2;}
.trad_status{position: relative;padding-left: 17%;}
#billDetails .weui-icon-success-circle{color:#4aa7fc;font-size:18px;}

</style>
<style>
#billDetails .weui-cell__ft{width: 100%;color:#333;}
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

span.success {background-image: url(../../../assets/images/my/success.png);background-size: 100%;width: 20px;height: 50px;display: inline-block;background-repeat: no-repeat;background-position: 0px 15px;margin-right: 5px;}
span.success-circle {background-image: url(../../../assets/images/my/success.png);background-size: 100%;width: 20px;height: 50px;display: inline-block;background-repeat: no-repeat;background-position: 0px 15px;margin-right: 5px;}
span.cancel {background-image: url(../../../assets/images/my/error.png);background-size: 100%;width: 20px;height: 50px;display: inline-block;background-repeat: no-repeat;background-position: 0px 15px;margin-right: 5px;}
</style>
