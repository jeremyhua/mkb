<template>
	<div id="index" >
		<!-- <i-header :bgfff="{bgfff:bgff}" :title="title" :is_r="is_r"></i-header> -->
		<x-header :left-options='{backText:""}' :class="bgfff">贷款中心</x-header>			
		<div class="index-main bg-f0 fixed-content"  ref="fixcon">
			<mt-swipe :auto="4000" class="banner">
				<mt-swipe-item  v-for="(item,index) in banners" :key="index">
					<router-link  :to="{path:'/index/article-list/article-details',query:{id:item.link_url}}">
						<img :src="imgUrl+item.images">
					</router-link>
				</mt-swipe-item>
			</mt-swipe>

			<div class="tt-list-box">
				<div class="tt-list bg-fff">
					<div class="flex">
						<div class="tt_icon">
							<img src="../../../.././assets/images/tt_icon.png" alt="">
						</div>
						<div class="tt-content">
							<ul ref="notice" id="notice">
								<li  v-for="(item,index) in tt" :key="index">
									<router-link  :to="{path:'/index/article-list/article-details',query:{id:item.id}}" style="color:#333;">{{item.title}}</router-link>
								</li>
							</ul>
						</div>	
					</div>
				</div>	
			</div>

			<div class="tap-btns bg-fff">
				<div class="flex tab-icon">
					<div v-for="(btns,index) in btns" :key="index">
						<router-link :to="{path:btns.href,query:{id:btns.protype,name:btns.name}}">
							<img  :src="btns.src" alt="">
							<p>{{btns.name}}</p>
						</router-link>
					</div>
				</div>
			</div>
				<!-- <div class="flex tab-gg">
					<div v-for="(gg,index) in gg" :key="index">
						<router-link :to="gg.href">
							<img :src="gg.src">
						</router-link>
					</div>
				</div>
			</div> -->

			<mt-swipe :auto="0" class="tab-banner m-15">
			  <mt-swipe-item v-for="(item,index) in tab_banners" :key="index"  class="c-ter lazy-c bg-f5">
			  <router-link  :to="{path:'/index/article-list/article-details',query:{id:item.link_url}}" >
			  		<img v-lazy="imgUrl+item.images"/>
			  	</router-link>
			  </mt-swipe-item>
			</mt-swipe>

			<div class="tj-manager bg-fff">
				<div class="flex tj-title">
					<div>距离下次推荐</div>
					<div class="c-666">
						<span>{{jgtime}}</span> : <span>00</span> : <span>00</span>
					</div>
					<div><button class="btn-bg c-fff" @click="openGrab()">立即开抢</button></div>
				</div>
				<ul class="tj-manager-list flex">
					<li v-if="tj!== 'undefined' && tj.length>0" v-for="(item,index) in tj" :key="index">
						<router-link :to="{path:'/credit/person-detail',query:{id:item.id}}">
							<div class="tj-head c-ter lazy-c"><img v-lazy="imgUrl+item.src" :onerror="defaultImg"></div><!-- item.head_img -->
							<h3 class="tj-name c-333"><span>{{item.name}}</span><img :src="item.icon" alt=""></h3><!-- item.nickname item.week_click-->
							<div class="tj-hot"><i class="iconfont icon-huore c-ff6800"></i><span class="c-888">{{item.hot}}点击</span></div>
							<p class="tj-desc one-1 c-888">{{item.pro_type}}</p>	
						</router-link>
					</li>
					<li v-if="tj === undefined" >
						<img :src="require('@/assets/images/nodata.png')" width="196" style="margin-top:30px;">
					</li>
				</ul>
			</div>

			<div class="rm-eanking m-15 bg-fff">
				<div class="flex tj-title m-zy15">
					<div>每周十大热门排行</div>
					<div class="r-ter more-link"><router-link :to="{name:'more-hot',params:{id:''}}" class="c-888">更多<b>></b></router-link></div>
				</div>
				<ul class="rm-eanking-list">
					<li v-if="rm.length>0" v-for="(item,index) in filteredItems" :key="++index" class="flex">
						<div>
							<router-link :to="{path:'/credit/person-detail',query:{id:item.id}}">
							<h3 class="tj-name c-333"><span>{{item.nickname}}</span>
							<img  :src="(item.level=='3'?level[3]:level=='2'?level[2]:level=='1'?level[1]:level=='0'?level[0]:'')" v-if="level" alt=""></h3>
							<p class="tj-desc one-1 c-888">{{item.pro_type}}</p>
							<p class="tj-desc one-1 c-888">贷款期限：{{item.pro_time}}</p>
							<div class="rm-money c-ff6800">{{item.pro_money}}</div>
							</router-link>
						</div>
						<div>
							<div class="rm-paiming"><i class="iconfont icon-huangguan-copy" :class="index==1?'c-ffb900':index==2?'c-ff6800':index==3?'c-957dfd':index==4?'c-A47450':'c-888'"><span>{{index}}</span></i></div>
							<div class="tj-head c-ter lazy-c bg-f5"><img :src="imgUrl+item.head_img" alt=""></div>
							<div class="tj-hot"><i class="iconfont icon-huore c-ff6800"></i><span class="c-888">{{item.week_click||0}}点击</span></div>
						</div>
					</li>
					<li v-if="rm.length==0" style="text-align:center;">
						<img :src="require('@/assets/images/nodata.png')" width="196" style="margin-top:30px;">
					</li>
				</ul>
			</div>

			<div class="bg-fff drgl">
				<div class="flex tj-title m-zy15">
					<div>达人攻略</div>
					<div class="r-ter more-link"><router-link to="/index/article-list" class="c-888">更多<b>></b></router-link></div>
				</div>

				<ul class="drgl-list">
					<li v-for="(item,index) in drgl" :key="index">
						<div  class="flex" @click="article_target(item.id)">
							<div class="drgl-content" >
								<h4 class="c-333">{{item.title}}</h4>
								<div class="flex drgl-content-item c-888">
									<div>{{item.views}}阅读</div>
									<div>{{moment(item.update_time*1000).format('YYYY-MM-DD')}}</div>
								</div>
							</div>
							<div class="degl-img c-ter lazy-c bg-f5">
								<img v-lazy="imgUrl+item.photo" alt="">
							</div>
						</div>
					</li>
				</ul>
			</div>

            <span class="iconfont icon-fanhuidingbu" @click="returnTop()" v-show="is_TopShow"></span>
		</div>
	</div>
