<template>
  <div id="post">
       <x-header title="发帖" class="fixed-top" :left-options="{backText: ''}">  <a slot="right"   @click="post_handle"><i class="iconfont icon-add-more" style="top: 23px;
    position: relative;"></i></a></x-header>
    <!-- <p-header title="发帖" cls_icon="icon-add-more" @click="post_handle" is_r='true'></p-header> -->
    <div class="post-main content " :style="{'-webkit-overflow-scrolling': scrollMode}" >
        <!-- <tab-container-item  class="tab-header  c-ter bg-fff clearfix">
            <div class="tab-header-item" @click="tab_handle('kh')" :class="tabType=='kh'?'tab-header-on':''">客户</div>
            <div class="tab-header-item" @click="tab_handle('jl')" :class="tabType=='jl'?'tab-header-on':''">经理</div>
        </tab-container-item> -->
<!-- <div class="bt-bg"></div> -->
<div class="nav tab-header  c-ter bg-fff ">  
     <div class="tab-header-item" @click="tab_handle('kh')" :class="tabType=='kh'?'tab-header-on':''">客户</div>
      <div class="tab-header-item" @click="tab_handle('jl')" :class="tabType=='jl'?'tab-header-on':''">经理</div>
      <!-- <mt-button size="small" @click.native.prevent="active = 'tab-container1'">tab 1</mt-button>  
      <mt-button size="small" @click.native.prevent="active = 'tab-container2'">tab 2</mt-button>  
      <mt-button size="small" @click.native.prevent="active = 'tab-container3'">tab 3</mt-button>   -->
    </div>  
        <!-- <div class="page-tab-container"> -->
        <mt-tab-container v-model="tabType" :swipeable="true" class="bg-dh">
            <mt-tab-container-item id="kh"><!-- :autoFill="true" topPullText="↓下拉刷新" topDropText="↑释放更新" topLoadingText="刷新中 ..." :topDistance="60" -->
            <div style="height:100%;overflow: scroll;">
             <mt-loadmore :top-method="khLoadTop"  :bottom-method="khLoadBottom"   ref="khLoadmore"
              :bottom-all-loaded="allLoaded" :auto-fill="false"  topPullText="↓下拉刷新"    topLoadingText="刷新中 ..." 
               topDropText="↑释放更新" >
                    <ul class="tab-item" >
                        <li class="bg-fff" v-for="(i,index) in data" :key="index">
                            <div class="tab-item-content">
                                    <router-link :to="{path:'/post/post-detail',query:{id:i.id}}" class='itemwrap' tag='div'>
                                <h4 class="tab-item-title one-1">
                                    <span class="c-ff6800">{{i.product_type}}</span>{{i.title}}
                                    <i class="iconfont icon-youjiantou"></i>
                                </h4>
                                    </router-link>
                                <div class="tab-item-msg flex">
                                        <div class="tab-item-sq">
                                            <p class="c-ff6800 fs-22">{{i.apply_money}}</p>
                                            <span class="fs-14 c-888">申请金额</span>
                                        </div>
                                        <div class="tab-item-sq">
                                            <p class="c-ff6800 fs-22">{{i.loan_limit}}</p>
                                            <span class="fs-14 c-888">借款期限</span>
                                        </div>
                                        <div class="tab-item-btn r-ter">
                                            <button class="btn-bg1 c-fff fs-16" v-show='i.bid_num!=0&&i.is_buy==0' @click='getordernow(i.grab_icon,i.id,index) '>抢单</button>
                                            <button class="btn-bg1 c-fff fs-16 finishorder" v-show='i.bid_num!=0&&i.is_buy==1' >已抢单</button>
                                            <button class="btn-bg1 c-fff fs-16 finishorder" v-show="i.bid_num==0">已抢完</button>
                                            <p class="c-666 fs-12">可抢次数：<span class="c-ff6800">{{i.bid_num}}</span>次</p>
                                        </div>
                                </div>
                            </div>    
                        </li>
                    </ul>
				</mt-loadmore>
            </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="jl">
                <div style="height:100%;overflow: scroll;">
                 <mt-loadmore :top-method="jlLoadTop"  :bottom-method="jlLoadBottom"   ref="jlLoadmore"
                     :bottom-all-loaded="allLoaded" :auto-fill="false"  :topDistance="0">
                       <ul class="tab-item" >
                        <li class="bg-fff" v-for="(i,index) in datajl" :key="index">
                            <div class="tab-item-content">
                                    <router-link :to="{path:'/post/post-detail',query:{id:i.id}}" class='itemwrap' tag='div'>
                                <h4 class="tab-item-title one-1">
                                    <span class="c-ff6800">{{i.product_type}}</span>{{i.title}}
                                    <i class="iconfont icon-youjiantou mui-pull-right"></i>
                                </h4>
                                </router-link>  
                                <div class="tab-item-msg flex">
                                        <div class="tab-item-sq">
                                            <p class="c-ff6800 fs-22">{{i.apply_money}}</p>
                                            <span class="fs-14 c-888">申请金额</span>
                                        </div>
                                        <div class="tab-item-sq">
                                            <p class="c-ff6800 fs-22">{{i.loan_limit}}</p>
                                            <span class="fs-14 c-888">申请日期</span>
                                        </div>
                                        <div class="tab-item-btn r-ter">
                                            <button class="btn-bg1 c-fff fs-16" v-show='i.bid_num!=0&&i.is_buy==0' @click='getordernow(i.grab_icon,i.id)'>立即抢单</button>
                                            <button class="btn-bg1 c-fff fs-16 finishorder" v-show='i.bid_num!=0&&i.is_buy==1' >已抢单</button>
                                            <button class="btn-bg1 c-fff fs-16 finishorder" v-show="i.bid_num==0">已抢完</button>
                                            <p class="c-666 fs-12">可抢次数：<span class="c-ff6800">{{i.bid_num}}</span>次</p>
                                        </div>
                                      
                                </div>
                            </div>    
                        </li>
                    </ul>
                </mt-loadmore>
              </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>

    <mt-popup v-model="popupVisible" modal="true" position="top">{{reloadState}}</mt-popup>
  </div>
