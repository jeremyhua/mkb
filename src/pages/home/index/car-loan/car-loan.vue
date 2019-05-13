<template>
	<div id="loan" class="wrap bg-f0">
		<i-header :title="title" :is_r="arrow" :share="share"></i-header>
		
        <div class="main-loan">

            <mt-swipe :auto="4000" class="banner">
				<mt-swipe-item  v-for="(item,index) in banners" :key="index">
					<img :src="item.src">
				</mt-swipe-item>
               
			</mt-swipe>

            <div class="bannericon">
                <img :src="bannericon.src" alt="">
            </div>
			 
			<ul class="select-choice">
				<li :class="this.activetype=='car'?('active'):''" @click="tabClick('car')">精选轿车</li>
				<li  :class="this.activetype=='suv'?('active'):''" @click="tabClick('suv')">热门suv</li>
			</ul>
<mt-tab-container v-model="activetype" class="select-choice-item" :swipeable="true">
        <mt-tab-container-item id="car">
                <ul class="carlist">
                        <li v-for="(v,i) in lists" :key='i'>
                            <router-link :to="v.href" tag='li'>
                            <div class="title">{{v.title}}</div>
                            <div class="content">{{v.content}}</div>
                            <div class="tip">{{v.tip}}</div>
                            <div class="payone">首付<font color="#469dc8" >{{v.money}}</font>元起</div>
                            <img :src="v.src" alt="" class="carlist-img">
                            </router-link>
                        </li>
                        
                    </ul>
        </mt-tab-container-item>

        <mt-tab-container-item id="suv">
                <ul class="carlist">
                        <li v-for="(v,i) in lists" :key='++i'>
                            <router-link :to="v.href" tag='li'>
                                <div class="title">{{v.title}}</div>
                                <div class="content">{{v.content}}</div>
                                <div class="tip">{{v.tip}}</div>
                                <div class="payone">首付<font color="#469dc8" >{{v.money}}</font>元起</div>
                                <img :src="v.src" alt="" class="carlist-img">
                            </router-link>
                        </li>
                    </ul>
        </mt-tab-container-item>
</mt-tab-container>

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
      title: "车贷",
      arrow: true,
      share:true,
      banners:[{src:require('@/assets/images/my/car.png')}],
      bannericon:{src:require('@/assets/images/my/hot-car.png')},
      activetype:'car',
      lists:[{title:"宝马5系 2018款530Li",content:"指导价:46.89万",tip:"99元抵1000元",money:'18000',src:require('@/assets/images/my/carlist.png'),href:"/loan/car-loan-detail"},
      {title:"奥迪A6L  2018款风尚型",content:"指导价:34.89万",tip:"99元抵1000元",money:'12000',src:require('@/assets/images/my/car_auto.png'),href:"/loan/car-loan-detail"}],
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
  },
  created() {},
  mounted() {},
  beforeCreate() {}

};
</script>

<style scoped lang="less">
    .banner,{height: 145px;position: relative;z-index: 0;width: 100%;left:0;top:0;overflow:hidden;}
    .bannericon{text-align: center;transform: translate3d(0,-145px,0);line-height:145px;height:0;width: 100%;};
	.banner a{display: block;}
	.banner img,.banner a,.tab-icon div img,.tab-icon div a,.tab-gg div a,.tab-gg div img,.tt-content li a,.tab-banner a,.tab-banner img{width: 100%;height: 100%;}
    .main-loan {position: fixed;top: 70px;bottom:0;width: 100%;overflow-y: auto;}
    .select-choice{width:100%;background:#6fc6f1;height:42px;line-height: 42px;position: absolute;}
    .select-choice>li{width:50%;float:left;text-align: center;color:#fff;}
    .select-choice>li.active{background:#469dc8;}
    .carlist{background:#6fc6f1;padding: 5px;}
    .carlist>li{height: 180px;width:100%;background:#fff;border-radius:3px;padding:15px; margin-bottom:5px;position:relative;}
    .carlist .title{font-size:17px;height:30px;line-height: 30px;}
    .carlist .content{font-size: 11px;height:23px;line-height:23px;color:#bababa; }
    .carlist .tip{color:#469dc8;font-size:12px;line-height: 22px;border:1px solid #469dc8;border-radius:3px;padding:0 8px;display: inline-block;margin-top:10px;}
    .payone{font-size: 11px;margin-top:16px;}
    .carlist-img{position:absolute;right:15px;bottom:30px;}
    .carlist font{font-size: 21px;}
    .select-choice-item{padding-top:42px;}
</style>
