<template>
    <div id="joinPartner">
        <bheader title="加入合伙人"  class="fixed-top"></bheader>
        <div class="fixed-con-lg bg-pink content ">
            <div class="img-con">
                <img :src="require('../../../assets/images/pay/banner-bg.png')" >
            </div>
            <box  gap="0px 15px">
                <circleTitle title="加入创业合伙人福利">
                    <div class="theme-c font14" style="padding:5px 0;">加入合伙人，节省30%交易费用，年省超2000元</div>
                    <img class="info" :src="require('../../../assets/images/pay/info.png')" >
                </circleTitle>
                <circleTitle title="分享奖励">
                    <div class="grey-c font14 text-left">一、普通用户分享认证即奖励5元红包</div>
                    <div class="grey-c font14 text-left">二、合伙人推荐一个合伙人奖励100元，达三个在奖励300元的基础上另奖励299元</div>
                    <div class="grey-c font14 text-left">三、金级代理可无限发展下级，下级招募到的所有下级均可奖励金级代理30元红包</div>
                </circleTitle>
                <circleTitle title="分润提成">
                    <div class="grey-c font14 text-left">一、普通会员分享认证达3个即可免费级升级为高级会员，刷卡费率立降0.05%。</div>
                    <div class="grey-c font14 text-left">二、会员分享认证达10个即可免费升级为合伙人,享受合伙人刷卡费率政策。</div>
                    <div class="grey-c font14 text-left">三、合伙人可享受三级分销制度</div>
                    <img class="info1" :src="require('../../../assets/images/pay/info1.png')" >
                </circleTitle>
                <circleTitle title="代理权益">
                    <div class="grey-c font14 text-left">一、金级代理招募合伙人50人即可奖励所有合伙人的购买资金19950元</div>
                    <div class="grey-c font14 text-left">二、省级代理招募金级代理20人即可返还所有金级代理购买资金的80%，共计156800元</div>
                </circleTitle>
                <div class="payBtn"  @click="pay(1)">点击支付49 , 成为美卡宝高级会员</div>
                <div class="payBtn"  @click="pay(2)">点击支付399 , 成为美卡宝合伙人</div>
                <div class="payBtn"  @click="pay(3)">点击支付9800 , 成为美卡宝金代理</div>
            </box>
            
        </div>
    </div>
</template>

<script>
import { Box } from 'vux'
import bheader from "@/components/header/header-b";
import circleTitle from './../../../components/circleTitle/circleTitle'
export default {
    name: "joinPartner",
    data() {
        return {
            userInfo:localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')) || {},
        }

    },
    components: {
        bheader, circleTitle, Box
    },
    created() {

    },
    mounted() {

    },
    methods: {
        pay(type){
            const _this = this;
            this.$vux.confirm.show({
                title: '确认支付？',
                onCancel () {
                },
                onConfirm () {
                    //console.log(JSON.stringify(_this.userInfo))
                    let payload = {type,userId:localStorage.getItem('Token'),phone:_this.userInfo.phone};

                    _this.$router.push({name:'payWeb',query:{payload,link:'api/Partner/payMoney',type:'join'}});
                    /* _this.$http.post('/api/Partner/pay_partner','data='+JSON.stringify({type}))
                        .then(res=>{
                            if(res.data.code==1){
                                console.log(res.data);
                                _this.$router.push({name:'rate'});
                            }else{
                                mui.toast(res.data.msg)
                            }
                        }) */
                }
            })
        }
    }
}
</script>

<style scoped>
#joinPartner{width: 100%;height: 100%;background: #ffffff;}
.bg-pink{background-color: #abc0ff;}
#joinPartner .img-con{width: 100%;}
#joinPartner .img-con img{max-width: 100%;}
.info{display: inline-block;width: 96%;max-width: 310px;}
.info1{display: inline-block;width: 238.5px;}
.text-left{text-align: left;padding: 5px 10px;}
.payBtn{background-color: #8f87ff;text-align: center;line-height: 44px;color: #fff;font-size: 14px;box-shadow: 0 3px 3px #6570af;border-radius: 6px;margin-bottom: 14px;}
.payBtn:active{background-color: #7b74e5;}

</style>
