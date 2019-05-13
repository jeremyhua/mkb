<template>
    <div id="debitCard">
        <x-header :left-options="{backText: ''}" title="我的银行卡"></x-header>
        <div class="card-list fixed-content">
            <!-- <div class="bankCard" @click="change_state(index,item.bankcard_id)" :style="{background:'#fff',backgroundSize: '84.5px 91.5px'}" v-for="(item,index) in bankCard" :key="++index" >
                <div class="bank_info">                
                    <div class="iconBg">
                        <i class="iconfont"  :class="item.icon" :style="{color:item.color}"></i>
                    </div>
                    <div class="bankName">
                        <p>{{item.bank_name}}</p>
                        <p class="name">{{item.name}}</p>
                    </div>
                    <check-icon class="checkIcon fr" :value="checked==index"></check-icon>
                    <span class="default-txt fr" v-if="item.type==1">默认</span>
                </div>
                <p class="sj">*** **** **** {{item.bank_code_tail}}</p>
            </div> -->
    <!-- <div> -->
       <tab :line-width=2  active-color='#469dc8' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"  @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="100%" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper vux-center" v-show="item=='银行卡'">
            <swipeout>
                <swipeout-item v-for="(item,index) in bankCard" :key="++index">
                    <div slot="right-menu">
                        <swipeout-button @click.native="onButtonClick(item.bankcard_id)" type="warn">删除</swipeout-button>
                    </div>
                    <div slot="content" class="demo-content vux-1px-t">
                        <div class="bankCard" @click="change_state(index,item.bankcard_id)" :style="{background:'#fff',backgroundSize: '84.5px 91.5px'}">
                            <div class="bank_info">                
                                <div class="iconBg">
                                    <i class="iconfont"  :class="item.icon" :style="{color:item.color}"></i>
                                </div>
                                <div class="bankName">
                                    <p>{{item.bank_name}}</p>
                                    <p class="name">{{item.name}}</p>
                                </div>
                                <check-icon class="checkIcon fr" :value="checked==item.type"></check-icon>
                                <span class="default-txt fr" v-if="item.type==1">默认</span>
                            </div>
                            <p class="sj">*** **** **** {{item.bank_code_tail}}</p>
                        </div>
                    </div>
                </swipeout-item>
            </swipeout>
            <router-link class="add-bank" :to="{name:'addBank'}"><span class="iconfont icon-add-more"></span> 添加银行卡</router-link>



          </div>
          <div class="tab-swiper vux-center" v-show="item=='信用卡'">
              <swipeout>
                        <div class="">
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

                </swipeout>
          </div>
        </swiper-item>
      </swiper>
    </div>
   </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import { Tab, TabItem, Sticky, Divider,  Swiper, SwiperItem ,XHeader, Cell , Group , Box , XButton,CheckIcon, Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
import creditCard from './../../../components/creditCard/creditCard'
import repay_01 from '@/assets/images/pay/repay_01.png'
import repay_02 from '@/assets/images/pay/repay_02.png'
import repay_03 from '@/assets/images/pay/repay_03.png'

export default {
    name: "debitCard",
    data() {
        return {
            users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
            bankCard:[],
            index: 0,
            checked:1,
            demo2: '美食',
            list2:['银行卡', '信用卡'],
           creditCard:[],
            idcard:'',
            status:''

        }

    },
    components: {
        XHeader,Cell,Group,Box,XButton,CheckIcon, Swipeout, SwipeoutItem, SwipeoutButton,Tab, TabItem, Sticky, Divider, Swiper, SwiperItem , creditCard
    },
    created() {
        this.getCaredList()
    },
    mounted() {
        if(localStorage.getItem('Token')){
                    this.getCreditCard();
                }
    },
     computed: mapState([
        'card'
    ]),
     watch: {
        'card.creditCard'(){
            this.creditCard = this.card.creditCard;
            this.creditCard.map(v=>v['path']='/kbb/repay');
        },
        'card.msg'(){
            //mui.toast(this.card.msg.replace(/\d+/,''))
        },
    },
    methods: {
         ...mapActions([
            'getCreditCard'
        ]),
        getCaredList(){
            this.$axios.post('/api/api/seeBank').then(response=>{
                if(response.code==1){
                    this.bankCard = response.result;
                    //console.log(response.data)
                }else{
                    mui.toast(response.msg)
                }
            }).catch(err=>{

            });
        },addCreditCard(){
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
        change_state(index,id){
            //this.checked = index;
            //console.log(1)
            this.$axios.post("/api/api/choiceBank", `data=${JSON.stringify({bankKey:id})}`).then(response=>{
                if(response.code==1){
                    mui.toast(response.msg)
                    this.getCaredList();
                }else{
                    mui.toast(response.msg)
                }
            }).catch(err=>{

            });
        },
        onButtonClick(id){
            const _this = this;
            this.$vux.confirm.show({
                title: '确认删除？',
                onCancel () {
                },
                onConfirm () {
                    _this.$axios.post('/api/Partner/delBank',`data=${JSON.stringify({id})}`)
                        .then(res=>{
                            mui.toast(res.msg)
                            if(res.code==1){
                                _this.getCaredList()
                            }
                        })
                }
            })
        }
    }
}
</script>

<style scoped lang="less">    
    .card-list,.vux-slider{height:100%;}
    #debitCard,.animated{width: 100%;height: 100%;background-color: #f0f0f0;}
    #debitCard .weui-cell{padding: 15px;}
    #debitCard .vux-header .vux-header-right a{color: #fff;}
    .weui-btn_default {color: #fff; background-color:#4aa7fc;font-size: 16px;margin-top: 15px;}
    .weui-btn {line-height: 2.9em;}

    .bankCard{position: relative;width: 100%;height: 100px;margin:10px 0;overflow: hidden;}
    .bankCard .bank_info{display: block;overflow: hidden;width: 100%;}
    .bankCard .bank_info .iconBg{width: 42px;height: 42px;border-radius: 50%;float: left;margin: 0px 15px;;}
    .bankCard .bank_info .iconBg i{color: #fff;font-size: 42px;padding-left: 3px;}
    .bankCard .bank_info .bankName{float: left;margin-top: 10px;}
    .bankCard .bank_info .bankName p{font-size: 14px;color: #333;font-weight: 700;}
    .bankCard .bank_info .bankName .name{font-size: 12px;color: #333;}
    .bankCard .bank_info .bankName .name i{font-style: normal;margin: 0 5px;}
    .bankCard .sj{position: absolute;bottom: 0;width:100%;text-align: right;color: #fff;font-size: 16px;background-color: #3c6cc3;line-height: 34px;padding-right: 15px;box-sizing: border-box;}
    .bankCard .checkIcon{margin-top: 8px;}

    .add-bank{display: block;width: 100%;line-height: 75px;height: 75px;color: #333;background-color: #fff;border-radius: 5px;margin-top:15px;}
    .add-bank span{font-size:30px;margin-left:20px;}
    .address{color: #fff;font-size: 14px;padding: 20px 0;}
    .comfirm_pay{text-align: center;line-height: 50px;height: 50px;color: #3560ac;background-color: #fff;border-radius: 5px;margin-bottom: 50px;}
    .add-bank:active,.comfirm_pay:active{background-color: #f1f2f3;}
  
    .default-txt{margin-top:12px;font-size:15px;color:#4AA7FC;}
    .vux-swipeout-item{background-color: #E64340;}
    .vux-swipeout-button-warn{border-radius: 0;}
    .bankCard .bank_info .iconBg i{line-height: 66px;}
    .bank_info{height:66px;}
    .bankCard .checkIcon{margin-top: 19px;}
    .fr{float:right;}
    .default-txt{margin-top: 21px;}
    
      .card-list .vux-swipeout{padding: 0 10px;}


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
   .vux-tab .vux-tab-item{width:50%;float:left;}
   .vux-tab{display:block;overflow:hidden;}
   /*.weui-btn:after{    width: 100%;height: 100%;}*/
</style>
<style>
    #debitCard .vux-no-group-title .vux-cell-bd p label{font-size: 15px;color: #333;} 
    #debitCard .vux-no-group-title .weui-cell__ft{font-size: 15px;}
    #debitCard .vux-no-group-title{margin-top: 0 !important;margin-bottom: 10px;}
    #debitCard .vux-header .vux-header-left a{color: #fff !important;}     
    #debitCard .vux-header .vux-header-title > span{font-size: 16px;}
    #debitCard .vux-header .vux-header-left .left-arrow:before{border-color: #fff !important;}
     #debitCard .card-list, #debitCard  .vux-slider , #debitCard   .vux-swiper-item{height: 100%;overflow: auto;}
    #debitCard .vux-tab-wrap {position: fixed;top: 67px;height: 47px;width: 100%;    z-index: 2;}
    #debitCard .vux-slider{padding-top:47px;}
</style>