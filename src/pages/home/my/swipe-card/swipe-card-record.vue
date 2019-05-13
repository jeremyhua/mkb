<template>
  <div id="my-account" class="wrap bg-f0">
	  <i-header :is_r="show" :title="title" ></i-header>
        <div class="mui-content">
           <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
		        <li class="mui-table-view-cell" v-for="(i,index) in list" :key="index">
		            <div class="mui-table " >
		                <div class="mui-table-cell mui-col-xs-8">
		                    <h4 class="mui-ellipsis">{{i.ell}}</h4>
		                    <h5>{{i.time}}</h5>
		                </div>
		                <div class="mui-table-cell mui-col-xs-4 mui-text-right">
		                    <span class="mui-h4 ora">{{i.cost}}</span>
		                    <span class="mui-h6">{{i.left}}</span>
		                    <span class="mui-h6 gre"><i class="iconfont icon-dui"></i>{{i.sec}}</span>
                            
		                </div>
		            </div>
		        </li>
		    </ul>
        </div>
 
        <router-view></router-view>
  </div>

</template>
<script>
import iHeader from "@/components/header/header-r";
export default {
  name: "set",
  data() {
    return {
      show: true,
      title: "刷卡记录",
      list: [
        {
          ell: "急速到账（D+0)",
          time: "2017-10-15 18:20",
          cost: "+2000",
          left: "余额:18000",
          sec: "交易成功"
        },
        {
          ell: "急速到账（D+1)",
          time: "2017-10-15 18:20",
          cost: "+2000",
          left: "余额:18000",
          sec: "交易成功"
        },
        {
          ell: "急速到账（D+0)",
          time: "2017-10-15 18:20",
          cost: "+2000",
          left: "余额:18000",
          sec: "交易成功"
        },{
          ell: "急速到账（D+0)",
          time: "2017-10-15 18:20",
          cost: "+2000",
          left: "余额:18000",
          sec: "交易成功"
        },
        {
          ell: "急速到账（D+1)",
          time: "2017-10-15 18:20",
          cost: "+2000",
          left: "余额:18000",
          sec: "交易成功"
        },
        {
          ell: "急速到账（D+0)",
          time: "2017-10-15 18:20",
          cost: "+2000",
          left: "余额:18000",
          sec: "交易成功"
        }
      ]
    };
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
@aa:#aaaaaa;
@gre:#44c055;
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
.mui-content{.pt(75px)}
.mui-text-right span{display: block;}
.mui-text-right{
  .ora{color: @ora;}  
  .gre{color:@gre;}
  i{margin-right: 5px;
    position: relative;
    top: 2px;}
} 
.mui-ellipsis{margin-bottom:10px;}
// .mui-input-group:before,.mui-input-group:after,.mui-input-group .mui-input-row:last-child:after{background-color:transparent;}
</style>

