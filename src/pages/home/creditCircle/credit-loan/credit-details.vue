<template>
  <div id="credit-detail">
	  <i-header :is_r="show" :title="title"></i-header>
      <div class="mui-content">
		  <div class="topbg clearfix"><img :src="bgtop.src" alt=""></div>
		  <div class="topcontent">京东金融 <br><span class="">1000+人已经申请</span></div>
	     <!-- <div class="mui-table top-detail">
			    <div class="mui-table-cell mui-col-xs-6"><h4 data-v-5f79da61="">3000~5000</h4> <p data-v-5f79da61="">申请金额</p></div>
			   <div class="mui-table-cell mui-col-xs-6 mui-text-left"><h5 data-v-5f79da61="">2017-12-05</h5> <p data-v-5f79da61="">申请日期</p></div> 
			   <div data-v-5f79da61="" class="mui-table-cell mui-col-xs-3"><button data-v-5f79da61="" type="button" class="mui-btn mui-btn-warning">申请中</button></div>
			   </div> -->
         <div class="mui-table top-detail ">
			        <div class="mui-table-cell mui-col-xs-6"><label for="">金额<input type="text"></label><div class="input-next">额度范围:0~5万</div></div>
			        <div class="mui-table-cell mui-col-xs-6 mui-text-left"><label for="">期限</label><input type="text"><div class="input-next">期限范围:12~48个月</div></div> 
			   </div>
          <div class="mui-table top-two">
			        <div class="mui-table-cell mui-col-xs-3">5万 <br/><span>贷款金额</span></div>
			        <div class="mui-table-cell mui-col-xs-3 mui-text-left">12个月<br/> <span>贷款期限</span></div> 
              <div class="mui-table-cell mui-col-xs-3">0.62%<br/><span>月利率</span></div>
			        <div class="mui-table-cell mui-col-xs-3 mui-text-left">1020元<br/><span>总利息</span></div> 
			   </div>
          <ul class="mui-table-view top-three">
            <li class="li-con" v-for="(item,index) in list" :key="index">
                <div class="top-con"><i class="iconfont icon-shuxian"></i>{{item.left}}</div>
                <div class=" top-con-det"><p>{{item.one}}</p><p>{{item.two}}</p><p>{{item.three}}</p></div>
            </li>
			    </ul>
        <div class="footer">申请借款</div>
      </div>
  </div>
</template>
<script>
import { Field } from 'mint-ui';
import iHeader from "@/components/header/header-r";
export default {
  name: "set",
  data() {
    return {
      show: true,
      title: "产品详情",
      bgtop: { src: require("@/assets/images/post_05.png") },
      list: [
        { left: "申请条件", one: "1、本人二代身份证",two:"2、20-55周岁",three:"3、全国大陆城市" },
        { left: "所需材料", one: "1、本人二代身份证",two:"2、20-55周岁",three:"3、全国大陆城市" },
        { left: "产品特点", one: "1、3分钟授信，终身享受；",two:"2、3千到10万额度，期限灵活",three:"3、人脸识别，刷脸即可授信" }
        
      ]
    };
  },
  mounted() {
    mui.init({
      swipeBack: true //启用右滑关闭功能
    });
  },
  components: {
    iHeader,Field
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
.topbg>img{z-index:2; max-width: 70px;height: 70px; left: 50%;transform: translate3d(-34px,0,0);position: absolute;top: 13px;}	
.topcontent{font-size: 17px;line-height: 33px;padding-top:35px;text-align: center; background: #fff;border-bottom:1px solid #ddd;span{font-size:10px;color:#9a9a9a;display: block;line-height:10px;margin-bottom:15px;}}
.top-detail{background:#fff;padding:10px 15px;input{text-align:right;width: 75%;padding: 5px;line-height: 16px;height: 30px;margin-left: 5px;border-radius: 16px;margin-bottom:4px;}.input-next{color:#9a9a9a;font-size:13px;}}
.mui-table-view{margin-top:12px;margin-bottom:63px;background:#f1f1f1;li{color:#666;span{color:#333;}}li:last-child{span{background:#ccc;color:#fff;height:32px;line-height: 32px;border-radius:50px;width: 60px;text-align: center;display: inline-block;position: absolute;right: 15px;top: 12px;}}}
.top-two{background:#fff;font-size:14px;padding:12px 12px 18px;span{font-size: 11px;color:#b2b2b2;line-height: 11px;}.mui-table-cell{position:relative;}.mui-table-cell:after{position: absolute;
  position: absolute;color:#9e9e9e;line-height:17px;right: 18px;height: 34px;width: 1px;content: '';background-color: #c8c7cc;top:4px;}.mui-table-cell:last-child:after{background:transparent;}}
.top-three{.li-con{background:#fff;.top-con{padding:0 12px;font-size:18px;line-height:50px;height: 50px;border-bottom:1px solid #f0f0f0;margin-top:12px;i{    font-size: 20px;position: relative;top: 2px;color: #469dc8;} }.top-con-det{padding:16px 12px;p{font-size:15px;color:#9a9a9a;line-height:28px;height: 28px;margin-bottom:0;}}} }   
.footer{color:#fff;background: #4097c2;height:50px;line-height:50px;text-align:center;
    background: -webkit-gradient(linear, left top, right top, color-stop(1%, #6fc6f1),to(#469dc8));
    background: linear-gradient(to right, #6fc6f1 1%,#469dc8 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#ff3101',GradientType=1 ); }
.mui-table-view{margin-bottom:0;}
</style>
