<template>
	<div id="imazamox" class="wrap bg-f0">
		<x-header :left-options="{backText:''}" :class='bg'>我的金豆</x-header>
		<div class="content">
			<div class="top-content">
				<img :src="top.src" class="bg" alt="">
				<div class="head-content">
					<div class="count">{{venosa||0}}<span>.00</span></div>
					<div class="jindou">我的金豆<a href="javascript:void(0)" class="btn mui-pull-right duihuan" @click="alertmsg()">兑换</a></div>
						<div class="alert" v-show="alert">
							<div class="alert-content"><div class="top-list">
								<i><svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-jinbi"></use>
								</svg></i>	当前金币:<span>{{golddetail}}</span>
								</div>
								<div class="input">
								<label for="">兑换金豆数量</label><input type="text" v-model="count" v-focus="focusState" @blur="focusState = false"></div>
								<div class="add">实际支付金币:  {{count/100}}</div>
								<div class="foot"><a href="#" class="left" @click="hidealert">取消</a><a href="#" class="right" @click="hideconfirm">兑换</a></div>
							</div>	
						</div>
				</div>
			</div>
			<ul class="mui-table-view  table-view-one">
				<li class="history"><i class="iconfont icon-shuxian"></i>账户记录</li>
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in res.list" :key="index">
					<a href="javascript:;">
						<span class="mui-media-object mui-pull-right" >{{item.money|tosecend}}</span>
						<div class="mui-media-body">
							{{item.remark}}
							<p class="mui-ellipsis">{{moment.unix(item.create_time).format('YYYY-MM-DD hh:mm:ss') }}</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui'
	import {XHeader} from 'vux'
	export default {
		name:"my",
		data(){
			return {
				users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
				is_r:true,
				focusState:false,
				count:0,
				title:"我的金豆",
				venosa:'',
				alert:false,
				res:[],		 	
				scrolled: false,
				bg:"transparent",
				is_TopShow:false,
				top:{src:require('@/assets/images/my/imaza.png'),
				tel:require('@/assets/images/my/icon_03.png'),
				list:require('@/assets/images/my/icon_07.png'),
				list2:require('@/assets/images/my/icon_10.png')},
				icon:[{src:require('@/assets/images/my/icon_13.png'),card:"我的银行卡",num:"10张",href:"my/my-bank"},{src:require('@/assets/images/my/icon_15.png'),card:"我的积分",num:100,href:""},{src:require('@/assets/images/my/icon_19.png'),card:"我的收藏",num:0,href:""},{src:require('@/assets/images/my/icon_20.png'),card:"我的帖子",num:120,href:""}],
				list:[{src:require('@/assets/images/my/icon_23.png'),card:"刷卡记录",num:"10张",href:"my/swipe-card/swipe-card-record"},{src:require('@/assets/images/my/icon_25.png'),card:"信贷中心",num:100,href:"/my/my-product"},{src:require('@/assets/images/my/icon_27.png'),card:"投诉中心",num:0,href:""},{src:require('@/assets/images/my/icon_30.png'),card:"帮助中心",num:120,href:"/my/help-center"},{src:require('@/assets/images/my/icon_32.png'),card:"设置",num:120,href:"/my/set"}],
				fourth:{src:require('@/assets/images/my/loan.png')},
				fiveth:[{src:require('@/assets/images/my/loan3.png')},{src:require('@/assets/images/my/loan2.png')}],
				content:[{cash:"+200",account:"账户充值",time:"2017-05-15 18:20"},{cash:"+200",account:"推荐好友注册",time:"2017-05-15 18:20"},{cash:"+200",account:"账户充值",time:"2017-05-15 18:20"},{cash:"+200",account:"账户充值",time:"2017-05-15 18:20"},{cash:"+200",account:"推荐好友注册",time:"2017-05-15 18:20"},{cash:"+200",account:"账户充值",time:"2017-05-15 18:20"}],
				golddetail:0,
			}
		},
		components:{
			XHeader
		},
		methods:{
			alertmsg:function(){
				this.alert=true;
				this.focusState=true;
			},
			hidealert:function(){
				this.alert=false;
			},
			hideconfirm(){
							this.alert=false;
							if(Number(this.count)=='NaN'){
								Toast("请输入数字");
								return false;
							}
							this.$axios.post('/api/Lenders/inc_gold_venosa',`data=${JSON.stringify({
								session_id:this.users.session_id,
								userId:this.users.userId,
								venosa_num:this.count
							})}`).then(
							res=> {if(res.code==200){
									if(this.golddetail-(this.count)/100<0){
										Toast('您的金币不够');
										return false;
									}
									// this.golddetail=this.golddetail-3*(this.count);
									this.getdata();
									Toast('兑换成功');
								}else{
									Toast(res.msg);
								}
							})
			},
			handleScroll () {
				this.scrolled = window.scrollY;
				if(this.scrolled >35){
                    this.bg = '';
				}else{this.bg = 'transparent';}
			},
			getdata(){
					this.$axios.post('/api/Lenders/venosa_list',`data=${JSON.stringify({
										session_id:this.users.session_id,
										userId:this.users.userId
									})}`).then(
									res=> {if(res.code==200){
										console.log(res)
										this.res=res.data
										this.venosa=res.data.venosa;
										}});
			},
			getlist(){
					this.$axios.post('/api/Lenders/gold_list',`data=${JSON.stringify({
								session_id:this.users.session_id,
								userId:this.users.userId
							})}`).then(
							res=> {if(res.code==200){
								this.golddetail=res.data.gold;
								}
								});
			},
		},
		mounted(){
				this.getdata();
				this.getlist();
				window.addEventListener('scroll', this.handleScroll);	
		},
		filters:{
			tosecend:function (value) {
				if( Number(value)>=0){
				return "+"+Number(value).toFixed(2);
				}else{
				return "-"+Number(value).toFixed(2);
				}
			},
		},
		directives: {
			focus: {
				inserted: function (value) {
					if (value) {
					value.focus();
					}
				}
			}
		},
		
	}
