<template>
	<div id="orderdetail" class="wrap bg-f0">
		<x-header :left-options="{backText:''}">借款详情</x-header>
		<div class="order-main">
			<div class="mui-media-body">
				<p class="mui-ellipsis daikuan"><span>{{rspdata.product_type}}</span>{{rspdata.title}}</p>
			</div>
			<ul class=" table-view-one mui-table-view mui-grid-view mui-text-left top-wrap">
				<li class="clearfix content-list" >
						<div class=" mui-col-xs-6 mui-col-sm-6 mui-media sublist mui-table-view-cell mui-text-left" >
		           <span class="top">{{rspdata.apply_money}}</span>
						   <span class="bottom">申请金额</span>
						</div>
							<div class=" mui-col-xs-6 mui-col-sm-6 mui-media sublist mui-table-view-cell mui-text-left" >
		           <span class="top">{{moment.unix(rspdata.add_time).format('YYYY-MM-DD')}}</span>
						   <span class="bottom">申请日期</span>
						</div>
							<div class=" mui-col-xs-6 mui-col-sm-6 mui-media sublist mui-table-view-cell mui-text-left" >
		           <span class="top">{{rspdata.loan_limit}}</span>
						   <span class="bottom">借款期限</span>
						</div>
							<div class=" mui-col-xs-6 mui-col-sm-6 mui-media sublist mui-table-view-cell mui-text-left" >
		           <span class="top">{{rspdata.product_type}}</span>
						   <span class="bottom">产品类型</span>
						</div>
				</li>
			</ul>
			<ul class=" table-view-two mui-table-view mui-grid-view mui-text-left">
					<li class="mui-table-view-two clearfix list-li"><i class="iconfont icon-shuxian"></i>客户信息</li>
					<li class="mui-table-view-three clearfix content-list">
						<div class=" mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left " >
		                   <span class="iconleft ">昵称</span>{{rspdata.nickname}}
						</div>
						<div class="mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left " >
		                   <span class="iconleft ">公司名称</span>{{rspdata.company}}
						</div>
								<div class=" mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left " >
		                   <span class="iconleft ">姓名</span>{{rspdata.realname}}
						</div>
						<div class="mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left " >
		                   <span class="iconleft ">每月收入</span>{{rspdata.income}}
						</div>
								<div class=" mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left " >
		                   <span class="iconleft ">职位</span>{{rspdata.job}}
						</div>
						<div class="mui-col-xs-6 mui-col-sm-6 mui-media mui-table-view-cell mui-text-left " >
		                   <span class="iconleft ">公司座机</span>{{rspdata.company_tel}}
						</div>
						<div class=" mui-col-xs-12 mui-col-sm-12 mui-media mui-table-view-cell mui-text-left " >
		                   <span class="iconleft ">借款用途:</span>{{rspdata.loan_reason}}
						</div>
					<div class=" mui-col-xs-12 mui-col-sm-12 mui-media mui-table-view-cell mui-text-left " >
		                   <span class="iconleft ">公司地址:</span>{{rspdata.company_address}}
						</div>
					</li>
				
			</ul>
			<ul class="table-view-three clearfix">
				<img class="mui-pull-left headimg" :src="imgUrl+rspdata.head_img" alt="" >
				<div class="mui-pull-left center-content">
					<div class="top">{{rspdata.nickname}}</div>
					<div class="bottom">联系电话:<a  :href='"tel:"+rspdata.telphone'>{{rspdata.telphone}}</a></div>
				</div>
				<i class="iconfont icon mui-pull-right "></i>
			</ul>
				<div class="foot clearfix"><span class='fl'>可抢次数<i>{{rspdata.bid_num}}</i>次</span>
				<span class='fr' @click="getordernow(rspdata.grab_icon,rspdata.id)" v-show="rspdata.bid_num!=0&&rspdata.is_buy==0" >立即抢单</span>
				<span class='fr finishorder'  v-show="rspdata.bid_num!=0&&rspdata.is_buy==1" >已抢单</span>
				<span class='fr finishorder' v-show="rspdata.bid_num==0" >已抢完</span></div>
		</div>
	</div>	
</template>

