<template>
	<div id="my" class="wrap bg-f0">
		<i-header :title="title" :edit="edit" editPath="/my/my-account" :bgfff="bgfff"></i-header>
		<div class="mymain" ref="mymain">
			<div class="top-content" :class="users.is_validate==1||!users?'h216':''">
				<img :src="top.src" class="bg" alt=""> 
				<router-link to="/my/my-account"><img :src='users.head_img?(imgUrl+users.head_img):""' :onerror='defaultImg' class="touxiang" alt="头像"></router-link>
				<div class="tel" >
					<span v-if="users.group_name"><router-link to="/kbb/joinPartner">{{users.group_name}}</router-link></span>
					<router-link v-if="!users.group_name" :to="{path: '/my/login'}" class="notlogin"> 未登录</router-link>
					<!-- <img v-if="users" :src="top.tel" class="tel-img"> -->
				</div>	
				<router-link to="/my/my-name" class="name-a" v-if="users">{{users.is_validate!=1?(users.is_validate==2?'待审核':'去实名'):'已实名'}}</router-link>
			</div>	
			<ul class="mui-table-view mui-table-view-chevron table-view-one xindai" >
				<li class="mui-table-view-cell mui-media list-li" v-show="users.is_manager==1">
						<!-- <img class=" mui-pull-left img-li" :src="top.list" > -->
					<router-link to="/my/loan-center" >
						<i class="iconfont icon-manager mui-pull-left img-li"></i>
						<div class="mui-media-body">
							<p class="mui-ellipsis">信贷经理<i class="iconfont icon-youjiantou mui-pull-right"></i></p>
						</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media list-li">
						<!-- <img class=" mui-pull-left img-li" :src="top.list" > -->
					<router-link to="/kbb/withdrawal" >
						<i class="wallet-icon"><img v-lazy='walleticon' alt=""></i>
						<div class="mui-media-body">
							<p class="mui-ellipsis">我的钱包<i class="iconfont icon-youjiantou mui-pull-right"></i></p>
						</div>
					</router-link>
				</li>
			</ul>
