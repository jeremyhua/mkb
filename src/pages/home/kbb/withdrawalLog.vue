<template>
	<div id="withdrawalLog" class="wrap bg-f0">
		<x-header :left-options="{backText:''}">提现记录</x-header>
		<div class="content">
			<ul class="mui-table-view  table-view-one"  v-show="res.list!=''">
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in res.list" :key="index">
					<a href="javascript:;">
						<span class="mui-media-object mui-pull-right" >{{item.money|tosecend}}
							<p>{{item.status}}</p>
						</span>
						<div class="mui-media-body">
							{{item.bank_name}}({{item.bank_code}})
							<p class="mui-ellipsis">{{moment.unix(item.create_time).format('YYYY-MM-DD hh:mm:ss') }}</p>
						</div>
					</a>
				</li>
			</ul>
			<div class="no-list" v-show="res.list==''">
				<img :src="require('@/assets/images/nodata.png')" width="196" style="margin-top:120px;">
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui'
	import {XHeader} from 'vux'
	export default {
		name:"withdrawalLog",
		data(){
			return {
				users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
				res:[{list:""}],
			}
		},
		components:{
			XHeader
		},
		methods:{
			getdata(){
					this.$axios.post('/api/Myprofit/withdrawLog','').then(
									res=> {if(res.code==1){
										this.res=res.result
										}});
			}
		},
		mounted(){
				this.getdata();
		},
		filters:{
			tosecend:function (value) {
				if( Number(value)>=0){
				return "-"+Number(value).toFixed(2);
				}else{
				return "+"+Number(value).toFixed(2);
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
#withdrawalLog{background: #f0f0f0;}
.wrap{height:100vh;}
.table-view-one{
	li{.mui-media-object{color:#469dc8;}}	
	li{.mui-media-object p{color:#469dc8;}}	
	li.history{border-bottom:1px solid #dddddd;height:50px;line-height: 50px;font-size:16px;padding-left:12px;
	.iconfont{font-size: 19px;color:#469dc8;position: relative;top: 2px;}}
} 
#withdrawalLog .mui-table-view-cell{padding:15px 15px 5px 15px !important;}
.table-view-one .mui-ellipsis{ line-height: 40px;}
.mui-table-view .mui-media-object {line-height: 25px;max-width: 102px;height: 50px;}
.no-list{width: 100%;text-align: center;}    
</style>
