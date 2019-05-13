<template>
  <div id="orderdetails">
	  <i-header :is_r="show" :title="title"></i-header>
      <div class="mui-content">
		  <div class="topbg clearfix"><img :src="bgtop.src" alt=""></div>
		  <div class="topcontent">京东金融 <span class="mui-pull-right">1000+人已经申请</span></div>
		  <div class="mui-table top-detail">
			  <div class="mui-table-cell mui-col-xs-5"><h4 data-v-5f79da61="">3000~5000</h4> <p data-v-5f79da61="">申请金额</p></div>
			   <div class="mui-table-cell mui-col-xs-4 mui-text-left"><h5 data-v-5f79da61="">2017-12-05</h5> <p data-v-5f79da61="">申请日期</p></div> 
			   <div data-v-5f79da61="" class="mui-table-cell mui-col-xs-3" style="text-align: right;"><button data-v-5f79da61="" style="margin-top:5px;" type="button" class="mui-btn mui-btn-warning">申请中</button></div>
			   </div>
          <ul class="mui-table-view">
				<li class="mui-table-view-cell " v-for="(item,index) in list" :key="index">
						{{item.left}}
						<span class=" mui-pull-right">{{item.right}}</span>
				</li>
				
			</ul>
       
      </div>
  </div>
</template>
<script>
import iHeader from "@/components/header/header-r";
export default {
  name: "set",
  data() {
    return {
      show: true,
      title: "订单详情",
      bgtop: { src: require("@/assets/images/post_07.png") },
      list: [
        { left: "真实姓名", right: "陈浩" },
        { left: "身份证号", right: "422********4330" },
        { left: "手机号", right: "199****6405" },
        { left: "车辆认证 ", right: "无" },
        { left: "房产认证", right: "无" },
        { left: "婚姻状况 ", right: "已婚" },
		{ left: "借款用途", right: "装修借款" },
		{ left: "收入情况", right: "年薪10万~20万" },
		{ left: "身份证正反面照片 ", right: "查看" }
      ]
    };
  },
  mounted() {
    mui.init({
      swipeBack: true //启用右滑关闭功能
    });
  },
  components: {
    iHeader
  }
};
</script>
<style lang="less" scoped>
@l:left;
@gray:#555;
@lig:#e0e0e0;
@lit:#d1d1d1;
@ora:#469dc8;
@lc:#cccccc;
.h(@h){height:@h}
.c(@h){color:@h}
.lh(@h){line-height:@h}
.w(@h){width:@h}
.mt(@mt){margin-top:@mt}
.mb(@mb){margin-bottom:@mb}
.mr(@mr){margin-right:@mr}
.fz(@f){font-size: @f}
.fl(@f){float:@f}
.p(@p){padding: @p}
.pr(@p){padding-right: @p}
.pt(@p){padding-top:@p}
.bg(@b){background:@b}
.fw(@w){font-weight:@w}
.mui-table-view:after,.mui-table-view:before{
	.bg(transparent)
}
.mui-content>.mui-table-view:first-child{
	.mt(0);
	
}
.mui-table-view{
	.mb(15px);
	.mui-table-view-cell{.p(18px  15px);
    }
}
.icon-orange-dot{.c(@ora);}
.topbg{height:50px;position:relative;
	background: #4097c2;
    background: -webkit-gradient(linear, left top, right top, color-stop(1%, #6fc6f1),to(#469dc8));
	background: linear-gradient(to right, #6fc6f1 1%,#469dc8 100%);}
.mui-content{.pt(70px);}
.topbg>img{z-index:2; max-width: 68px;height: 68px;left: 15px;position: absolute;top: 25px;border: 1px solid #f0f0f0;}	

.topcontent{font-size:17px;height:50px;line-height:50px;padding-left:95px;padding-right:15px;background:#fff;span{font-size:10px;color:#9a9a9a;}}
.top-detail{background:#fff;padding:10px 15px;}
.mui-table-view{margin-top:12px;margin-bottom:63px;li{color:#666;span{color:#333;}}li:last-child{span{background:#ccc;color:#fff;height:32px;line-height: 32px;border-radius:50px;width: 60px;text-align: center;display: inline-block;position: absolute;right: 15px;top: 12px;}}}
.orderdetails{background:#fff;}
</style>
