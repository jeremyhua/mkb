<template>
	<div id="orderall" class="wrap bg-f0">
		<!-- <i-header :title="title" :is_r="'true'"></i-header> -->
		   <x-header :left-options="{backText: ''}">我的订单</x-header>

		<div class="main-orderall content">
			<ul class="main-content-top clearfix">
				<li  @click="tabBtnClick('sq_content')" :class="active=='sq_content'?('active'):('')">申请中</li>
				<li  @click="tabBtnClick('sh_content')" :class="active=='sh_content'?('active'):('')">已审核</li>
				<li  @click="tabBtnClick('all_content')" :class="active=='all_content'?('active'):('')">全部</li>
			<!-- <router-view></router-view> -->
			</ul>
			<mt-tab-container v-model="active" :swipeable="true" >
				<mt-tab-container-item id="sq_content">
					<div class="mui-content" style="height:100%;overflow: scroll;">
						<mt-loadmore :top-method="loadTop" :autoFill="true" topPullText="↓ 下拉刷新" topDropText="↑ 释放更新" topLoadingText="正在加载 ..." :topDistance="80" ref="loadmore">
							<ul class="mui-table-view" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" :infinite-scroll-distance="50">
								<li class="mui-table-view-cell mui-media" v-for="(n,index) in list" :key="index">
									<router-link to="/my/order/orderdetails" tag="li">
										<img class="mui-media-object mui-pull-left" :src="n.src">
										<div class="mui-media-body">
											{{n.name}}
											<p class="mui-ellipsis">{{n.total}}人已申请</p>
											<i class="iconfont icon-youjiantou"></i>
										</div>
									</router-link>
									<div class="mui-table">
										<div class="mui-table-cell mui-col-xs-5">
											<h4>{{n.je}}</h4>
											<p>申请金额</p>
										</div>
										<div class="mui-table-cell mui-col-xs-4 mui-text-left">
											<h5>{{n.rq}}</h5>
											<p>申请日期</p>
										</div>
										<div class="mui-table-cell mui-col-xs-3">
											<button type="button" class="mui-btn mui-btn-warning">
											{{n.part}}
											</button>
										</div>
									</div>
								</li>
							</ul>
							<p class="page-infinite-loading">
								<mt-spinner type="fading-circle"></mt-spinner>
								加载中...
							</p>
						</mt-loadmore>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="sh_content">
					<div class="mui-content" style="height:100%;overflow: scroll;">
						<mt-loadmore :top-method="loadTop" :autoFill="true" topPullText="↓ 下拉刷新" topDropText="↑ 释放更新" topLoadingText="正在加载 ..." :topDistance="80" ref="loadmore">
						
							<ul class="mui-table-view">
								<li class="mui-table-view-cell mui-media" v-for="(n,index) in list" :key="index">
								<router-link to="/my/order/orderdetails" tag="li">
									<a href="javascript:;">
										<img class="mui-media-object mui-pull-left" :src="n.src">
										<div class="mui-media-body">
											{{n.name}}
											<p class="mui-ellipsis">{{n.total}}人已申请</p>
											<i class="iconfont icon-youjiantou"></i>
										</div>
									</a>
									<div class="mui-table">
										<div class="mui-table-cell mui-col-xs-5">
											<h4>{{n.je}}</h4>
											<p>申请金额</p>
										</div>
										<div class="mui-table-cell mui-col-xs-4 mui-text-left">
											<h5>{{n.rq}}</h5>
											<p>申请日期</p>
										</div>
										<div class="mui-table-cell mui-col-xs-3">
											<button type="button" class="mui-btn mui-btn-warning">
											{{n.part}}
											</button>
										</div>
									</div>
								</router-link>
								</li>
							</ul>
							</mt-loadmore>
					</div>	
				</mt-tab-container-item>
				<mt-tab-container-item id="all_content">
					<div class="mui-content" style="height:100%;overflow: scroll;">
						<mt-loadmore :top-method="loadTop" :autoFill="true" topPullText="↓ 下拉刷新" topDropText="↑ 释放更新" topLoadingText="正在加载 ..." :topDistance="80" ref="loadmore">
						
						<ul class="mui-table-view">
							<li class="mui-table-view-cell mui-media" v-for="(n,index) in list" :key="index" >
								<router-link to="/my/order/orderdetails" tag="li">
									<a href="javascript:;">
										<img class="mui-media-object mui-pull-left" :src="n.src">
										<div class="mui-media-body">
											{{n.name}}
											<p class="mui-ellipsis">{{n.total}}人已申请</p>
											<i class="iconfont icon-youjiantou"></i>
										</div>
									</a>
									<div class="mui-table">
										<div class="mui-table-cell mui-col-xs-5">
											<h4>{{n.je}}</h4>
											<p>申请金额</p>
										</div>
										<div class="mui-table-cell mui-col-xs-4 mui-text-left">
											<h5>{{n.rq}}</h5>
											<p>申请日期</p>
										</div>
										<div class="mui-table-cell mui-col-xs-3">
											<button type="button" class="mui-btn mui-btn-warning">
											{{n.part}}
											</button>
										</div>
									</div>
								</router-link>
								</li>
						</ul>
						</mt-loadmore>
					</div>	
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
			<mt-popup v-model="popupVisible" modal="true" position="top">{{this.reloadState==1?"更新成功":this.reloadState==2?"更新失败":this.reloadState==3?"请求出错":""}}</mt-popup>
		<router-view></router-view>
	</div>
	
</template>

<script>
import { XHeader} from "vux";
import { TabContainer, TabContainerItem,LoadMore,Popup } from "mint-ui";
import "@/assets/css/main.css";

