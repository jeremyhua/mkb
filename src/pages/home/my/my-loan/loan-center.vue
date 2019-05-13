<template>
	<div id="loan" class="wrap bg-f0">
		<!-- <i-header :title="title"  :is_r="is_r"></i-header> -->
		<x-header :left-options="{showBack: false,backText: ''}"  :title="title">
			<a slot="left"   @click="fh_back"><i class="iconfont icon-add-more left-shxkje"></i></a>
		</x-header>
		<div class="main-loan ">
			<div class="top-content">
				<img :src="top.src" class="bg" alt="">
				<div class="content-top ">
					<img :src="top.touxiang" class="touxiang" alt="">
					<div class=" left-content fl">
						<span class="left-num">{{loancenter.click_num}}</span>
						<div class=" left-click">总点击率</div>
						<div class="leftbottom clearfix">
							<div class="left"><span class="week-num">{{loancenter.week_click_num}}</span>本周点击率</div>
							<div class="tips right"><img :src="top.range" alt="" class="rang-img">
								<div class="range">{{loancenter.week_click_rank}}</div>
								<div class="paiming">排名</div>
							</div>	
						</div>
					</div>
					<div class="right-content  fl">
						<div class="right-top">
							<img :src="top.loan_top" alt="" class="loan_top" v-show="loancenter.is_vip!=0">
							<span class="yueka" v-show="loancenter.is_vip!=0">{{loancenter.vip_name}}</span>
							<span class="time" v-show="loancenter.vip_end!=0">{{moment.unix(loancenter.vip_end).format('YYYY-MM-DD') }}到期</span>	
							<router-link to="/myloan/buy" class="btn-buy">{{loancenter.is_vip!=0?'去购买':'开通会员'}}</router-link>
						</div>
					</div>  
				</div>
			</div>	
			
			<ul class="mui-table-view mui-table-view-chevron table-view-one">
				<li class="mui-table-view-cell mui-media list-li">
					<svg class="icon icon-one" aria-hidden="true">
						<use xlink:href="#icon-jinbi"></use>
					</svg>
						<div class="mui-media-body">
							<router-link :to="{path:'/my/gold',query:{num:loancenter.gold}}">
							<p class="mui-ellipsis">我的金币<i class="iconfont icon-youjiantou mui-pull-right"></i><span class="mui-pull-right right-num">{{loancenter.gold}}</span></p>
							</router-link>
						</div>
				</li>
				<li class="mui-table-view-cell mui-media list-li">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-douzhipin"></use>
					</svg>
						<div class="mui-media-body">
							<router-link :to="{path:'/my/imazamox',query:{num:loancenter.venosa}}" >
							<p class="mui-ellipsis">我的金豆<i class="iconfont icon-youjiantou mui-pull-right"></i><span class="mui-pull-right right-num">{{loancenter.venosa}}</span></p>
							</router-link>
						</div>
				</li>
			</ul>
			<ul class="mui-table-view mui-table-view-chevron table-view-two">
				<li class="mui-table-view-cell mui-media list-li">
						<span class=" iconfont icon-huodongzhongxin"></span>
						<div class="mui-media-body">
							<router-link to="/my/active-center">
							<p class="mui-ellipsis">活动中心<i class="iconfont icon-youjiantou mui-pull-right"></i></p>
							</router-link>
						</div>
				</li>
				<li class="mui-table-view-cell mui-media list-li">
					<span class=" iconfont icon-wodechanpin"></span>
						<div class="mui-media-body">
							<router-link to="/my/my-product">
							<p class="mui-ellipsis">我的产品<i class="iconfont icon-youjiantou mui-pull-right"></i><span class="mui-pull-right right-num">{{loancenter.product_num}}</span></p>
							</router-link>
						</div>
				</li>
				<li class="mui-table-view-cell mui-media list-li">
					<span class=" iconfont icon-xiaoxi1"></span>
						<div class="mui-media-body">
							<router-link to="/my/my-credit-circle">
							<p class="mui-ellipsis">我的信贷圈<i class="iconfont icon-youjiantou mui-pull-right"></i><span class="mui-pull-right right-num">{{loancenter.credit_cycle}}</span></p>
							</router-link>
						</div>
				</li>
			</ul>
			<ul class=" table-view-three mui-table-view mui-grid-view mui-text-left">
					<li class="mui-table-view-three clearfix list-li"><i class="iconfont icon-shuxian"></i>个人信息	</li>
					<li class="mui-table-view-three clearfix content-list">
						<div class=" mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left ">
		                   <span class="iconleft ">姓名</span>{{loancenter.realname}}
						</div>
						<div class="mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left">
		                    <span class="iconleft ">电话</span>{{loancenter.mobile}}
						</div>
					</li>
					<li class="mui-table-view-three clearfix content-list">
						<div class=" mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left ">
		                   <span class="iconleft ">微信</span>{{loancenter.weixin}}
						</div>
						<div class="mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left">
		                    <span class="iconleft ">职位</span>{{loancenter.job}}
						</div>
					</li>
					<li class="mui-table-view-three clearfix content-list">
						<div class=" mui-col-xs-12 mui-col-sm-12 mui-media mui-table-view-cell mui-text-left ">
		                   <span class="iconleft ">公司名称</span>{{loancenter.company}}
						</div>
					</li>	
					<li class="mui-table-view-three clearfix content-list">
								<div class=" mui-col-xs-12 mui-col-sm-12 mui-media mui-table-view-cell mui-text-left ">
								<span class="iconleft ">公司地址</span>{{loancenter.company_address}}
								</div>
					</li>
					<li class="mui-table-view-three clearfix content-list">
								<div class=" mui-col-xs-12 mui-col-sm-12 mui-media mui-table-view-cell mui-text-left ">
								<span class="iconleft ">公司座机 </span>{{loancenter.company_tel}}
								</div>
					</li>		
			</ul>
			<ul class=" table-view-four mui-table-view mui-grid-view mui-text-left">
				<li class="clearfix list-li"><i class="iconfont icon-shuxian"></i>职业照</li>
				<li class="clearfix content-list">
					<img v-for="(src,i) in loancenter.job_img" :src="imgUrl+src" class="mui-media-img" :key="i" width="80" height="80">
				</li>
			</ul>
			<ul class=" table-view-four mui-table-view mui-grid-view mui-text-left">
				<li class="clearfix list-li"><i class="iconfont icon-shuxian"></i>门店照片</li>
				<li class="clearfix content-list">
					<img v-for="(src,i) in loancenter.company_img" :src="imgUrl+src" class="mui-media-img" :key="i" width="80" height="80">
				</li>
			</ul>
		</div>
					<div  class="kefu"><a href="tel:02788772910">致电客服</a> </div>
	</div>
