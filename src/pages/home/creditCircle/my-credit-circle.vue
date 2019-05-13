<template>
	<div id="my-credit-circle" class="wrap bg-f0 h100p" > 
        <X-header :left-options="{backText:''}">我的信贷圈</X-header>
		<div class="main" ref="main" style="height:100%;overflow: scroll;">        
			<mt-loadmore :top-method="loadTop" :distanceIndex="5"  :autoFill="true" topPullText="↓ 下拉刷新" topDropText="↑ 释放更新" topLoadingText="正在加载 ..." :topDistance="70" ref="loadmore">
					<div class="mui-table-view" >
                        <section class="li bg-f0 clearfix" v-for="(item,index) in list" :key="index" v-if="item.is_my_post===1" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" :infinite-scroll-distance="50">
                            <div class="right-con ">
                                <i class="lazy-c bg-f5 img-wrap-left"><img  alt="" v-lazy="imgUrl+item.head_img"></i>
                                <a href="javascript:void(0);">{{item.nickname}}</a>
                                <div class="main-content-one" ref="addcom"  @click="addcomment(item.id,index)">{{item.content}}</div>
                                <ul class="main-content-two clearfix">
                                    <li class="lazy-c bg-f5 cont-two-li" v-for="(img,index) in item.images" :key="index">
                                        <img alt="" v-lazy="imgUrl+img" data-preview-src="" >
                                    </li>
                                </ul>
                                <div class="main-content-last clearfix">
                                    <span class="fl" ><!-- :class='item.is_likenum==1?"c-ff6800":"c-666"' -->
                                        {{moment(item.addtime*1000).locale('zh-cn').startOf().fromNow()}}
                                         <a href="javascript:void(0);" v-if='item.is_my_post==1' @click="delpost(item.id,index)">删除</a> 
                                    </span> 
                                   
                                    <span class="fr right-content">
                                        <div class="left-comment " :class="index==left&&leftonoff?'':'left-commenthide' ">
                                                <span v-if="item.is_likenum===0" @click="zan(item.id,index)"><i class='iconfont icon-dianzanb'></i>赞</span>
                                                <span v-if="item.is_likenum!=0" @click="zan(item.id,index)"><i class='iconfont icon-dianzanb' ></i>取消</span>
                                                <span @click="addcomment(item.id,index)" ref="addcoms"><i class="iconfont icon-pinglun1"></i>评论</span></div>
                                        <div class="right-comment "  @click.stop="leftid(item.id,index)"><!--@click="common_list(item.id,index)" -->
                                            <i class="iconfont icon-ttpodicon" ></i>{{item.comment_num}}
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div class="main-content-add" >
                                <ul class="main-content-add-con"  >
                                     <div class="dianzan" v-if="comlistshow&&item.id==click_num_id&&item.click_num"><i class='iconfont icon-dianzanb'></i>已有{{item.click_num}}人点赞</div>
                                    <li class="content-com" v-for='(i,n) in comlist ' v-if="comlistshow&&item.id==i.post_id"  :key="n">
                                        <div class="content-inner" @click="addcommentinside(item.id,n,i.id,i.nickname,i.is_my_comment,index)">
                                            <a href="javascript:void(0)">{{i.nickname}}</a>
                                            <span v-if="i.to_user">回复<a href="javascript:void(0)">{{i.to_user}}</a></span>:{{i.content}}</div>
                                        <div class="inner-wrap">
                                        </div>          
                                    </li>
                                    <router-link :to="{path:'/my/my-post-detail',query:{id:item.id}}" >更多回复>></router-link>
                                </ul>
                            </div>    
                        </section>
                        <div class="input-all"  :class="activeinputall?'':'write-phonenum-1000'" ref='inputall'>
                                    <textarea  class="activeinput "  ref="inputfocusfff"  v-model="textmodel"  id="textarea"  v-focus='isFocus'  @blur="offFocus">
                                    </textarea>
                                    <input type="submit" value="发送" class="right-input"  :readonly="read" ref="inputright" @click="buttonAddTodo()"/>
                          </div>
                        <p class="page-infinite-loading">
                            <span v-if="more_state==1">
                                <mt-spinner type="fading-circle"></mt-spinner>
                                加载中...
                            </span>
                            <span v-if="more_state==2">暂无更多数据</span>
                        </p>
					</div>
			</mt-loadmore>
		</div>	
		<mt-popup   position="top" modal="true" v-model="popupVisible" >{{this.reloadState==1?"更新成功":this.reloadState==2?"更新失败":this.reloadState==3?"请求出错":""}}</mt-popup>
	</div>