export default {
  name: "orderall", 
  components: {
    XHeader,
    TabContainer,
	TabContainerItem,
	LoadMore
  },
  data() {
    return {
      title: "我的订单",
	  active: this.$route.params.type || 'sq_content',  //sq_content sh_content all_content 
	  popupVisible:false,
	  reloadState:1,
	  loading:false,
	  arrow:true,
      list: [
        { name: "平安借贷", total: "15000+", je: "3000~5000", rq: "2017-12-05" ,src:require("@/assets/images/post_03.png"),part:"申请中"},
        { name: "平安借贷", total: "15000+", je: "3000~5000", rq: "2017-12-05" ,src:require("@/assets/images/post_03.png"),part:"申请中"},
        { name: "平安借贷", total: "15000+", je: "3000~5000", rq: "2017-12-05" ,src:require("@/assets/images/post_03.png"),part:"申请中"},
        { name: "捷信金融", total: "15000+", je: "3000~5000", rq: "2017-12-05" ,src:require("@/assets/images/post_05.png"),part:"申请中"},
        { name: "捷信金融", total: "15000+", je: "3000~5000", rq: "2017-12-05" ,src:require("@/assets/images/post_05.png"),part:"申请中"},
        { name: "平安借贷", total: "15000+", je: "3000~5000", rq: "2017-12-05" ,src:require("@/assets/images/post_03.png"),part:"申请中"},
        { name: "京东金融", total: "15000+", je: "3000~5000", rq: "2017-12-05" ,src:require("@/assets/images/post_07.png"),part:"申请中"},
        { name: "京东金融", total: "15000+", je: "3000~5000", rq: "2017-12-05" ,src:require("@/assets/images/post_07.png"),part:"已审核"}
      ]
    };
  },
  methods: {
    tabBtnClick(type) {
      this.active = type;
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.list.push(...this.list);
        this.loading = false;
      }, 2500);
	},
	loadTop() {
		this.popupVisible = true;
		this.$refs.loadmore.onTopLoaded();
		setTimeout(()=>{
			this.popupVisible = false;	
		},2000);
	}
  },
 
  mounted(){
	//   alert(this.$route.params.type) ;
  }
};
</script>

<style scoped lang="less">
@l:left;
@gray:#555;
@lit:#d1d1d1;
@ora:#469dc8;
.h(@h){height:@h}
.c(@h){color:@h}
.lh(@h){line-height:@h}
.w(@h){width:@h}
.mt(@mt){margin-top:@mt}
.mr(@mr){margin-right:@mr}
.fz(@f){font-size: @f}
.fl(@f){float:@f}
.p(@p){padding: @p}
.bg(@b){background:@b}
.fw(@w){font-weight:@w}
.main-orderall{height: 100%;}
.mint-tab-container-item{background: #efeff4;}
.mui-table-view{margin-top:15px;}
	#order{.h(100%)}

			// ul.main-content-top{
			// 	    position:fixed;
			// 		left: 0;
			// 		top: 70px;
			// 		z-index: 10;
			// 		li a{color: #555;}
			// }
	
	.main-content-top{
		.w(100%);
		.p(0 2%);
		.bg(#fff);
		li{
		.fl(@l);
		.w(33.33%);
		text-align: center;
		padding: 10px 0;
		color:@gray;
		}
		li.active{
			color: #469dc8;
			border-bottom: 2px solid @ora;
		}
	}
	.mui-media-body{position: relative;
	i.iconfont{
		position: absolute;
		top:50%;
		right: 0;
		transform:translateY(-50%);
		font-size: 20px;
    	color:@lit;
	}
	}
	.mui-table-view-cell{
						padding-top:20px;
	}
	.mui-table{.p(10px 0);
				.mui-table-cell{
						h4{.fz(18px);.lh(30px);.c(@ora);.fw(400)}
						h5{.fz(17px);.lh(30px);.c(@ora)}
						button{border-radius: 30px;.p(7px 20px);
						background: #6fc6f1; /* Old browsers */
						background: -moz-linear-gradient(left,  #6fc6f1 0%, #469dc8 100%, #469dc8 100%, #2989d8 100%, #469dc8 100%); /* FF3.6-15 */
						background: -webkit-linear-gradient(left,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
						background: linear-gradient(to right,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
						filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6fc6f1', endColorstr='#469dc8',GradientType=1 ); /* IE6-9 */
						}
					} 
	}
	#orderall .mui-table-view:before{background:transparent;}
</style>
<style>
	/* #orderall .mint-tab-container{   height:100%;} */
	#orderall .mint-loadmore{height: 100%;overflow-y: auto;}
	#orderall .mint-loadmore-top,#orderall .mint-loadmore-text{font-size: 14px;}
	#orderall .v-modal{background:transparent;}
	#orderall .mint-popup{height:70px;line-height: 70px;background: rgba(0,0,0,.6);width: 100%;text-align: center;opacity: 1;color: #fff;}
	#orderall .mint-popup-top{z-index: 999999999 !important;}
	#orderall .page-infinite-loading{text-align: center;margin-bottom: 0;}
	#orderall .page-infinite-loading span{display: inline-block;vertical-align: middle;margin-right: 5px;}
	#orderall .mint-tab-container-wrap,#orderall .mui-content{height: 100%;}
	a{color:#333;}
	#orderall .mint-popup {height: 30px;line-height: 30px;background: rgba(0,0,0,.6);width: auto;text-align: center;opacity: 1;top: 50%;color: #fff;padding: 0 10px;border-radius: 4px;}

</style>