</script>

<style scoped lang="less">
.table-view-two:before,.table-view-two:after,.table-view-one:after,.table-view-one:before,.content-top:after,#loan .content-top:before,.table-view-three:before,.table-view-four:before{background:transparent;}
#imazamox{background: #f0f0f0;}
.wrap{height:100vh;}
.top-content{height:196px;overflow: hidden;position:relative;margin-top:-67px;
img{width:100%;min-height: 196px;}
	.head-content{position:absolute;width:100%;height: 196px;left: 0;top: 0;padding:89px 15px 0;
		.count{margin-bottom:6px;font-size:32px;line-height:32px;height:32px;color:#fff;span{font-size:16px;}}
		.jindou{color:#fff;.duihuan{position: relative;top: -11px;width:85px;height:32px;background:#fff;border-radius:4px;line-height: 32px;font-size:16px;color:#469dc8;text-align:center;}}}}
.table-view-one{
	li{.mui-media-object{color:#469dc8;}}	
	li.history{border-bottom:1px solid #dddddd;height:50px;line-height: 50px;font-size:16px;padding-left:12px;
	.iconfont{font-size: 19px;color:#469dc8;position: relative;top: 2px;}}
} 
#imazamox .mui-table-view-cell{padding:15px !important;}
#imazamox .mint-msgbox-message {
	label{position:absolute;left:5px;}
	input{padding-left: 70%;padding-bottom: 0;padding-top: 0;text-align: right;}
}
.alert{background:rgba(0,0,0,.4);position: fixed;left:0;right:0;top:0;bottom:0;z-index:99999999;
.alert-content{position:relative;width:88%;height:235px;margin:0 auto;background:#fff;margin-top:180px;border-radius:5px;padding: 28px 22px 0;
.top-list{color:#b8b8b8;span{color:#ffd171;margin-left: 10px;}i{position:relative;top:3px;.icon{height: 24px;width:24px;display:inline-block;}}}
.input{width:100%;height:50px;margin-top:18px;color:#c1c1c1;label{position:absolute;padding-left:12px;line-height: 50px;}input{height:100%;text-align: right;color:#333;}}
.add{text-align:right;font-size:14px;line-height: 55px;color:#9d9d9d;}
.foot{overflow:hidden;width:100%;position:absolute;bottom: 0;height:55px;left: 0;right:0;.left,.right{display:inline-block;color:#9d9d9d;text-align:center;width:50%;font-size: 17px;line-height: 55px;}.left{border-top:1px solid #c1c1c1;}.right{color:#fff;background:#469dc8;border-top:1px solid #469dc8;border-radius:0 0 5px 0;}}}}
.icon {width: 1em; height: 1em;vertical-align: -0.15em;fill: currentColor;overflow: hidden;}
.mui-table-view .mui-media-object{max-width: 70px;}
.content{top:0;}

</style>
<style>
#imazamox .mint-msgbox-title{text-align: left;}
.transparent{background:transparent !important}
</style>
