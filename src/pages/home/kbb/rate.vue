<template>
    <div id="rate">
        <x-header title="我的费率" class="fixed-top"></x-header>
        <div class="fixed-con-lg fixed-content">
            <div class="rateImg">
                <router-link to="/kbb/joinPartner"  class="left-icon">
                    <img :src="require('../../../assets/images/pay/rate_01.png')">
                </router-link>
            </div>
            <box gap="0 15px" style="position:relative;margin-top:-80px;">
                <circleTitle :title="levelText">
                    <div class="user-cont">
                        <div class="cur-user">
                            <ul>
                                <li v-for="(item,k) in userList" :class="{active:item.level==level}" :key="k">
                                    <img :src="item.img">
                                    <p>{{item.text}}</p>
                                </li>
                            </ul>
                        </div>
                        <ul class="rate-con" v-for="(item,i) in rateList" :key="i">
                            <li v-for="(v,n) in item" :key="n">{{v}}</li>
                        </ul>
                    </div>
                </circleTitle>
            </box>
        </div>
    </div>
</template>

<script>
import { XHeader,Box } from "vux";
import circleTitle from './../../../components/circleTitle/circleTitle'

import rate_02 from '@/assets/images/pay/rate_02.png'
import rate_03 from '@/assets/images/pay/rate_06.png'
import rate_04 from '@/assets/images/pay/rate_03.png'
import rate_05 from '@/assets/images/pay/rate_04.png'

export default {
    name: "rate",
    data() {
        return {
            userList:[
                {
                    img:rate_05,
                    text:'金级',
                    title:'您当前是金级代理',
                    level:4
                },
                {
                    img:rate_04,
                    text:'合伙人',
                    title:'您当前是合伙人',
                    level:3
                },
                {
                    img:rate_03,
                    text:'高级会员',
                    title:'您当前是高级会员',
                    level:2
                },
                {
                    img:rate_02,
                    text:'会员',
                    title:'您当前是会员',
                    level:1
                },
            ],
            level:'',
            levelText:'',
            rateList:[]
        }

    },
    components: {
        XHeader,Box,circleTitle
    },
    created() {
        this.$axios.post('/api/api/userFeilv')
            .then(res=>{
               console.log(res)
                if(res.code==1){
                    this.level = res.result.level;
                    // this.rateList = res.result.feilv;
                }else{
                    mui.toast(res.msg)   
                }
            })
    },
    mounted() {
    },
    methods: {

    },
    watch: {
        'level'(){
            switch (this.level) {
                case 1:
                    this.levelText = '您当前是会员';
                    break;
                case 2:
                    this.levelText = '您当前是高级会员';
                    break;
                case 3:
                    this.levelText = '您当前是合伙人';
                    break;
                default:
                    this.levelText = '您当前是金级代理';
                    break;
            }
             
        }
    }
}
</script>

<style scoped>
#rate{width: 100%;height: 100%;background-color: #a4bbff;}
.rateImg img{width: 100%;height: auto;}
.user-cont{width: 100%;overflow: hidden;}
.cur-user{overflow: hidden;margin-top: 15px;margin-bottom: 15px;}
.cur-user ul{width: 100%;text-align: center;}
.cur-user ul li{width: 20%;float: right;position: relative}
.cur-user ul li.active:after{content:'';position:absolute;bottom: 0;left:28px;width: 0;height: 0;border-left: 5px solid transparent; border-right: 5px solid transparent;border-bottom: 5px solid #4aa7fc;}
.cur-user ul li.active p{color: #4aa7fc;}
.cur-user ul li img{width: 35px;height: 35px;}
.cur-user ul li p{font-size: 12px;padding-bottom: 10px;}
.rate-con li{float: left;width: 20%;font-size: 12px;color: #666;}
.rate-con .rateTit{color: #333;}
.active,.rate-con .current{color: #4aa7fc;}
.rate-con{line-height: 40px;}
</style>
<style>
#rate ._title .open_zc{text-shadow: none;font-weight: normal;font-size: 14px;padding: 4px 50px;}
</style>