</template>

<script>
import {LoadMore,Popup,Lazyload, Actionsheet,Toast,MessageBox} from "mint-ui";
import {XHeader} from 'vux'
// import BScroll from 'vue2-better-scroll'
// moment("20111031", "YYYYMMDD").fromNow(); // 6 年前
// moment("20120620", "YYYYMMDD").fromNow(); // 6 年前
// moment().startOf('day').fromNow();        // 15 小时前
// moment().endOf('day').fromNow();          // 9 小时内
//        // 41 分钟前
export default {
    name: "credit_circle",
    data() {
        return {
        users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
        more_state:1,
        left:'',
        leftonoff:false,
        dianzan:[],
        page: 1,
        activeinputall:false,
        reloadState:1,
        loading:false,
        popupVisible:false,
        arrow:true,
        list:[],
        showcommon:false,
        activezan:false,
        textmodel:'',
        listcomdetail:[],
        id:'',
        pid:'',
        idshow:'',
        comlist:[],
        comlistshow:false,
        indexed:'',
        indexn:'',
        touser:'',
        showhuifu:false,
        nickname:'',
        click_num_id:'',
        clientHeight:window.innerHeight,   // 这里是给到了一个默认值 （这个很重要）
        timer:false,
        isFocus:false,
        read:true,
        };
    },
    components: {
        LoadMore,Popup,Lazyload,Actionsheet,XHeader
    }, 
    created() {
        this.getList();
        //点赞状态
        // if(localStorage.getItem('dianzan')=='true'){
        //     this.dianzan=true;
        // }else{
        //     this.dianzan=false;
        // }
    },
    mounted(){  
      this.$nextTick(() => {
      });
    },
    filters: {
       ismycircle: function (value) {
           console.log(value)
            if (!value) return '';
            value =JSON.parse(value) ;
            return value.is_my_post===1;
        }
    },
    methods:{
        getList(page = 1,callback,reload){
            this.$axios.post("/api/Post/post_list",`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                page:page})}`).then(results=>{
                if(results.code==200){
                    callback&&callback();
                    if(reload){
                        this.list = results.data.list;
                        this.reloadState = 1;
                        return false;
                    }
                    if(results.data.list.length<=results.data.pageSize){
                        this.more_state = 2;
                        this.loading = true;
                    }
                    this.list = [...this.list,...results.data.list];
                }else if(results.code==401){
                    this.reloadState = 2;
                      this.$router.push('/my/login');
                };
                    
            }).catch(err=>{
                this.reloadState = 3;
            });
        },
        loadMore(){
            this.page++;
            this.loading = true;
            this.getList(this.page,()=>{
                this.loading = false;
            });
        },
        loadTop(){
            this.page = 1;
            this.getList(this.page,()=>{
                this.popupVisible = true;
                this.$refs.loadmore.onTopLoaded();
                this.more_state = 1;
                this.loadMore();
                setTimeout(()=>{
                    this.popupVisible = false;	
                },2000);
            },true)
        },
        //外面评论
        addcomment(id,index){
            var _this=this;
            this.leftonoff=false;
            this.comlistshow=true;
            this.id=id;
            this.indexed=index;     
            //  var promise = new Promise(function(resolve){
                   _this.activeinputall=true;
                    setTimeout(() => {
                                _this.$refs.inputfocusfff.focus(); 
                                // _this.isFocus=true;
                              let pannel= _this.$refs.inputfocusfff;
                              pannel.scrollIntoView(true);
                              pannel.scrollIntoViewIfNeeded();
                    }, 500);
            // promise.then(function(value){
                //  _this.$refs.inputfocusfff.focus();
            // });
        },
        // inputfocus(ev){
        //     var target=ev;
        //    setTimeout(function(){
        //             target.scrollIntoView(true);
        //        },100);
        // },

        // inputblur(){
        //     this.activeinputall=false; 
        //      $('.mint-tabbar').css('z-index','1');
        //      $('.main').css('bottom','60px');
        // },
        //内容评论弹出框 外层id n序号 评论回复的id
        addcommentinside(id,n,tousers,nicknameusers,comment,index){
            this.id=id;
            this.pid=1;
            this.indexn=n;    
            this.touser=tousers;        
            this.nickname=nicknameusers;
            	if(comment==1){
                    var _this=this;
				MessageBox.confirm('确定删除该评论?').then(action => {
						this.$axios.post('/api/Post/del_my_comment',`data=${JSON.stringify({
                            session_id:this.users.session_id,
                            userId:this.users.userId,
                            id:this.touser,
                            })}`).then((res)=>{
                            if(res.code==200){
								Toast(res.msg);
                                _this.touser='';
                                console.log(_this.list[n].comment_num,n)
                                --_this.list[index].comment_num;
                                if(_this.list[index].comment_num<=0){
                                    _this.list[index].comment_num=0;
                                }
                                _this.common_list(id,n);
                                // _this.comlistshow=true;
                            }else{
                                Toast(res.msg)
                            }
                        }).catch((err)=>{throw err});
				});
				return false;
			}else {
                var _this=this;
                setTimeout(function(){  
                    document.body.scrollTop = document.body.scrollHeight;  
                    // $('.mint-tabbar').css('z-index','-1');
                    // $('.main').css('bottom','0');
                    _this.activeinputall=true;
                },300);  
				return false;
			}
        },
        //点赞
        zan(id,index){
            this.$axios.post('/api/Post/do_likenum',`data=${JSON.stringify({
            session_id:this.users.session_id,
            userId:this.users.userId,
            post_id:id
            })}`).then((res)=>{
            // console.log(res)
            if(res.code==200){
                // console.log(id,index)
                // Toast(res.msg)
                this.leftonoff=false;
                // this.comlistshow=true;
                if(this.list[index].is_likenum===0){
                    this.list[index].is_likenum=1;
                    this.dianzan[index]=false;
                    // localStorage.setItem('dianzan',true);
                    // localStorage.setItem('zanindex',index);
                    ++this.list[index].click_num;
                }else{
                    this.list[index].is_likenum=0;
                    this.dianzan[index]=true;
                    // localStorage.setItem('zanindex',index);
                    // localStorage.setItem('dianzan',false);
                    --this.list[index].click_num;
                }              
            }else{
                Toast(res.msg)
            }
            }).catch((err)=>{throw err});
        },
        //左边的显示
        leftid(id,index){
                this.idshow=id;
                this.left=index;
                this.common_list(id,index);
                // console.log(this.comlist)
        },
        //点击评论发送
        buttonAddTodo(){
         this.activeinputall=false;
            if(!this.textmodel){
                // $('.mint-tabbar').css('z-index','1')
                // $('.main').css('bottom','60px');
                Toast('请输入内容');
                return false;
            };
            if(this.pid!=1){
                this.$axios.post('/api/Post/do_comment',`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                post_id:this.id,
                content:this.textmodel,
                })}`).then((res)=>{
                if(res.code==200){
                  var num=this.indexed;
                     num=Number(num)||0;
                    //  console.log(num);
                    this.comlist.push({nickname:this.users.nickname,content:this.textmodel,post_id:this.id});
                    ++this.list[num].comment_num; 
                    Toast(res.msg);
                    this.getList();
                    this.activeinputall=false;
                    this.textmodel='';
                    //  $('.mint-tabbar').css('z-index','1')
                    //  $('.main').css('bottom','60px');
                }else{
                    this.activeinputall=false;
                    this.textmodel='';
                    //  $('.mint-tabbar').css('z-index','1')
                    //  $('.main').css('bottom','60px');
                    Toast(res.msg)
                }
                }).catch((err)=>{throw err});
                return false;
            }else  if(this.pid==1){
                        this.$axios.post('/api/Post/do_comment',`data=${JSON.stringify({
                            session_id:this.users.session_id,
                            userId:this.users.userId,
                            post_id:this.id,
                            content:this.textmodel,
                            pid:this.touser,
                            })}`).then((res)=>{
                            if(res.code==200){
                            var num=this.indexn;
                                num=Number(num)||0;
                                 this.comlist.push({nickname:this.users.nickname,content:this.textmodel,post_id:this.id,to_user:this.nickname});
                                    Toast(res.msg);
                                this.activeinputall=false;
                                this.textmodel='';
                                // $('.mint-tabbar').css('z-index','1');
                                // $('.main').css('bottom','60px');
                                this.touser='';
                                this.getList();
                            }else{
                                this.activeinputall=false;
                                this.textmodel='';
                                // $('.mint-tabbar').css('z-index','1');
                                // $('.main').css('bottom','60px');
                                Toast(res.msg)
                            }
                            }).catch((err)=>{throw err});
                            return false;
            }
        },
        //评论详细
        common_list(id,index){
            // console.log(id,index,this.idshow)
             if(this.comlistshow==false)
             {
                    localStorage.setItem('idshow',this.idshow);
                    this.comlistshow=true;
                    this.leftonoff=true;
                    this.click_num_id=id;
                    this.$axios.post('/api/Post/v1_see_comment',
                    `data=${JSON.stringify({
                                session_id:this.users.session_id,
                                userId:this.users.userId,
                                id:id,
                                })}`).then((res)=>{
                                if(res.code==200){
                                    this.comlist=res.data.list.comment;
                                    // console.log(this.comlist)
                                }else{
                                    Toast(res.msg)
                                }
                    }).catch((err)=>{throw err});
                    return false;
             }else if(this.comlistshow==true)
             {
                    var getidshow= parseInt(localStorage.getItem('idshow'));
                    // console.log(id,getidshow)
                    if(id===getidshow){//对比是否是点击的相同的输入图标
                        this.comlistshow=false;
                        this.leftonoff=false;
                        this.click_num_id=id;
                        return false;
                    }else{
                        this.comlistshow=true;
                        this.leftonoff=true;
                        this.click_num_id=id;
                        this.$axios.post('/api/Post/v1_see_comment',
                        `data=${JSON.stringify({
                                    session_id:this.users.session_id,
                                    userId:this.users.userId,
                                    id:id,
                                    })}`).then((res)=>{
                                    if(res.code==200){
                                        this.comlist=res.data.list.comment;
                                        // console.log(this.comlist)
                                    }else{
                                        Toast(res.msg)
                                    }
                        }).catch((err)=>{throw err});
                        return false;
                    }
             }
        },
        delpost(id,index){
            	MessageBox.confirm('确定删除该帖子?').then(action => {
						this.$axios.post('/api/Post/del_my_post',`data=${JSON.stringify({
                            session_id:this.users.session_id,
                            userId:this.users.userId,
                            id:id,
                            })}`).then((res)=>{
                            if(res.code==200){
                                Toast(res.msg);
                                this.list.splice(index,1);
                            }else{
                                Toast(res.msg)
                            }
                        }).catch((err)=>{throw err});
				});
        },
        calc:function(){
            document.getElementById('lines').value = document.getElementById('text').value.split("\n").length;
        },
        offFocus:function(){
            this.activeinputall=false;
        },
    },
    watch:{
            textmodel(newVal,oldVal){
                // console.log( this.$refs.inputfocusfff).
                    if(newVal!=''){
                    this.read=false;
                    }else{
                    this.read=true;
                    };
               $(this.$refs.inputfocusfff).css('height', '30px');
              $(this.$refs.inputfocusfff).css('height', (this.$refs.inputfocusfff).scrollHeight);
                // console.log((this.$refs.inputfocusfff).scrollHeight)
                // $('.inputright').css('margin-top',($('#textarea')[0].scrollHeight-30)/2)
            },
            'clientHeight':function(n,o) {
                        if (n<o) {
                                    //  alert("没有");
                                        setTimeout(function(){
                                            this.$refs.inputall.scrollIntoView(true);
                                        },100);
                            }else{
                                    //  alert("窗口高度不一样")
                            }
            },
            'activeinputall':function(n,o){
                if(n===true){
                    $('.mint-tabbar').css('z-index','-1');
                    $('.main').css('bottom','0');
                }else{
                    $('.mint-tabbar').css('z-index','1');
                    $('.main').css('bottom','60px');
                }
            }, 
            dianzanindex(n,o){
                console.log(n,o)
            }
    },    
    computed:{
        dianzanindex(){
            return function(){
                     var zanindex=localStorage.getItem('zanindex');
                    var dianzan=localStorage.getItem('dianzan');
                    if(localStorage.getItem('dianzan')=='true'){
                        return    this.dianzan[zanindex]=true;
                    }else{
                       return  this.dianzan[zanindex]=false;
                    }
            }
        }
    },    
    directives: {
        focus: {
            update:function(el){//组件更新
            //alert(1);
                        //el.focus();
            },
        }
    }, 
}
</script>

