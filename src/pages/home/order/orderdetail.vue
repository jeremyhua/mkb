<template>
	<div id="orderdetail" class="wrap bg-f0">
		<i-header :title="title" :is_r="is_r"></i-header>
		<div class="order-main">
			<div class="mui-media-body">
				<p class="mui-ellipsis daikuan"><span>{{data.snap_loan_post.product_type}}</span>{{data.snap_loan_post.title}}</p>
			</div>
			<ul class=" table-view-one mui-table-view mui-grid-view mui-text-left">
				<li class="clearfix content-list" >
						<div class=" mui-col-xs-6 mui-col-sm-6 mui-media sublist mui-table-view-cell mui-text-left" >
		                   <span class="top">{{data.snap_loan_post.apply_money}}</span>
						   				<span class="bottom">申请金额</span>
						</div>
						<div class=" mui-col-xs-6 mui-col-sm-6 mui-media sublist mui-table-view-cell mui-text-left" >
		                   <span class="top">{{moment.unix(data.snap_loan_post.add_time).format('YYYY-MM-DD')}}</span>
						   				<span class="bottom">申请日期</span>
						</div>
						<div class=" mui-col-xs-6 mui-col-sm-6 mui-media sublist mui-table-view-cell mui-text-left" >
		                   <span class="top">{{data.snap_loan_post.loan_limit}}</span>
						   				<span class="bottom">借款期限</span>
						</div>
						<div class=" mui-col-xs-6 mui-col-sm-6 mui-media sublist mui-table-view-cell mui-text-left">
		                   <span class="top">{{data.snap_loan_post.product_type}}</span>
						   				<span class="bottom">产品类型</span>
						</div>
				</li>
				
			</ul>
			<ul class=" table-view-two mui-table-view mui-grid-view mui-text-left">
					<li class="mui-table-view-two clearfix list-li"><i class="iconfont icon-shuxian"></i>客户信息</li>
					<li class="mui-table-view-three clearfix content-list">
						<div class=" mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left ">
		                   <span class="iconleft ">昵称</span>{{data.snap_loan_post.nickname}}
						</div>
						<div class=" mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left ">
		                   <span class="iconleft ">公司名称</span>{{data.snap_loan_post.company}}
						</div>
						<div class=" mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left ">
		                   <span class="iconleft ">姓名</span>{{data.snap_loan_post.realname}}
						</div>
							<div class=" mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left ">
		                   <span class="iconleft ">每月收入</span>{{data.snap_loan_post.income}}
						</div>
							<div class=" mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left ">
		                   <span class="iconleft ">职位</span>{{data.snap_loan_post.job}}
						</div>
							<div class=" mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left ">
		                   <span class="iconleft ">公司座机</span>{{data.snap_loan_post.company_tel}}
						</div>
						<div class=" mui-col-xs-12 mui-col-sm-12 mui-media mui-table-view-cell mui-text-left " >
		                   <span class="iconleft ">借款用途</span>{{data.snap_loan_post.loan_reason}}
						</div>
							<div class=" mui-col-xs-12 mui-col-sm-12 mui-media mui-table-view-cell mui-text-left " >
		                   <span class="iconleft ">公司地址</span>{{data.snap_loan_post.company_address}}
						</div>
					</li>
				
			</ul>
			<ul class="table-view-three clearfix">
				<img class="mui-pull-left" :src="this.imgUrl+data.snap_loan_post.head_img" alt="" width="72">
				<div class="mui-pull-left center-content">
					<div class="top">{{data.snap_loan_post.nickname}}<span>{{data.snap_loan_post.telphone}}</span></div>
					<div class="bottom">武汉汉街鄂旅投资有限公司</div>
				</div>
				<i class="iconfont icon mui-pull-right "></i>
			</ul>
			<div class="foot" ><a href="#" class="backpay" :class="getstate==-2?'one':(getstate==1?'two':(getstate==2?'three':''))">{{getstate==-2?'确认订单':(getstate==1?'已完成':(getstate==2?'退款中':''))}}</a></div>
		</div>
	</div>	
</template>

<script>
import iHeader from "@/components/header/header-r";
export default {
  name: "orderdetail",
  data() {
    return {
			users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
      is_r: true,
      title: "订单详情",
			photo:{src:require('@/assets/images/jl05.png')},
			data:'',
			getstate:'',
    };
  },
  components: {
    iHeader
	},
	methods:{
			getlist(){
			this.$axios.post('/api/Loan_post/loan_post_order_detail',`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                id:this.$route.query.id
                })}`).then((res)=>{
                  if(res.code==200){
											this.data=res.data;
                  }else{
                      Toast(res.msg)
                  }
            }).catch((err)=>{throw err});
			},
	},
mounted(){
			this.getlist();
			this.getstate=this.$route.query.status;
			// alert(this.getstate)
	}
};
</script>

<style scoped lang="less">
#orderdetail .table-view-one:before,.table-view-two:before{background:transparent;}
#orderdetail .table-view-one:after{left:12px;}
.wrap {
  height: 100%;
  width: 100%;
  padding-top: 70px;
}
.daikuan {
  font-size: 16px;
  line-height: 32px;
  background: #fff;
  padding: 19px 12px 0;
  color: #333333;
  margin-bottom:0;
}
.daikuan span {
  padding: 4px 10px;
  border: 1px solid #469dc8;
  color: #469dc8;
  border-radius: 3px;
  margin-right: 10px;
  display: inline-block;
  font-size: 13px;
  line-height: 13px;
}
.table-view-one {
	padding-bottom:22px;
  .content-list {
	  .sublist{ padding-top: 23px;}
   
    span.bottom {
      display: block;
	  font-size: 13px;
	  color:#a9a9a9;
    }
    span.top {
      color: #469dc8;
	  font-size: 16px;
    }
  }
}
.iconfont.icon-shuxian{color:#469dc8;}
.table-view-two{padding:12px 12px 14px;.list-li{font-size:16px;height:30px;line-height:30px;}.content-list{.mui-media{font-size:13px !important;line-height:30px;}span{color:#a9a9a9;margin-right:10px;}}}
.table-view-three{margin-top:11px;background:#fff;padding: 20px 12px 0;.center-content{margin:18px;}
.top{span{color:#469dc8;margin-left:20px;}}.bottom{font-size:14px;line-height: 36px;color: #a9a9a9;}}

// .order-main{padding-bottom:55px;}
.foot{padding:3px 15px 13px;background: #fff;}
.backpay.one{
						color:#fff;border:none;
						background: #6fc6f1; /* Old browsers */
						background: -moz-linear-gradient(left,  #6fc6f1 0%, #469dc8 100%, #469dc8 100%, #2989d8 100%, #469dc8 100%); /* FF3.6-15 */
						background: -webkit-linear-gradient(left,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
						background: linear-gradient(to right,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
						filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6fc6f1', endColorstr='#469dc8',GradientType=1 ); /* IE6-9 */
						}
.backpay.two{color:#a0a0a0;border:1px solid #dfdfdf;box-shadow: none;background: transparent;}
.backpay.three{color:#ff4b4b;border:1px solid #ff4b4b;box-shadow: none;background: transparent;}
.backpay{height: 53px;color:#ff4646;border:1px solid #ff4646;border-radius:4px;width:100%;display: block;text-align: center;line-height:53px;}
</style>