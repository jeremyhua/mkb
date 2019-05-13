<template>
    <div id="withdrawal">
        <txheader title="提现" is_r="true" class="fixed-top"></txheader>
        <div></div>
        <div class="fixed-con-lg  ">
            <div class="money-info" :style="{background: 'rgb(70, 157, 200) url('+ require('../../../assets/images/pay/bg1.png') +') center bottom no-repeat ',backgroundSize: '292px 114px'}">
                <div class="money" ><span>¥</span> <b v-cloak>{{getinfo.user_money}}</b></div>
                <div>可提现金额</div>
            </div>
            <div class="money-input">
                <span class="title">¥</span>
                <input  type="text" placeholder="请输入提现金额" v-model="tixian"> 
            </div>
            <span class="tishifee">{{getinfo.tishifee}}</span>
            <box gap="15px 15px" style="clear: both;">
                <circleTitle title="请确认提现信息" class="info" greytitle=true >
                    <div class="info-list">姓&nbsp;&nbsp;&nbsp;&nbsp;名：<span>{{getinfo.name}}</span></div>
                    <div class="info-list">会员等级：<span>{{getinfo.level}}</span></div>
                    <div class="info-list">身份证号：<span>{{getinfo.idcard}}</span></div>
                    <div class="info-list">取现金额：<span class="theme-c">¥{{(parseFloat(tixian||0).toFixed(2))}}</span></div>
                    <div class="info-list">结算卡号：<span>{{getinfo.bank_code}} （取现至结算银行卡）</span></div>
                    <div class="info-list">所属银行：<span>{{getinfo.bank_name}}</span></div>
                    <box gap="15px 15px">
                        <XButton type="primary" :disabled="btnloading"  @click.native="confirm">{{btnWord}}</XButton>
                         <!-- <cell :title="$t('Will auto close in 3s')" @click.native="showModuleAuto" is-link>确 认</cell> -->
                    </box>
                </circleTitle>
            </box>
        </div>
    </div>
</template>

<script>
import { Box , XButton } from 'vux'
import txheader from "@/components/header/header-tx";
import circleTitle from './../../../components/circleTitle/circleTitle'
export default {
    name: "withdrawal",
    data() {
        return {
            tixian:'',
            getinfo:'',
            btnloading:false,
            btnWord:'确 认',
        }

    },
    components: {
        txheader, circleTitle, Box, XButton
    },
    created() {
    },
    mounted() {
          this.getlist();
    },
    watch:{
       tixian(nwl,old){
           this.tixian=(nwl>parseFloat(this.getinfo.user_money))?parseFloat(this.getinfo.user_money):nwl
       }
    },
    methods: {
         getlist(){
            let   _this=this;
            this.$axios.post('/api/Myprofit/withdraw','').then(
                function(res){
                    // console.log(JSON.stringify(res))
                    if(res.code==1){
                        _this.getinfo=res.result;
                        if(res.result.bankcard_id=="null" || res.result.bankcard_id==null){
                            _this.$vux.confirm.show({
                                title: '您还未绑定银行卡，立即前往',
                                onCancel () {
                                },
                                onConfirm () {
                                     _this.$router.push({name:'debitCard'});
                                }
                            })
                        }
                    }else{
                        mui.toast(res.msg);
                    }
                }
            )
         },
        confirm(){
            let   _this=this;
            this.btnloading=true;
            this.btnWord='提现中...';
            this.$axios.post('/api/Myprofit/do_withdraw',`data=`+JSON.stringify({withdraw_money: _this.tixian,bankcard_id: _this.getinfo.bankcard_id}) ).then(
                function(res){
                    // console.log(JSON.stringify(res))
                    _this.btnloading=false;
                    _this.btnWord='确 认';
                    if(res.code==1){
                        mui.toast(res.msg);
                        _this.tixian='';
                        _this.getlist();

                    }else{
                        mui.toast(res.msg);
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
#withdrawal{width: 100%;height: 100%;background: #d1e9ff;}
.money-info{width: 100%;height: 150px;font-size: 14px;color: #fff;text-align: center;padding-top: 40px;}
.money b{font-size: 26px;}
.money-input{position: relative;margin-top: -30px;width: 94%;padding: 0 30px;margin-left: 3%;height: 60px;line-height: 60px;font-size: 20px;color: #4aa7fc;background-color: #fff;border-radius: 15px;box-sizing: border-box;}
/* .money-input .title{} */
.money-input input{text-align: right;border: none;width: 90%;font-size: 16px;}
#withdrawal .info-list{font-size: 12px;text-align: left;color: #333;padding-left: 20px;line-height: 30px;}
   [v-cloak] {
    display: none;
    }
button.weui-btn, input.weui-btn{padding:0;}
.tishifee{ float: right; color:#333; font-size: 12px; padding-right: 30px;  height: 30px; line-height: 30px; }
</style>
