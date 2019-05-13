<template>
	<div id="mystar" class="wrap bg-f0">
		<!-- <i-header :title="title" :is_r="arrow"></i-header> -->
		<x-header :left-options="{backText: ''}">我的收藏</x-header>
		<div class="mainstar">
			<ul class="main-content-top clearfix">
				<li  @click="tabBtnClick('sq_content')" :class="active=='sq_content'?('active'):('')">信贷公司</li>
				<li  @click="tabBtnClick('sh_content')" :class="active=='sh_content'?('active'):('')">信贷个人</li>
				<li  @click="tabBtnClick('all_content')" :class="active=='all_content'?('active'):('')">帖子</li>
			</ul>
		
			<mt-tab-container v-model="active" :swipeable="true" >
				<mt-tab-container-item id="sq_content">
					<div class="mui-content">
					<!-- 	<ul class="rm-eanking-list">
							<li v-for="(item,index) in gr" :key="++index" class=" jinli">
								<router-link :to="{path:'/credit/person-detail',query:{id:item.id}}">
								<div class='wrap-contain'>
									<div class="tj-head">
                                        <img :src="imgUrl+item.pro_img" alt="" >
                                        <div class="name">{{item.nickname}}</div>
                                        <div class="moneypay">可贷额度{{item.pro_money}}</div>
                                        <span class='good'>好评率</span>   
                                    </div>
                                    <div class="tj-content">
									    <p class="tj-desc one-1 c-888">*{{item.pro_type}}</p>
									    <p class="tj-desc one-2 c-888"> <span class='fl'>放贷区域:{{item.id}}</span><span class='fl'> 贷款期限：{{item.pro_time}}</span></p>
                                          <span class='iconfont icon-youjiantou'></span>                                  
                                    </div>
								</div>
								</router-link>
							</li>
						</ul> -->
					</div>	
				</mt-tab-container-item>
				<mt-tab-container-item id="sh_content">
					<!-- <div class="mui-content"> -->
						<ul class="rm-eanking-list">
							<li v-for="(item,index) in items" :key="++index" class=" jinli">
								<div class='wrap-contain'>
									<div class="tj-head">	
										<router-link :to="{path:'/credit/person-detail',query:{id:item.obj_id}}" tag="div">
                                        <img :src="imgUrl+item.detail.head_img" alt="" >
                                        <div class="name">{{item.detail.nickname}}</div>
                                        <div class="moneypay">*{{item.detail.pro_type}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   可贷额度{{item.detail.pro_money}}  </div>
																				 <p class="tj-desc one-1 c-888"></p>
                                        <!-- <span class='good'>好评率</span>    -->
										</router-link>    				  
                  </div>
				<p class="tj-desc one-2 c-888 clearfix"> <span class='fl'>*放贷区域:{{item.detail.area}}</span><span class='fl'> 贷款期限：{{item.detail.pro_time}}</span></p>
                                        
								                           
                               
								</div>
							</li>
						</ul>
					<!-- </div>	 -->
				</mt-tab-container-item>
				<mt-tab-container-item id="all_content">
					
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
				<div class="alert" v-show="alert">
						<div class="alert-content">
							<div class="top-list">
							等级介绍<br><span>最专业的服务,最贴心的态度</span>
							</div>
							<div class="content">
	x
								<ul class="mui-table-view">
									<li class=" mui-media" v-for="(item,index) in alertimg" :key="index" @click="hidemsg">
									<img :src="item.src" alt="">
									<div class="list-con mui-ellipsis">{{item.icon}}</div>
									</li>
								</ul>
							</div>
						</div>	
					</div>
	</div>
</template>

<script>
import { TabContainer, TabContainerItem } from "mint-ui"
import {XHeader} from 'vux'
import "@/assets/css/main.css"

let count=1;
export default {
	name: "mystar",
	components: {
    XHeader,
    TabContainer,
		TabContainerItem,
  },
  data() {
    return {
		users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
      msg: "这个是信用贷页面",
	  // title: "我的收藏",
	  gr:[],
	  arrow:true,
	  alert:false,
      active: "sq_content",
	  alertimg:[{src:require("@/assets/images/my/alert-icon3.png"),icon:"态度热情，专业能力很强，细致耐心。"},{src:require("@/assets/images/my/alert-icon2.png"),icon:"专业能力极强，客户一致好评，值得信赖。"},{src:require("@/assets/images/my/alert-icon1.png"),icon:"最靠谱最贴心的伙伴，好评如潮，值得亲睐。"}],
		cityselected:0,  
		cities: [ ],
		timeselected:0,
		times:[]  ,	
		moneyselected:0,	
		moneys:[],
		 scrollbarObj: {
          fade: true
        },
        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
        pullDownRefreshObj: {
          threshold: 90,
          stop: 40
        },
        // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        },
        startY: 0,  // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
        items: [],
    };
  },
  methods: {
    tabBtnClick(type) {
      this.active = type;
    },
	hidemsg:function(){
		this.alert=false;
	},
	alertmsg(ev){
		ev=ev||window.event;
		ev.preventDefault();
		this.alert=true;
	}, // 滚动到页面顶部
      scrollTo () {
        this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
      },
      getData () {// 模拟数据请求
        return new Promise(resolve => {
		var _this=this;
          setTimeout(() => {
            var getarr = [];
				_this.$axios.post('/api/Usercenter/my_collect',`data=${JSON.stringify({
					session_id:this.users.session_id,
					userId:this.users.userId,
					type:'product'
				})}`).then((res)=>{
					// console.log(JSON.stringify(res));
					if(res.code==200){
						getarr=res.data.list;
						 resolve(getarr)
					}
				}).catch((err)=>{throw err});
           
          }, 1000)
        })
      },
      onPullingDown () {
		// 模拟下拉刷新
		var _this=this;
        // console.log('下拉刷新')
        count = 0;
        this.getData().then(res => {
		  // console.log(res)
		  _this.items = res;
		   
        })
      },
      onPullingUp () {
        // 模拟上拉 加载更多数据
        // console.log('上拉加载')
        this.getData().then(res => {
          this.items = this.items.concat(res)
          if(count<50){
          }else{
          }
        })
      },
  },

  created(){
	//   个人产品
	//   this.$axios.post('/api/Usercenter/my_collect',`data=${JSON.stringify({
    //       session_id:this.users.session_id,
    //       userId:this.users.userId,
    //       type:'product'
	//   })}`).then((res)=>{
	// 	  console.log(JSON.stringify(res));
	// 	  if(res.code==200){
	// 		  this.gr=res.data.list
	// 	  }
	//   }).catch((err)=>{throw err});

  },mounted(){
	//  Vue.nextTick()
	// console.log(this.items);
	 this.onPullingDown();
  },beforeCreate(){
	  	
  }
};
</script>

<style scoped lang="less">
.mui-table-view:after{background:transparent;}
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
// .wrap{}
// .fl{float:left;}
	#mystar{.h(100%);width:100%;}
	.mainstar{padding-top:0;
		// position:fixed;background:#469dc8;min-height: 50px;top:70px;width:100%;overflow-y: auto;
			// ul.main-content-top{position:fixed;left: 0;top: 70px;z-index: 10;}
	}
	.main-content-top{
		    position: fixed;top: 70px;z-index:10;
		.w(100%);.p(0 2%);.bg(#fff);  
		li{.fl(@l);.w(33.33%);text-align: center;padding: 10px 0;color:@gray;}
		li.active{color: #469dc8;border-bottom: 2px solid @ora;}
	}
	.mui-media-body{position: relative;
		i.iconfont{position: absolute;top:50%;right: 0;transform:translateY(-50%);font-size: 20px;color:@lit;}
	}
	.mint-tab-container{padding-top:0px;}
	.mui-table-view-cell{padding-top:20px;}
	.select-choice{width: 100%;border-top: 1px solid @lit;position: fixed;top: 113px;z-index: 10;height: 53px;padding: 0 15px 0 0;
    background: #fff;li{position: relative;width:25%;float:left;.mt(-1px);select{padding: 14px 15px 14px 0; direction: rtl;}select option {direction: ltr;}i{position: absolute;right:0px;top:15px;font-size: 12px;
    color: #999;}
		}
	}
	.mui-table{.p(10px 0);
				.mui-table-cell{h4{.fz(18px);.lh(30px);.c(@ora);.fw(400)}h5{.fz(17px);.lh(30px);.c(@ora)}button{border-radius: 30px;.p(7px 20px);
						   /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#6fc6f1+0,469dc8+100,469dc8+100,2989d8+100,469dc8+100 */
						background: #6fc6f1; /* Old browsers */
						background: -moz-linear-gradient(left,  #6fc6f1 0%, #469dc8 100%, #469dc8 100%, #2989d8 100%, #469dc8 100%); /* FF3.6-15 */
						background: -webkit-linear-gradient(left,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
						background: linear-gradient(to right,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
						filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6fc6f1', endColorstr='#469dc8',GradientType=1 ); /* IE6-9 */
						}
					} 
	}
	.mui-content > .mui-table-view:first-child{margin-top: 57px;}
	//热门
	.rm-eanking{padding-top:15px;}
	.rm-eanking-list{.bg(#fff); margin-top: 57px;}
	.rm-eanking-list li{margin-left: 15px;border-bottom: 1px solid #eee;padding:0;padding-right: 15px;padding-top: 10px;height: 100px;}
	.rm-eanking-list li:last-child,.drgl-list li:last-child{border:none;}
	.rm-eanking-list li div:last-child{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;}
	.rm-eanking-list li>a{width:100%; display: flex;}
	.rm-eanking-list li>a div:last-child{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;}
	.rm-eanking-list p{margin-bottom: 0;}
	.rm-eanking-list .tj-name{margin:15px 0;margin-top: 18px;}
	.rm-eanking-list  .tj-head{margin:0;}
	.rm-money{font-size:25px;padding-top: 15px;}
	.rm-eanking-list li div:last-child .rm-paiming{width: 30px;text-align: center;position: relative;height: 22px;margin:0 auto;}
	.rm-paiming i{font-size: 30px;}
	.rm-paiming i span{font-size: 12px;color: #fff;position: absolute;left:0;top:0;right:0;padding-top: 4px;}
	.tj-head{padding-left:58px;line-height: 25px;height: 50px;position: relative; color:#5d5b5b;font-size:15px;}
    .tj-head img{width:50px;height:50px;position: absolute;left:0;top:0;}
    .tj-head .good{position:absolute;right:0;top:0;}
    .name{color:#333;font-size: 18px;}
    .wrap-contain{width:100%;height:100%;}
    .wrap-contain .tj-desc{line-height: 29px;color:#5d5b5b;font-size:15px;}
    .wrap-contain .tj-desc span.fl{width:50%;display:inline-block;}
    .rm-eanking-list p.one-1{margin-top:10px}
    .rm-eanking-list p.one-2{margin:10px;height:30px;}
    .tj-content {position:relative;}
    .tj-content .icon-youjiantou{right:0;top:50%;transform: translate3d(0,-50%,0);position: absolute;color:#5d5b5b;font-size:20px;}
	.alert{background:rgba(0,0,0,.4);position: fixed;left:0;right:0;top:0;bottom:0;z-index:99999999;
	.alert-content{position: absolute;height: 405px;margin: 0 auto;background: #fff;left:32px;right:32px;top:14%;border-radius:10px;
	.top-list{height:88px;border-radius:10px 10px 0 0;padding-top:18px;font-size:21px;line-height:31px;color:#fff;text-align:center;/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#c09044+0,dab580+100 */
	background: #c09044; /* Old browsers */
	background: -moz-linear-gradient(left,  #c09044 0%, #dab580 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(left,  #c09044 0%,#dab580 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to right,  #c09044 0%,#dab580 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c09044', endColorstr='#dab580',GradientType=1 ); /* IE6-9 */
	span{font-size: 12px;line-height:20px;display: block;}}
	ul{padding: 26px 18px 0;}
	li{border: 1px solid #f0f0f0;border-radius:10px;padding: 10px 0 10px 18px;color:#b5b5b5;margin-bottom:16px;img{margin-bottom:2px;}.list-con{font-size: 10px;line-height: 20px;height: 20px;}}}}
	@media screen and (max-width:350px){
		.alert .alert-content li{padding:5px}.alert .alert-content{height:377px;}
	}
		 .jinli{position:relative;}
	 .jinli:after{position:absolute;    margin-top: -8px;right: 10px;top:50%;border-top:1px solid #666; border-right:1px solid #666;width: 15px; height: 15px;content:'';transform:rotate(45deg);
-ms-transform:rotate(45deg); 	/* IE 9 */-moz-transform:rotate(45deg); 	/* Firefox */-webkit-transform:rotate(45deg); /* Safari 和 Chrome */-o-transform:rotate(45deg); 	/* Opera */ }
	.mui-table-cell p{font-size: 11px;}
	.tj-name img{margin-left: 8px;}
</style>