<script>
import {Toast,MessageBox} from "mint-ui"
import {XHeader} from 'vux'
export default {
  name: "orderdetail",
  components: {
    XHeader,Toast,MessageBox
},
  data() {
    return {
      is_r: true,
	  	photo:{src:require('@/assets/images/jl05.png')},
		 	users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
			rspdata:'',
			getorder:false,
			telphone:'',
			clicktimes:0,
	 };
  },
  
	
	methods:{
/* 		getorderimit(){
					this.$axios.post('/api/Loan_post/grab_loan_post',`data=${JSON.stringify({
						session_id:this.users.session_id,
						userId:this.users.userId,
						id:this.$route.query.id})}`).then(res=>{
						console.log(res)
						if(res.code==200){
							Toast('抢单成功');
								this.rspdata.telphone=res.data.telphone;
								--this.rspdata.bid_num;
								this.rspdata.is_buy=1;
								this.clicktimes=1;
							// this.getorder=true;
						}
						else{
							Toast(res.msg)
						}
					})
		} */
		  getordernow(cost,id){
						// console.log(cost,id,index,typeof(cost))
            var sendmsg="<div class='alert-cost'>本次需要花费<br/>"+(Number(cost)||0)+"金币</div>";
               MessageBox.confirm(sendmsg).then(action => {
                        this.$axios.post('/api/Loan_post/grab_loan_post',`data=${JSON.stringify({
                            session_id:this.users.session_id,
                            userId:this.users.userId,
                            id:id})}`).then(res=>{
                            console.log(res)
                            if(res.code==200){
                                Toast('抢单成功');
                                    this.rspdata.telphone=res.data.telphone;
																		--this.rspdata.bid_num;
																		this.rspdata.is_buy=1;
                            }
                            else{
                                Toast(res.msg)
                            }
                        })
                });
        }
	},
	mounted(){
		this.$axios.post('/api/Loan_post/loan_post_detail',`data=${JSON.stringify({
			session_id:this.users.session_id,
			userId:this.users.userId,
			id:this.$route.query.id})}`).then(res=>{
			if(res.code==200)
			this.rspdata=res.data;
			this.telphone=res.data.telphone;
		})
	},
};
</script>

<style scoped lang="less">
#orderdetail .table-view-one:before,.table-view-two:before{background:transparent;}
#orderdetail .table-view-one:after{left:12px;}
.wrap {
  height: 100%;
  width: 100%;
  padding-top: 70px;
  background:#fff;
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
.iconfont.icon-shuxian{color:#6fc6f1;}
.table-view-two{padding:12px 12px 14px;.list-li{font-size:16px;height:30px;line-height:30px;}.content-list{.mui-media{font-size:13px !important;line-height:30px;}span{color:#a9a9a9;margin-right:10px;}}}
.table-view-three{margin-top:11px;background:#fff;padding: 20px 12px 0;.center-content{margin:18px;}
.bottom span{color:#469dc8;}.bottom{font-size:14px;line-height: 36px;color: #a9a9a9;}}
.foot{background: #fff;width:100%;height:50px;position: fixed;bottom: 0;}
.foot .fl{width:40%;display:inline-block;text-align: center;height:100%;line-height: 50px;}
.foot .fl i{font-style:normal;color: #469dc8;padding-left: 10px;padding-right:5px; }
.foot .fr{width:60%;height:100%;line-height:50px;text-align: center;display:inline-block;color:#fff; background: -moz-linear-gradient(left,  #6fc6f1 1%, #469dc8 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left,  #6fc6f1 1%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right,  #6fc6f1 1%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#ff3101',GradientType=1 );}
.backpay{height: 53px;color:#ff4646;border:1px solid #ff4646;border-radius:4px;width:100%;display: block;text-align: center;line-height:53px;}
.top-wrap{position:relative;}
.star{position:absolute;right:0;top:0;}
.get-order{color:#469dc8;}
.order-main{padding-bottom: 50px;}
.headimg{height: 57px;width: 57px;margin-left: 18px;margin-top: 10px;border-radius: 50%;}
.foot .fr.finishorder{/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#c5c5c5+0,a1a1a1+100,207cca+100,7db9e8+100,a1a1a1+100,207cca+102 */
background: #c5c5c5; /* Old browsers */
background: -moz-linear-gradient(left,  #c5c5c5 0%, #a1a1a1 100%, #207cca 100%, #7db9e8 100%, #a1a1a1 100%, #207cca 102%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  #c5c5c5 0%,#a1a1a1 100%,#207cca 100%,#7db9e8 100%,#a1a1a1 100%,#207cca 102%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right,  #c5c5c5 0%,#a1a1a1 100%,#207cca 100%,#7db9e8 100%,#a1a1a1 100%,#207cca 102%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c5c5c5', endColorstr='#207cca',GradientType=1 ); /* IE6-9 */
}
.fl{float:left;}.fr{float:right;}
</style>