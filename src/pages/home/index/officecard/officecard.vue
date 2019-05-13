<template>
	<div id="credit_circle" class="wrap bg-f0" >
		<i-header :title="title" :is_r="back"  ></i-header>
		
		<div class="main-body">
            <div class="top">
                <ul class="top-content">
                    <li><router-link to="/my/swipe-card/swipe-card0"><i class="iconfont icon-shuaqiazhifu"></i><span>刷卡支付</span></router-link></li>
                    <li><i class="iconfont icon-huankuan"></i><span>在线还款</span></li>
                    <li><i class="iconfont icon-xinyongqia"></i><span>信用卡申请</span></li>
                    <li><router-link to="integral-mall/integral-mall"><i class="iconfont icon-jifen"></i><span>玩转积分</span></router-link></li>
                </ul>
            </div>
            <div class="main-content-one">
                <div class="content-nav"><i></i>按银行找卡 <span class="mui-pull-right" @click="showmore(true)">全部银行<i class="iconfont icon-youjiantou"></i></span></div>
                 <ul class="main-contentone clearfix" :class="{h176:twoRows}" >
                    <li v-for="(item,index) in content" :key="index">
                        <router-link :to="{path:'/index/credit-card-detail',query:{acr:item.acronym,bank:item.bank_name}}" tag='div'><img :src="imgUrl+item.imgsrc"><span>{{item.bank_name}}</span>
                        </router-link>
                     </li>
                </ul>
                <div class="content-foot" @click="showmore" ><span v-show="twoRows===false">收起隐藏</span> <span v-show="twoRows===true">展开更多</span><i class="iconfont icon-arrow-down" :class="{iconrotate:!twoRows}"></i></div>
                <!-- <div class="content-foot" @click="hidemore" v-show="twoRows===true">收起隐藏<i class="iconfont icon-arrow-down"></i></div> -->
            </div>

               <div class="main-content-next">
                <div class="content-nav"><i></i>热门卡片推荐 <span class="mui-pull-right" @click="showmoresec(true)">更多<i class="iconfont icon-youjiantou"></i></span></div>
                 <ul class="main-content clearfix" :class='{h210:cardrows}'>
                    <li class="clearfix flex" v-for="(item,index) in contentnext" :key="index">
                        <div class="img-wrap"><img :src="imgUrl+item.imgsrc"> </div>
                         <div class="right-content">
                            <h2>{{item.cardname}}</h2>
                            <div class="sub-one" v-html="item.card_details"></div>
                            <div class="sub-two"><span>{{item.cardnums|getnum}}</span>  万人已申请</div>
                            <i class="hot-range"><img src="../../../../assets/images/hot.png" alt=""><span>{{item.hot_desc}}</span></i>
                        </div>
                    </li>
                </ul>
                <div class="content-foot" @click="showmoresec" ><span v-show="cardrows===false">收起隐藏</span> <span v-show="cardrows===true">展开更多</span><i class="iconfont icon-arrow-down" :class="{iconrotate:!cardrows}"></i></div>
            </div>
		</div>
        <router-view></router-view>
	</div>
</template>

<script>
   // { name: "中信银联标准IC信用卡",detail:"积分可兑3000多种礼品",num:"23.6",sub:"万人已申请",src:require("@/assets/images/bank-car.png"),href:"" },
        // { name: "中信i白金信用卡",detail:"最好申请的小白金",num:"32.5",sub:"万人已申请",src:require("@/assets/images/bank-car02.png"),href:"" },
        // { name: "万事达标准世界卡",detail:"境内外消费后均可人民币还款",num:"63.3",sub:"万人已申请",src:require("@/assets/images/bank-car03.png"),href:"" }
        //       { name: "中信银行",src:require("@/assets/images/bank08.png"),href:"" },
        // { name: "光大银行",src:require("@/assets/images/bank07.png"),href:"" },
        // { name: "交通银行",src:require("@/assets/images/bank06.png"),href:"" },
        // { name: "兴业银行" ,src:require("@/assets/images/bank05.png"),href:""},
        // { name: "平安银行",src:require("@/assets/images/bank04.png"),href:"" },
        // { name: "浦发银行",src:require("@/assets/images/bank03.png"),href:"" },
        // { name: "招商银行",src:require("@/assets/images/bank02.png"),href:"" },
        // { name: "民生银行",src:require("@/assets/images/bank01.png"),href:"" }
