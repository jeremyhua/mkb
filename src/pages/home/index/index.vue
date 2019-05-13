<template>
	<div id="index" class="wrap">
		<!-- <i-header :bg="bgfff" :title="title" :address="address" :cityCode="cityCode"></i-header> -->
		<x-header  :title="title" :left-options="{showBack: false}" :class="bgfff">
				<!-- <a slot="left"  >    
					<router-link to="/index/location">
					<span class="iconfont icon-luxiandingwei"></span>
					<span v-if="$route.query.address">{{$route.query.address}}</span> 
					<span v-if="!$route.query.address">{{address||daddress}}</span> 
					</router-link>
				</a> -->
				<!-- <a slot="right" >    
					<router-link to="/index/scanning">
          							<span class="iconfont icon-saomiao"></span>
        			</router-link>
				</a> -->
		</x-header>
		<div class="index-main bg-f0">
			<div class="main-top">
				<!-- <div class="wrapleft" v-for="(item,index) in maintop" :key="index"> -->
						<router-link :to="{path: item.href,query:{link: item.url,title: item.name}}" tag='div' class="wrapleft" v-for="(item,index) in maintop" :key="index">
							<img v-lazy="item.src" alt="">{{item.name}}
						</router-link>	

				<!-- </div> -->
			</div>
		<!--交易明细 
				<div class="tap-btns bg-fff">
				<div class="tab-icon clearfix">
					<div v-for="(btns,index) in btns" :key="index">
						<router-link :to="{path: btns.href,query:{link: btns.url,title: btns.name}}">
							<img  v-lazy="btns.src" alt="">
							<p>{{btns.name}}</p>
						</router-link>
					</div>
				</div>
			</div> -->
			<div class="tt-list">
				<div class="left"><img v-lazy="ggn.src" alt=""></div>
				<ul id="noticepublic">
								<li  v-for="(item,index) in tt" :key="index++">
								<router-link  :to="{path:'/index/article-list/article-details',query:{id:item.id}}" style="color:#333;"> 
										<div class="right"><span>活动</span>	{{item.title}}</div>
									 </router-link> 
								</li>
				</ul>
			</div> 
			<div class="index-content">
			
			<mt-swipe :auto="4000" class="banner">
				<mt-swipe-item  v-for="(item,index) in banners" :key="index">
					<router-link  :to="{path:'/index/article-list/article-details',query:{id:item.link_url}}">
						<img v-lazy="imgUrl+item.images">
					</router-link>
				</mt-swipe-item>
			</mt-swipe>
			<router-link class="content2" to="/index/go-loan" tag='div'>
						<img src="" v-lazy='dk.src' alt="">
							<div class="con_r">
								<div class="dkzx">贷款中心</div>
								<div class="jssp">急速审批 <img src=""  v-lazy="xykicon.src" alt=""></div>
					</div>
			</router-link>
			<router-link class="content3" to="/index/credit-card" tag='div'>	
						<img src="" v-lazy='xyk.src' alt="">
						<div class="con_r">
								<div class="dkzx">信用卡中心</div>
								<div class="jssp">快速办卡<img src=""  v-lazy="xykicon.src" alt=""></div>
					</div>
			</router-link>	

			<!-- <router-link class="content3" to="/index/brush" tag='div'>	
						<img src="" v-lazy='brush.src' alt="">
						<div class="con_r">
								<div class="dkzx">手刷中心</div>
								<div class="jssp">快速办理<img src=""  v-lazy="xykicon.src" alt=""></div>
					</div>
			</router-link>		 -->
			</div>
		
		 	<!-- <div class="bbcard clearfix">
				<div class="bbleft">
					<h3>新手办卡</h3>
					<h5 class="cc-one">新户专属 易下卡</h5>
					<img v-lazy="bbcard.one" alt="">
				</div>	
				<div class="bbright">
						<div class="righttop">
							<h3>里程兑换</h3>
							<h5 class="cc-two">畅销免费机票</h5>
							<img v-lazy="bbcard.two" alt="">
						</div>
						<div class="rightbottom">
							<h3>我的卡资料</h3>
							<h5 class='cc-three'>留资料 智能申卡</h5>
							<img v-lazy="bbcard.three" alt="">
						</div>	
				</div>	
			</div>
			<div class="bbcard-sec clearfix">
				<div class="bbleft">
					<h3>快速批卡</h3>
					<h5 class="cc-four">急速办 快审批</h5>
							<img v-lazy="bbcard.four" alt="">
				</div>
				<div class="bbright">
					<h3>帮我选卡</h3>
					<h5 class="cc-four">测基因 推荐卡</h5>
							<img v-lazy="bbcard.five" alt="">
				</div> -->

			</div>	 		
            <span class="iconfont icon-fanhuidingbu" @click="returnTop()" v-show="is_TopShow"></span>
		</div>
	</div>
