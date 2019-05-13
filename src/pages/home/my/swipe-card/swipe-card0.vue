<template>
  <div id="my-account" class="bg-f0">
	  <i-header :is_r="show" :title="title" :right="right"></i-header>
        <div class="mui-content">
            <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(i,index) in content" :key="index" >
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" :src="i.src">
						<div class="mui-media-body">
							中国招商银行
							<p class="mui-ellipsis">周泽 | 尾号5420</p>
                            <span>其他收款账户<i class="iconfont icon-youjiantou"></i></span>
						</div>
					</a>
				</li>
			</ul>
            <ul class="mui-table-view-one">
                <li class="tips"><span>收款金额</span><i>¥5000</i></li>
            </ul>

             <ul class="mui-table-view mui-table-view-two clearfix">
                <li class=" mui-pull-left one  " :class="i.act===true ? 'active' : ''"  @click="activeClick(index)" v-for="(i,index) in muiday" :key="index">{{i.msg}}</li>
            </ul>
            <div class="footer"><router-link to="/my/swipe-card/swipe-card"><button>下一步</button></router-link></div>
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
            right:"协议",
            title:"刷卡支付",
            content:[{src:require("@/assets/images/bank2.png")}],
            muiday:[{msg:"D+0 到账",act:true},{msg:"D+1 到账",act:false}]
			}
		},components: {
            iHeader
        },
        methods:{
            activeClick:function(index){
                //  Object.keys(this.muiday.act)=false;
                for (var i=0;i<this.muiday.length;i++){
                    this.muiday[i].act=false;
                };
                this.muiday[index].act=true;
                // i.act=!i.act
                //  activeClass='';
                // console.log(event)
                // event.target.addClass('active')
            }
        }
    }
</script>
<style lang="less" scoped>
.clearfix:after{
	overflow:hidden;
 	display:block;
 	content:"";
	clear:both;
	height:0;
}
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
.mui-content{.pt(75px)}
.content2{.mt(15px)}
.mui-media-body{position:relative;}
.mui-table-view-two{  height: 50px; width: 90%; margin: 0 auto;}
.mui-table-view-two li{width:50%; height: 100%;line-height: 50px;color:@ora;border:1px solid @ora; text-align: center;}
.mui-table-view-two .active{background:@ora;color:#fff;}
.mui-media-body span{position:absolute;right:-2px;top: 10px;font-size: 13px;color:@aa; i{font-size:14px;}}
.mui-content>.mui-table-view:first-child{margin-bottom:20px;}
.mui-input-group:before,.mui-input-group:after,.mui-input-group .mui-input-row:last-child:after,.mui-table-view-cell:after{background-color:transparent;}
.mui-table-view-one{width:100%;line-height:48px;margin-bottom:10px;font-size:14px;
li{background:#fff;padding:20px 15px;}
i{display:block;text-align:left;font-size: 36px;font-style: normal;}
span{width:100%;text-align: left;display: block;color: @aa;}}
.my-account{height:100%;}
.mui-input-group .mui-input-row {height: 54px;padding: 10px 0px;}
.right-view{ display: block;margin-top: 10px;}
.mui-input-row label{width:30%;}
.mui-input-row label~input, .mui-input-row label~select, .mui-input-row label~textarea,label~span{width:70%;line-height: 36px;
    padding-right: 10px;text-align:right;color: @aa;}
.footer{margin-top:20px;}
.footer button{width: 90%;height: 50px;color: #fff; background: -moz-linear-gradient(left,  #6fc6f1 1%, #469dc8 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left,  #6fc6f1 1%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right,  #6fc6f1 1%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#ff3101',GradientType=1 ); top: 16px;font-size: 20px; margin: 0 auto;display: block;}
</style>

