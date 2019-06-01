<template>
    <div id="nocardPayment">
        <!-- <bheader :title="payBlock.name" class="fixed-top"></bheader> -->
      <x-header :left-options="{backText: ''}"  :title="payBlock.name"></x-header>
        <div class="fixed-con-lg content">
            <div class="nocard-banner" :style="{background: '#469dc8 url('+ require('../../../assets/images/pay/bg1.png') +') center bottom no-repeat',backgroundSize: '292px 114px'}">
                <router-link to="/kbb/joinPartner"  class="left-icon">
                 <img width="257.5"  :src="require('../../../assets/images/pay/no_card_bg.png')">
                 </router-link>
                <div class="fee-tips" v-html="payBlock.fee_tips"></div>
            </div>
            <box gap="0 15px">
                <circleTitle :title="payBlock.name"  class="money-view">
                    <div class="view-title">{{payBlock.tit_limit}}</div>
                    <div>¥<span class="view-count">{{count}}</span></div>
                </circleTitle>


                <div class="bankCard" @click="checked=item.credit_id"  v-for="(item,index) in bankCard" :key="index"  :style="{background:'#fff',backgroundSize: '84.5px 91.5px'}">
                    <div class="bank_info">                
                        <div class="iconBg">
                            <i class="iconfont" :class="item.icon" :style="{color:item.color}"></i>
                        </div>
                        <div class="bankName">
                            <p>{{item.bank_name}}</p>
                            <p class="name">{{item.name}}</p>
                        </div>
                        <check-icon class="checkIcon fr" :value="checked==item.credit_id" @click.native="checked=item.credit_id"></check-icon>
                    </div>
                    <p class="sj">{{item.credit_code}}</p>
                </div>

                <div class="add-bank"  @click="addCreditCard" ><span class="iconfont icon-add-more"></span> 添加信用卡</div>
                <p class="address">结算卡:
                    <span v-if="payBlock.bank==null">
                        您还没有绑定结算卡，<router-link to="/collectMoney/payway/nocardPayment/addBank" class="bank-tips">立即前往绑定</router-link>
                     </span>
                    <span v-if="payBlock.bank!=null">
                        {{payBlock.bank.bank_name}} {{payBlock.bank.bank_code}}
                     </span>

                </p>
                <div class="comfirm_pay"  @click="confirmPay" >提交支付</div>
            </box>
        </div>
         <loading :show="loading" text="交易中..."></loading>     
    </div>
</template>

<script>
import { XHeader,Box, CheckIcon,Loading } from 'vux'
import circleTitle from '@/components/circleTitle/circleTitle';
// import {mapState} from 'vuex'

