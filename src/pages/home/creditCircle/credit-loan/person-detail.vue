<template>
  <div id="person-detail">
    <x-header :left-options="{backText:''}">贷款详情</x-header>
      <div class="mui-content">
         <div class="mui-table top-one clearfix">
              <img v-lazy="imgUrl+resdata.head_img" alt="" class="touxiang mui-pull-left">
			       <div class="top-sub"> {{resdata.nickname}}<img :src="resdata.icon" alt=""> <span class="click">{{resdata.click}}点击</span><br/> <span>{{resdata.company}}</span>
             <span @click="star" class="star mui-pull-right" :class="addstar ? 'staradd':'st'">{{addstar ?'已收藏':'收藏'}}</span></div> 
              <div class="bot-sub"><i class="iconfont icon-luxiandingwei"></i>{{resdata.company_address}}</div>
         </div>
          <div class="mui-table top-two">
			        <div class="mui-table-cell mui-col-xs-6"> {{resdata.pro_time}}<br/><span>贷款期限</span></div>
			        <div class="mui-table-cell mui-col-xs-6 ">{{resdata.pro_money}}<br/><span>贷款额度</span></div> 
			   </div>
          <ul class="mui-table-view top-three">
            <li class="li-con" >
                <div class="top-con"><i class="iconfont icon-shuxian"></i>申请条件</div>
                <div class=" top-con-det"><p>{{resdata.pro_conditions}}</p></div>
            </li>
             <li class="li-con" >
                <div class="top-con"><i class="iconfont icon-shuxian"></i>所需材料</div>
                <div class=" top-con-det"><p>{{resdata.pro_data}}</p></div>
            </li>
             <li class="li-con" >
                <div class="top-con"><i class="iconfont icon-shuxian"></i>产品特点</div>
                <div class=" top-con-det"><p>{{resdata.pro_seo}}</p></div>
            </li>
			    </ul>
        <div class="footer clearfix"><div class="left"><i class="iconfont icon-qq" @click="KeFuQQ"></i></div>
        <div class="right contactus" v-if="users!=''"><a  :href="'tel:'+resdata.mobile"> 立即联系</a></div>
        <div class="right contactus" v-if="users==''"><a @click="loginFun"> 请先登录</a></div>
        </div>
      </div>
  </div>
