<template>
  <div id="my-account" class="bg-f0 wrap">
	  <i-header :is_r="show" :title="title" :right="right"></i-header>
        <div class="mui-content">
            <ul class="mui-table-view-one">
                <li class="tips"><i>¥5000</i><span>收款金额</span></li>
            </ul>

            <form class="mui-input-group">
					
                    <div class="mui-input-row" v-for="(i,index) in content" :key="index">
						<label>{{i.l}}</label>
						<span class="mui-pull-right">{{i.r}}</span>
					</div>
                  
              
			</form>
                   <div class="footer"><button>确认</button></div>
        </div>
 
        <router-view></router-view>
  </div>

</template>
<script>
import iHeader from "@/components/header/header-r"
    export default{
		name:"set",
		data(){
			return{
            show:true,
            right:"帮助",
            title:"刷卡支付",
            content:[{l:"订单号",r:"1712016172358"},{l:"收款说明",r:"D+0普通到账"},{l:"收款账户",r:"招商银行 | 尾号4705 *泽"},{l:"付款账户",r:"15827046405"}]
			}
		},components: {
            iHeader
        }
    }
</script>
<style lang="less" scoped>
@l:left;
@gray:#555;
@lig:#e0e0e0;
@lit:#d1d1d1;
@ora:#469dc8;
@lc:#cccccc;
@aa:#aaaaaa;
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
// .mui-content{.mt(75px)}
.wrap{.pt(75px)}
.content2{.mt(15px)}
.mui-input-group:before,.mui-input-group:after,.mui-input-group .mui-input-row:last-child:after{background-color:transparent;}
.mui-content{padding:15px;}
.mui-table-view-one{width:100%;line-height:48px;margin-bottom:10px;font-size:14px;
li{background:#fff;padding:20px;}
i{display:block;text-align: center;font-size: 36px;font-style: normal;}
span{width:100%;text-align: center;display: block;color: @aa;}}
.my-account{height:100%;}
.mui-input-group .mui-input-row {height: 54px;padding: 10px 0px;}
.right-view{ display: block;margin-top: 10px;}
.mui-input-row label{width:30%;}
.mui-input-row label~input, .mui-input-row label~select, .mui-input-row label~textarea,label~span{width:70%;line-height: 36px;
    padding-right: 10px;text-align:right;color: @aa;}
.footer{margin-top:20px;}
.footer button{width: 100%;height: 50px;color: #fff; background: -moz-linear-gradient(left,  #6fc6f1 1%, #469dc8 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left,  #6fc6f1 1%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right,  #6fc6f1 1%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#ff3101',GradientType=1 ); top: 16px;font-size: 20px; margin: 0 auto;display: block;}
</style>