</template>

<script>
	
	import iHeader from "@/components/header/header"
	import { Swipe, SwipeItem,Lazyload,Toast } from 'mint-ui';
	import { Swiper,XHeader } from 'vux'
	export default {
		name:"index",
		components:{
			iHeader,Swipe, SwipeItem,Lazyload,Swiper,XHeader
		},
		data(){
			return {
			    users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
				daddress:"定位中",
				defaultImg: 'this.src="' + require('@/assets/images/deault-img.png') + '"',
				titlemore:'',
                level:'jp',
                level:[require("@/assets/images/level_0.png"),require("@/assets/images/level_1.png"),
					   require("@/assets/images/level_2.png"),require("@/assets/images/level_3.png"),],
				bbcard:{'one':require("@/assets/images/my/index_32.png"),"two":require("@/assets/images/my/index_29.png"),
				'three':require("@/assets/images/my/index_35.png"),"four":require("@/assets/images/my/index_39.png"),
				'five':require("@/assets/images//my/index_41.png"),},
                is_TopShow:false,
                is_top:true,
				timer:null,
				list:'',
				swiper_list:[{
					url: 'javascript:',
					img: require("@/assets/images/banner2.png"),
					title: ''
					}, {
					url: 'javascript:',
					img: require("@/assets/images/banner.png"),
					title: ''
					}],
				banners:[{images:require("@/assets/images/banner.png")},{images:require("@/assets/images/banner2.png")}],
				bgfff:"bgfff",
				maintop:[
				// {
				// 	name:"我要办卡",
				// 	src:require('@/assets/images/my/index01.png'),
				// 	href:"/index/officecard",
				// 	url:"",
				// },
				{
					name:"我要代还",
					src:require('@/assets/images/home1.png'),
					href:"/kbb/repayMent",
					url:'',//this.webUrl+"/#/repayMent",
				},{
					name:"刷卡收款",
					src:require('@/assets/images/home2.png'),
					href:"kbb/CreditCardReceipts",
					url:'',//this.webUrl+"/#/collectMoney",
				}],
				ggn:{src:require('@/assets/images/toutiao_03.png')},
		        btns:[
		        	{
		        		name:"交易明细",
						//href:"/my/swipe-card/swipe-card-record",
						href:"/kbb/collectMoney/bill",
						src:require("@/assets/images/my/index_03.png"),
						url:'',//this.webUrl+"/#/collectMoney/bills"
		        	},{
		        		name:"代理中心",
		        		href:"/kbb/myclient",
						src:require("@/assets/images/my/index_05.png"),
						url:'',//this.webUrl+"/#/repayMent/myClient"
		        	},{
		        		name:"结算卡",
		        		href:"/kbb/debitCard",
		        		src:require("@/assets/images/my/index_07.png"),
						url:'',//his.webUrl+"/#/my/debitCard"
		        	},{
		        		name:"玩转积分",
		        		href:"/index/integral-mall/integral-mall",
		        		src:require("@/assets/images/my/index_09.png"),
						url:""
		        	},{
		        		name:"我要贷款",
		        		href:"/index/go-loan",
		        		src:require("@/assets/images/my/index_11.png"),
						url:""
					},{
		        		name:"0首付购车",
		        		href:"/loan/car-loan",
		        		src:require("@/assets/images/my/index_13.png"),
						url:""
		        	},{
		        		name:"手刷",
		        		href:"/my/swipe-card/swipe-card0",
		        		src:require("@/assets/images/my/index_15.png"),
						url:""
		        	},{
		        		name:"更多",
		        		href:"/loan/car-loan",
		        		src:require("@/assets/images/my/index_17.png"),
						url:""
		        	}
		        ],
		        gg:[
		        	{
		        		href:"",
		        		src:require("@/assets/images/sbz_icon.png")
		        	},
		        	{
		        		href:"",
		        		src:require("@/assets/images/gth_icon.png")
		        	},
		        	{
		        		href:"",
		        		src:require("@/assets/images/qyz_icon.png")
		        	}
				],
				dk:{src:require("@/assets/images/content_01.png")},
				xyk:{src:require("@/assets/images/content_02.png")},
				brush:{src:require("@/assets/images/brush.png")},
				xykicon:{src:require("@/assets/images/xyk_03.png")},
		        tt:[],
		        tab_banners:[],
		        tj:[],
		        rm:[],
		        drgl:[
		        	{
		        		photo:require("@/assets/images/glt1.png"),
		        		title:"这样填表  办理大额信用卡通过率高达99%",
		        		views:100,
		        		update_time: 1513154496*1000,
		        		id:""	
		        	},
		        	{
		        		photo:require("@/assets/images/glt2.png"),
		        		title: "出门旅游 只知道申请个人旅游贷款？",
		        		views: 100,
		        		update_time: 1513154496*1000,
		        		id: ""	
		        	}
				],
				scroll:'',
				title:'信用卡中心',
				lat:'',  //30.579556
				lng:'',  //114.325854
				address:this.$route.query.address || '',
				cityCode:this.$route.query.cityCode || '',
				location:'',
				swiper_index:'',
				
			}
		},
		created(){
			//首页活动top3
			// console.log(plus,'plus')
			if(window.plus){
						// alert(122)
					  if(plus.os.name=="Android"){   
							var context = plus.android.importClass("android.content.Context"); 
							var locationManager=plus.android.importClass("android.location.LocationManager"); 
							var main=plus.android.runtimeMainActivity(); 
							var mainSvr=main.getSystemService(context.LOCATION_SERVICE); 
							var androidIsOpen=mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER); 
							if(!androidIsOpen){ 
							mui.alert('定位服务未开启，请进入系统【设置】>【定位】中打开开关，并允许美卡宝使用定位服务', '打开定位开关', function(){});
							}
					}else{
						var CLLocationManager = plus&&plus.ios.import("CLLocationManager");
						var authorizationStatus = CLLocationManager.authorizationStatus();
							//console.log(authorizationStatus)
						if(authorizationStatus == 2){ //定位服务授权状态已经被用户明确禁止，或者在设置里的定位服务中关闭。
							mui.alert('定位服务未开启，请进入系统【设置】>【隐私】>【定位服务】中打开开关，并允许美卡宝使用定位服务', '打开定位开关', function(){});
						};
					} 
				//获取当前位置
				// const that = this;
				// this.getLocation = new Promise((resolve, reject) => {
				// 	mui.plusReady(()=>{
				// 		plus&&plus.geolocation.getCurrentPosition((p)=>{
				// 			that.address = that.address || p.address.city;
				// 			that.lat = p.coords.latitude;
				// 			that.lng = p.coords.longitude;

							
				// 			if(that.users){
				// 				const  userId = that.users.userId;
				// 				const  country = p.address.country;
				// 				const  province = p.address.province;
				// 				const  city = p.address.city;
				// 				const  district = p.address.district;
				// 				const  street = p.address.street;
				// 				const  poiName = p.address.poiName;
				// 				const  postalCode = p.address.postalCode;
				// 				const cityCode = p.address.cityCode;
				// 				const payload = {country,province,city,district,street,poiName,postalCode,cityCode,userId};
				// 				this.$axios.post("/api/api/upUserLocation",'data='+JSON.stringify(payload)).then(results=>{console.log('位置信息保存成功');});
				// 			}
							
				// 			resolve();
				// 		}, (e)=>{  
				// 			reject(e)
				// 		});//{provider: 'baidu'}
				// 	})
				// });
			}
		},
		mounted(){
			//公告无限滚动
			  //微头条 攻略
            this.$axios.post("/api/Article/get_article",`data=${JSON.stringify({article_type:'EASYARTICLE,NEWSTOP'})}`).then(results=>{
                if(results.code==200){
					// this.drgl = results.data.list.EASYARTICLE;
					this.tt = results.data.list.NEWSTOP;
					// this.$nextTick(()=>{
						this.startNew()
					// })
					
                }else{
					Toast(results.msg)
                }
			});
			//头部显示背景
			// this.$nextTick(function () {
				document.querySelector(".index-main").addEventListener("scroll",this.handleScroll);	
			// });		
			// console.log(111);
			//首页活动top3
			 //banner
            this.$axios.post("/api/Ad/get_banner","data="+JSON.stringify({position_type:"bann"}))
            .then((results) => {
                if(results.code==200){
					this.banners = results.data.bann;
					// this.swiper_list=results.data.bann.map((item, index) => ({
					// 	url: item.link_url,
					// 	img: item.images,
					// 	title: item.title
					// 	}))
                }
            })

			//console.log(typeof(this.location));
			
		},
		destroyed() {
			// document.querySelector(".index-main").removeEventListener("scroll",this.handleScroll);
		},
        methods:{
			 demo07_onIndexChange (index) {
				this.demo07_index = index
			},
            article_target(_id){
                // console.log(_id)
                this.$router.push({name:'articleDetails',query:{id:_id}})
			},
            returnTop(){//返回顶部
                let top = document.querySelector(".index-main").scrollTop;
                if(!(top>100)){
                    return false;
                }
                if(this.is_top){
                    this.is_top = false;
                    const timer = setInterval(()=>{
                        top-=50;
                        if(top<0){
                            clearInterval(timer);
                            this.is_top = true;
                            this.is_TopShow = false;
                            top=0;
                        }
                        document.querySelector(".index-main").scrollTop = top;
                    },30);
                }
            },
            //立即开抢
            openGrab(){
                
			},
			
			startNew(){
				const oUl = document.querySelector("#noticepublic");
				if(oUl){
					oUl.innerHTML += oUl.innerHTML;
				}
				let move_num = 0;
				setInterval(()=>{
					move_num+=-46;
					if(Math.abs(oUl.offsetTop)>(oUl.offsetHeight/2-46)){
						oUl.style.top = 0;
						move_num = -46;
					}
					this.$startMove(oUl,{
						top: move_num
					});
				}, 3000);
			},
			handleScroll(event){
					event.preventDefault();
					// ev=ev||window.event;$(ev.target).scrollTop()
					var top= $(".index-main").scrollTop();
					// console.log(top)
					if(top>45){
						this.bgfff='bg';
						this.is_TopShow = true;
					}else{
						this.bgfff='bgfff';
						this.is_TopShow = false;
					}
			},
			swiper_onIndexChange (index) {
			this.swiper_index = index
			},
			article_target(_id){
                this.$router.push({name:'articleDetails',query:{id:_id}})
			},
			
        }
	}
