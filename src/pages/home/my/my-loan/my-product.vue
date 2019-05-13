<template>
	<div id="my-product" class="wrap bg-f0">
		<!-- <i-header :title="title" :is_r="arrow" cls_icon="icon-add-more" @click="post_handle"></i-header> -->
		<x-header :left-options="{showBack: false,backText: ''}"  :title="title">
			<a slot="left"   @click="fh_back"><i class="iconfont icon-add-more left-shxkje"></i></a>
			<a slot="right"   @click="post_handle"><i class="iconfont icon-add-more" style="top: 23px;
			position: relative;"></i></a>
		</x-header>
		<div class="main">
			<ul class="main-content-top clearfix">
				<li  @click="tabBtnClick('sq_content')" :class="active=='sq_content'?('active'):('')">已审核</li>
				<li  @click="tabBtnClick('sh_content')" :class="active=='sh_content'?('active'):('')">待审核</li>
			</ul>
			<mt-tab-container v-model="active" :swipeable="true" >
				<mt-tab-container-item id="sq_content">
					<div class="mui-content" style="height:100%;overflow: scroll;">
						<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore"  @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange"
						 :topDistance="80" :autoFill="false" :bottom-all-loaded="allLoaded" >
						 <!--top-method下拉刷新的方法   topPullText="↓ 下拉刷新" topDropText="↑ 释放更新" topLoadingText="正在加载 ..." -->
						 <div class="orderList-page-topLoad mint-load-more-top" slot="top" v-if="topStatus!=''" style=''>
							<!-- <span class="orderList-page-topLoad-icon" :class="topStatus==='drop'?'orderList-page-topLoad-is-rotate':''">↓</span> -->
							<span>{{topRefreshval}}</span>	
							<!-- <span>最新刷新:{{topRefreshTime}}</span>  -->
						</div>	
						<div v-show="bottomShow=='loading'" slot="bottom">
							<!-- <mt-spinner type='fading-circle' :size='40' color="#464646;"></mt-spinner> -->
							<p class="page-infinite-loading">
								<mt-spinner type="fading-circle"></mt-spinner>
								加载中
							</p>
						</div>
							<ul class="mui-table-view"  ><!-- v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" :infinite-scroll-distance="50" -->
									<li class="mui-table-view-cell mui-media list-li" v-for="(n,index) in datalist" :key="index">
										<div class="mui-media-body">
											{{n.pro_name}}
										</div>
									<div class="mui-table mui-table-li">
										<div class="mui-table-cell mui-col-xs-9">
											<router-link :to="{path:'/credit/person-detail',query:{id:n.id}}"  >	
												<p>{{n.pro_type}}</p>
												<p>{{n.pro_time}}</p>    
												<h4>{{n.pro_money}}</h4>
											</router-link>
											
										</div>
										<div class="mui-table-cell mui-col-xs-3 right-content">
                                            <p><i class="iconfont icon-remen"></i>{{n.week_click}}点击</p>	
											<router-link   :to="{path:'/loan/click-buy',query:{id:n.id}}" >
												<button type="button" class="mui-btn " @click="buyclick(n.id)">
												购买
												</button>
											</router-link>
										</div>
									</div>
                                    <div class="mui-table muitable-footer">
										<div class="mui-table-cell mui-col-xs-6">
                                            <p>发布日期：{{moment.unix(n.create_time).format('YYYY-MM-DD')}}</p>
										</div>
										
										<div class="mui-table-cell mui-col-xs-6 right-content">
                                            <a href="javascript:void(0);" @click='totop(n.id)'>置顶</a>      
                                            <a href="javascript:void(0);" @click="delgood(n.id)">删除</a>      
										</div>
									</div>
									
								</li>	
							</ul>
					
						</mt-loadmore>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="sh_content">
					<div class="mui-content">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell mui-media list-li" v-for="(n,index) in datalists" :key="index">
										<div class="mui-media-body">
											{{n.pro_name}}
										</div>
									<div class="mui-table mui-table-li">
										<div class="mui-table-cell mui-col-xs-9">
											<router-link :to="{path:'/credit/person-detail',query:{id:n.id}}">
												<p>{{n.pro_type}}</p>
												<p>{{n.pro_time}}</p>    
												<h4>{{n.pro_money}}</h4>
											</router-link>	
										</div>
										<div class="mui-table-cell mui-col-xs-3 right-content">
                                            <p><i class="iconfont icon-remen"></i>{{n.week_click}}点击</p>
											<button type="button" class="mui-btn ">
											购买
											</button>
										</div>
									</div>
                                    <div class="mui-table muitable-footer">
										<div class="mui-table-cell mui-col-xs-6">
                                            <p>发布日期：{{moment.unix(n.create_time).format('YYYY-MM-DD')}}</p>
										</div>
										
										<div class="mui-table-cell mui-col-xs-6 right-content">
                                            <a href="javascript:void(0);" @click='totop2(n.id)'>置顶</a>      
                                            <a href="javascript:void(0);" @click="delgood(n.id)">删除</a>      
										</div>
									</div>
							
								</li>
							</ul>
					</div>	
				</mt-tab-container-item>
			
			</mt-tab-container>
		</div>
	</div>
