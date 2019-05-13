<template>
    <div id="joinPartner">
        <bheader title="等级体系介绍"  class="fixed-top"></bheader>
        <div class="fixed-con-lg bg-pink content ">
         
            <box  gap="8px 12px">
                <div class="theme-bg" v-for="(item,index) in arr" :key="index"> 
                    <div class="left fl">
                        <div class="title">{{item.title}}</div>
                       <div class="content-inner">
                           <div class="first">{{item.cont1}}</div>
                           <div class="second">{{item.cont2}}</div>
                           <div class="second">{{item.cont3}}</div>
                       </div>
                    </div>
                   <div class="right fr">
                       <div class="top">{{item.right}}</div>    
                       <div class="bottom">{{item.right2}}</div>   
                   </div>
                
                </div>
               <div class="footer-say">
                    注:全新三级分销体系无同级平行制约,每个级别均可按分润百分比自动分发
                </div>   
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
            arr:[{'title':'总服务商','cont1':'体系:全体系分销利润100%)','cont2':'分润：万分之21+1元/每笔(还款)，万分之14（提现）','cont3':'交易量：循环累计制','right':'晋级考核','right2':'联系客服'},
            {'title':'钻石会员（直系3人以上）','cont1':'体系：A-B-C-D(三级分销利润80%,15%,5%)','cont2':'分润：万分之15(还款)，万分之8（提现）','cont3':'交易量：循环累计制','right':'晋级考核','right2':'交易量累计5000万'},
            {'title':'铂金会员（直系3人以上）','cont1':'体系：A-B-C-D(三级分销利润80%,15%,5%)','cont2':'分润：万分之10(还款)，万分之5（提现）','cont3':'交易量：循环累计制','right':'晋级考核','right2':'交易量累计500万'},
            {'title':'黄金会员','cont1':'体系：A-B-C-D(三级分销利润80%,15%,5%)','cont2':'分润：万分之5(还款)，万分之3（提现）','right':'晋级考核','cont3':'交易量：循环累计制','right2':'直系3人'},
            {'title':'普通会员','cont1':'体系：无','cont2':'分润:无','cont3':'','right':'晋级考核','right2':'无'}]
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
.content{background:#489fca;}
.theme-bg{background:#fff;width: 100%;height: 127px;border-radius:8px;padding: 15px 20px;position: relative;overflow: hidden;margin-bottom:10px;    padding-left: 10px;}
.theme-bg .title{font-size: 17px;line-height: 17px;}
.theme-bg .left{width:76%;float:left;height:100%;}
.theme-bg .right{width:113px;height:100%;position:absolute;right:0;top: 0;padding-right: 20px;text-align:right;color:#1f5a78; }
.theme-bg .content-inner{font-size: 11px;line-height: 20px;}
.theme-bg .first{margin-top: 8px;}
.theme-bg .top{margin-left:22px;margin-bottom:6px; color:#1f5a78;   width:70px;height:40px;font-size: 15px;line-height: 30px;background: url(../../../../src/assets/images/share_bg.png) ;background-size: 100%;text-align:center;   }
.theme-bg .bottom{width: 75px;margin-left:17px;text-align:center;    font-size: 15px;}
#joinPartner{width: 100%;height: 100%;background: #ffffff;}
#joinPartner .img-con{width: 100%;}
#joinPartner .img-con img{max-width: 100%;}
.info{display: inline-block;width: 96%;max-width: 310px;}
.info1{display: inline-block;width: 238.5px;}
.text-left{text-align: left;padding: 5px 10px;}
.payBtn{background-color: #8f87ff;text-align: center;line-height: 44px;color: #fff;font-size: 14px;box-shadow: 0 3px 3px #6570af;border-radius: 6px;margin-bottom: 14px;}
.payBtn:active{background-color: #7b74e5;}
.footer-say{color:#fffe17;}
</style>
