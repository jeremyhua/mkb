<template>
	<div id="index" class="wrap">
		<i-header ></i-header>
		<div class="main bg-f0">
			<div class="img_gallery banner">
				<div class="point">
					<a v-for="(item,index) in banners" :key="index"></a>
				</div>
				<div class="main_img">
					<ul>
						<li  v-for="(item,index) in banners" :key="index" class="c-ter lazy-c bg-f5">
							<router-link :to="item.link_url">
						  		<img  :src="imgUrl+item.images"/>
								  <!-- v-lazy="imgUrl+item.images" -->
						  	</router-link>
						</li>
					</ul>
					<a href="javascript:;" id="btn_prev"></a>
					<a href="javascript:;" id="btn_next"></a>
				</div>
			</div>

			<div class="tt-list-box">
				<div class="tt-list bg-fff">
					<div class="flex">
						<div class="tt_icon">
							<img src="../../.././assets/images/tt_icon.png" alt="">
						</div>
						<div class="tt-content">
							<ul ref="notice" id="notice">
								<li  v-for="(item,index) in tt" :key="index">
									<!-- <router-link :to="item.href" class="c-333 one-1"> -->
										{{item.title}}
									<!-- </router-link> -->
								</li>
								
								<!-- <li :key="index">
									{{titlemore}}
								</li> -->
								
							</ul>
						</div>	
					</div>
				</div>	
			</div>

			<div class="tap-btns bg-fff">
				<div class="flex tab-icon">
					<div v-for="(btns,index) in btns" :key="index">
						<router-link :to="btns.href">
							<img  :src="btns.src" alt="">
							<p>{{btns.name}}</p>
						</router-link>
					</div>
				</div>
				<div class="flex tab-gg">
					<div v-for="(gg,index) in gg" :key="index">
						<router-link :to="gg.href">
							<img :src="gg.src" alt="">
						</router-link>
					</div>
				</div>
			</div>

			<mt-swipe :auto="0" class="tab-banner m-15">
			  <mt-swipe-item v-for="(item,index) in tab_banners" :key="index"  class="c-ter lazy-c bg-f5">
			  	<router-link :to="imgUrl+item.link_url">
			  		<img v-lazy="imgUrl+item.images" alt="" />
			  	</router-link>
			  </mt-swipe-item>
			</mt-swipe>

			<div class="tj-manager bg-fff">
				<div class="flex tj-title">
					<div>距离下次推荐</div>
					<div class="c-666">
						<span>13</span> : <span>04</span> : <span>02</span>
					</div>
					<div><button class="btn-bg c-fff" @click="openGrab()">立即开抢</button></div>
				</div>
				<ul class="tj-manager-list flex">
					<li v-for="(item,index) in tj" :key="index">
						<router-link to="/credit/person-detail">
							<div class="tj-head c-ter lazy-c"><img v-lazy="item.src" alt=""></div><!-- item.head_img -->
							<h3 class="tj-name c-333"><span>{{item.name}}</span><img :src="item.icon" alt=""></h3><!-- item.nickname item.week_click-->
							<div class="tj-hot"><i class="iconfont icon-huore c-ff6800"></i><span class="c-888">{{item.hot}}点击</span></div>
							<p class="tj-desc one-1 c-888">{{item.pro_type}}</p>	
						</router-link>
					</li>
				</ul>
			</div>

			<div class="rm-eanking m-15 bg-fff">
				<div class="flex tj-title m-zy15">
					<div>每周十大热门排行</div>
					<div class="r-ter more-link"><router-link to="" class="c-888">更多<b>></b></router-link></div>
				</div>
				<ul class="rm-eanking-list">
					<li v-for="(item,index) in rm" :key="++index" class="flex">
						<div>
							<router-link to="/credit/person-detail">
                            <!-- level -->
							<h3 class="tj-name c-333"><span>{{item.nickname}}</span><img  :src="(level=='jp'?jp_icon:level=='yp'?yp_icon:tp_icon)" v-if="level" alt=""></h3>
							<p class="tj-desc one-1 c-888">{{item.pro_type}}</p>
							<p class="tj-desc one-1 c-888">贷款期限：{{item.time}}</p>
							<div class="rm-money c-ff6800">{{item.pro_money}}</div>
							</router-link>
						</div>
						<div>
							<div class="rm-paiming"><i class="iconfont icon-huangguan-copy" :class="index==1?'c-ffb900':index==2?'c-ff6800':index==3?'c-957dfd':index==4?'c-A47450':'c-888'"><span>{{index}}</span></i></div>
							<div class="tj-head c-ter lazy-c bg-f5"><img v-lazy="item.head_img" alt=""></div>
							<div class="tj-hot"><i class="iconfont icon-huore c-ff6800"></i><span class="c-888">{{item.click||0}}点击</span></div>
						</div>
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
	
	import iHeader from "@/components/header/header"
	import { Swipe, SwipeItem,Lazyload,Toast } from 'mint-ui';

	export default {
		name:"index",
		data(){
			return {
				titlemore:'',
                level:'jp',
                jp_icon:require("@/assets/images/jp_icon.png"),
                yp_icon:require("@/assets/images/yp_icon.png"),
                tp_icon:require("@/assets/images/tp_icon.png"),
                is_TopShow:false,
                is_top:true,
				timer:null,
				list:'',
		        banners:[
		        	{
		        		link_url:"",
		        		images:require("@/assets/images/banner.png"),
		        	}
		        ],
		        btns:[
		        	{
		        		name:"信用贷",
		        		href:"/credit/credit-loan",
		        		src:require("@/assets/images/xyd_icon.png")
		        	},{
		        		name:"抵押贷",
		        		href:"",
		        		src:require("@/assets/images/dyd_icon.png")
		        	},{
		        		name:"车房贷",
		        		href:"",
		        		src:require("@/assets/images/cfd_icon.png")
		        	},{
		        		name:"网贷",
		        		href:"",
		        		src:require("@/assets/images/wd_icon.png")
		        	},{
		        		name:"信用卡",
		        		href:"/index/credit-card",
		        		src:require("@/assets/images/xyk_icon.png")
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
		        tt:[
		       /*  	{
		        		href:"",
		        		id:"",
		        		content:"怎么让银行给你1办张十万的信用卡怎么让银行给你办张十万的信用卡"
		        	},{
		        		href:"",
		        		id:"",
		        		content:"怎么让银行给你2办张十万的信用卡怎么让银行给你办张十万的信用卡"
		        	},{
		        		href:"",
		        		id:"",
		        		content:"怎么让银行给你3办张十万的信用卡怎么让银行给你办张十万的信用卡"
		        	},{
		        		href:"",
		        		id:"",
		        		content:"怎么让银行给你4办张十万的信用卡怎么让银行给你办张十万的信用卡"
		        	} */
		        ],
		        tab_banners:[
		        	/* {
		        		link_url:"",
		        		src:require("@/assets/images/tab_banner.png")
		        	},{
		        		href:"",
		        		images:require("@/assets/images/tab_banner.png")
		        	} */
		        ],
		        tj:[
		        	{
		        		src:require("@/assets/images/jl01.png"),
		        		name:"周经理",
		        		hot:1200,
		        		desc:"信用贷、车贷车贷车贷车贷",
		        		href:"",
		        		icon:require("@/assets/images/jp_icon.png")
		        	},
		        	{
		        		src:require("@/assets/images/jl02.png"),
		        		name:"舒经理",
		        		hot:1380,
		        		desc:"信用贷、车贷车贷车贷车贷",
		        		href:"",
		        		icon:require("@/assets/images/yp_icon.png")
		        	},
		        	{
		        		src:require("@/assets/images/jl03.png"),
		        		name:"陈经理",
		        		hot:1000,
		        		desc:"信用贷、车贷车贷车贷车贷",
		        		href:"",
		        		icon:require("@/assets/images/tp_icon.png")
		        	}
		        ],
		        rm:[
		        	{
		        		head_img:require("@/assets/images/jl04.png"),
		        		nickname:"陈经理",
		        		click:4320,
		        		pro_type:"信用贷、抵押贷、车贷",
		        		href:"",
		        		time:"3-6个月",
		        		pro_money:"1000~30000",
		        		icon:require("@/assets/images/jp_icon.png")
		        	},
		        	{
		        		head_img:require("@/assets/images/jl05.png"),
		        		nickname:"周经理",
		        		click:3600,
		        		pro_type:"信用贷、抵押贷",
		        		href:"",
		        		time:"3-6个月",
		        		pro_money:"3000~50000",
		        		icon:require("@/assets/images/jp_icon.png")
		        	},
		        	{
		        		head_img:require("@/assets/images/jl06.png"),
		        		nickname:"舒经理",
		        		click:2800,
		        		pro_type:"信用贷、车贷",
		        		href:"",
		        		time:"3-6个月",
		        		pro_money:"5000~20000",
		        		icon:require("@/assets/images/jp_icon.png")
		        	},
		        	{
		        		head_img:require("@/assets/images/jl01.png"),
		        		nickname:"陈经理",
		        		click:4320,
		        		pro_type:"信用贷、抵押贷、车贷",
		        		href:"",
		        		time:"3-6个月",
		        		pro_money:"1000~30000",
		        		icon:require("@/assets/images/jp_icon.png")
		        	}
		        ],
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

			}
		},
		created(){
            //banner
            this.$axios.post("/api/Ad/get_banner","data="+JSON.stringify({position_type:"TOPBANNER,INDEXAD"}))
            .then((results) => {
                if(results.code==200){
					this.banners = results.data.TOPBANNER;
					this.tab_banners = results.data.INDEXAD;
                }
            })

            //每周十大排行
            this.$axios.post("/api/Lenders/get_start_lenders")
            .then((results) => {
                if(results.code==200){
                    // (results.data.list.length>0)&&(this.rm = results.data.list);
                    // console.log(results.data)
                }else{
                }
            })

            //攻略
            this.$axios.post("/api/Article/get_article",`data=${JSON.stringify({article_type:'EASYARTICLE'})}`).then(results=>{
                if(results.code==200){
                    this.drgl = results.data.list;
                    console.log(results.data.list)
                }else{

                }
            })
			//首页活动top3
			  this.$axios.post("/api/Lenders/get_top3_lenders").then(results=>{
                if(results.code==200){
					// console.log(JSON.stringify(results))
                    // this.tj= results.data.list;
                }else{

                }
            })
        },
		mounted(){
            //公告无限滚动
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

            //头部显示背景
            const _this = this;
			document.querySelector(".main").onscroll =function(){
				var top = this.scrollTop;
				if(top>145){
					document.querySelector("#myheader").style.height = "70px";
                    document.querySelector("#myheader").className = "header head-bg"
                    _this.is_TopShow = true;
				}else{
					document.querySelector("#myheader").className = "header"
                    document.querySelector("#myheader").style.height = "0px";
                    _this.is_TopShow = false;
				}
			};

			//微头条
			this.$axios.post('/api/Article/get_article',`data=${JSON.stringify({
                            // session_id:this.users.session_id,
                            // userId:this.users.userId,
							article_type:'NEWSTOP'
                })}`).then(res=>{
					// console.log(JSON.stringify(res))
					if(res.code==200){
						this.tt=res.data.list;
						if(res.data.list){
							this.titlemore=res.data.list[0].title;
						}
						
					}
				})
	
            //banner
			this.$nextTick(() => {
				var $dragBln = true;
				$(".main_img").touchSlider({
					flexible : true,
					speed : 200,
					autoPlay:true,
					btn_prev : $("#btn_prev"),
					btn_next : $("#btn_next"),
					paging : $(".point a"),
					counter : function (e){
						$(".point a").removeClass("on").eq(e.current-1).addClass("on");//图片顺序点切换
						$(".img_font span").hide().eq(e.current-1).show();//图片文字切换
					}
				});

				$(".main_img").bind("mousedown", function() {
					$dragBln = false;
				});
				
				$(".main_img").bind("dragstart", function() {
					$dragBln = true;
				});
				
				$(".main_img a").click(function(){
					if($dragBln) {
						return false;
					}
				});

				clearInterval(_this.timer);
				_this.timer = setInterval(function(){
					$("#btn_next").click();
				}, 3000);

				if(_this.banners.length<2){
					clearInterval(this.timer);
					$(".main_img").unbind();
					$(".main_img a").unbind();
					$("#btn_next").unbind();
					$(".main_img").unbind();

				}
				$(".main_img").bind("touchstart",function(){
					clearInterval(_this.timer);
				}).bind("touchend", function(){
					_this.timer = setInterval(function(){
						$("#btn_next").click();
					}, 3000);
				});
			});
		},
		beforeDestroy(){
			$(".main_img").unbind();
			$(".main_img a").unbind();
			$("#btn_next").unbind();
			$(".main_img").unbind();
			clearInterval(this.timer);
        },
        methods:{
            article_target(_id){
                // console.log(_id)
                this.$router.push({name:'articleDetails',query:{id:_id}})
            },
            returnTop(){//返回顶部
                let top = document.querySelector(".main").scrollTop;
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
                        document.querySelector(".main").scrollTop = top;
                    },30);
                }
            },
            //立即开抢
            openGrab(){
                
            }
        },
		components:{
			iHeader,Swipe, SwipeItem,Lazyload
		}
	}