export default {
    name: "nocardPayment",
    data() {
        return {
            users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
            bankCard:[],
            payBlock:[{name:'支付通道',tit_limit:'最多20000每笔'}],
            checked:'1',
            block_id: this.$route.query.block_id,
            count: this.$route.query.count,
            idcard:'',
            status:'',
            loading:false
        }

    },
    components: {
          XHeader,Box, CheckIcon,Loading,circleTitle
    },
    computed:{
        // ...mapState(['users'])
    },
    created() {

    },
    mounted() {
        if(!this.bankCard){

        }
        var _this=this;
        const block_id = this.block_id;
        this.$axios.post('/api/api/getPayBlock',`data=${JSON.stringify({
                        block_id:block_id,
                        count:this.count
                    })}`)
            .then(res=>{
                if(res.code==1){
                   _this.payBlock=res.result;
                           _this.$axios.post('/api/api/seeCredit')
                                .then(rest=>{
                                    if(rest.code==1){
                                        _this.bankCard = rest.result;
                                        _this.checked = rest.result[0].credit_id;
                                    }else{
                                        mui.toast(rest.msg);
                                    }
                                // console.log(res.data)
                            });
                }else{
                    mui.toast(res.msg)
                }   
            })

   

    },
    methods: {
        addCreditCard(){
                       // console.log(JSON.stringify(this.users))
            if(this.users.is_validate==1) {
                this.$router.push('/kbb/addCreditCard')
            }else{
                const {userId, session_id} = this.users;
                //    console.log(this.users)
                    this.$axios.post('/api/Usercenter/see_realname_apply',`data=${JSON.stringify({userId, session_id})}`)
                        .then(res=>{
                            if(res.code==200){
                                if(res.data.status==1){  //已实名
                                        this.$router.push('/kbb/addCreditCard')
                                    }else if(res.data.status==0){ //审核中
                                        mui.toast('您的实名信息正在审核中')
                                        this.$router.push('/my/my-name')
                                    }else if(res.data.status==-1){ //被拒绝
                                        mui.toast('需要先进行实名认证') 
                                        this.$router.push('/my/my-name')   
                                    }
                                    else{
                                        mui.toast('需要先进行实名认证') 
                                        this.$router.push('/my/my-name')
                                    }
                            }else{
                                mui.toast('需要先进行实名认证') 
                                this.$router.push('/my/my-name')
                            }
                })
            }
        },
        confirmPay(){
            let count = this.count*1;
            if(count!==count) return mui.toast('金额格式不对');
            if(count<100) return mui.toast('金额不少于100');
            if(this.bankCard.length<1) return mui.toast('无信用卡可支付');

            
            //this.loading = true;
            const payload = {
                userId:localStorage.getItem('Token'),
                creditId:this.checked,
                money:this.count,
                blockId:this.block_id,
            }
             console.log(payload)
            // this.$router.push({name:'payWeb',query:{payload,link:'/api/cardpay/payRequest'}})
			this.$axios.post("/api/cardpay/payRequest",{data:JSON.stringify(payload)})
			.then(res=>{
			 if(res.code==200){
				 console.log(res.order_no)
				 if(res.aisle_name==Kft){
					this.$router.push({
						path:'/kbb/code',
						query:{
							money_order_no:res.order_no}
						}) 
					}else if(res.aisle_name==Xjie){
						this.$router.push({
						path:res.confirm_url
					})
					}
				}else{
					mui.toast(res.msg)
					return false;
				}
			})
        }
    }
}
</script>

<style scoped>
/* .fixed-con-lg{position:relative;} */
#nocardPayment{width: 100%;height: 100%;background: #a4bbff;    overflow-y: auto;}
.nocard-banner{width: 100%;height: 250px;text-align: center; }
.nocard-banner img{display: inline-block;margin-top: 35px;}
.money-view{margin-top: -50px;}
.view-title{font-size: 14px;color: #888;line-height: 35px;}
.view-count{font-size: 24px;font-weight: 700;}


.bankCard{position: relative;width: 100%;height: 100px;margin:10px 0;border-radius: 5px;overflow: hidden;}
.bankCard .bank_info{display: block;overflow: hidden;width: 100%;}
.bankCard .bank_info .iconBg{width: 42px;height: 42px;border-radius: 50%;float: left;margin:11px 15px 0;}
.bankCard .bank_info .iconBg i{color: #fff;font-size: 42px;padding-left: 3px;line-height: 42px;}
.bankCard .bank_info .bankName{float: left;margin-top: 10px;}
.bankCard .bank_info .bankName p{font-size: 14px;color: #333;font-weight: 700;}
.bankCard .bank_info .bankName .name{font-size: 12px;color: #333;}
.bankCard .bank_info .bankName .name i{font-style: normal;margin: 0 5px;}
.bankCard .sj{position: absolute;bottom: 0;width:100%;text-align: right;color: #fff;font-size: 16px;background-color: #469dc8;line-height: 34px;padding-right: 15px;box-sizing: border-box;}
.bankCard .checkIcon{margin-top: 8px;    float: right;margin: 20px 10px;}

.add-bank{display: block;width: 100%;line-height: 75px;height: 75px;color: #333;background-color: #fff;border-radius: 5px;}
.add-bank span{margin-left:20px;font-size: 21px;margin-right: 10px;}
.address{color: #fff;font-size: 14px;padding: 10px 0;}
.comfirm_pay{text-align: center;line-height: 50px;height: 50px;color: #3560ac;background-color: #fff;border-radius: 5px;margin-bottom: 50px;}
.add-bank:active,.comfirm_pay:active{background-color: #f1f2f3;}
.fee-tips{ position: absolute; display: block; top:39px; font-size: 10px; color: #fff; text-align: left; left: 50%; transform: translate3d(-50%,0,0); width:257.5px; padding-left: 89px;font-size: 15px;}
.bank-tips{ color:#fff;}
p{margin-bottom:0;}
</style>
