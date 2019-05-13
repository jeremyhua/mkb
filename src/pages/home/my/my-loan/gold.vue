<template>
	<div id="gold" class="wrap bg-f0">
		<x-header :left-options='{backText:""}' :class='bg'>我的金币</x-header>
		<div class="content">
			<div class="top-content">
				<img :src="top.src" class="bg" alt="">
				<div class="head-content">
					<div class="count">{{golddetail||0}}.<span>00</span></div>
					<div class="jindou">可用金币(¥)<a href="javascript:void(0)" class="btn mui-pull-right duihuan" @click="alertmsg()">购买</a></div>
				</div>
			</div>
			<ul class="mui-table-view  table-view-one">
				<li class="history"><i class="iconfont icon-shuxian"></i>账户记录</li>
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in res" :key="index">
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
			<div class="alert" v-show="alert">
							<div class="alert-content"><div class="top-list">
								<i><svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-jinbi"></use>
								</svg></i>	
								当前金币:<span>{{golddetail}}</span>
								</div>
								<div class="input">
								 <group>   	 <x-input title="购买金币数量" v-model="count" :required="true"  type="number"></x-input>
								 </group>
								<!-- <label for="">购买金币数量</label><input type="text" v-model="count" autofocus='autofocus'  v-focus  @blur="focusState = false"> --></div>
								<div class="add">实际支付金额:￥ {{count}}</div>
								<div class="foot"><a href="#" class="left" @click="hidealert">取消</a><a href="#" class="right" @click="hideconfirm">购买</a></div>
							</div>	
			</div>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	import {mapGetters} from 'vuex'
	import {XHeader,XInput,Group} from 'vux'
	export default {
		name:"my",
		data(){
			return {
				users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
				is_r:true,alert:false,focusState:false,
				title:"我的金币",
				gold:'',
				golddetail:'',
				bgfff:"background:transparent",
				res:'',
				count:0,
				scrolled: false,
				bg:"transparent",
				goldnum:'',
				top:{src:require('@/assets/images/my/gold.png')},
				icon:[{src:require('@/assets/images/my/icon_13.png'),card:"我的银行卡",num:"10张",href:"my/my-bank"},{src:require('@/assets/images/my/icon_15.png'),card:"我的积分",num:100,href:""},{src:require('@/assets/images/my/icon_19.png'),card:"我的收藏",num:0,href:""},{src:require('@/assets/images/my/icon_20.png'),card:"我的帖子",num:120,href:""}],
				fourth:{src:require('@/assets/images/my/loan.png')},
				fiveth:[{src:require('@/assets/images/my/loan3.png')},{src:require('@/assets/images/my/loan2.png')}],
				content:[{cash:"+200",account:"账户充值",time:"2017-05-15 18:20"},{cash:"+200",account:"推荐好友注册",time:"2017-05-15 18:20"},{cash:"+200",account:"账户充值",time:"2017-05-15 18:20"},{cash:"+200",account:"账户充值",time:"2017-05-15 18:20"},{cash:"+200",account:"推荐好友注册",time:"2017-05-15 18:20"},{cash:"+200",account:"账户充值",time:"2017-05-15 18:20"}]
			}
		},	  
		mounted(){
			this.gold=this.$route.query.num||0;
			this.getlist();
			window.addEventListener('scroll', this.handleScroll);	
		},
		components:{
			XHeader,XInput,Group
		},methods:{
			alertmsg:function(){
				/* $('.mint-msgbox-message input').focus();
				MessageBox({
				title: '当前金币:'+this.golddetail+'',
				message: '<label>兑换金豆数量</label><input type="text" placeholder="" v-model="goldnum" v-focus="focusStatus">',
				showCancelButton: true
				}).then(action  => {
							var val=$('.mint-msgbox-message input').val();
							console.log(Number(val))
							if(Number(val)=='NaN'){
								Toast("请输入数字");
								return false;
							}
							this.$axios.post('/api/Lenders/inc_gold_venosa',`data=${JSON.stringify({
								session_id:this.users.session_id,
								userId:this.users.userId,
								venosa_num:val
							})}`).then(
							res=> {if(res.code==200){
									if(this.golddetail-3*val<0){
										Toast('您的金币不够');
										return false;
									}
									this.golddetail=this.golddetail-3*val;
									this.getlist();
								}
							})
				}); */
				this.alert=true;
				this.focusState=true;
			},
			hidealert:function(){
				this.alert=false;
			},
			handleScroll () {
				this.scrolled = window.scrollY;
				if(this.scrolled >35){
                    this.bg = '';
				}else{this.bg = 'transparent';}
			},
			hideconfirm(){
				this.alert=false;
							if(Number(this.count)=='NaN'){
								Toast("请输入数字");
								return false;
							}
							this.$axios.post('/api/Lenders/gold_recharge',`data=${JSON.stringify({
								session_id:this.users.session_id,
								userId:this.users.userId,
								gold_num:this.count
							})}`).then(
							res=> {if(res.code==1){
								Toast(res.msg)
								this.$router.push({path:'/kbb/payGold',query:{linkto:res.order_id}});
									// if(this.golddetail-(this.count)<0){
										// Toast('您的金币不够');
										// return false;
									// }
									// this.golddetail=this.golddetail-3*(this.count);
									// this.getdata();
									// Toast('兑换成功');
								}else{
									Toast(res.msg)
								}
							})
			},
			getlist(){
						this.$axios.post('/api/Lenders/gold_list',`data=${JSON.stringify({
									session_id:this.users.session_id,
									userId:this.users.userId
								})}`).then(
								res=> {if(res.code==200){
									this.res=res.data.list;
									this.golddetail=res.data.gold;
									}
									});
			},
		},
		filters:{
			tosecend:function (value) {
				return Number(value).toFixed(2);
			}
		},
		watch:{
			goldnum:function(old,n){
				console.log(old,n)
			},
			
		},
		directives: {
			focus: {
				inserted: function (el) {
					// if (value) {
						el.focus();
					// }
						}
			}
		},
		computed: {
			// count: function () {
			// return  parseInt(this.count)
			// }
  		}

	}