</template>

<script>
import pHeader from "@/components/header/header-post"
import { Lazyload,TabContainer, TabContainerItem,LoadMore,Popup,Toast, MessageBox } from 'mint-ui'
import {XHeader} from 'vux'

export default {
    name:"post",
     components:{
        pHeader,Lazyload,TabContainer, TabContainerItem,LoadMore,Popup,XHeader
    },
    data(){
        return {
            users:localStorage.getItem('users')?(JSON.parse(localStorage.getItem('users'))):'',
            reloadState:'',
            tabType:"kh",
            popupVisible:false,
            data:[],
            datajl:[],
            topStatus: '',
            bottomStatus:'',
            allLoaded: false,
             scrollMode:"auto",
             bottomText: '',
             loading:false,
             jlLoading:false,
             totalpage:1,
            page:1,
            firstvisited:false,
        }
    },
   
    methods:{
        post_handle(){
            if(this.tabType=='kh'){
                if(this.users.is_manager=='1'){
                    Toast("请选择经理后发帖");
                    return false;
                };
                this.$router.push("/post/post-content");
            }else if(this.tabType=='jl'){
                 if(this.users.is_manager!='1'){
                    Toast("请选择客户后发帖");
                    return false;
                };
                this.$router.push("/post/post-content-manager");/* /loan/push-product */
            }
        },
        tab_handle(type){
            this.tabType = type;
            if(type=='kh'){
                    this.firstvisited==true;
                    this.getkhlist();
                    return false;
            }
            else if(type=='jl'){
                this.firstvisited==true;
                  this.getjllist();
                    return false;
            }
        },
        handleTopChange(status) {
            console.log(status)
            this.topStatus = status;
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
      /*   khLoadmore() {
            this.khLoading= true;
        }, */
        khLoadTop() {
            this.page=1;
            this.getkhlist();
        },
        khLoadBottom(){
            this.page++;
            this.getkhlist();
        },
      /*   jlLoadmore() {
            this.jlLoading = true;
        }, */
        jlLoadTop() {
            this.page=1;
            this.getjllist();
        },
        jlLoadBottom(){
            this.page++;
            this.getjllist();
        },
        getordernow(cost,id,index){
            // console.log(cost,id,index)
            var sendmsg="<div class='alert-cost'>本次需要花费<br/>"+(Number(cost)||0)+"金币</div>";
               MessageBox.confirm(sendmsg).then(action => {
                        this.$axios.post('/api/Loan_post/grab_loan_post',`data=${JSON.stringify({
                            session_id:this.users.session_id,
                            userId:this.users.userId,
                            id:id})}`).then(res=>{
                            // console.log(res)
                            if(res.code==200){
                                Toast('抢单成功');
                                console.log(index)
                                    this.data[index].is_buy=1;
                                    --this.data[index].bid_num;
                                     this.datajl[index].is_buy=1;
                                    --this.datajl[index].bid_num;
                            }
                            else{
                                Toast(res.msg)
                            }
                        })
                });
        },
        getkhlist(){
            this.$axios.post('/api/Loan_post/loan_post_list',`data=${JSON.stringify({
                            session_id:this.users.session_id,
                            userId:this.users.userId,
                            type:'MEMBER',
                            page:this.page
                            })}`).then(
                            res=> {if(res.code==200){
                                     /*     if(res.data==''){
                                            this.loading=true;
                                            $('.mint-loadmore-bottom').text("我是有底线的");
                                            this.$refs.khLoadmore.onBottomLoaded();
                                            this.allLoaded=true;
                                            return false;
                                         }else{
                                             this.allLoaded=false;	
                                         } */
                            this.$nextTick(function () {  
                                var _this=this;
                                        this.data={...this.data,...res.data.list};
                                        let getlength=res.data.list.length;
                                        $('.mint-loadmore-content').css('transform', 'translate3d(0,0,0)')    ;
                                            if(getlength<=res.data.pageSize){
                                                $('.mint-loadmore-bottom').text("暂无更多数据");
                                                    // this.$refs.khLoadmore.onBottomLoaded();
                                                    this.allLoaded=true;
                                            };
                                     if(this.page>1){
                                            setTimeout(()=>{
                                                _this.popupVisible = true;
                                                _this.reloadState ="加载成功";
                                                _this.$refs.khLoadmore.onBottomLoaded();
                                            },1000);
                                            setTimeout(() => {
                                                _this.popupVisible = false;
                                            }, 2000);
                                     }else{
                                        if(this.firstvisited==true){
                                           this.firstvisited=false;
                                           return false;
                                        }
                                            setTimeout(()=>{
                                                _this.popupVisible = true;
                                                _this.reloadState ="刷新成功";
                                                _this.$refs.khLoadmore.onTopLoaded();
                                            },1000);
                                            setTimeout(() => {
                                                _this.popupVisible = false;
                                            }, 2000);
                                     }
                            })            
                                }else if(res.code==401){
                                    this.$router.push('/my/login')
                                }
                            });
        },
        getjllist(){
              this.$axios.post('/api/Loan_post/loan_post_list',`data=${JSON.stringify({
                        session_id:this.users.session_id,
                        userId:this.users.userId,
                        type:'LENDERS',
                        page:this.page
                    })}`).then(
                      res=> {if(res.code==200){
                         /*  console.log($('.mint-loadmore-content').height(),$('.mint-loadmore').height())
                          if($('.mint-loadmore-content').height()>$('.mint-loadmore').height()){
                              $('.mint-loadmore-bottom').hide();
                              return false;
                          } */
                                       /*   if(res.data==''){
                                            this.allLoaded=true;	
                                            // this.loading=true;
                                            // $('.mint-loadmore-bottom').text("我是有底线的");
                                            this.$refs.jlLoadmore.onBottomLoaded();
                                            return false;
                                         }else{
                                             this.allLoaded=false;	
                                         } */
                            this.$nextTick(function () {  
                                     this.datajl={...this.datajl,...res.data.list};
                                        var _this=this;
                                           let getlength=res.data.list.length;
                                            if(getlength<=res.data.pageSize){
                                                $('.mint-loadmore-bottom').text("暂无更多数据");
                                                    this.$refs.khLoadmore.onBottomLoaded();
                                                    this.allLoaded=true;
                                            }
                                     if(this.page>1){
                                            setTimeout(()=>{
                                                _this.popupVisible = true;
                                                _this.reloadState ="加载成功";
                                                _this.$refs.jlLoadmore.onBottomLoaded();
                                            },1000);
                                            setTimeout(() => {
                                                _this.popupVisible = false;
                                            }, 2000);
                                     }else{
                                        if(this.firstvisited==true){
                                           this.firstvisited=false;
                                           return false;
                                        }
                                            setTimeout(()=>{
                                                _this.popupVisible = true;
                                                _this.reloadState ="刷新成功";
                                                _this.$refs.jlLoadmore.onTopLoaded();
                                            },1000);
                                            setTimeout(() => {
                                                _this.popupVisible = false;
                                            }, 2000);
                                     }
                            })            
                                }
                            });
        }
    },
    mounted(){
        // console.log(this.users.is_manager)
                this.firstvisited=true;
                this.getkhlist();
    }
}
</script>

<style scoped>
    #post .tab-header{padding: 0 15px;height:47px;line-height:45px;/* border-bottom: 1px solid #eee;color:#666; */width:100%;z-index:10;overflow:hidden;}
    #post .tab-header .tab-header-item{width:50%;float:left;}
    .tab-header-on{border-bottom: 2px solid #6fc6f1;color:#6fc6f1;}
    .tab-item li{padding: 30px 15px;padding-right:0;padding-bottom: 0;}
    .tab-item-content{border-bottom: 1px solid #eee;padding-right: 15px;}
    .tab-item li:last-child .tab-item-content{border-bottom:0;padding-bottom: 10px;}
    .tab-item-title{font-size: 16px;}
    .tab-item-title span{font-size: 14px;display:inline-block;height:30px;padding:0 10px;border:1px solid #469dc8;line-height: 29px;border-radius:3px;margin-right: 10px;}
    .tab-item-sq,.tab-item-btn{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;padding-top: 30px;}
    .tab-item-sq p{margin-bottom:10px;}
    .tab-item-btn button{border:none;width:85px;height:40px;border-radius:40px;margin-bottom: 10px;box-shadow: 0px 3px 3px  #8fd6f4;}
    .bg-dh{padding-top:0px;margin-top: 0px;}
    .itemwrap{display: flex;width: 100%;}
    .itemwrap h4{width:100%;}
    .icon-youjiantou{float:right;}
    #post .finishorder{/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#c5c5c5+0,a1a1a1+100,207cca+100,7db9e8+100,a1a1a1+100,207cca+102 */
    background: #c5c5c5; /* Old browsers */
    background: -moz-linear-gradient(left,  #c5c5c5 0%, #a1a1a1 100%, #207cca 100%, #7db9e8 100%, #a1a1a1 100%, #207cca 102%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  #c5c5c5 0%,#a1a1a1 100%,#207cca 100%,#7db9e8 100%,#a1a1a1 100%,#207cca 102%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  #c5c5c5 0%,#a1a1a1 100%,#207cca 100%,#7db9e8 100%,#a1a1a1 100%,#207cca 102%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c5c5c5', endColorstr='#207cca',GradientType=1 ); /* IE6-9 */
    box-shadow: 0px 3px 3px #cec7c2;}
    .bt-bg{height: 50px;background:green;width: 100%;display: block;}
    .post-main{height:100%;}
</style>


<style>
    /* #post .mint-tab-container-item{overflow:auto;} */
    #post{height:100%;width:100%;}
    #post .mint-tab-container{height:100%;overflow-y:auto;padding-top:48px;}
    #post .mint-tab-container-wrap,#post .mui-content{height: 100%;}
    #post .mint-loadmore{height: 100%;overflow-y: auto;}
	#post .mint-loadmore-top,#post .mint-loadmore-text{font-size: 14px;}
	#post .v-modal{background:transparent;}
	/* #post .mint-popup{height:70px;line-height: 84px;background: rgba(0,0,0,.6);width: 100%;text-align: center;opacity: 1;color: #fff;} */
	#post .mint-popup-top{z-index: 999999999 !important;}
	#post .page-infinite-loading{text-align: center;margin-bottom: 0;padding-top:10px;}
    #post .page-infinite-loading span{display: inline-block;vertical-align: middle;margin-right: 5px;}
    #post .mint-loadmore-top{margin-top:5px;}
    #post .refresh{height:50px;line-height:50px;}
    .mint-loadmore-bottom{font-size: 14px;margin-top: 0;margin-bottom: 10px;color: #8f8f94;}
    #post .mint-loadmore-top {margin-top: -48px;}
    #post .mint-popup {height: 30px;line-height: 30px;background: rgba(0,0,0,.6);width: auto;text-align: center;opacity: 1;top: 50%;color: #fff;padding: 0 10px;border-radius: 4px;}
    #post .tab-header{top:67px;position:fixed;width:100%;}
</style>