<!-- 			<div class="mui-table-view mui-table-view-chevron table-view-two">
				<router-link :to="{path: '/order',query:{type:'1'}}" class="mui-table-view-cell mui-media list-li-two list-li">
					<i class="iconfont icon-wodedingdan101 mui-pull-left img-li"></i>
					<div class="mui-media-body">
						<p class="mui-ellipsis">我的订单<i class="iconfont icon-youjiantou mui-pull-right"></i></p>
					</div>
				</router-link>
				<div class="mui-table-view-two clearfix">
					<router-link :to="{path: '/order',query:{type:'2'}}" class=" mui-col-xs-4 mui-col-sm-4">
						<span class="iconfont icon-shenqinglipei"></span>
						<div class="mui-media-body">待确认</div>
					</router-link>
					<router-link :to="{path: '/order',query:{type:'3'}}" class="mui-col-xs-4 mui-col-sm-4">
						<span class="iconfont icon-shenhetongguo"></span>
						<div class="mui-media-body">已确认</div>
					</router-link>
					<router-link :to="{path: '/order',query:{type:'4'}}" class="mui-col-xs-4 mui-col-sm-4">
						<span class="iconfont icon-quanbudingdan"></span>
						<div class="mui-media-body">退款中</div>
					</router-link>
				</div>
			</div>	 -->
			<ul class="table-view-three">
				<li class="mui-table-view mui-grid-view ">
					<div class="mui-col-xs-6 mui-table-view-cell mui-media sublist">
						<router-link :to="{path:'/kbb/debitCard',query:{link:webUrl+'/#/my/debitCard',title: '我的银行卡'}}" >	
							<i class="iconfont icon-yinhangqia"></i>
							<div>我的银行卡</div>
							<div class="num">{{users ? users.my_bank_num : 0}}</div>
						</router-link>  
					</div>
					<div class="mui-col-xs-6 mui-table-view-cell mui-media sublist">
						<router-link :to="{path: '/order',query:{type:'1'}}" >
							<i class="iconfont icon-icon"></i>
							<div>我的订单</div>
							<div class="num">{{users ? users.loan_post_num : 0}}</div>
						</router-link>  
					</div>
					<div class="mui-col-xs-6 mui-table-view-cell mui-media sublist">
						<router-link to='/my/my-star' >	
							<i class="iconfont icon-shoucang"></i>
							<div>我的收藏</div>
							<div class="num">{{users? users.my_collect_num : 0}}</div>
						</router-link>  
					</div>
					<div class="mui-col-xs-6 mui-table-view-cell mui-media sublist">
						<router-link to='/my/my-need' >	
							<i class="iconfont icon-fabutiezi"></i>
							<div>我的需求</div>
							<div class="num">{{users ? users.my_post_num : 0}}</div>
						</router-link>  
					</div>
				</li>
			</ul>
			<ul class="mui-table-view mui-table-view-chevron table-view-four">
				<li class="mui-table-view-cell mui-media " >
		            <router-link :to="{path:'/kbb/collectMoney/bill',query:{link:webUrl+'/#/collectMoney/bills',title:'刷卡记录'}}" class="list-li">	
						<i class="iconfont mui-pull-left img-li icon-jilu"></i>
						<div class="mui-media-body">
							<p class="mui-ellipsis">交易明细<i class="iconfont icon-youjiantou mui-pull-right"></i></p>
						</div>
					</router-link>	
				</li>
				<li class="mui-table-view-cell mui-media " >
		            <router-link :to="{path:'/kbb/myClient',query:{link:webUrl+'/#/collectMoney/bills',title:'刷卡记录'}}" class="list-li">	
						<i class="iconfont mui-pull-left img-li icon-manager"></i>
						<div class="mui-media-body">
							<p class="mui-ellipsis">代理中心<i class="iconfont icon-youjiantou mui-pull-right"></i></p>
						</div>
					</router-link>	
				</li>
				<li class="mui-table-view-cell mui-media "  v-if="users &&users.is_manager==1">
		            <router-link to='/my/loan-center' class="list-li" >	
						<i class="iconfont mui-pull-left img-li icon-daikuan"></i>
						<div class="mui-media-body">
							<p class="mui-ellipsis">信贷经理入驻中心<i class="iconfont icon-youjiantou mui-pull-right"></i></p>
						</div>
					</router-link>	
				</li>

				<li class="mui-table-view-cell mui-media"  v-if="!users ||users.is_manager!=1">
		            <router-link to='/set/loan-enter' class="list-li">	
						<i class="iconfont mui-pull-left img-li icon-daikuan"></i>
						<div class="mui-media-body">
							<p class="mui-ellipsis">信贷经理入驻中心<i class="iconfont icon-youjiantou mui-pull-right"></i></p>
						</div>
					</router-link>	
				</li>
				<li class="mui-table-view-cell mui-media " >
		            <router-link to='/my/complaint' class="list-li">	
						<i class="iconfont mui-pull-left img-li icon-07"></i>
						<div class="mui-media-body">
							<p class="mui-ellipsis">客服中心<i class="iconfont icon-youjiantou mui-pull-right"></i></p>
						</div>
					</router-link>	
				</li>
				<li class="mui-table-view-cell mui-media " >
		            <router-link to='/my/help-center' class="list-li">	
						<i class="iconfont mui-pull-left img-li icon-heart"></i>
						<div class="mui-media-body">
							<p class="mui-ellipsis">帮助中心<i class="iconfont icon-youjiantou mui-pull-right"></i></p>
						</div>
					</router-link>	
				</li>
				<li class="mui-table-view-cell mui-media " >
		            <router-link to='/my/set' class="list-li">	
						<i class="iconfont mui-pull-left img-li icon-shezhi"></i>
						<div class="mui-media-body">
							<p class="mui-ellipsis">设置<i class="iconfont icon-youjiantou mui-pull-right"></i></p>
						</div>
					</router-link>	
				</li>
			</ul>
		</div>
		<!-- <router-view></router-view> -->
	</div>