</template>
<script>
import { Field } from "mint-ui"
import {XHeader} from "vux"
export default {
  name: "set",
  data() {
    return {
      users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
      show: false,
      title: "贷款详情",
      touxiang: { src: require("@/assets/images/jl05.png") },
      xing: { src: require("@/assets/images/jp_icon.png") },
      resdata:[],
      addstar:false,
    };
  },
  created() {
    // mui.init({
    //   swipeBack: true //启用右滑关闭功能
    // });
        this.$axios.post('/api/Lenders_product/product_detail',`data=${JSON.stringify({
          session_id:this.users.session_id,
          userId:this.users.userId,
          product_id:this.$route.query.id
        })}`).then((res)=>{
          console.log(res)
          if(res.code==200){
            this.resdata=res.data;
            if(res.data.is_collect==1){
              this.addstar=true
              // this.$store.
            }
            if(res.data.is_collect==0){
              this.addstar=false
            }
          }
        }).catch((err)=>{throw err});
  },
  components: {
    XHeader,
    Field,

  },
  methods:{
    star(){
      if(this.users ==""){
            this.$router.push("/my/login?redirect="+this.$route.fullPath);
            return false;
      }

      this.$axios.post('/api/Lenders_product/collection',`data=${
        JSON.stringify({
          session_id:this.users.session_id,
          userId:this.users.userId,
          table:'product',
          product_id:this.$route.query.id,
        }) }`).then((res)=>{
          if(res.code==200){
            this.addstar=!(this.addstar);
            // console.log(this.addstar)
          }
          // console.log(res)
        })
     .catch(err=>{})
    },loginFun(){
        this.$router.push("/my/login?redirect="+this.$route.fullPath);
    },	KeFuQQ(){
            if(this.users ==""){
                  this.$router.push("/my/login?redirect="+this.$route.fullPath);
                  return false;
            }
            if(this.resdata.qq == ""){
              mui.toast('客户经理未留QQ');
              return false;
            }
            if (plus.os.name == "iOS") {  
                plus.runtime.launchApplication({  
                    action: "mqq://im/chat?chat_type=wpa&uin="+this.resdata.qq+"&version=1&src_type=web"  
                }, function(e) {  
                    plus.nativeUI.confirm("检查到您未安装qq，请先到appstore搜索下载？", function(i) {  
                        if (i.index == 0) {  
                            iosAppstore("itunes.apple.com/cn/app/mqq/");  
                        }  
                    });  
                });  
            }else if (plus.os.name == "Android") { 
                var main = plus.android.runtimeMainActivity(); 
                var Intent = plus.android.importClass('android.content.Intent'); 
                var Uri = plus.android.importClass('android.net.Uri'); 
                var intent = new Intent(Intent.ACTION_VIEW, Uri.parse("mqqwpa://im/chat?chat_type=wpa&uin="+this.resdata.qq+"")); 
                main.startActivity(intent); 
            } 
		},
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
.click{padding-left:15px;}
// .top-one{img{}}
.topbg{height:50px;position:relative;
	background: #4097c2;
    background: -webkit-gradient(linear, left top, right top, color-stop(1%, #6fc6f1),to(#469dc8));
	background: linear-gradient(to right, #6fc6f1 1%,#469dc8 100%);}
.mui-content{.pt(70px);padding-bottom:50px;}
.topbg>img{z-index:2; max-width: 68px;height: 68px; left: 50%;transform: translate3d(-34px,0,0);position: absolute;top: 25px;}	
.topcontent{font-size: 17px;line-height: 33px;padding-top: 41px;text-align: center; background: #fff;border-bottom:1px solid #ddd;span{font-size:10px;color:#9a9a9a;display: block;line-height:10px;margin-bottom:15px;}}
.top-detail{background:#fff;padding:10px 15px;input{text-align:right;width: 75%;padding: 5px;line-height: 16px;height: 30px;margin-left: 5px;border-radius: 16px;margin-bottom:4px;}.input-next{color:#9a9a9a;font-size:13px;}}
.mui-table-view{margin-top:12px;margin-bottom:63px;background:#f1f1f1;li{color:#666;span{color:#333;}}li:last-child{span{background:#ccc;color:#fff;height:32px;line-height: 32px;border-radius:50px;width: 60px;text-align: center;display: inline-block;position: absolute;right: 15px;top: 12px;}}}
.top-two{background:#fff;font-size:14px;padding:12px 12px 18px;span{font-size: 11px;color:#b2b2b2;line-height: 11px;}.mui-table-cell{position:relative;}.mui-table-cell:after{position: absolute;
  position: absolute;color:#9e9e9e;line-height:17px;right: 18px;height: 34px;width: 1px;content: '';background-color: #c8c7cc;top:36px;}.mui-table-cell:last-child:after{background:transparent;}}
.top-three{.li-con{background:#fff;.top-con{color:#3b3b3b;font-weight:700;padding:0 12px;font-size:18px;line-height:50px;height: 50px;border-bottom:1px solid #f0f0f0;margin-top:12px;i{    font-size: 20px;position: relative;top: 2px;color:#469dc8;} }.top-con-det{padding:16px 12px;p{font-size:15px;color:#9a9a9a;line-height:28px;height: 28px;margin-bottom:0;}}} }   
.footer .right{color:#fff;background: #4097c2;height:50px;line-height:50px;text-align:center;width:80%;float:right;
    background: -webkit-gradient(linear, left top, right top, color-stop(1%, #6fc6f1),to(#469dc8));
    background: linear-gradient(to right, #6fc6f1 1%,#469dc8 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#ff3101',GradientType=1 ); }
.mui-table-view{margin-bottom:0;}
.footer .left{width:20%;float:left;i{width: 100%;text-align:center; display: inline-block;height: 50px; line-height: 50px;font-size:33px;}.icon-qq{ color: #4cafe9;}.icon-weixin{color: #47db4e}}
.top-one{background:#f0f7ff;padding:19px 12px 0;.touxiang{width:72px;min-height:72px;margin-right:12px;}.bot-sub{font-size:12px;color:#727374;line-height:50px;i{margin-right:6px;}}.top-sub{position:relative;img{position: relative;left: 5px;height: 14px;}.star{position:absolute;right:15px;top:15px;color:#fff;font-size: 12px;width:48px;height:48px;border-radius:50%;background:#469dc8; line-height: 48px;text-align: center;}padding:11px;font-size: 16px;font-weight:700;line-height: 26px;span{font-size:12px;color:#a8a9ab;}}
}
.top-two{background:#f0f7ff;padding:0 12px 18px;.mui-table-cell{background:#fff;height:98px;font-size:20px;color:#469dc8;text-align:center;padding: 32px 0;}}
.staradd{background:#8c8986 !important;}
.footer{position: fixed;bottom: 0;width: 100%;background: #fff;}
#person-detail .mui-content{height:auto;margin-top:-67px;}
.top-one .touxiang{width: 72px;height: 72px;border-radius: 50%;}
.contactus a{display:block;width:100%;height:100%;color:#fff; }
</style>
