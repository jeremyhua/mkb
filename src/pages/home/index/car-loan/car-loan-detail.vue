<template>
	<div id="carloan" class="wrap bg-f0">
		<i-header :title="title" :is_r="arrow" :share="share"></i-header>
        <div class="main-loan">
            <mt-swipe :auto="4000" class="banner">
				<mt-swipe-item  v-for="(item,index) in banners" :key="index">
					<img :src="item.src">
				</mt-swipe-item>
			</mt-swipe>
			 <div class="advert clearfix">
                <img :src="advertimg.src" alt="">  
                <div class="left">定金<font>99</font>元抵<font>1000</font>元活动 </div> 
                <div class="right">
                    <div class="rtop">距离活动结束还剩</div>  
                    <ul class="rbot clearfix">
                        <li><div>19</div><div>天</div></li>
                        <li><div>19</div><div>小时</div></li>
                        <li><div>19</div><div>分</div></li>
                        <li><div>19</div><div>秒</div></li>
                    </ul>
                </div>  
            </div> 



                <ul class="carlist">
                      <li v-for="(v,i) in lists" :key='++i'>
                            <div class="title">{{v.title}}</div>
                            <div class="car-tips"><span>包牌</span><span>免购置税</span><span>赠送保险</span></div>    
                            <div class="content">{{v.content}}</div>
                            <div class="tip"><span >预售</span>已有<font>3</font>人参加预售</div>
                        </li>
                </ul>
                <ul class='pay-first clearfix'>
                    <li v-for="(value,index) in payfirst" :key="index"><img :src="value.src" alt="">{{value.way}}</li>
                </ul>
                <div class="protitle">分期方案</div>
                <ul class="programme">
                    <li v-for="(item,i) in program" :key="i++" class="clearfix">
                        <div class="pro-li" v-for="(v,index) in item.top" :key="index++">
                                {{v.one}}
                                <span><font>{{v.onebot}}</font>万</span>
                           
                        </div>    
                    </li>  
                </ul>
                <div class="showall">展开全部<i class="icon-arrow-down iconfont"></i></div>
                <div class="goods-detail">
                    <div class="color">颜色</div>
                    <div class="light">极地白</div>
                    <div class="shop">购车门店</div>
                    <div class="detail">沃尔沃武汉盘龙城体验店</div>  
                    <div class="areadetail"><img :src="location.src" alt="">湖北武汉市黄陂区盘龙汽车城金色环路18号第四栋</div>
                </div>
                <div class="pay-bottom" @click="alertcon">预付￥99.00定金</div>
		</div>


        <div class="alertContent " :class="[alertContent ? 'on' : '']">
		        <div class='content'>
		            <div class="alert-top">预付定金</div>
		            <div class="inp">￥<font>99.00</font></div>
		            <ul class="alert-main">
		            	<li class="clearfix" v-for="(val,index) in payway" :key="index"> <span class="fl"><img :src="val.src"/>{{val.name}}</span><span class="fr"><input type="radio" name="pay" id="pay" value="" /></span></li>
		            	<!-- <li class="clearfix"><span class="fl"><img :src="payway02"/>支付宝支付</span><span class="fr"><input type="radio" name="pay" id="pay" value="" /></span></li> -->
		            	<!-- <li class="clearfix"><span class="fl"><img :src="payway03"/>联通支付</span><span class="fr"><input type="radio" name="pay" id="pay" value="" /></span></li> -->
		            </ul>
		            <div class="buy" @click="closeContent"><a href="">去支付</a></div>
		            <!-- <div class="kown"><img src="../img/x_03.png"/></div> -->
				</div>
		</div>	    
		 
    </div>    	
