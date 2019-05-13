<template>
	<div id="order" class="wrap bg-f0">
		<!-- <i-header title="我的订单" ></i-header> -->
		<x-header :left-options="{backText: ''}">我的订单</x-header>
		<div class="main">
			<ul class="main-content-top clearfix">
				<li v-for="item in hash" :class="(active==item.id)?'active':''" :key="item.id" @click="tabBtn(item.id)">
					{{item.name}}
				</li>
			</ul>
			<div class="mui-content" style="height:100%;overflow: scroll;">
			<mt-loadmore :top-method="loadTop" :distanceIndex="5"  :autoFill="true" topPullText="↓ 下拉刷新" topDropText="↑ 释放更新" topLoadingText="正在加载 ..." :topDistance="70" ref="loadmore">
				<ul class="mui-table-view ul-view" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" :infinite-scroll-distance="50">
					<li class="mui-table-view-cell mui-media" v-for="(n,i) in list" :key="i"  >
						<router-link :to="{path:'/order/orderdetail',query:{'id':n.id,'status':n.status}}">
							<div class="mui-media-body">
								<p class="mui-ellipsis daikuan"><span>{{n.snap_loan_post.product_type}}</span>{{n.snap_loan_post.title}}</p>
								<i class="iconfont icon-youjiantou"></i>
							</div>
						</router-link>
						<div class="mui-table">
							<div class="mui-table-cell mui-col-xs-5">
								<h4>{{n.snap_loan_post.apply_money}}</h4>
								<p>申请金额{{active}}</p>
							</div>
							<div class="mui-table-cell mui-col-xs-4 mui-text-left">
								<h5>{{moment.unix(n.create_time).format('YYYY-MM-DD')}}</h5>
								<p>申请日期</p>
							</div>
							<div class="mui-table-cell mui-col-xs-3">
								<button type="button" class="mui-btn mui-btn-warning" :class="n.status==-2?'one':(n.status==1?'two':(n.status==2?'three':''))">
								{{n.status==-2?'确认订单':(n.status==1?'已完成':(n.status==2?'退款中':''))}}
								</button>
							</div>
						</div>
					</li>
					      <p class="page-infinite-loading">
                            <span v-if="more_state==1">
                                <mt-spinner type="fading-circle"></mt-spinner>
                                加载中...
                            </span>
                            <span v-if="more_state==2">暂无更多数据</span>
                        </p>
				</ul>
			</mt-loadmore>	
			</div>

		</div>
			<mt-popup   position="top" modal="true" v-model="popupVisible" >{{this.reloadState==1?"更新成功":this.reloadState==2?"更新失败":this.reloadState==3?"请求出错":""}}</mt-popup>
	</div>
</template>

<script>
import iHeader from "@/components/header/header-r";
import { TabContainer, TabContainerItem,LoadMore,Popup,Toast } from "mint-ui";
import {XHeader} from 'vux'
export default {
  name: "orderall",
  data() {
    return {
	users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
	active: 1, // 2 3 4
	popupVisible:false,
	reloadState:1,
	loading:false,
	arrow:true,
	hash:[{id:1,name:"全部"},{id:2,name:"待确认"},{id:3,name:"已确认"},{id:4,name:"退款中"}],
	state:0,
	list:[],
	classstate:'',
	page:1,
	popupVisible:false,
	more_state:1,
    };
  },
   components: {
    iHeader,
    TabContainer,
	TabContainerItem,
	LoadMore,
	Popup,
	XHeader
  },
  methods: {
    tabBtn(type) {
	  this.active = type;
	  if(type==1){
			this.state=-999;
			this.list=[];
			this.getlist();
	  }else if(type==2){
			this.state=-2;
			this.list=[];
			this.getlist();
	  }else if(type==3){
			this.state=1;
			this.list=[];
			this.getlist();
	  }else if(type==4){
			this.state=2;
			this.list=[];
			this.getlist();
	  }
	  
    },
	getlist(page = 1,callback,reload){
			this.$axios.post('/api/Loan_post/loan_post_order',`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                page:page,
               	status:this.state,
                })}`).then((results)=>{
                  if(results.code==200){
					   callback&&callback();
					    if(reload){
							// console.log(reload)
							this.list = results.data.list;
							this.reloadState = 1;
							return false;
						}
						if(results.data.list.length<=results.data.pageSize){
							this.more_state = 2;
							this.loading = true;
							  this.allLoaded=true;
						}
						 this.$nextTick(function () { 
							this.list = [...this.list,...results.data.list];
						 });
                    // this.data=res.data.list;
                  }else if(results.code==401){
                    this.reloadState = 2;
                    this.$router.push('/my/login');
                };
            }).catch((err)=>{this.reloadState = 3;});
	},
	 loadMore(){
		//  alert(this.more_state)
		//  if(this.more_state===1)
            this.page++;
            this.loading = true;
            this.getlist(this.page,()=>{
                this.loading = false;
            });
        },
	loadTop(){
		this.page = 1;
		this.getlist(this.page,()=>{
			this.popupVisible = true;
			this.$refs.loadmore.onTopLoaded();
			this.more_state = 1;
			this.loadMore();
			setTimeout(()=>{
				this.popupVisible = false;	
			},2000);
		},true)
	},
	
  },
 
  mounted(){
	  	var indexactive=this.$route.query.type;
	  	this.tabBtn(indexactive);
	  	// this.state=-999;
		// this.getlist();
  }
};
</script>