</template>

<script>
    import iHeader from "@/components/header/header-r"
	import {Toast} from 'mint-ui'
	export default {
		name:"my",
		data(){
			return {
				users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
				defaultImg: 'this.src="' + require('@/assets/images/head.png') + '"',
				is_r:false,
				title:"我的",
				edit:true,
				touxiang:{src:require('@/assets/images/jl02.png')},
				top:{src:require('@/assets/images/my/top_img_01.png'),
				touxiang:require('@/assets/images/my/touxiang.png'),
				tel:require('@/assets/images/my/icon_03.png'),
				list:require('@/assets/images/my/icon_07.png'),
				list2:require('@/assets/images/my/icon_10.png')},
				walleticon:require('@/assets/images/wallet.png'),
				data:'',
				bgfff:'bgfff',
				scroll_:'',
			}
        },
        mounted(){
			this.tabScroll();
			// console.log(this.bgfff)
		},
		beforeDestroy() {
			this.$nextTick(()=>{
				window.removeEventListener("scroll",this.handleScroll);
			})
		},
		created(){
			//console.log(localStorage.getItem('users'));
			console.log(1,this.users.userId);
			 this.$store.dispatch("userinfo",{
                        data:`data=${JSON.stringify({ 
					session_id:this.users.session_id,
          				userId:this.users.userId,})}`,
                        fn:(code,msg)=>{
                            switch (code) {
                                case 200:
                                    //const date = new Date();
                                    // Toast("验证码获取成功");
                                    break;
                                case -1:
                                    Toast(msg);
									break;
								case 401:
									// console.log(401)
									 this.$router.push('/my/login');
									 break;
                                default:
                                    //Toast("请求出错");
                                    this.click_state = true;
                                    break;
                            }
                        }
                 });
		},
		components:{
			iHeader
		},
		filters: {
				regMobile: function (value) {
					if (!value) return '';
					var new_mobile ;
					if (value.length > 7) {
				　　　	new_mobile = value.substr(0, 3) + '****' + value.substr(7);
				　　}
				　　return new_mobile;
				}
		},
		methods:{ 
			tabScroll(){
				window.addEventListener("scroll",this.handleScroll);
			},
			handleScroll(){
					let t = document.documentElement.scrollTop || document.body.scrollTop;
						if(t-45>0){
							this.bgfff="bgff";
						}else{
							this.bgfff="bgfff";
						}
			},
		},
		watch:{
			bgfff(curVal,oldVal){
				// console.log(curVal,oldVal)
			}
		}
		
	}
