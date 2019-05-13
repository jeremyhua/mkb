<template>
    <div>
        <div id="repayMent">
            <x-header title="还款" class="fixed-top" :left-options="{backText: ''}" >
                <router-link to="/index" slot="left"></router-link>
                <!-- <router-link to="/collectMoney/test" slot="left">还款记录</router-link>  :right-options="{showMore: true}" @on-click-more="showMenus = true" -->
            </x-header>
            <div class="fixed-content ">
                <!-- <div class="repayList" :style="{background: 'url('+ require('../../../assets/images/pay/repay_04.png') +')',backgroundSize: '100% 100%'}">                    
                    <router-link :to="item.path" class="repayCont" v-for="(item,index) in repayList" :key="index">
                        <img :src="item.img">
                        <p>{{item.title}}</p>
                    </router-link>                    
                    <router-link to="/collectMoney/joinPartner" class="jion">立即加入</router-link>
                </div> -->
                <div class="bankList" v-if="creditCard.length>0">
                    <creditCard :creditCard="creditCard" myheight="100px"></creditCard>
                </div>
                <!-- <div class="bankCard" @click="checked=item.credit_id"  v-for="(item,index) in bankCard" :key="index"  :style="{background:'#fff',backgroundSize: '84.5px 91.5px'}">
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
                </div> -->
                <div class="none-wrap" v-if="creditCard.length<1">
                    <div class="none-card">
                        <img :src="require('../../../assets/images/pay/0_card.png')" alt="">
                    </div>
                    <p>您还没有绑定信用卡</p>
                </div>
                <box gap="5px 10px">
                    <x-button type="primary"  @click.native="addCreditCard">添加信用卡</x-button>
                </box>
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader, XButton, Box, } from 'vux'
import creditCard from './../../../components/creditCard/creditCard'
import { mapActions, mapState } from 'vuex'
import repay_01 from '@/assets/images/pay/repay_01.png'
import repay_02 from '@/assets/images/pay/repay_02.png'
import repay_03 from '@/assets/images/pay/repay_03.png'

export default {
    name : 'repayMent',
    data() {
        return {
            users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
            repayList:[
                {
                    path:'/repayMent/myProfit',
                    img:repay_01,
                    title:'我的利润'
                },
                {
                    path:'/repayMent/myClient',
                    img:repay_02,
                    title:'我的客户'
                },
                {
                    path:'/repayMent/makeMoney',
                    img:repay_03,
                    title:'推广赚钱'
                }
            ],
            creditCard:[],
            idcard:'',
            status:''
        }
        showMenus:false
    },
    computed: mapState([
        'card'
    ]),
    components: {
        XHeader, XButton, Box, creditCard
    },
    created() {
        
    },
    mounted() {
        $('.left-arrow').click(function(){
             this.$router.push('/index')
        });
        console.log(JSON.stringify(this.card))
        if(localStorage.getItem('Token')){
            this.getCreditCard();
        }

    },
    distoryed() {

    },
    methods: {
        ...mapActions([
            'getCreditCard'
        ]),
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
        }
    },
    watch: {
        'card.creditCard'(){
            this.creditCard = this.card.creditCard;
            this.creditCard.map(v=>v['path']='/kbb/repay');
        },
        'card.msg'(){
            //mui.toast(this.card.msg.replace(/\d+/,''))
        },
    }
    
}
</script>

<style scoped lang="less">
    .vux-header-left a[href]{display: block;float: left;position: absolute;width: 30px;height: 40px;top: 10px;left: -5px;z-index:100;}
    #repayMent{width: 100%;height: 100%;}
    .fixed-content{padding-bottom:10px;}
    .vux-header{background: #469dc8;} 
    .repayList {width: 100%;height: 170px;text-align: center;padding-top: 15px;}
    .repayList .repayCont{display: inline-block;width: 33.3%;text-align: center;z-index: 10;}
    .repayList .repayCont img{width: 50px;height: 50px;}
    .repayList .repayCont p{color: #fff;}
    .repayList .jion{display: inline-block;padding: 4px 25px;margin-top: 20px;border-radius: 10px;border: 1px solid #fff; color: #fff;font-size: 16px;}   
    .bankList{padding: 5px 15px;background: #fff;margin-bottom: 15px;}  
    .none-card{width:180px;height:130px;margin:0 auto;}
    .none-card img{width:100%;height:100%;}
    .none-wrap{text-align: center;margin:50px 0;}
    .none-wrap p{margin-top:15px !important;}
    button{padding: 0;}
</style>