</script>

<style scoped>
	.banner{height: 145px;position: relative;z-index: 0;width: 100%;left:0;top:0;overflow:hidden;}
	.banner a{display: block;}
	.banner img,.banner a,.tab-icon div img,.tab-icon div a,.tab-gg div a,.tab-gg div img,.tt-content li a,.tab-banner a,.tab-banner img{width: 100%;height: 100%;}

	.tt_icon img{width: 44px;margin: 16px 10px;}
	.tt-content{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;width: 50%;}
	.tt-content ul{position: relative;margin-top: 1px;}
	.tt-content li{height: 100%;line-height: 52px;padding-right: 15px;}

	.tab-icon{text-align: center;}
	.tab-icon div,.tab-gg div{    float: left;width: 25%;    float: left;width: 25%;height: 112px;padding-top: 23px;}
	.tab-icon div img{width:55px;height:56px;}
	.tab-icon div a,.tab-gg div a,.tt-content li a,.tab-banner a{display: block;}
	.tab-icon div a p{color:#333;}
	
	.tab-gg{margin-top: 5px;padding: 0 5px;}
	.tab-gg div{width: 90px;height: 75px;margin: 0 10px;}
	.tap-btns{position: relative;height:228px;}

	.tab-banner{height:117px;}

	.tj-manager{height: 250px;padding:25px 15px;}
	.tj-title{justify-content:space-between;}
	.tj-title div:first-child{border-left:5px solid #469dc8;height: 20px;padding-left: 10px;line-height: 20px;font-size:16px;}
	.tj-title div:nth-child(2){-webkit-box-flex: 2;-webkit-flex:2;flex:2;margin-top: -3px;padding-left: 10px;font-size: 14px;}
	.tj-title div:nth-child(2) span{display: inline-block;border:1px solid #ddd;height: 25px;line-height: 25px;padding:0 1px;border-radius: 3px;}
	.tj-title div:last-child{margin-top: -5px;}
	.tj-title div:last-child button{font-size: 12px;border:none;height: 30px;line-height: 32px;padding:0 10px;}
	.tj-manager-list{margin-left: -10px;}
	.tj-manager-list li{margin-left: 10px;-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;overflow:hidden;text-align: center;}
	.tj-head{margin: 15px 0;border-radius: 50%;width:90px;height:90px;border-radius: 50%;}
	.tj-head img{width: 90px;height: 90px;border-radius: 50%}
	.tj-name img{width: 14px;height: 16px;vertical-align: middle;margin-top: -3px;margin-left: 5px;}
	.tj-hot{padding-top: 3px;}
	.tj-hot span{font-size:14px;}
    .tj-manager-list .tj-head{margin:15px auto;}
	.more-link{padding-top: 5px;}
	.more-link b{font-family: simsun;font-size:18px;display: inline-block;vertical-align: middle;margin-top: -2px;padding-left: 5px;}
	.rm-eanking{padding-top:15px;}
	.rm-eanking-list li{margin-left: 15px;border-bottom: 1px solid #eee;padding:20px 0;padding-right: 15px;}
	.rm-eanking-list li:last-child,.drgl-list li:last-child{border:none;}
	.rm-eanking-list li div:first-child{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;}
	.rm-eanking-list li div:last-child{width: 90px;}
	.rm-eanking-list p{margin-bottom: 0;}
	.rm-eanking-list .tj-name{margin:15px 0;margin-top: 18px;}
	.rm-eanking-list  .tj-head{margin:0;}
	.rm-eanking-list li div .rm-money{font-size:25px;padding-top: 15px;width:auto;}
	.rm-eanking-list li div:last-child .rm-paiming{width: 30px;text-align: center;position: relative;height: 22px;margin:0 auto;}
	.rm-paiming i{font-size: 30px;}
	.rm-paiming i span{font-size: 12px;color: #fff;position: absolute;left:0;top:0;right:0;padding-top: 4px;}
	.drgl{padding-top: 15px;}
	.drgl-content{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;padding-right: 15px;}
	.degl-img{width: 110px;height: 66px;}
	.degl-img img{width: 100%;height: 100%;}
	.drgl-list li{margin-left: 15px;padding:15px 0;padding-right: 15px;border-bottom: 1px solid #eee;}
	.drgl-content-item{justify-content:space-between;margin-top: 5px;font-size:14px;}
	.drgl-content h4{font-size:16px;font-weight: 400;line-height: 22px;height:44px;}
    .icon-fanhuidingbu{position:fixed;bottom:80px;right:15px;font-size:30px;z-index:99;color:rgba(0,0,0,.6);}
	.tj-name>span{font-size: 24px;}
	#index{background: #f0f0f0;width: 100%;}
	.index-main{background: #f0f0f0;width: 100%;position: fixed;top: 0;bottom: 55px;overflow-y: auto;}
	.wrap{height:100vh;}
	/* .main-top{height:230px;background:#9ca8bc;padding-top:60px;} */
	.main-top{height:200px;background:#469dc8;padding-top:30px;}
	.main-top img{height:36px;display: block;margin:0 auto;margin-bottom:7px;}
	.main-top>div{width:50%;float:left;text-align: center;position:relative;color:#fff;padding-top:40px;}
	.wrapleft img{height:73px;}

	.bbcard{width:100%;height:160px;background:#fff;margin:2px 0;}
	.bbcard h3,.bbcard-sec h3{font-size: 15px;line-height:24px;}
	.bbcard h5,.bbcard-sec h5{font-size: 11px;line-height: 20px;}
	.bbcard h5.cc-one{color:#699be9;}
	.bbcard h5.cc-two{color:#fb8686;}
	.bbcard h5.cc-three{color:#e098f2;}
	.bbcard-sec h5.cc-four{color:#2bc1e1;}
	.bbcard .bbleft,.bbcard-sec .bbleft{border-right:2px solid #f0f0f0;}
	.bbcard .bbright .righttop{border-bottom:2px solid #f0f0f0;}
	.bbcard .bbleft,.bbcard .bbright{width:50%;float:left;height:100%;}
	.bbcard .bbright .righttop,.bbcard-sec>div{height: 80px;padding:19px  0 0 12px;}
	.bbcard .bbright .rightbottom,.bbcard .bbleft{padding:19px 0 0 12px ;}
	.bbcard-sec{height: 80px;width: 100%;background:#fff;}
	.bbcard-sec>div{width: 50%;;float:left;}
	.tt-list{width:100%;display:block;position:relative;overflow: hidden;font-size:13px;height: 46px;background: #fff;text-align: left;line-height: 46px;}
	.tt-list .left{width:55px;height:100%;float:left;}
	.tt-list .left>img{width: 37px;height: 33px;margin: 8px;}
	.tt-list .right{width:100%;height:46px;padding-left: 55px;white-space: nowrap;}
	.tt-list .right>span{border:1px solid #ffaf7f;color:#ffaf7f;padding: 2px;}
	.bbcard .bbleft img{width: 95px;height:75px;}
	.righttop  img{width:59px;height:65px;position:absolute;right:10px;top:10px;}
	.rightbottom img{width:59px;height:46px;position:absolute;right:10px;top:10px;}
	.bbcard-sec img{width:63px;height:51px;position:absolute;right:10px;top:10px;}
	.bbcard-sec .bbleft,.bbcard-sec .bbright,.rightbottom,.righttop,.bbcard .bbleft{position:relative;}
	.bbcard .bbleft img{position:absolute;right: 45px;bottom:12px;}

	.index-content{padding: 12px;}
	.content2,.content3{height:82px;position:relative;background: #fff;margin-top: 12px;overflow: hidden;}
	.content2>img{width:170px;position:absolute;bottom: 0;left: 0;}
	.content3>img{width:170px;position:absolute;bottom: 0;left: 0;}
	.con_r{width: 120px;height:100%;float:right;padding: 15px 6px;}
	.dkzx{height: 30px;line-height: 30px;font-size: 17px;}
	.jssp{font-size:13px;color:#d8d8d8;line-height: 24px;}
	.jssp img{position: relative;top: 4px;left: 4px;}
	@media screen and (max-width: 320px){.tab-gg div{height: 65px;}.tab-banner{height: 115px;}}

</style>

<style>
 #index .icon-luxiandingwei{font-size: 25px;display: inline-block;vertical-align: middle;margin-top: -5px;}
  #index .icon-saomiao{font-size: 26px;}
	#index .mint-swipe-indicator.is-active{    background: #e3e3e3;;opacity:1;}
	h3{font-size:24px;}
	#noticepublic li a{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:100%;display:block;}
	#index .banner .mint-swipe-indicators{bottom: 10px;right: 10px;position: absolute;left:0;transform:translateX(0);-webkit-transform:translateX(0);text-align: right;}
	#index  .mint-swipe-indicator{    background: #bdbdbd;;opacity:1;}
	#noticepublic{position:absolute;top:0;left:0;   }
	#noticepublic li{height:46px;}
	.tt-list .left{position:relative;}
	.tt-list .left:after{position:absolute;width:1px;height:26px;background:#dedede;content:'';top:13px;right:6px;}
  #index 	.vux-header .vux-header-left,  #index   .vux-header .vux-header-right{top:35px;}
  .vux-header.bgfff{background:transparent;}
</style>