</script>

<style scoped>
	/* #index{margin-bottom: 56px;} */
	.banner{height: 220px;position: relative;z-index: 0;width: 100%;left:0;top:0;overflow:hidden;}
	.banner a{display: block;}
	.banner img,.banner a,.tab-icon div img,.tab-icon div a,.tab-gg div a,.tab-gg div img,.tt-content li a,.tab-banner a,.tab-banner img{width: 100%;height: 100%;}

	.tt-list-box{position:relative;z-index:99999;top:0;height: 20px;}
	.tt-list{height: 52px;margin-top:-20px;margin-left:15px;margin-right:15px;box-shadow: 0 1px 3px #eee;overflow:hidden;}
	.tt_icon img{width: 60px;height: 25px;margin: 14px 10px;}
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
	.tj-title div:nth-child(2){-webkit-box-flex: 2;-webkit-flex:2;flex:2;margin-top: -3px;padding-left: 10px;font-size: 14px;}
	.tj-title div:nth-child(2) span{display: inline-block;border:1px solid #ddd;height: 25px;line-height: 25px;padding:0 1px;border-radius: 3px;}
	.tj-title div:last-child{margin-top: -5px;}
	.tj-title div:last-child button{font-size: 12px;border:none;height: 30px;line-height: 32px;padding:0 10px;}
	.tj-manager-list{margin-left: -10px;}
	.tj-manager-list li{margin-left: 10px;-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;overflow:hidden;text-align: center;}
	.tj-head{margin: 15px 0;border-radius: 50%;width:90px;height:90px;border-radius: 50%;}
	.tj-head img{width: 90px;height: 90px;border-radius: 50%}
	.tj-name{font-size: 16px;font-weight: 400;}
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

	@media screen and (max-width: 320px){
		.tab-gg div{height: 65px;}
		.tab-banner{height: 82px;}
	}
    
    
    .icon-fanhuidingbu{position:fixed;bottom:80px;right:15px;font-size:30px;z-index:99;color:rgba(0,0,0,.6);}
</style>

<style>
	.banner .point{bottom:30px;position: absolute;left:0;z-index: 9999;text-align: center;width: 100%;margin:0;}
	.banner .point a{width: 8px;height: 8px;margin:0 3px;border-radius: 50%;display: inline-block;background: #fff;opacity: 1;float:none;text-indent: 0;}
	.banner .point a.on{background: #ffbe00;}
	
	.tab-banner .mint-swipe-indicators{bottom:5px;}
	.tab-banner .mint-swipe-indicators .mint-swipe-indicator{background: #e2e2e2;opacity: 1;}
	.tab-banner .mint-swipe-indicators .is-active{background: #c6c6c6;}
	#notice li{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
</style>