</template>

<script>
	import { XHeader} from 'vux'
	import { Toast } from "mint-ui";
	import {mapState} from 'vuex';
	export default {
		name:"loancenter",
		components:{
			XHeader,Toast
		},
		data(){
			return {
				users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
				loancenter:localStorage.getItem('loancenter')?JSON.parse(localStorage.getItem('loancenter')):'',
				is_r:true,
				title:"信贷中心",
				bgfff:false,
				is_TopShow:false,
				top:{src:require('@/assets/images/my/top_bg.png'),touxiang:require('@/assets/images/my/loan_bg.png'),
					range:require('@/assets/images/my/loan_rang.png'),tel:require('@/assets/images/my/icon_03.png'),
					list:require('@/assets/images/my/icon_07.png'),list2:require('@/assets/images/my/icon_10.png'),
					loan_top:require('@/assets/images/my/loan_top.png')},
				icon:[{src:require('@/assets/images/my/icon_13.png'),card:"我的银行卡",num:"10张",href:"my/my-bank"},{src:require('@/assets/images/my/icon_15.png'),card:"我的积分",num:100,href:""},{src:require('@/assets/images/my/icon_19.png'),card:"我的收藏",num:0,href:""},{src:require('@/assets/images/my/icon_20.png'),card:"我的帖子",num:120,href:""}],
				list:[{src:require('@/assets/images/my/icon_23.png'),card:"刷卡记录",num:"10张",href:"my/swipe-card/swipe-card-record"},{src:require('@/assets/images/my/icon_25.png'),card:"信贷中心",num:100,href:"/my/my-product"},{src:require('@/assets/images/my/icon_27.png'),card:"投诉中心",num:0,href:"/my/complaint"},{src:require('@/assets/images/my/icon_30.png'),card:"帮助中心",num:120,href:"/my/help-center"},{src:require('@/assets/images/my/icon_32.png'),card:"设置",num:120,href:"/my/set"}],
				fourth:{src:require('@/assets/images/my/loan.png')},
				fiveth:[{src:require('@/assets/images/my/loan3.png')},{src:require('@/assets/images/my/loan2.png')}],
			}
		},
		
/* 		computed://mapState({loancenter:state=>state.loan.loancenter})
		{
			loancenter(){
				return this.$store.state.loan.loancenter;
			}
		}, */
		mounted(){
			console.log(this.users)
			// console.log( this.$store.state.loan.loancenter,this.loancenter,"175")
			window.addEventListener('scroll', this.handleScroll);
					var _this=this;
					_this.$store.dispatch("loancenter",{
						data: "data="+JSON.stringify({
							session_id:_this.users.session_id,
							userId:_this.users.userId
						}),
						fn:(code, msg) => {
							// console.log(code,msg)
							switch (code) {
								case 200:
								// console.log(JSON.stringify(msg)+"msg")
									break;
								case -1:
									Toast(msg)
									break;
								default:
									Toast("请求出错")
									break;
							}
						}
					});
			// _this.loancenter=_this.$store.loancenter;
		},
		methods:{
			fh_back(){
				this.$router.push("/my");
			},
			handleScroll () {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			// console.log(scrollTop)
				if(scrollTop>25){
					// alert(11)
					this.bgfff=false;
				}else{
                    this.bgfff = 'bgfff';
				};
			},
		},
		watch:{
			router(o,v){
				// console.log(o,v)
			}
		}
	}