</template>
<script>
import iHeader from "@/components/header/header-r.vue";
import { TabContainer, TabContainerItem, LoadMore, Popup } from "mint-ui";
import "@/assets/css/main.css";
export default {
  name: "car-loan",
  data() {
    return {
      users: localStorage.getItem("users")? JSON.parse(localStorage.getItem("users")): "",
      msg: "这个是信用贷页面",
      title: "车辆详情",
      arrow: true,
      share:true,
      banners:[{src:require('@/assets/images/my/car_detail.png')},{src:require('@/assets/images/my/car_detail.png')},{src:require('@/assets/images/my/car_detail.png')}],
      bannericon:{src:require('@/assets/images/my/hot-car.png')},
      activetype:'car',
      lists:[{title:"沃尔沃XC60 2018款T5 四驱智逸版",content:"指导价:46.89万",tip:"99元抵1000元",money:'18000',src:require('@/assets/images/my/carlist.png')}],
      payfirst:[{src:require('@/assets/images/my/way_03.png'),way:"超低首付"},{src:require('@/assets/images/my/way_05.png'),way:"方案灵活"},{src:require('@/assets/images/my/way_07.png'),way:"急速提车"}]
      ,program:[{top:[{one:"首付",onebot:"1.50"},{one:"月付",onebot:"455.25"},{one:"期限",onebot:"60"}]},
      {top:[{one:"首付",onebot:"1.50"},{one:"月付",onebot:"455.25"},{one:"期限",onebot:"60"}]},
      {top:[{one:"首付",onebot:"1.50"},{one:"月付",onebot:"455.25"},{one:"期限",onebot:"60"}]}],
      location:{src:require('@/assets/images/my/location_13.png')},
      alertContent:false,
      payway:[{src:require('@/assets/images/my/pay1.png'),name:"微信支付"},{src:require('@/assets/images/my/pay2.png'),name:"支付宝支付"},{src:require('@/assets/images/my/pay3.png'),name:"银行卡支付"}],
      advertimg:{src:require('@/assets/images/my/adver.png')},
    };
  },
  components: {
    iHeader,
    TabContainer,
    TabContainerItem,
    Popup,
    LoadMore
  },
  methods: {
    tabClick(type) {
        if(type=="car"){
            this.activetype='car';
        }else if(type=="suv"){
            this.activetype='suv';
        }else{
            this.activetype='car';
        };

    },
    alertcon(){
        this.alertContent=true;
    },
    closeContent(){
        this.alertContent=false;
    }
  },
  created() {},
  mounted() {},
  beforeCreate() {}

};
</script>