</template>

<script>
	
	import { Swipe, SwipeItem,Lazyload,Toast } from 'mint-ui'
	import mycenterWeb from "@/components/webview/mycenterweb"
	import {XHeader} from 'vux'
	export default {
		name:"index",
		data(){
			return {
				backgroundshow:false,
				defaultImg: 'this.src="' + require('@/assets/images/deault-img.png') + '"',
				titlemore:'',
                level:'jp',
                level:[require("@/assets/images/level_0.png"),require("@/assets/images/level_1.png"),
			   		require("@/assets/images/level_2.png"),require("@/assets/images/level_3.png"),],
                is_TopShow:false,
                is_top:true,
				timer:null,
                list:'',
                is_r:true,
				banners:[],
				bgfff:'transparent',
				scrolled:false,
				jgtime:0,
		        btns:[
		        	{
		        		name:"信用贷",
		        		href:"/credit/credit-loan",
		        		src:require("@/assets/images/xyd_icon.png"),
						protype:"CREDIT_LOAN"
		        	},{
		        		name:"抵押贷",
		        		href:"/credit/credit-loan",
		        		src:require("@/assets/images/dyd_icon.png"),
						protype:"MORTGAGE_LOAN"
		        	},{
		        		name:"车房贷",
		        		href:"/credit/credit-loan",//loan/car-loan
		        		src:require("@/assets/images/cfd_icon.png"),
						protype:"CAR_LOAN"
		        	}
					// ,{
		        	// 	name:"网贷",
		        	// 	href:"",
		        	// 	src:require("@/assets/images/wd_icon.png")
		        	// }
					,{
		        		name:"客户发布",
		        		href:"/post",
		        		src:require("@/assets/images/my/post_icon.png")
		        	}
		        ],
		        // gg:[
		        // 	{
		        // 		href:"",
		        // 		src:require("@/assets/images/sbz_icon.png")
		        // 	},
		        // 	{
		        // 		href:"",
		        // 		src:require("@/assets/images/gth_icon.png")
		        // 	},
		        // 	{
		        // 		href:"",
		        // 		src:require("@/assets/images/qyz_icon.png")
		        // 	}
		        // ],
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
				 title:'贷款中心',
				lat:'',  //30.579556
				lng:'',  //114.325854
				address:this.$route.query.address || '',
				cityCode:this.$route.query.cityCode || '',
				// scrollY:this.$refs.fixcon.scrollTop
			}
		},
		created(){

			
			var d = new Date();
			var hour= d.getHours();
			if(hour >= 8 && hour <= 13){
				this.jgtime = "13";
			}

			if(hour > 13 && hour <= 20){
				this.jgtime = "20";
			}

			if(hour < 8 || hour > 20){
				this.jgtime = "08";
			}

            //banner
            this.$axios.post("/api/Ad/get_banner","data="+JSON.stringify({position_type:"TOPBANNER,INDEXAD,TOPBANNER"}))
            .then((results) => {
                if(results.code==200){
					this.banners = results.data.TOPBANNER;
					this.tab_banners = results.data.INDEXAD;
                }
            })

            //每周十大排行
            this.$axios.post("/api/Lenders/get_start_lenders")
            .then((results) => {
                if(results.code==200 && results.data.list.length>0){
                    this.rm = results.data.list
                }else{
					// Toast(results.msg)
                }
            })

            //微头条 攻略
            this.$axios.post("/api/Article/get_article",`data=${JSON.stringify({article_type:'EASYARTICLE,NEWSTOP,TOPBANNER'})}`).then(results=>{
                if(results.code==200){
					this.drgl = results.data.list.EASYARTICLE;
					this.tt = results.data.list.NEWSTOP;
					// this.$nextTick(()=>{
						this.startNew()
					// })
					
                }else{
					// Toast(results.msg)
                }
			})
			//首页活动top3
			  this.$axios.post("/api/Lenders/get_top3_lenders").then(results=>{
                if(results.code==200){
					//console.log(results.data.list);
                    this.tj= results.data.list;
                }else{

                }
			});
			if(window.plus){
				if(plus&&plus.os.name=="Android"){   
					var context = plus.android.importClass("android.content.Context"); 
					var locationManager=plus.android.importClass("android.location.LocationManager"); 
					var main=plus.android.runtimeMainActivity(); 
					var mainSvr=main.getSystemService(context.LOCATION_SERVICE); 
					var androidIsOpen=mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER); 
					if(!androidIsOpen){ 
					mui.alert('定位服务未开启，请进入系统【设置】>【定位】中打开开关，并允许中龙在线使用定位服务', '打开定位开关', function(){});
					}
				}else{
					var CLLocationManager = plus&&plus.ios.import("CLLocationManager");
					var authorizationStatus = CLLocationManager.authorizationStatus();
					//console.log(authorizationStatus)
					if(authorizationStatus == 2){ //定位服务授权状态已经被用户明确禁止，或者在设置里的定位服务中关闭。
						mui.alert('定位服务未开启，请进入系统【设置】>【隐私】>【定位服务】中打开开关，并允许中龙在线使用定位服务', '打开定位开关', function(){});
					}
				} 
				
				//获取当前位置
				const that = this;
				this.getLocation = new Promise((resolve, reject) => {
					mui.plusReady(()=>{
						plus.geolocation.getCurrentPosition((p)=>{
							that.address = that.address || p.address.city;
							that.lat = p.coords.latitude;
							that.lng = p.coords.longitude;
							resolve();
						}, (e)=>{  
							reject(e)
						});//{provider: 'baidu'}
					})
				});
			}
		},
		mounted(){
			//公告无限滚动
			//头部显示背景
			// this.$nextTick(function () {
				window.addEventListener("scroll",this.handleScroll);	
			// });		
		},
		destroyed() {
			// document.querySelector(".index-main").removeEventListener("scroll",this.handleScroll);
		},
		computed:{
			 filteredItems:function(){
				return this.rm.slice(0, 2)
			}
		},
        methods:{
            article_target(_id){
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
				 //this.loading = true;
				const payload = {
					userId:localStorage.getItem('Token')
				}
                this.$router.push({name:'cardThird',query:{payload,link:this.webUrl+'/api/Activity/get_huodong'}}) 
			},
			startNew(){
				const oUl = document.querySelector("#notice");
				oUl.innerHTML += oUl.innerHTML;
				let move_num = 0;
				setInterval(()=>{
					move_num+=-52;
					if(Math.abs(oUl.offsetTop)>(oUl.offsetHeight/2-52)){
						oUl.style.top = 0;
						move_num = -52;
					}
					this.$startMove(oUl,{
						top: move_num
					});
				}, 3000);
			},
			handleScroll:function(event){
					event.preventDefault();
					this.scrolled = window.scrollY;
					if(this.scrolled>35){
						this.bgfff='';
					}else{
						this.bgfff='transparent';
					}
			}
        },
		components:{
			XHeader,mycenterWeb,Swipe, SwipeItem,Lazyload
		},
		watch:{

			// scrollY(v){
			// 	console.log(v)
			// }
		}
	}