</script>

<style scoped lang="less">
.table-view-two:before,.table-view-two:after,.table-view-one:after,.table-view-one:before,.content-top:after,#loan .content-top:before,.table-view-three:before,.table-view-four:before{background:transparent;}
#loan{background: #f0f0f0;}
.wrap{height:100vh;}
.top-content{position:relative;height:281px;background: #eeeeee;overflow: hidden;}
.top-content .bg{width:100%;height:205px;position: absolute;left:0;top:0;}
.tel{top:168px;position: absolute;text-align: center;font-size:16px;line-height: 40px;width: 100%;height:40px;}
.tel-img{line-height: 0;height: 20px;position: relative;top: 4px;}
.name-a{left: 50%;transform: translate3d(-50%,0,0);position: absolute;width:70px;height:30px;top: 208px; border: 1px solid #469dc8; text-align: center; line-height: 30px;border-radius: 3px;font-size: 15px; color: #469dc8;}
#loan .list-li{height:56px;    padding: 12px 14px;}
.img-li{ width: 27px;height: 21px;position: relative;top: 5px;}
#loan .mui-table-view-cell p { margin-bottom: 0; height: 28px; line-height: 32px; font-size: 17px; padding-left:33px; color: #555;
}
.mui-table-view:before{left:15px;}
.list-li-two{margin-top:12px;}
.mui-table-view-two>div{float:left;text-align: center;background: #fff;padding: 18px;color: #999;}
.mui-table-view-two>div .iconfont{font-size:20px;}
.mui-table-view-two>div .iconfont~div{font-size:14px;}
.list-li-two.mui-table-view-cell:after{left:0}
.table-view-three,.table-view-four {margin-top:12px}
#loan .sublist a{position:relative;padding: 22px 0 0 14px;}
#loan .sublist a>img{position:absolute;left: 14px;top:22px;width:26px;}
#loan .sublist a>div{padding-left:37px;text-align:left; }
#loan .sublist a .num{font-size:13px;color:#9a9a9a;}
#loan .mui-table-view-cell>a p { margin-bottom: 0; height: 28px; line-height: 32px; font-size: 17px; padding-left: 6px; color: #555;
}
#loan .content-top{background:transparent;padding: 0 10px;width:100%;height:181px;margin-top:86px;position: relative;}

.top-content .touxiang{padding: 0 10px;width: 100%;height: 181px;top: 0;left: 0;position: absolute;}
.right-top {display:block;height:100%;padding-top:75px;}
.right-top .yueka{font-size:18px;line-height: 36px;color:#ffb12a;}
.right-top .time{  color: #fff;position: relative;font-size: 13px;height:33px;line-height: 33px;font-size: 12px;display: block;margin-top:5px;position: relative;
    left: -20px;}
.btn-buy{display: block;border: 1px solid #fff;color: #fff;width: 63px;margin-top:10px;height: 25px;font-size: 12px;line-height: 22px;position: relative;text-align: center;}
#loan .left-content{text-align: left;position: relative;width:70%;padding:24px;    height: 100%;
	span{font-size: 23px;line-height: 32px;color: #fff; display: block;height: 32px;display:block;	}
	.left-click{margin-top:5px;}
	div{ position: relative;font-size:13px;color: #fff;}
}
//icon svg
.icon {width: 1em; height: 1em;vertical-align: -0.15em;fill: currentColor;overflow: hidden;position: absolute;left: 15px;top:14px;width:25px;height:25px;
}
.icon-one{ width:27px;height:27px;}
.right-num{padding-right:15px;}
.table-view-two{margin-top:12px;
span.iconfont{position: absolute;left: 16px;top: 17px;font-size: 20px;}
.icon-huodongzhongxin{color:#9894ff}
span.icon-wodechanpin{color:#ffc60c;font-size:24px;}
span.icon-xiaoxi1{color:#ff5b47;font-size:24px;}}
#loan .table-view-three{padding:12px 12px 30px;
	.list-li{font-size: 18px;}
	li{line-height: 32px;
		.icon-shuxian{font-size: 20px;color:#469dc8; position: relative; top: 2px;left: -5px;margin-right: -7px;}
		.iconleft{padding-right:9px;color:#a5a5a5}}
	.content-list{margin-top:3px;line-height: 32px;
		.mui-table-view-cell{font-size:14px;}}}
#loan .table-view-four{padding:12px 12px 30px;
	.list-li{font-size: 18px;line-height: 32px;
		.icon-shuxian{font-size: 20px;color:#469dc8; position: relative; top: 2px;left: -5px;margin-right: -7px;}}
	.content-list>i{width:95px;height:95px;display: inline-block; overflow: hidden;margin-left: 14px;
		.mui-media-img {line-height: 96px;width: 96px; float:left;}}	}
.table-view-bottom{
	margin-top:3px;
	
}	
#loan .top-content{position:relative;
	.tips{width: 37px;height: 38px;color: #329fff;z-index:2;font-size: 12px;text-align: center;
	.range{font-size:16px;line-height:23px;height: 18px;position:relative;left:-2px;color: #329fff;}
	.paiming{font-size:12px;line-height: 15px;height:15px;color: #329fff;position: absolute;border-top:1px solid #469dc8;width:37px; text-align: center; left: 0;border-top:1px solid #329fff;}
	}
}	
.rang-img{width:100%;position: absolute;left: 0;top:0;}
.leftbottom{margin-top:20px;}
.leftbottom .left{width: 50%;float:left;}
.leftbottom .right{width: 50%;float:left;}
.right-content{width:30%;height:100%;}
.fl{float:left}
.right-top{position:relative; }
.right-top .loan_top{position:absolute;top:3px;width:63px;height:75px;display: block;}
.yueka{position:absolute;top:23px;width:63px;text-align: center;}
.bg-f0,.main-loan{background:#F0F0F0;padding-bottom:50px;}
.top-content{margin-top: -67px;}
.content-list>img{height:80px;margin-right:8px;}
.vux-header{ position: fixed;}
.fff{background: transparent !important;}
.content{top:0;}
.kefu{font-size:18px;height:50px;line-height:50px;position: fixed;bottom: 0;width: 100%;text-align:center;
	background: #469dc8; /* Old browsers */
	background: -moz-linear-gradient(left,  #469dc8 0%, #4097c2 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(left,  #469dc8 0%,#4097c2 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to right,  #469dc8 0%,#4097c2 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#4097c2',GradientType=1 ); /* IE6-9 */
		a{color:#fff;}
	}

//媒体查询
@media screen and (max-width:350px) {
	#loan .left-content div{font-size:12px;}
	#loan .table-view-three .content-list .mui-table-view-cell{font-size:12px;}
}
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
