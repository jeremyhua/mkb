<template>
	<div id="mystar" class="wrap bg-f0">
		<i-header :title="title" :is_r="arrow"></i-header>
		<div class="main">
			<ul class="main-content-top clearfix">
				<li  @click="tabBtnClick('sq_content')" :class="active=='sq_content'?('active'):('')">我的消息</li>
				<li  @click="tabBtnClick('sh_content')" :class="active=='sh_content'?('active'):('')">我的评论</li>
			</ul>
			<mt-tab-container v-model="active" :swipeable="true" >
				<mt-tab-container-item id="sq_content">
					<div class="mui-content">
						<ul class="rm-eanking-list">
							<li v-for="(item,index) in msgdata" :key="++index" class=" jinli">
								<router-link :to="{path:'/my/my-post-detail',query:{id:item.post_id}}">
								<div class='wrap-contain'>
									<div class="tj-head">
                                        <img :src="imgUrl+item.head_img" alt="" >
                                        <div class="name"><a href="javascript:void(0);">{{item.nickname}}</a></div>
                                        <div class="moneypay">{{item.apply}}</div>
										<div class="time">{{moment(item.create_time*1000).locale('zh-cn').startOf().fromNow()}}</div>
                                        <span class='good' v-if="item.images"><img :src="imgUrl+item.images" alt="" srcset=""></span>   
                                        <span class='goods' v-if="!item.images">{{item.content}}</span>   
                                    </div>
								</div>
								</router-link>
							</li>
						</ul>
					</div>	
				</mt-tab-container-item>
				<mt-tab-container-item id="sh_content">
					<div class="mui-content">
						<ul class="rm-eanking-list">
							<li v-for="(item,index) in commondata" :key="index" class=" jinli">
								<router-link :to="{path:'/my/my-post-detail',query:{id:item.post_id}}">
								<div class='wrap-contain'>
									<div class="tj-head tj-common">
                                        <span class='common' v-if="item.images"><img :src="imgUrl+item.images" alt="" srcset=""></span>   
                                        <span class='commons' v-if="!item.images">{{item.content}}</span> 
                                        <div class="name" v-if="item.nickname">回复<a href="javascript:void(0);">{{item.nickname}}</a></div>
                                        <div class="moneypay">{{item.apply}}</div>
										<div class="time">{{moment(item.create_time*1000).locale('zh-cn').startOf().fromNow()}}</div>
                                    </div>
								</div>
								</router-link>
							</li>
						</ul>
					</div>	
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
				<div class="alert" v-show="alert">
						<div class="alert-content">
							<div class="top-list">
							等级介绍<br><span>最专业的服务,最贴心的态度</span>
							</div>
							<div class="content">
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
import iHeader from "@/components/header/header-r.vue";
import { TabContainer, TabContainerItem } from "mint-ui";
import "@/assets/css/main.css";

export default {
  name: "mystars",
  data() {
    return {
 		users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
      msg: "这个是信用贷页面",       
	  title: "我的消息",
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
		msgdata:'',
		commondata:'',
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
	},changeSelect(){
		
	}
  },
  components: {
    iHeader,
    TabContainer,
    TabContainerItem
  },
  created(){
	//   个人产品
	  this.$axios.post('/api/Post/my_post_apply',`data=${JSON.stringify({
		    session_id:this.users.session_id,
                userId:this.users.userId,
	  })}`).then((res)=>{
		  console.log(res)
		  if(res.code==200){
			  this.msgdata=res.data;
			//   this.gr=res.data.list
		  }
	  }).catch((err)=>{throw err});
	//   热门产品
	  this.$axios.post('/api/Post/my_post_comment',`data=${JSON.stringify({
		 session_id:this.users.session_id,
                userId:this.users.userId,
	  })}`).then((res)=>{
		//   console.log(res)
		  if(res.code==200){
			  this.commondata=res.data;
		  }
	  }).catch((err)=>{throw err});


  },mounted(){
	//  Vue.nextTick()
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
.wrap{padding-top:70px;}
// .fl{float:left;}
	#mystar{.h(100%)}
	.main{position: relative;
			ul.main-content-top{position:fixed;left: 0;top: 70px;z-index: 10;}
	}
	.main-content-top{
		.w(100%);.p(0 2%);.bg(#fff);
		li{.fl(@l);.w(50%);text-align: center;padding: 10px 0;color:@gray;}
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
	.rm-eanking-list li{margin-left: 15px;border-bottom: 1px solid #eee;padding:8px;padding-right: 15px;}
	.rm-eanking-list li:last-child,.drgl-list li:last-child{border:none;}
	.rm-eanking-list li div:last-child{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;}
	.rm-eanking-list li>a{width:100%; display: flex;}
	.rm-eanking-list li>a div:last-child{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;}
	.rm-eanking-list p{margin-bottom: 0;}
	.rm-eanking-list .tj-name{margin:15px 0;margin-top: 18px;}
	.rm-eanking-list  .tj-head{margin:0;margin-top:5px;}
	.rm-money{font-size:25px;padding-top: 15px;}
	.rm-eanking-list li div:last-child .rm-paiming{width: 30px;text-align: center;position: relative;height: 22px;margin:0 auto;}
	.rm-paiming i{font-size: 30px;}
	.rm-paiming i span{font-size: 12px;color: #fff;position: absolute;left:0;top:0;right:0;padding-top: 4px;}
	.tj-head{padding-left:58px;line-height: 18px;position: relative; color:#5d5b5b;font-size:15px;}
	.tj-head .moneypay{min-height:18px;}
	.tj-common .moneypay{background: #f0f0f0;padding: 6px;}
	.tj-head .time{height:18px;}
    .tj-head img{width:53px;height:53px;position: absolute;left:-5px;top:0;}
	.tj-head .good{position:absolute;top:50%;transform: translate3d(0,-50%,0);width: 60px;height: 53px;display: block;right: 0;}
	.tj-head .goods{position:absolute;top:50%;transform: translate3d(0,-50%,0);width: 66px;height:66px;display: block;right: 0;
	font-size: 12px;line-height: 15px;overflow:hidden;background: #f0f0f0;padding:6px 3px 0;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;}
	.tj-head .common{position:absolute;top:50%;transform: translate3d(0,-50%,0);width: 60px;height: 53px;display: block;left: 0;}
	.tj-head .commons{position:absolute;top:50%;transform: translate3d(0,-50%,0);width: 66px;height:66px;display: block;left: 0;
	font-size: 12px;line-height: 15px;overflow:hidden;background: #f0f0f0;padding:6px 3px 0;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;}
	.tj-head .good img{left:5px;}
    .name{color:#333;}
    .wrap-contain{width:100%;height:100%;}
    .wrap-contain .tj-desc{line-height: 29px;color:#5d5b5b;font-size:15px;}
    .wrap-contain .tj-desc span.fl{width:50%;display:inline-block;}
    .rm-eanking-list p.one-1{margin-top:10px}
    .rm-eanking-list p.one-2{margin-bottom:10px}
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
	.mui-table-cell p{font-size: 11px;}
	.tj-name img{margin-left: 8px;}
	.time{font-size:12px;margin-top:5px;}
	.tj-head{padding-right: 70px;}
	.jinli{min-height: 72px;}
	.tj-common{padding-right:0;}
</style>