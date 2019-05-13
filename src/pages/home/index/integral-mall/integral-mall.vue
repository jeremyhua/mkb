<template>
	<div id="integral" class="wrap bg-f0" >
		<!-- <i-header :title="title" :is_r="back"  :bgfff="bgfff"></i-header> -->
		<x-header :left-options="{backText: ''}">积分商城</x-header>
		<div class="main-body">
            <div class="top" ><img :src="top.src" alt="" width="100%">
                <ul class="top-content">
                    <li><span class="mui-pull-left"><i class="num">170</i><h5>我的积分</h5></span> 
                    <span class="absolute-right"><img :src="top.srcs">赚积分<i class="iconfont icon-youjiantou"></i></span></li>
                </ul>
            </div>
            <div class="content-nav"><i></i>积分可兑换商品列表</div>
            <div class="main-content-one">
                <ul class="clearfix">
                    <li v-for="(i,index) in req" :key="index">
                        <div class="img-wrap">
                            <img :src="i.type==1? scoreimg[0].src:scoreimg[1].src" alt="">
                            <div class="title">
                                <div class="money"><span class="charm">{{i.price}}</span><span> 元</span>  </div>
                                <span>{{i.type==1?"中百购物卡":"话费充值卡"}}</span>
                            </div>
                        </div>
                        <p >{{i.name}}</p>
                        <p class="clearfix">
                            <span class="mui-pull-left ora">{{i.score}}积分</span>
                            <span  class="mui-pull-right" :class=" i.is_over==0 ? 'mui-btn':'btn' ">{{i.is_over==0?'立即兑换':'已兑换'}}</span>
                        </p>
                    </li>
                </ul>

            </div>  
		</div>
        
	</div>
</template>

<script>
import {XHeader} from 'vux'
export default {
  name: "index-credit",
  components: {
    XHeader
  },
  data() {
    return {
        users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
        req:[],
        scoreimg:[{src:require("@/assets/images/score.png")},{src:require("@/assets/images/score2.png")}],
      title: "积分商城",
      back: true,
      bgfff: "bgfff",
      top:{src:require("@/assets/images/jfbg.png"),srcs:require("@/assets/images/jf.png")},
    };
  },methods:{
  },mounted(){
       this.$axios.post('/api/Score_goods/list',`data=${JSON.stringify({
            session_id:this.users.session_id,
            userId:this.users.userId,
            })}`).then((res)=>{
            // console.log(res.data.list.list,"api")
            if(res.code==200){
               this.req=res.data.list.list;
            }else{
                Toast(res.msg)
            }
            }).catch((err)=>{throw err});
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
        padding: 0 15px;
        li{
            float: left;
            width:100%;
            h5{ color:#fff;}
            .absolute-right{color:#fff;position: absolute;right:0;bottom:35px;width: 104px;height: 31px;line-height: 31px;border-radius:15px 0 0 15px;background:orange;
            img{height: 100%;line-height: 31px;float: left;}
            i{float:right;    width: 15px;}}
            i.num{display:block;font-size: 33px;font-style:normal;margin-bottom: 10px;}
            .icon-shuaqiazhifu{.fz(29px)}

        }
    }
}
.main-body{background:#fff;}
.main-content-one{
        li{.w(50%);float: left;text-align:left;.mb(10px);.mt(10px);
        img{min-height: 85px;max-height: 95px; }
        span{font-size:15px;}
        .ora{color:@ora;}
            .mui-btn{border-radius: 50px;margin-right:15%;border: none;line-height: 20px;font-size: 12px;padding: 1px 10px;color:#fff;background:#469dc8;
            }
             .btn{margin-right:10%;border: none;line-height: 20px;font-size: 12px;padding: 1px 10px;color:@aa;}
        }
    .content-foot{text-align: center;color:@aa;padding:10px 0;}
    .bg(#fff);
    .p(0 15px);
}
.content-nav{PADDING:8px 12PX;}
.content-nav>i{background: @ora;width: 5px; margin-right: 5px;position: relative;top: 2px; height: 16px;display: inline-block; }
.mui-pull-right{color: @aa;}

.hot-range{position: relative;}
.hot-range>span{position:absolute;top:0;color: #fff;left: 13px;}
.img-wrap{position:relative;height:95px;}
.img-wrap .title{position:absolute;color:#fff;width:100%;height: 100%;padding:34px 10px 0;left:0;top:0;}
.img-wrap .title .charm{font-size: 30px;}
#integral .img-wrap .title .monney span{display:inline-block;}
.vux-header{background-color: transparent;position: fixed;top: 0;z-index: 1;width: 100%;}
</style>