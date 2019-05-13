<template>
	<div id="credit_circle" class="wrap bg-f0" >
		<i-header :title="title" :is_r="back" :share="true" @shares="shareHrefs"></i-header>
		<!-- <mycenter-web :target="$route.query.link"></mycenter-web> -->
		<div class="main">
            <div class="banner-img"><img src="../../../../assets/images/yaoqing.png" alt="" width="100%"></div>
            <div class="card-self">
                <i class="imgwrap"><img src="../../../../assets/images/erweima.png" alt=""></i>
                <h6>长按保存二维码分享给好友</h6>
                <h5><span class="yqm">专属邀请码</span><span class="tel">{{users.mobile}}</span></h5>
                <div class="content">
                    <p>1.分享APP给好友</p>
                    <p>2.好友进行注册时，填写您的邀请码</p>
                    <p>3.好友注册后，您将获得金币奖励</p>
                </div>
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
</template>

<script>
import iHeader from "@/components/header/header-r";
import mycenterWeb from "@/components/webview/mycenterweb"

export default {
  name: "credit_circle",
  data() {
    return {
    users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
    title: "我的邀请码",
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
            },{
                icon:'#icon-xinlangweibo',
                name:'新浪微博' ,
                type:'sinaweibo'
            },{
                icon:'#icon-tengxunweibo-copy',
                name:'腾讯微博' ,
                type:'tencentweibo'
            }],
    //   share:true,
        shares:{},
        s:[],
    //    share: this.$route.query.share || false,
    };
  },
  components: {
    iHeader,mycenterWeb
  }, 
 mounted(){
        mui.plusReady(()=>{
            this.updateSerivces();
        });
   },
   methods:{    
       shareHref(item){//分享到那个地方去3
            switch (item) {
                case 'weixin':/*微信*/
                        this.shareMessage(this.shares['weixin'],'WXSceneSession');  
                    break;
                case 'weixinFriend':/*微信朋友圈*/
                        this.shareMessage(this.shares['weixin'],'WXSceneTimeline');  
                    break;
                case 'qq':
                        this.shareMessage(this.shares['qq']);
                    break;
                case 'tencentweibo':
                        this.shareMessage(this.shares['tencentweibo']);
                    break;
                default:
                        this.shareMessage(this.shares['sinaweibo']);
                    break;
            } 
        },
       updateSerivces() {//更新分享服务
            plus.share.getServices((s)=>{
                console.log(JSON.stringify(s),JSON.stringify(this.shares));
                this.s=s;
                for (var i in s) {
                    var t = s[i];//一个{}
                    this.shares[t.id] = t;//这个shares下面的id属性wexin对应这个json
                }
                this.outSet("获取分享服务列表成功");
            }, function(e) {
                this.outSet("获取分享服务列表失败：" + e.message);
            });
        },
    
        shareHrefs() {//顶部的分享1分享按钮点击事件
            var _this=this;
            var ids = [{
                    id: "weixin", 
                    ex: "WXSceneSession"  /*微信好友*/
                }, {
                    id: "weixin",
                    ex: "WXSceneTimeline" /*微信朋友圈*/
                }, {
                    id: "qq"   /*QQ好友*/
                },{
                    id: "sinaweibo"  /*新浪微博*/
                }, {
                    id: "tencentweibo"   /*腾讯微博*/
                }],
                bts = [{
                    title: "发送给微信好友"
                }, {
                    title: "分享到微信朋友圈"
                }, {
                    title: "分享到QQ"
                }, {
                    title: "分享到新浪微博"
                }, {
                    title: "分享到腾讯微博"
                }];
            plus.nativeUI.actionSheet({
                    cancel: "取消",
                    buttons: bts
                },
                function(e) {
                    var i = e.index;
                    if (i > 0) {
                        _this.shareAction(ids[i-1].id, ids[i - 1].ex);
                    }
                },
            );
        }, 
        shareAction(s, ex) {//用户分享信息前需要对分享平台是否授权过进行判断，如果已经授权则可直接分享消息，如没有授权则需要调用已保存的分享对象的“authorize”接口对客户端进行授权。授权成功后再调用分享接口分享消息。
                this.outSet("分享操作：",s);
                if (!s) {
                    this.outLine("无效的分享服务！");
                    return;
                }
                if (s.authenticated) {
                    this.outLine("---已授权---");
                    this.shareMessage(s, ex);
                } else {
                    this.outLine("---未授权---");
                    s.authorize(function() {
                        this.shareMessage(s, ex);
                    }, function(e) {
                        this.outLine("认证授权失败：" + e.code + " - " + e.message);
                    });
                }
        },
        // shareAction(id, ex) {//2 分享操作
        //    var s = this.shares[id];
        //     if (!id ) {
        //         this.outLine("无效的分享服务！");
        //         return;
        //     }
        //     console.log(id,JSON.stringify(s))
        //     if (s.authenticated) {
        //         this.outSet("---已授权---");
        //          this.shareMessage(id, ex);
        //     } else {
        //         this.outSet("---未授权---");
        //         s.authorize(function() {
        //             this.shareMessage(id, ex);
        //         }, function(e) {
        //             this.outLine("认证授权失败");
        //         });
        //     }
        // },      
        shareMessage(s, ex) {//4发送分享消息 
            console.log('444',JSON.stringify(s))
             var msg = {
                content: '分享-详情',
                href: 'http://www.qyy2018.com/api/my_invite/show_register?invite_code='+this.users.mobile,
                title: '美卡宝开始赚钱了,不来就OUT了',
                content: '推荐使用美卡宝app,下载美卡宝让你有花不完的钱',
                thumbs: ['http://www.qyy2018.com/uploads/img/index.png'],
                pictures: ['http://www.qyy2018.com/uploads/img/index.png'],
                extra: {
                    scene: ex
                }
            };
              s.send( msg, function(){
                    mui.toast( "分享到\""+s.description+"\"成功！ " );
                }, function(e){
                    mui.toast( "分享到\""+s.description+"\"失败: "+e.code+" - "+e.message );
                } );
        },
        outSet(msg) {
            console.log(msg);
        },
        outLine(msg) {
            mui.toast(msg);
        },
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
.banner-img{.mt(75px)}
.card-self{width: 90%;margin: -59px auto 50px;background:#fff;position:relative;padding: 15px;
 
    .imgwrap{   
     width: 160px;
    height: 160px;
    display: block;
    padding: 5px;
    border: 1px solid @aa;
    border-radius:10px;
    margin-left: 50%;
    transform: translateX(-50%);
    margin:o auto;
    img{.w(150px);.h(150px);}
    }
    h5{border:1px solid @lig;border-radius:25px;.w(70%);.h(36px);.lh(36px); margin-left: 50%;
    transform: translateX(-50%);overflow:hidden;
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

.content{.p(10px);p{.p(0 10px);margin:0;}}
.footer{width: 100%;
    position: fixed;
    bottom: 0;
    // height: 50px;
    padding:10px;
    z-index: 100;
    background:#fff;
        li{width:20%;float:left;text-align: center;.fz(12px);
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