</script>

<style scoped lang="less">
.table-view-two:before,.table-view-two:after,.table-view-one:after,.table-view-one:before,.content-top:after,#loan .content-top:before,.table-view-three:before,.table-view-four:before{background:transparent;}
#gold{background: #f0f0f0;}
.wrap{height:100vh;}
.top-content{height:196px;overflow: hidden;position:relative;
img{width:100%;min-height: 196px;}
	.head-content{position:absolute;width:100%;height: 196px;left: 0;top: 0;padding:89px 15px 0;
		.count{margin-bottom:6px;font-size:32px;line-height:32px;height:32px;color:#fff;span{font-size:16px;}}
		.jindou{color:#fff;.duihuan{position: relative;top: -11px;width:85px;height:32px;background:#fff;border-radius:4px;line-height: 32px;font-size:16px;color:#469dc8;text-align:center;}}}}
.table-view-one{
	li{.mui-media-object{color:#469dc8;}}	
	li.history{border-bottom:1px solid #dddddd;height:50px;line-height: 50px;font-size:16px;padding-left:12px;
	.iconfont{font-size: 19px;color:#469dc8;position: relative;top: 2px;}}
} 
#gold .mui-table-view-cell{padding:15px !important;}
.mui-table-view .mui-media-object{max-width: 70px;}

.alert{background:rgba(0,0,0,.4);position: fixed;left:0;right:0;top:0;bottom:0;z-index:99999999;
.alert-content{position:relative;width:88%;height:235px;margin:0 auto;background:#fff;margin-top:180px;border-radius:5px;padding: 28px 22px 0;
.top-list{color:#b8b8b8;span{color:#ffd171;margin-left: 10px;}i{position:relative;top:3px;.icon{height: 24px;width:24px;display:inline-block;}}}
.input{width:100%;height:50px;margin-top:18px;color:#c1c1c1;label{position:absolute;padding-left:12px;line-height: 50px;}input{height:100%;text-align: right;color:#333;}}
.add{text-align:right;font-size:14px;line-height: 55px;color:#9d9d9d;}
.foot{overflow:hidden;width:100%;position:absolute;bottom: 0;height:55px;left: 0;right:0;.left,.right{display:inline-block;color:#9d9d9d;text-align:center;width:50%;font-size: 17px;line-height: 55px;}.left{border-top:1px solid #c1c1c1;}.right{color:#fff;background:#469dc8;border-top:1px solid #469dc8;border-radius:0 0 5px 0;}}}}
.icon {width: 1em; height: 1em;vertical-align: -0.15em;fill: currentColor;overflow: hidden;}
#gold{margin-top: -67px;}
</style>
<style lang="less">
.mint-msgbox-content .mint-msgbox-message {
	label{position:absolute;left:25px;}
	input{padding-left: 70%;padding-bottom: 0;padding-top: 0;text-align: right;}
}
#gold input[type=number]{border:none;text-align:right;}

</style>