<style scoped lang="less">
ul.ul-view:before,.mui-table-view:after{background:transparent;}
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
	.main{padding-top:108px;
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
		.w(25%);
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
						button{border-radius: 30px;width: 77px;height: 33px;font-size: 12px;text-align: center;box-shadow: 0 0 1px #ff9002;}
						button.one{
						background: #6fc6f1; /* Old browsers */
						background: -moz-linear-gradient(left,  #6fc6f1 0%, #469dc8 100%, #469dc8 100%, #2989d8 100%, #469dc8 100%); /* FF3.6-15 */
						background: -webkit-linear-gradient(left,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
						background: linear-gradient(to right,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
						filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6fc6f1', endColorstr='#469dc8',GradientType=1 ); /* IE6-9 */
						}
						button.two{color:#a0a0a0;border:1px solid #dfdfdf;box-shadow: none;background: transparent;}
						button.three{color:#ff4b4b;border:1px solid #ff4b4b;box-shadow: none;background: transparent;}
					} 
	}
	.daikuan{font-size:15px;}
	.daikuan span{padding: 4px 10px;border: 1px solid #469dc8;color: #469dc8; border-radius: 3px; margin-right: 10px; display: inline-block; font-size: 13px;line-height: 13px;}
	ul.ul-view{margin-top:12px;li.mui-table-view-cell{padding: 22px 14px 12px;}}
	.mui-media-body .daikuan{color:#333;font-size: 15px;line-height: 23px;}
	.mui-content {background:#f0f0f0;}
</style>
<style>
	#order .mint-tab-container{    padding-top: 43px;height:100%;}
	#order .mint-loadmore{height: 100%;overflow-y: auto;}
	#order .mint-loadmore-top,#order .mint-loadmore-text{font-size: 14px;}
	#order .v-modal{background:transparent;}
	#order .mint-popup{height:70px;line-height: 70px;background: rgba(0,0,0,.6);width: 100%;text-align: center;opacity: 1;color: #fff;}
	#order .mint-popup-top{z-index: 999999999 !important;}
	#order .page-infinite-loading{text-align: center;margin-bottom: 0;}
	#order .page-infinite-loading span{display: inline-block;vertical-align: middle;margin-right: 5px;}
	#order .mint-tab-container-wrap,#order .mui-content{height: 100%;}
	#order .mint-popup{height:70px;line-height: 70px;background: rgba(0,0,0,.6);width: 100%;text-align: center;opacity: 1;color: #fff;}
	#order .mint-popup-top{z-index: 999999999 !important;}	
	.page-infinite-loading{padding-bottom:10px; background: #f0f0f0;}
	.mint-spinner-fading-circle{margin-left:0 !important;}
	#order .mint-popup {height: 30px;line-height: 30px;background: rgba(0,0,0,.6);width: auto;text-align: center;opacity: 1;top: 50%;color: #fff;padding: 0 10px;border-radius: 4px;}

</style>