</script>

<style scoped>

	.banner{height: 220px;position: relative;z-index: 0;width: 100%;left:0;top:0;overflow:hidden;}
	.banner a{display: block;}
	.banner img,.banner a,.tab-icon div img,.tab-icon div a,.tab-gg div a,.tab-gg div img,.tt-content li a,.tab-banner a,.tab-banner img{width: 100%;height: 100%;}

	.tt-list-box{position:relative;z-index:5;top:0;height: 20px;}
	.tt-list{height: 52px;margin-top:-20px;margin-left:15px;margin-right:15px;box-shadow: 0 1px 3px #eee;overflow:hidden;}
	.tt_icon img{width: 44px;margin: 16px 10px;}
	.tt-content{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;width: 50%;}
	.tt-content ul{position: relative;margin-top: 1px;}
	.tt-content li{height: 100%;line-height: 52px;padding-right: 15px;}

	.tab-icon{text-align: center;padding: 0 15px;padding-top: 50px;}
	.tab-icon div,.tab-gg div{-webkit-box-flex: 1;-webkit-flex:1;flex:1;}
	.tab-icon div img{width: 46px;height:46px;}
	.tab-icon div a,.tab-gg div a,.tt-content li a,.tab-banner a{display: block;}
	.tab-icon div a p{color:#333;}
	
	.tab-gg{margin-top: 5px;padding: 0 5px;}
	.tab-gg div{width: 90px;height: 75px;margin: 0 10px;}
	.tap-btns{padding-bottom: 25px;position: relative;}

	.tab-banner{height: 102px;}

	.tj-manager{height: 250px;padding:25px 15px;}
	.tj-title{justify-content:space-between;}
	.tj-title div:first-child{border-left:5px solid #469dc8;height: 20px;padding-left: 10px;line-height: 20px;font-size:16px;}
	.tj-title div:nth-child(2){ -webkit-box-flex: 2;-webkit-flex:2;-ms-flex: 2;flex: 2;margin-top: -3px;padding-left: 10px;font-size: 14px;}
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
	/* #index{background: #f0f0f0;width: 100%;position: fixed;top: 0;bottom:0;overflow-y: auto;} */
	/* .index-main{background: #f0f0f0;width: 100%;position: fixed;top: 0;bottom: 0;overflow-y: auto;} */
	.wrap{height:100vh;}
	.index-main{    margin-top: -67px;}
	@media screen and (max-width: 320px){
		.tab-gg div{height: 65px;}
		.tab-banner{height: 82px;}
	}
</style>

<style>
	h3{font-size:24px;}
	#notice li a{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
	/* #index .banner .mint-swipe-indicators{bottom: 30px;} */
	#index .banner .mint-swipe-indicator{background: #fff;opacity: 0.8;}
	#index .mint-swipe-indicator.is-active{background: #469dc8;}
    #index 	.vux-header .vux-header-left .left-arrow {top: 30px !important;left: 5px;   position: fixed;}
	#index .tap-btns	.flex{display:block;height: 110px;}
	#index .tap-btns	.flex>div{width:25%;float: left;	}
</style>