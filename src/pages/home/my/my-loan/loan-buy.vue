<template>
	<div id="loanbuy" class="wrap bg-f0">
		<x-header :left-options="{'backText':''}">会员充值</x-header>
		<div class="buy-main">
			<div class="top-content">
				<img :src="top.src" class="bg" alt="" >
				<img :src="top.card" class="touxiang" alt="" >
				<div class="content-top mui-table-view ">
								<span class="photo"><img :src="imgUrl+users.head_img" alt="" height="70" ></span>
								<span class="tel">{{(users ? (users.mobile):'电话号码')|regMobile}}</span>
								<span class="huiyuan"><i>{{users.lenders_info.is_vip==0?"非会员":users.lenders_info.vip_name}}</i></span>	
								<span class="shijian" v-if="users.lenders_info.vip_end!=0"> {{$moment.unix(1526976328).format('YYYY-MM-DD')}}到期</span>	
				</div>
			</div>	
			<div class="content-two">
				<ul class=" table-view-con mui-text-center mui-table-view mui-grid-view">
					<li class="clearfix li-con" :class="(index==num)?'active':''" v-for="(item,index) in datalist" :key="index"  @click="activeclass(index)">
						<div class="mui-table-view-cell mui-media mui-col-xs-3"><img :src="card.card"><br>	<span class="card">{{item.name}}</span></div>
						<div class="mui-table-view-cell mui-media mui-col-xs-3 mui-text-center"><del >¥ {{item.market_price}}</del></div>
						<div class="mui-table-view-cell mui-media mui-col-xs-6 right-con">¥ <span class="num">{{item.shop_price}}</span><i>限时折扣{{item.discount}}折</i></div>
						<img :src="gou.src" alt="" class="gou" v-show="index==num">
					</li>
				</ul>
			</div>
			<ul class=" table-view-bottom mui-text-center clearfix">
					<li class="clearfix kefu" @click="alertmsg">去支付</li>
			</ul>
					<div class="alert" v-show="alert"  @click.stop="hidealert">
						<div class="alert-content"  @click.stop="stophidden"><div class="top-list" >
							本次需要支付<br>	<span><i>￥</i>{{pricesingle}}</span>
							</div>
							<div class="innercontent">
								<ul class="mui-table-view">
									<li class="mui-table-view-cell mui-media">
										<a href="javascript:;" class="">
											<i class="iconfont icon-weixinzhifu mui-media-object mui-pull-left"></i>
											<div class="mui-media-body">
												微信支付
												<input type="radio" name="payway" id="" class="mui-pull-right" checked>
											</div>
										</a>
									</li>
									<li class="mui-table-view-cell mui-media">
										<a href="javascript:;">
											<i class="iconfont icon-alipay mui-media-object mui-pull-left"></i>
											<div class="mui-media-body">
											支付宝支付
											<input type="radio" name="payway" id="" class="mui-pull-right">
											</div>
										</a>
									</li>
									<li class="mui-table-view-cell mui-media">
										<a href="javascript:;">
											<i class="iconfont icon-piliangfukuandaoyinxingqia mui-media-object mui-pull-left"></i>
											<div class="mui-media-body">
											银行卡支付
											<input type="radio" name="payway" id="" class="mui-pull-right">
											</div>
										</a>
									</li>
									<li class="mui-table-view-cell mui-media bootom-con" @click.stop="hidealert">
											<a href="javascript:void(0)" class="foot" @click="gotopay" >去支付</a>
									</li>
								</ul>
							</div>
						</div>	
					</div>
		</div>
	</div>
</template>

<script>
	import {XHeader} from "vux"
	export default {
		name:"my",
		data(){
			return {
				 users: localStorage.getItem("users")? JSON.parse(localStorage.getItem("users")): "",
				is_r:true,
				alert:false,
				title:"会员充值",
				num:0,
				gou:{src:require('@/assets/images/my/gou.png')},
				top:{src:require('@/assets/images/my/cashbg.png'),touxiang:require('@/assets/images/my/touxiang.png'),tel:require('@/assets/images/my/icon_03.png'),card:require('@/assets/images/my/cashcard.png')},
				card:{card:require('@/assets/images/my/card.png')},
				list:[{yueka:"月卡",yuanjia:"298.00",jg:"98.00",zk:"3.8"},{yueka:"季度卡",yuanjia:"298.00",jg:"98.00",zk:"3.8"},{yueka:"半年卡",yuanjia:"298.00",jg:"98.00",zk:"3.8"},{yueka:"年卡",yuanjia:"298.00",jg:"98.00",zk:"3.8"}]
				,
				datalist:[],
				pricesingle:'',
				viptype:'',

			}
		},
		components:{
			XHeader
		},methods:{
			alertmsg:function(){this.alert=true;},
			hidealert:function(){this.alert=false;},
			stophidden:function(ev){
				ev=ev||window.event;
				ev.stopPropagation();
			},
			activeclass:function(index){
				this.num=index;
				this.pricesingle=this.datalist[index].shop_price;
				this.viptype=this.datalist[index].vip_type;
			},
			getdataList(){
				this.$axios.post('/api/Lenders/vip_list',`data=${JSON.stringify({
					session_id:this.users.session_id,
					userId:this.users.userId
					})}`).then((res)=>{
						if(res.code=200){
							this.datalist=res.data;
							this.pricesingle=this.datalist[0].shop_price;
							this.viptype=this.datalist[0].vip_id;
						}else{
							mui.toast(res.msg)
						}
					}
				)
			},
			gotopay(){
				this.$axios.post('/api/Lenders/buy_vip',`data=${JSON.stringify({
						session_id:this.users.session_id,
					userId:this.users.userId,
					vip_type:this.viptype
					})}`).then(res=>{
						if(res.code==1){
								this.$router.push({path:'/kbb/payGold',query:{linkto:res.order_id}});
								mui.toast(res.msg)
						}else{
								mui.toast(res.msg)
						}

				})
			}
		
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
		},mounted(){
				this.getdataList();
		},computed:{
			// pricesingle(){
			//  		return 	this.datalist.num.shop_price
			// }
			//    pricesingle(){
			// 		let _creditCard =this.datalist.map((v,i)=>i==this.num);
			// 		return _creditCard;            
			// 	}
		}
	}