</template>

<script>
import {XHeader} from "vux"
import { TabContainer, TabContainerItem,LoadMore,Popup,Toast, MessageBox } from "mint-ui";
import "@/assets/css/main.css";
export default {
	name: "order",
	data() {
		return {
		users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
		title: "我的产品",				
		active: "sq_content",
		timeout:'', 
		timeout2:'',
		popupVisible:false,
		reloadState:1,
		loading:false,
		isr:true,
		arrow:true,
		datalist:[],
		datalists:[],
		page:1,
		pages:1,
		allLoaded:false,
		topStatus:'',
		topRefreshTime:'',
		topRefreshval:'',
		bottomShow:'',
		};
	},
	components: {
		XHeader,
		TabContainer,
		TabContainerItem,
		LoadMore
	},  
  mounted(){
	  this.getlist();
	  console.log(this.topStatus)
  },
  methods: {  
	fh_back(){
		this.$router.push("/my/loan-center");
	},
	post_handle(){
        this.$router.push("/loan/push-product");
    },
    tabBtnClick(type) {
      	this.active = type;
		if(type=="sq_content"){
			this.getlist();
		}else if(type=="sh_content"){
			this.togetlist();
		}
    },
    loadBottom(){
		this.page=this.page+1;
		this.getlist();
      	this.loading = true;
		this.timeout=setTimeout(() => {
			this.$refs.loadmore.onBottomLoaded();
		}, 1500);
	},
	loadTop(){
		this.page=1;
		this.getlist();
		// this.popupVisible = true;
		this.timeout2=setTimeout(()=>{
			this.$refs.loadmore.onTopLoaded();
			// this.popupVisible = false;	
		},500);
	},
	handleTopChange(status){
		this.topStatus=status;
		if(this.topStatus=="drop"){
			this.topRefreshval="松开立即刷新";
		}else if(this.topStatus=="pull"){
			this.topRefreshval="下拉可以刷新";
		}else{
			this.topRefreshval="正在刷新数据中...";
		}
	},
	handleBottomChange(status){
		this.bottomShow=status;
	},
	getlist(){
			this.$axios.post('/api/Lenders_product/product_list',`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                page:this.page,
				status:1,
                })}`).then((res)=>{
                if(res.code==200){
					this.isHaveMore(res.data.list);
					 this.$nextTick(function () { 
						//  alert(this.allLoaded)
						 if(this.allLoaded===false)
							this.datalist=res.data.list;
						else Toast("暂无更多数据");
					 })
					// console.log(JSON.stringify(this.datalist))
                }else{
                    Toast(res.msg)
                }
            }).catch((err)=>{throw err});
	},
	togetlist(){
			this.$axios.post('/api/Lenders_product/product_list',`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                page:this.pages,
				status:0,
                })}`).then((res)=>{
                if(res.code==200){
					this.datalists=res.data.list;
					// console.log(JSON.stringify(this.datalists))
                }else{
                    Toast(res.msg)
                }
            }).catch((err)=>{throw err});
	},
	totop(id){
		MessageBox.confirm('会员每日免费3次或使用10金币/次').then(action => {
			this.$axios.post('/api/Lenders_product/product_top',`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                product_id:id
                })}`).then((res)=>{
                if(res.code==200){
					// console.log(JSON.stringify(this.res))
					Toast(res.msg)
					this.getlist();
                }else{
                    Toast(res.msg)
                }
			}).catch((err)=>{throw err});
		});
	},
	totop2(id){
		MessageBox.confirm('会员每日免费3次或使用10金币/次').then(action => {
			this.$axios.post('/api/Lenders_product/product_top',`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                product_id:id
                })}`).then((res)=>{
                if(res.code==200){
					// console.log(JSON.stringify(this.res))
					Toast(res.msg)
					this.togetlist();
                }else{
                    Toast(res.msg)
                }
			}).catch((err)=>{throw err});
		});
	},
	delgood(id){//删除产品
		MessageBox.confirm('确认删除该产品吗?').then(action => {
				this.$axios.post('/api/Lenders_product/product_delete',`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                product_id:id
                })}`).then((res)=>{
                if(res.code==200){
					Toast(res.msg)
					this.getlist();
                }else{
                    Toast(res.msg)
                }
           		 }).catch((err)=>{throw err});

		});
	},
	buyclick(id){
		this.$router.push({path:'/loan/click-buy',query:{id:id}})
	},
	 isHaveMore(isHaveMore){ 
		// 是否还有下一页，如果没有就禁止上拉刷新 
		//true是禁止上拉加载 
		if(Object.keys(isHaveMore).length === 0){ 
			this.allLoaded = true; 
		} else{
			this.allLoaded = false; 
		}
   },
  },
  beforeDestroy () {
	  if(this.timeout){
	  	clearTimeout(this.timeout)
	  };
	   if (this.timeout2){
	  	clearTimeout(this.timeout2)
	  }
  },
  


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
.mui-table-view{margin-top:15px;}
	#order{.h(100%)}
    .main{.mt(70px);
    bottom:0;
			ul.main-content-top{
				    position:fixed;
					left: 0;
					top: 70px;
					z-index: 10;
			}
	}
	.main-content-top{
		.w(100%);
		.p(0 2%);
		.bg(#fff);
		li{
		.fl(@l);
		.w(50%);
		text-align: center;
		padding: 12px 0;
		color:@gray;
		}
		li.active{
			color: #469dc8;
			border-bottom: 2px solid @ora;
		}
	}
    .mui-media-body{position: relative;
    font-size:17px;line-height:32px;
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
						padding-top:16px;
	}
	.mui-table{.p(10px 0);
				.mui-table-cell{
                        p{font-size:11px;}
						h4{.fz(22px);.lh(33px);.c(@ora);.fw(400)}
						h5{.fz(17px);.lh(30px);.c(@ora)}
						button{border-radius: 30px;.p(5px 20px);
						background: #6fc6f1; /* Old browsers */
						background: -moz-linear-gradient(left,  #6fc6f1 0%, #469dc8 100%, #469dc8 100%, #2989d8 100%, #469dc8 100%); /* FF3.6-15 */
						background: -webkit-linear-gradient(left,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
						background: linear-gradient(to right,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
						filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6fc6f1', endColorstr='#469dc8',GradientType=1 ); /* IE6-9 */
						}
					} 
    }
    .right-content{text-align:right;p{margin-bottom:12px;} i{color:#469dc8;}}
    #my-product .list-li{margin-top:11px;background: #fff;padding-bottom: 0;}
    #my-product .mui-table-view{background:#f0f0f0;}
	#my-product .mui-table-view:after,
	.mui-table-li{position:relative;}
    .mui-table-li:after {position: absolute;right: -15px;left: 0;height: 1px;content: '';-webkit-transform: scaleY(.5);transform: scaleY(.5);background-color: #c8c7cc;bottom:0}   
	#my-product .muitable-footer{height:45px;line-height: 45px;padding: 0; p,a{font-size:14px} a{color:#a9a9a9;border:1px solid #a9a9a9;padding:7px 15px;border-radius:3px;} }
	.mui-table-view:after,.mui-table-view:before{background:none;}
	.mui-btn{color:#fff;}
</style>
<style>
	#my-product .mint-tab-container{ padding-top: 20px;height:100%;overflow:auto;}
	.page-infinite-loading
/* 	#order .mint-loadmore{height: 100%;overflow-y: auto;}
	#order .mint-loadmore-top,#order .mint-loadmore-text{font-size: 14px;}
	#order .v-modal{background:transparent;}
	#order .mint-popup{height:70px;line-height: 70px;background: rgba(0,0,0,.6);width: 100%;text-align: center;opacity: 1;color: #fff;}
	#order .mint-popup-top{z-index: 999999999 !important;}*/
	#my-product .page-infinite-loading{text-align: center;margin-bottom: 0;}
	#my-product .page-infinite-loading span{display: inline-block;vertical-align: middle;margin-right: 5px;} 
	.mint-tab-container-wrap,.mui-content{height: 100%;}
    .mint-spinner-fading-circle{width: 28px;height: 28px;margin-left: 50%;transform: translate3d(-50%,0,0);margin-top: 5px;}
    .page-infinite-loading{text-align: center;}
	#my-product .mint-spinner-fading-circle{margin-left:0;}
	#my-product .orderList-page-topLoad{    text-align: center;height: 35px;line-height: 35px;margin-bottom: -15px;}

	.vux-header .left-shxkje:before {
		content: "";
		position: absolute;
		width: 12px;
		height: 12px;
		border: 1px solid #fff;
		border-width: 1px 0 0 1px;
		-webkit-transform: rotate(315deg);
		transform: rotate(315deg);
		top: 8px;
		left: 7px;
	}

	.vux-header .left-shxkje {
		position: absolute;
		width: 30px;
		height: 30px;
		top: 15px;
   		left: -5px;
	}
</style>