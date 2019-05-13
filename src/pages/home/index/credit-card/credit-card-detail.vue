<template>

	<div id="credit_detail" class="wrap bg-f0" >
		<i-header :title="title" :is_r="back" ></i-header>
		<div class="main-body">
               <div class="main-content-next">
                <div class="content-nav"><i></i>热门卡片推荐 </div>
                 <ul class="main-content clearfix" >
                    <li class="clearfix flex" v-for="(item,index) in contentnext" :key="index">
                        <div class="img-wrap" @click="openGrab(item.url)"><img :src="imgUrl+item.imgsrc"> </div>
                         <div class="right-content" @click="openGrab(item.url)">
                            <h2>{{item.cardname}}</h2>
                            <div class="sub-one" v-html="item.card_details"></div>
                            <div class="sub-two"><span>{{item.cardnums|getnum}}</span>  万人已申请</div>
                            <i class="hot-range"><img src="../../../../assets/images/hot.png" alt=""><span>{{item.hot_desc}}</span></i>
                        </div>
                    </li>
                    <li v-if='empty' class="empty">
                        <div>暂无相关类型信用卡</div>
                    </li>
                </ul>
            </div>
		</div>
        <router-view></router-view>
	</div>
</template>

<script>
import iHeader from "@/components/header/header-r";
import mycenterWeb from "@/components/webview/mycenterweb"
import {Toast} from "mint-ui";
export default {
  name: "index-credit",
  data(){
    return {
      title: "信用卡",
      back: true,
      contentnext:[],
      empty:false,
      }
    },
  components: {
    iHeader,mycenterWeb
  },
    methods:{
         openGrab(url){
				const payload = {
					userId:localStorage.getItem('Token')
				}
                this.$router.push({name:'cardThird',query:{payload,link:url}}) 
		 },
          handleScroll(ev){
					ev=ev||window.event;
					var top = $(ev.target).scrollTop();
                    var top2 = ev.target.scrollTop;
					if(top>70){
						this.bgfff = '';
					}else{
						this.bgfff = 'bgfff';
					}
            },
            getBank(){
                this.$axios.post("/api/visa/get_bank_visa",`data=${JSON.stringify({acronym:this.$route.query.acr})}`)
                .then((results) => {
                    if(results.code==200){
                        if(results.data.length==0){this.empty=true;}
                        this.contentnext=results.data;

                    }else{

                    };
                });
            },
    },
    computed: {
    },
    created () {
         this.getBank();
    },
    mounted(){
              console.log(this.carcontent)
               //头部显示背景
               this.title=this.$route.query.bank;
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
.empty{padding:0 20px;text-align: center;width:100%;    height: 60px;}
</style>