import iHeader from "@/components/header/header-r";
import {Toast} from "mint-ui";
export default {
  name: "index-credit",
  data(){
    return {
      title: "我要办卡",
      back: true,
      morebankcard:false,
      morebankcardnext:false,
      bgfff: "bgfff",
      content: [],
      contentnext:[],
      twoRows:true,
      cardrows:true,
      }
    },
  components: {
    iHeader
  },
    methods:{
          handleScroll(ev){
					ev=ev||window.event;
					var top = $(ev.target).scrollTop();
                    var top2 = ev.target.scrollTop;
                    // console.log(top2)
					if(top>70){
						this.bgfff = '';
					}else{
						this.bgfff = 'bgfff';
					}
            },
            showmore(all){
                if(all===true){
                     this.twoRows=false;
                    return false;
                }
                this.twoRows=!this.twoRows;
            },
          
            showmoresec(all){
                  if(all===true){
                     this.cardrows=false;
                    return false;
                }
                this.cardrows=!this.cardrows;
            },
            getVisa(){
                this.$axios.post("/api/visa/get_visa")
                .then((results) => {
                    if(results.code==200){
                        this.content=results.data.bank_list;
                        let newprice=results.data.hot_visa;  
                        //利用js中的sort方法  
                        for(var i in newprice){
                            if(!newprice[i].hot_desc){
                                newprice[i].hot_desc=0;
                            }
                        };
                        newprice.sort(this.sortprice);  
                        //打印排序后的数据到控制台  
                        // console.log(newprice); 
                        this.contentnext=newprice;
                        // console.log(this.contentnext)
                    }else{
                        Toast(res.msg)
                    };
                });
            },
            sortprice(a,b){  
                return a.hot_desc-b.hot_desc;  
            },
            getBank(){
                // alert(334)
                this.$axios.post("/api/visa/get_bank_visa")
                .then((results) => {
                    if(results.code==200){
                        // (results.data.list.length>0)&&(this.rm = results.data.list);
                        console.log(results.data)
                    }else{
                    };
                });
            },
    },
    computed: {
    //   carcontent:function(){
    //       return this.contentnext
    //   } 
    },
    created () {
         this.getVisa();
    },
    mounted(){
              console.log(this.carcontent)
               //头部显示背景
			document.querySelector(".main-body").addEventListener("scroll",this.handleScroll);
            document.querySelector(".main-body").addEventListener("touchmove",this.handleScroll);
            
    },
    beforeDestroy () {
			document.querySelector(".main-body").removeEventListener("scroll",this.handleScroll);
			document.querySelector(".main-body").removeEventListener("touchmove",this.handleScroll);
    },
    filters:{
        getnum(value){
            return parseFloat(value/1000).toFixed(1);
        },
    }
};
</script>

<style scoped lang="less">
@l:left;
@gray:#555;
@lig:#e0e0e0;
@lit:#d1d1d1;
@ora:#469dc8;
@lc:#cccccc;
@aa:#aaaaaa;
.h(@h){height:@h}
.c(@h){color:@h}
.lh(@h){line-height:@h}
.w(@h){width:@h}
.mt(@mt){margin-top:@mt}
.mb(@mb){margin-bottom:@mb}
.mr(@mr){margin-right:@mr}
.fz(@f){font-size: @f}
.fl(@f){float:@f}
.p(@p){padding: @p}
.pr(@p){padding-right: @p}
.pt(@p){padding-top:@p}
.pl(@p){padding-left:@p}
.bg(@b){background:@b}
.fw(@w){font-weight:@w}
.top{.mt(0px);
    position:relative;
    .top-content{
        .w(100%);    
        color:#fff;
        height: 80px;
        position: absolute;
        bottom: 0;
        left: 0;
        li{
            a{color:#fff;}
            float: left;
            width:25%;
            text-align: center;
            i{display:block;font-size: 33px;
            margin-bottom: 10px;}
            .icon-shuaqiazhifu{.fz(29px)}
        }
    }
}
.main-content-one{
        li{.w(25%);float: left;text-align: center;.mb(10px);.mt(10px);
        img{width:50px;height:50px;}
        span{display: block;    font-size: 13px;line-height: 13px;}
        }
    .content-foot{text-align: center;color:@aa;padding:10px 0;}
    .bg(#fff);
    .p(0 15px);
}
.content-nav{padding:8px 0;}
.content-nav>i{background: @ora;width: 5px; margin-right: 5px;position: relative;top: 2px; height: 16px;display: inline-block; }
.mui-pull-right{color: @aa;}
.main-content-next{
    .main-content{
        li{
            margin:20px 0;
            .img-wrap{.w(107px);.h(69px);}
            img{
                .w(100%);
                .h(100%);
            }
            .right-content{
                -webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;
                position: relative;
                padding-left:10px;
                .w(68%);
                h2{font-size:14px;line-height: 26px; }
                .sub-one,.sub-two{
                        font-size:13px;
                        line-height: 18px;height:18px;margin-bottom:8px;
                        color:@aa;
                }
                .sub-two>span{
                    .bg(@ora);
                    border-radius:15px;
                    color:#fff;
                    padding: 2px 6px;
                }
                i{    
                display: block;
                position: absolute;
                right: 6px;
                top: 6px;
                width: 36px;
                }

            }

        }
    }
    .bg(#fff);
    .mt(10px);
    .p(0 15px);
    .content-foot{text-align: center;color:@aa;padding:10px 0;}
}
.hot-range{position: relative;}
.hot-range>span{position:absolute;top:0;color: #fff;left: 13px;}
.main-body{position: fixed;top:70px;bottom:0;width: 100%;overflow-y: auto;}
.main-contentone{display: flex;flex-wrap: wrap;}
.iconrotate{-moz-transform: rotate(180deg);-o-transform: rotate(180deg); -webkit-transform: rotate(180deg);transform: rotate(180deg);transform-origin:center center;    position: relative;
    display: inline-block;top: -3px;transition: .3s; }
.icon-arrow-down{transition: .3s; }
.h176{height:176px;overflow:hidden;}
.h210{height:218px;overflow:hidden;}
</style>