</script>

<style scoped lang="less">
.mui-table-view:before,.mui-table-view:after,.table-view-one:after,.table-view-one:before,.content-top:after{background:transparent;}
#loan{background: #f0f0f0;}
// .wrap{height:100vh;}
.top-content{position:relative;height:281px;background: #fff;overflow: hidden;}
.top-content .bg{width:100%;height:205px;position: absolute;left:0;top:0;}
.top-content .touxiang{padding: 0 10px;width:100%;height:181px;top:141px;left: 50%;transform: translate3d(-50%,-61px,0);position: absolute;}
.content-top{height: 181px;width: 50%;padding:13px ;position: absolute;overflow: hidden;background: transparent;top: 81px;left: 25%;
    text-align: center;span{display: block;}
	.photo{img{width:70px;height:70px;    border-radius: 50%;}}
	.tel{color:#fff;}.huiyuan,.shijian{color:#ae834c;font-size: 12px;line-height: 32px;}.huiyuan{i{background: #e7cd9c;border-radius:30px;font-style: normal;padding: 3px 6px;}}}
.table-view-bottom{
	font-size:18px;height:52px;line-height:52px;color:#fff;position:fixed;bottom:0;width: 100%;
	background: #469dc8; /* Old browsers */
	background: -moz-linear-gradient(left,  #469dc8 0%, #4097c2 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(left,  #469dc8 0%,#4097c2 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to right,  #469dc8 0%,#4097c2 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#4097c2',GradientType=1 ); /* IE6-9 */
}
.content-two{padding:0 15px 53px;background:#fff;}	
.table-view-con{padding-bottom:50px;}
#loanbuy{margin-top:-67px;}
#loanbuy .li-con{height:101px;border:1px solid #f4f4f4;border-radius:8px;margin-bottom:18px;
.mui-media{padding:0;}
.card{position:relative;top:-53px;color:#fff;}
.num{font-size:32px;}
.right-con{font-size:18px;top: 4px;height: 53px;color:#469dc8;position:relative;span{line-height: 32px;}i{position:absolute;font-style:normal;width:94px;height:18px;background:#ff6b4e;color:#fff;left:0;top:35px;line-height: 18px;font-size:11px;
    left: 50%;transform: translate3d(-50%,0,0);border-radius:15px;}}
del{color:#999;line-height: 100px;}}
.alert{background:rgba(0,0,0,.4);position: fixed;left:0;right:0;top:0;bottom:0;z-index:99999999;
.alert-content{position: absolute;padding-top:24px;width: 100%;height: 402px;margin: 0 auto;background: #fff;bottom: 0;}}
.top-list{text-align: center;color:#a9a9a9;span{color:#333;line-height: 44px;height:44px;;margin-bottom:33px;display:block;font-size:28px;i{font-size:16px;font-style:normal;}}}
.innercontent{ul{li{input[type="radio"]{-moz-appearance: none;appearance: none;-webkit-appearance: none;background:url(../../../../assets/images/my/kong.png) no-repeat;background-size: 26px;width: 30px;height:30px;margin-top:6px;}
i{font-size:36px;}.mui-media-body{line-height:42px;color:#666666;}.icon-weixinzhifu{color:#00c900;}.icon-alipay{color:#00aaee}.icon-piliangfukuandaoyinxingqia{color:#ffba00}}}}
.bootom-con{width: 100%;a{width: 100%; height: 47px; display: block; background: #4097c2; margin: 10px 0 20px 0; text-align: center;color: #fff;line-height: 25px;}}
.mui-table-view.mui-grid-view{padding:10px 0 10px 0;}
#loanbuy .li-con.active{border:1px solid #ff6000;position:relative;}
.li-con.active .gou{position:absolute;right:0;bottom:0;width:25px;height:25px;}
</style>
<style>
#loanbuy .innercontent input[type=radio]:checked{ display: inline-block;appearance:none;-webkit-appearance: none;-moz-appearance: none;background:url(../../../../assets/images/my/pay6.png) no-repeat;background-size: 26px;width: 30px;height:30px;margin-top:6px;}
</style>