<style scoped lang="less">
#my-credit-circle .main {bottom:0;}
.page-infinite-loading{padding-bottom:10px;}
.h(@h){height:@h}
.w(@h){width:@h}
.mt(@mt){margin-top:@mt}
.mr(@mr){margin-right:@mr}
.fz(@f){font-size: @f}
.mui-table-view{background:#f1f1f1; .li{margin-bottom:10px; }}
.mui-table-view:before,.mui-table-view:after{background:transparent;}
#credit_circle {.h(100%)}
.main {top: 70px;}
.top {padding: 30px 15px 20px;i {float: left;.w(60px);.h(60px);.mr(12px);border-radius: 50%;background-size: 100%;overflow: hidden;}img{    width:100%;height:100%;}h4 {font-weight: normal;line-height: 40px;.h(40px);.fz(16px);}h5 {line-height: 20px;.h(20px);.fz(14px)}}
.li {background: #fff;}
.main-content-one {padding-right:15px;line-height: 25px;margin-bottom: 10px;    margin-top: 5px;line-height: 20px;.fz(15px)}
.main-content-two {width: 100%;overflow: hidden;padding-bottom: 15px;li {float: left;height: 100px;width:100px;margin-right: 10px;margin-bottom: 10px;img {width: 100%;height: 100%;}}}
.fl {float: left;}
.fr {float: right;}
.main-content-last {.w(100%);padding-right:10px;.fr {color: #666;}span > i {margin-right: 5px;}}
.comment{background: rgba(23, 14, 14, 0.67);font-style: normal;padding: 7px 15px;color: #fff;display: block;}
.comwrap{width:50%;position:absolute;left:0;}
.activedzan{color:#469dc8;}
.main-content-add{padding:15px 13px 10px 80px;}
.main-content-add-con{background: #f1f1f1;padding-left:8px;padding-right:8px;max-height: 181px;overflow: hidden;position: relative;}
.main-content-add-con li:nth-last-child(1){padding-bottom:8px;}
.main-content-add-con li:first-child{padding-top:8px;}
.main-content-add-con li:first-child:before{height: 0px;width: 0px;content:'';position: absolute;top:-10px;left:15px;border-bottom:5px solid #f0f0f0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid transparent;}
.main-content-add-con>a{position: absolute;top: 156px;left: 0; width: 100%;background: #f0f0f0; height: 25px;padding-left: 10px; font-size: 14px;line-height: 25px;}
.content{width:100%;}
.content-com{position:relative;font-size: 14px;line-height:25px;}
.content-com a{line-height: 20px;}
.content-com .img{position: absolute;left:5px;width: 40px;height:40px;border-radius: 50%;overflow: hidden;}
.content-com .img img{width:100%;height:100%;}
.content-inner{font-size:15px;}
.time-com{font-size:11px;color: #7d7878; line-height: 25px;}
.innercom{line-height: 20px;padding-left: 10px;}
#my-credit-circle .img-wrap-left{width:50px;height:50px;position: absolute;left:10px;top:10px;}
#my-credit-circle .img-wrap-left img{width:100%;height:100%;}
#my-credit-circle .right-con{width: 100%;padding-left:70px;padding-top:20px;position:relative;}
.right-content{position:relative;width:70%;}
.right-comment{position:absolute;right:0;z-index:50;}
.left-comment span{width:81px;display: inline-block;text-align: center;transition:all .3s;}
.left-comment.left-commenthide{width:170px;transition:all .3s;height: 43px;overflow: hidden;transform: translate3d(100%,0,0);opacity: 0;}
.left-comment{width: 170px;transition:all .3s;border-radius: 4px;height:36px;top: -9px;overflow: hidden;background: rgba(0,0,0,0.7);color: #fff;position: absolute;right: 30px;padding: 6px 0;z-index: 30;display: block;font-size: 16px}
.left-comment .iconfont{ position: relative;top: 2px;}
.icon-dianzanb{font-size:24px;}
.icon-pinglun1{font-size:20px;}
.dianzan:before{height: 0px;width: 0px;content:'';position: absolute;top:-10px;left:15px;border-bottom:5px solid #f0f0f0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid transparent;}
.dianzan{padding: 5px;border-bottom: 1px solid #ccc;color: #469dc8;position: relative;}
.dianzan .icon-dianzanb{font-size:20px;}
.main-content-last{font-size: 13px;color: #aaa;}
#textarea{padding:7px;}
a{color:#007aff !important;}
@media screen and (max-width: 375px)and (min-width: 350px){  .main-content-two li {height: 90px;width: 90px;margin-right:3px;margin-bottom: 3px;}}
@media screen and (max-width: 350px){.main-content-two li{height: 80px;width: 80px;margin-right: 3px;margin-bottom: 3px;}}
</style>
<style>
#my-credit-circle .input-all{position: fixed;width:100%;z-index:10000;background:#f0f0f0;bottom:0;padding:5px 2%;min-height:40px;}
#my-credit-circle .input-all .activeinput{max-height:150px;margin-left: 0;text-align: left;height:30px;width:80%;display: block;float:left;border:none;border-bottom: 1px solid #469dc8;background: #f0f0f0;border-radius:0;margin-bottom:0;padding:0;padding-bottom:3px;}
#my-credit-circle .input-all input{height: 30px;width: 15%;background: #469dc8;border: 1px solid #469dc8;float: right;text-align: center;margin-left: 1%;position: absolute;right: 2%;top: 50%;transform: translateY(-50%);}
#my-credit-circle .mint-popup{height:70px;line-height: 70px;background: rgba(0,0,0,.6);width: 100%;text-align: center;opacity: 1;color: #fff;}
#my-credit-circle .mint-popup-top{z-index: 999999999 !important;}
#my-credit-circle .v-modal{background:transparent;z-index: 0;height:70px;}
#my-credit-circle .mint-tab-container{    padding-top: 43px;height:100%;}
#my-credit-circle .mint-loadmore{height: 100%;overflow-y: auto;}
#my-credit-circle .mint-loadmore-top,#my-credit-circle .mint-loadmore-text{font-size: 14px;}
#my-credit-circle .mint-tab-container-wrap,.mui-content{height: 100%;}
#my-credit-circle .page-infinite-loading{text-align: center;margin-bottom: 0;}
#my-credit-circle .page-infinite-loading span{display: inline-block;vertical-align: middle;margin-right: 5px;}
.write-phonenum-1000{bottom:-1000px !important;}
.mui-preview-header {height: 44px;top: 30px;left: 0;}
.mui-preview-header .mui-preview-indicator{line-height:1;width:100%;}
#my-credit-circle  .input-all input[readonly=readonly] {background: #aaa;border: 1px solid #aaa;}

</style>