</script>
<style scoped>
#my{background: #f0f0f0;    margin-top: -67px;}/* height:100%; width: 100%;position: fixed;top:0;bottom:55px;overflow-y: auto;*/
.wrap{padding-bottom:57px;}
.top-content{position:relative;height:256px;background: #fff;overflow: hidden;}
.top-content.h216{min-height:216px;}
.top-content .bg{width:100%;height:141px;}
.top-content .touxiang{width:72px;height:72px;top:141px;left: 50%;/* transform: translate3d(-50%,-45px,0); */border-radius: 50%;
    position: relative;
    top: -45px;
    left: 50%;
    margin-left: -36px;
background: #f0f0f0;
text-align: center;line-height: 72px;color: #999;}
.tel{margin-top: -52px;text-align: center; line-height: 40px; width: 100%; height: 40px;font-size: 13px;}
.tel-img{line-height: 0;height: 20px;position: relative;top: 4px;}
.name-a{margin-left: -35px;left: 50%;/* transform: translate3d(-50%,0,0); */position: absolute;width:70px;height:30px;top: 208px; border: 1px solid #469dc8; text-align: center; line-height: 30px;border-radius: 3px;font-size: 15px; color: #469dc8;}
#my .list-li{height:56px;    padding: 12px 14px;}
#my .xindai>li{height:56px; padding: 0;}
#my .xindai>li>a{ padding: 12px 14px;display: block;  width: 100%; height: 100%; margin: 0;}
.img-li{ width: 27px;height: 21px;position: relative;top: 5px;}
#my .mui-table-view-cell p { margin-bottom: 0; height: 28px; line-height: 32px; font-size: 17px; padding-left: 6px; color: #555;}
.mui-table-view:before{left:15px;}
.table-view-two:before,.table-view-two:after,.table-view-one:after{background:transparent;}
.list-li-two{margin-top:12px;display:block;}
.mui-table-view-two>div{float:left;text-align: center;background: #fff;padding: 18px;color: #999;}
.mui-table-view-two>div .iconfont{font-size:20px;}
.mui-table-view-two>div .iconfont~div{font-size:14px;}
.mui-table-view-two>a{float:left;text-align: center;background: #fff;padding: 18px;color: #999;}
.mui-table-view-two>a .iconfont{font-size:20px;}
.mui-table-view-two>a .iconfont~a{font-size:14px;}
.list-li-two.mui-table-view-cell:after{left:0}
.table-view-three {margin-top:12px}
#my .sublist a{position:relative;padding: 22px 0 0 14px;}
#my .sublist a>i{position:absolute;left: 14px;top:22px;width:26px;font-size: 23px;padding-left: 5px;}
#my .sublist a>div{padding-left:37px;text-align:left; }
#my .sublist a .num{font-size:13px;color:#9a9a9a;}
#my .table-view-three>li:before{background:transparent;}
#my .table-view-four{margin-top:12px;}
#my .table-view-four .list-li>a{height:51px;}
#my .mui-table-view-cell>a p { margin-bottom: 0; height: 28px; line-height: 32px; font-size: 17px; padding-left: 6px; color: #555;}
#my .table-view-four:before{background:transparent;}
.icon-manager{color:#469dc8;padding-left: 5px;}
.icon-wodedingdan101{color:#6ec174;font-size: 21px;padding-left: 5px;}
.icon-yinhangqia{color:#9894ff;font-size: 21px;padding-left: 5px;}
.icon-icon{color:#f28e47;font-size: 21px;padding-left: 5px;}
.icon-shoucang{color:#ff5b47;font-size: 21px;padding-left: 5px;}
.icon-fabutiezi{color:#ffc60c;font-size: 21px;padding-left: 5px;}
.icon-daikuan{color:#ffc815;font-size: 37px;padding-left: 0px;}
.icon-jilu{color:#ff5b47;font-size: 21px;padding-left: 5px;}
.icon-07{color:#f28e47;font-size: 19px;padding-left: 5px;}
.icon-heart{color:#aba8ff;font-size: 23px;padding-left: 5px;}
.icon-shezhi{color:#469dc8;font-size: 18px;padding-left: 7px;}
.mui-table-view-cell.mui-active{background:rgba(0,0,0,.1);}
.notlogin{display: block;width: 100%;font-size: 16px;line-height: 40px;color: #aaa;}
/* .mymain {position: fixed;top: 0;bottom: 56px;width: 100%;overflow-y: auto;background: #f0f0f0;} */
.mui-table-view.mui-grid-view .mui-table-view-cell{margin: 0px -20px 0 14px;padding:11px 15px;}
.wallet-icon{width:20px;height:100%;display:block;float:left;line-height:30px;    margin-right: 6px;}
.wallet-icon>img{width:100%;}
.tel>span>a{color:#666;}
</style>
<style>
.wrap_f0{background: #f0f0f0;width: 100%;position: fixed;top:0;bottom:55px;overflow-y: auto;}
</style>
