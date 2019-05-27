<template>
	<div id="share" class="wrap bg-f0" >
        <x-header :left-options="{showBack: false}">分享</x-header>
		<!-- <mycenter-web :target="$route.query.link"></mycenter-web> -->
		<div class="main">
            <div class="banner-img"><img src="../../../../assets/images/yaoqing.png" alt="" width="100%"></div>
            <div class="card-self">
                <!-- <i class="imgwrap"><img src="../../../../assets/images/erweima.png" alt=""></i> -->
                <!-- <input id="text" type="text" value="http://www.runoob.com" style="width:80%" /><br /> -->
                <div class="invitecode">
                    <qrcode :value="'http://www.qyy2018.com/api/my_invite/show_register?invite_code='+users.invite_code" type="img"></qrcode>
                </div>
                <h6>保存二维码分享给好友</h6>
                <h5><span class="yqm">专属邀请码</span><span class="tel">{{users.invite_code}}</span></h5>
                <div class="content-share">
                    <p>1.分享APP给好友。</p>
                    <p>2.好友进行注册时,填写您的邀请码。</p>
                    <p>3.推荐好友注册后,自动升级为VIP会员。</p>
                </div>
            </div>
            <ul class="footer">
                <li v-for="(item,index) in sharelist " :key="index"  @click="shareHref(item.type)">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.icon"></use>
                    </svg>
                    <span>{{item.name}}</span>
                </li>
            </ul>
		</div>
      
	</div>
</template>

<script>
import mycenterWeb from "@/components/webview/mycenterweb"
import {XHeader} from "vux"
import { Qrcode, Divider } from 'vux'

export default {
  name: "credit_circle",
  data() {
    return {
    users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
    title: "分享",
    back:true,
    sharelist:[
            {
              icon:'#icon-weixin',
              name:'微信',
               type:'weixin'
            },{
                icon:'#icon-pengyouquan',
                name:'朋友圈',
                type:'weixinFriend'
            },{
                icon:'#icon-qq',
                name:'QQ',
                 type:'qq'
            }/*,{
                icon:'#icon-xinlangweibo',
                name:'新浪微博' ,
                type:'sinaweibo'
            },{
                icon:'#icon-tengxunweibo-copy',
                name:'腾讯微博' ,
                type:'tencentweibo'
            }*/],
            shares:null,
            s:[],
            qrcode:'',
    };
  },
  components: {
    XHeader,mycenterWeb, Qrcode, Divider
  }, 
 mounted(){
                    if(window.plus){
						this.plusReady();
					}else{
						document.addEventListener('plusready', plusReady, false);
					}
   },
   methods:{  
       plusReady(){
				this.updateSerivces();
		}, 
   
       updateSerivces() {//更新分享服务
            plus.share.getServices((s)=>{
                // console.log("更新服务",JSON.stringify(s));
                this.shares={};
                for (var i in s) {
                    var t = s[i];//一个{}
                    this.shares[t.id] = t;//这个shares下面的id属性wexin对应这个json
                    console.log("shares",JSON.stringify(this.shares));
                }
                console.log("获取分享服务列表成功");
            }, function(e) {
                console.log("获取分享服务列表失败：" + e.message);
            });
        },
       shareHref(item){//下面的5个按钮 3
            switch (item) {
                case 'weixin':/*微信*/
                        this.shareAction({title:'微信好友',s:this.shares['weixin'],x:'WXSceneSession'});  
                    break;
                case 'weixinFriend':/*微信朋友圈*/
                         this.shareAction({title:'微信朋友圈',s:this.shares['weixin'],x:'WXSceneTimeline'});  
                    break;
                case 'qq':
                        this.shareAction({title:'QQ',s:this.shares['qq']});
                    break;
                case 'tencentweibo':
                        this.shareAction({title:'腾讯微博',s:this.shares['tencentweibo']});
                    break;
                default:
                        this.shareAction({title:'新浪微博',s:this.shares['sinaweibo']});
                    break;
            } 
        },
        shareHrefs() {
                        var _this=this;
                        //顶部的分享1分享按钮点击事件
            	        var shareBts=[];
						// 更新分享列表
						var ss=this.shares['weixin'];
						if(navigator.userAgent.indexOf('qihoo')<0){  //在360流应用中微信不支持分享图片
							ss&&ss.nativeClient&&(
                                shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}),
                                shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'})
                            );
						};
						ss=this.shares['qq'];
                        ss&&ss.nativeClient&&shareBts.push({title:'QQ',s:ss});
                        ss=this.shares['sinaweibo'];
                        ss&&shareBts.push({title:'新浪微博',s:ss});
                        ss=this.shares['tencentweibo'];
						ss&&shareBts.push({title:'腾讯微博',s:ss});
                        // 弹出分享列表
                        console.log("shareBts：",JSON.stringify(shareBts))
						shareBts.length>0?plus.nativeUI.actionSheet({title:'分享',cancel:'取消',buttons:shareBts}, function(e){
                            console.log(e.index)
							(e.index>0)&&_this.shareAction(shareBts[e.index-1]);
						}):plus.nativeUI.alert('当前环境无法支持分享操作!');
        }, 
        shareAction(sb,bh) { //用户分享信息前需要对分享平台是否授权过进行判断，如果已经授权则可直接分享消息，如没有授权则需要调用已保存的分享对象的“authorize”接口对客户端进行授权。授权成功后再调用分享接口分享消息。
                console.log("分享操作shareAction：",JSON.stringify(sb));
                // if (!s) {
                // var msg={content:this.sharecontent.value,extra:{scene:sb.x}};
            var msg = {
                content: '分享-详情',
                href: 'http://www.qyy2018.com/api/my_invite/show_register?invite_code='+this.users.invite_code,
                title: '信用卡代还APP,不来就OUT了',
                content: '推荐使用美卡宝APP,马上解决您的资金烦恼，同时让您有赚不完的钱!',
                thumbs: ['http://www.qyy2018.com/uploads/img/index3.png'],
                pictures: [''],
                extra: {
                    scene:sb.x
                }
            };

            if(msg.extra.scene == "WXSceneSession" || msg.extra.scene == "WXSceneTimeline" ){
                msg.type = "web";
            }
                console.log("msg shareAction：",JSON.stringify(msg), sb.s);
                        if(sb.s.authenticated){
							    // mui.toast('---已授权---');
							 this.shareMessage(msg, sb.s);
						}else{
							    // mui.toast('---未授权---');
							sb.s.authorize(function(){
								 this.shareMessage(msg,sb.s);
							}, function(e){
							    mui.toast('认证授权失败：'+e.code+' - '+e.message);
							});
						}
        },
        shareMessage(msg, s) {//4发送分享消息 
                console.log('shareMessage',JSON.stringify(msg))
                s.send(msg, function(){
                    mui.toast( "分享到\""+s.description+"\"成功！ " );
                }, function(e){
                    mui.toast( "分享到\""+s.description+"\"失败: "+e.code+" - "+e.message );
                });
        }
   }
};
   