<style scoped lang="less">
    .banner,{height:290px;position: relative;z-index: 0;width: 100%;left:0;top:0;overflow:hidden;}
	.banner a{display: block;}
	.banner img,.banner a,.tab-icon div img,.tab-icon div a,.tab-gg div a,.tab-gg div img,.tt-content li a,.tab-banner a,.tab-banner img{width: 100%;height: 100%;}
    .main-loan {position: fixed;top: 70px;bottom:0;width: 100%;overflow-y: auto;}
    .select-choice{width:100%;background:#ffac73;height:42px;line-height: 42px;}
    .select-choice>li{width:50%;float:left;text-align: center;color:#fff;}
    .select-choice>li.active{background:#469dc8;}
    .carlist{background:#fff;border-bottom:1px solid #ebebeb;}
    .carlist>li{width:100%;background:#fff;border-radius:3px;padding:15px;position:relative;}
    .carlist .title{font-size:17px;height:30px;line-height: 30px;}
    .carlist .content{font-size: 11px;height:23px;line-height:23px;color:#bababa; }
    .payone{font-size: 11px;margin-top:16px;}
    .carlist-img{position:absolute;right:15px;bottom:30px;}
    .carlist font{font-size: 21px;}
    .advert{position:relative;height: 59px;/* background:url("../../../../assets/images/my/adver.png");background-size: 100%; */color:#fff;line-height: 59px;padding-left:21px;padding-right:12px; }
    .advert>img{width:100%;height: 59px;position: absolute;position: absolute;left: 0;right: 0;top: 0;bottom: 0;z-index: -1;}
    .advert >.left{float:left;}
    .advert>.right{float:right;font-size: 11px;height:59px;line-height:23px;}
    .advert .rtop{height:23px;text-align:center;}
    .advert>.right>.rbot{height:25px;margin-bottom:10px;text-align:center; }
    .advert>.right>.rbot>li{float:left;width: 25px;margin-right:3px;background:#fff;border-radius:3px;color:#747474;padding: 3px 0;text-align:center; }
    .advert>.right>.rbot>li>div{    font-size: 8px;line-height: 11px;height:11px;text-align:center;}
    .car-tips>span{margin-right:5px;border:1px solid #469dc8;font-size:11px;line-height:30px;color:#469dc8;border-radius:3px;padding:2px 5px;}
    .car-tips{height:30px;}
    .carlist .tip{line-height: 30px;height:30px;color: #999;}
    .carlist .tip span{color:#fff;background:#469dc8;margin-right: 3px;padding: 1px 3px;    padding: 1px 5px;font-size: 13px;position: relative;top: -2px;}
    .carlist .tip font{color:#469dc8;font-size: 16px;}
    .pay-first li{float:left;width:33.33%;}
    .pay-first{height: 66px;background:#fff;line-height: 66px;border-bottom:1px solid #ebebeb;}
    .pay-first>li>img{    margin: 0 8px;top: 8px;position: relative;}
    .protitle{height:48px;line-height:48px;background:#fff;padding-left:28px;position: relative;}
    .protitle:before{width: 4px;height:16px;background: #469dc8;position: absolute;left:16px;top:16px;content:'';}
    .programme>li{height:70px;padding: 12px;}
    .programme>li:nth-child(odd){background:#f9f3ed;}
    .programme>li:nth-child(even){background:#fff;}
    .programme>li>div{width: 33.3%;float:left;height:100%;font-size: 11px;line-height: 18px;}
     .programme>li>div>span{display:block;color:#469dc8;font-size: 14px;line-height: 27px;}
     .programme>li>div>span>font{font-size:20px;}
     .showall{font-size:12px;color:#544d4d;padding-right:15px;height:38px;background:#fff;line-height:38px;text-align: right;}
     .goods-detail{background:#fff;padding:12px;}
    .goods-detail .color,.goods-detail .shop{font-size:14px;padding-left:28px;height:18px;line-height:18px;position: relative;width:100%;}
    .goods-detail .color:before,.goods-detail .shop:before{width: 4px;height:14px;background: #469dc8;position: absolute;left:16px;top:2px;content:'';}
    .goods-detail  .light{color:#469dc8;font-size:11px;    margin-right: 5px; border: 1px solid #469dc8;font-size: 11px;    border-radius: 3px;padding: 0px 5px;margin: 11px 0 18px 17px;display: inline-block; color: #469dc8;border-radius: 3px; padding:0px 5px;}
    .goods-detail  .detail{line-height: 36px;padding-left: 16px;}
     .areadetail{font-size:13px;color:#999;padding-left: 16px;}
     .pay-bottom{height:50px;line-height:50px;color:#fff;text-align:center;
     background: #4097c2;
    background: -webkit-gradient(linear, left top, right top, color-stop(1%, #6fc6f1),to(#469dc8));
    background: linear-gradient(to right, #6fc6f1 1%,#469dc8 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#ff3101',GradientType=1 );}
    .alertContent{ width: 100%;height:100%;position: fixed;left: 0;right: 0;bottom: 0;height: 0;opacity: 0;overflow: hidden;}
    .alertContent.on{z-index:100;opacity: 1;height:100%;background: rgba(0, 0, 0, .4);}
    .alertContent.on .content{transform: translate3d(0, 0, 0);transition: .5s;}
    .alertContent .content{ width: 100%;height: 400px;background: #fff;padding:28px 12px;position: absolute;transform: translate3d(0, 400px, 0);transition: .5s;bottom:0;}
    .content{font-size:15px;}
    .inp{font-size:20px;color:#333333;text-align:center;margin-top:11px;margin-bottom:26px;}
    .inp font{font-size:34px;}
    .alert-main>li{height:63px;line-height:63px;position:relative;border-bottom:1px solid #eee;}
    .alert-main>li>span>img{    position: relative; top: 6px;margin: 0 5px;}
    .buy>a{width: 330px;height: 53px;display: block;margin: 0 auto;color: #fff;text-align: center;line-height: 53px;font-size: 20px;margin-top: 20px;border-radius: 3px; background: #4097c2;background: -webkit-gradient(linear, left top, right top, color-stop(1%, #6fc6f1),to(#469dc8));background: linear-gradient(to right, #6fc6f1 1%,#469dc8 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#ff3101',GradientType=1 );}
    .alert-main li input[type=radio] {appearance: none;-moz-appearance: none;-webkit-appearance: none;background: url(../../../../assets/images/my/check7.png) center center no-repeat;position: absolute;right: 0;width: 23px;height: 23px;top: 15px;}
    .alert-main li input[type=radio]:checked {background-image: url(../../../../assets/images/my/pay6.png);background-size: 100%}
    .alert-top{text-align:center;}
</style>
<style>
    #carloan .mint-swipe-indicator {display: inline-block;background: #fff;opacity:1;}
    #carloan .mint-swipe-indicator.is-active{background:#469dc8;}
</style>