</script>

<style scoped lang="less">
@l:left;
@gray:#555;
@lig:#e0e0e0;
@lit:#d1d1d1;
@ora:#469dc8;
@lc:#cccccc;
@aa:#aaaaaa;

.invitecode{width:100%;text-align:center;}
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
.pl(@p){padding-left:@p}
.bg(@b){background:@b}
.fw(@w){font-weight:@w}
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
.main h6{
    text-align: center;
    line-height: 50px;
    height:50px;
    display:block;
    }  
.banner-img{padding-top: 64px;}
.card-self{width: 90%;margin: -113px auto 20px;background:#fff;position:relative;padding: 15px;
 
    .imgwrap{   
     width: 160px;
    height: 160px;
    display: block;
    padding: 5px;
    border: 1px solid @aa;
    border-radius:10px;
    margin-left: 50%;
    /* transform: translateX(-50%); */
    margin:o auto;
    img{.w(150px);.h(150px);}
    }
    h5{border:1px solid @lig;border-radius:25px;.w(80%);.h(36px);.lh(36px); margin-left: 50%;
    /* transform: translateX(-50%); */overflow:hidden;
        position: relative;
    left: -40%;
    .yqm{background:@lig;    line-height: 38px;
    .c(#fff);
    .pl(5px);
    height:100%;
    border-radius:25px 0 0 25px;
    display: inline-block;
    font-size: 13px;
    width: 40%;
    padding-left: 15px; }.tel{.pl(5px)}
    }
}

.content-share{.p(10px);p{.p(0 10px);margin:0;}}
.footer{
    width: 100%;
    // position: fixed;
    // height:56px;
    // height: 50px;
    // padding:10px;
    // z-index: 100;
    background:#fff;
        li{width:33%;float:left;text-align: center;.fz(12px);
            svg{width:100%;width: 100%;
            font-size: 36px;
            padding-top: 5px;}
        }
        .qq{
        font-size: 14px;
        position: relative;
        top: 2px;
        }    
    }

</style>