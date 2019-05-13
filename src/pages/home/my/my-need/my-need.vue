<template>
  <div id="need" >
    <!-- <p-header title="我的需求"  is_r='is_r'></p-header> -->
    <x-header :left-options="{backText: ''}">我的需求</x-header>
    <div class="main-need " style="height:100%;overflow: scroll;">
                <mt-loadmore :top-method="LoadTop"  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  :distanceIndex="5" :autoFill="false" 
                topPullText="↓ 下拉刷新" topDropText="↑ 释放更新" topLoadingText="刷新中 ..." :topDistance="60" ref="jlLoadmore">
                       <ul class="tab-item"> <!-- v-infinite-scroll="LoadMore" infinite-scroll-disabled="khLoading" :infinite-scroll-distance="50" -->
                            <li class="bg-fff" v-for="(item,index) in list" :key="index">
                                <div class="tab-item-content">
                                        <router-link :to="{path:'/post/post-detail',query:{id:item.id}}" class='itemwrap' tag='div'>
                                    <h4 class="tab-item-title one-1">
                                        <span class="c-ff6800">{{item.product_type}}</span>{{item.title}}
                                        <i class="iconfont icon-youjiantou mui-pull-right"></i>
                                    </h4>
                                    </router-link>  
                                    <div class="tab-item-msg flex">
                                            <div class="tab-item-sq">
                                                <p class="c-ff6800 fs-22">{{item.apply_money}}</p>
                                                <span class="fs-14 c-888">申请金额</span>
                                            </div>
                                            <div class="tab-item-sq">
                                                <p class="c-ff6800 fs-22">{{item.loan_limit}}</p>
                                                <span class="fs-14 c-888">申请日期</span>
                                            </div>
                                            <div class="tab-item-btn r-ter">
                            
                                                <p class="c-666 fs-12">已抢次数：<span class="c-ff6800">{{5-Number(item.bid_num)}}</span>次</p>
                                            </div>
                                        
                                    </div>
                                </div>    
                            </li>
                        </ul>
                        <p class="page-infinite-loading">
                            <span v-if="more_state==1">
                                <mt-spinner type="fading-circle"></mt-spinner>
                                加载中...
                            </span>
                            <span v-if="more_state==2">暂无更多数据</span>
                        </p>
                </mt-loadmore>
         
    </div>

    <mt-popup v-model="popupVisible" modal="true" position="top">{{reloadState}}</mt-popup>
  </div>
</template>

<script>
import pHeader from "@/components/header/header-post"
import { Lazyload,TabContainer, TabContainerItem,LoadMore,Popup,Toast, MessageBox, } from 'mint-ui'
import  { XHeader } from 'vux'

export default {
    name:"post",
     components:{
        pHeader,Lazyload,TabContainer, TabContainerItem,LoadMore,Popup,XHeader
    },
    data(){
        return {
            users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
            reloadState:'',
            tabType:"kh",
            popupVisible:false,
            list:[],
            is_r:true,
            page:1,
            jlloading:false,
            allLoaded:false,
            more_state:1,
        }
    },
    methods:{
        LoadTop() {
            	this.page = 1;
                this.getlist(this.page,()=>{
                    this.reloadState = "刷新成功";
                    this.popupVisible = true;
                    this.$refs.jlLoadmore.onTopLoaded();
                    this.more_state = 1;
                    // this.loadMore();
                    setTimeout(()=>{
                        this.popupVisible = false;	
                    },2000);
                },true)
        },
        loadBottom() {
            var list=this.list;
            this.page++;
            // console.log(this.page);
            // 加载更多数据
            this.allLoaded = true;// 若数据已全部获取完毕
            this.$refs.jlLoadmore.onBottomLoaded();
            setTimeout(() => {
                this.getlist(this.page,()=>{
                    this.loading = false;
                });
            }, 1000);
        },
        getlist(page = 1,callback,reload){
            const {userId, session_id} = this.users;
             this.$axios.post('/api/Loan_post/my_loan_post_list',`data=${JSON.stringify({userId, session_id,page:page})}`).then(
                    results=> {if(results.code==200){
                         callback&&callback();
                            // this.list=res.data.list;
                            // var i;
                            // for( i in res.data.list){
                            //     this.list.push(res.data.list[i]);
                            // };
                           if(reload){
                                this.list = results.data.list;
                                this.reloadState = 1;
                                return false;
                            }
                            if(results.data.list.length<results.data.pageSize){
                                    this.reloadState = "没有更多数据";
                                    this.more_state = 2;
                                    this.loading=true;
                                    this.popupVisible = true;//弹出框
                                    this.allLoaded =true;
                                     setTimeout(()=>{
                                        this.popupVisible = false;	
                                    },1000);
                            }else{
                                    this.reloadState = "加载中";
                                    this.more_state = 1;
                                    this.loading=false;
                                    this.popupVisible = true;
                                    this.allLoaded = false;
                            };
                            this.$nextTick(function () { 
                                this.list = [...this.list,...results.data.list];
                            });
                        }
                    });
        },
  
    },
    mounted(){
                this.getlist();
    },
    computed:{
        //  list:function(){
        //    return   this.list.push(...list);
        //  },
    }
}
</script>

<style scoped>
    #post{background: #f0f0f0;width: 100%;position: fixed;top:0;bottom:55px;overflow-y: auto;}
    #post .tab-header{padding: 0 15px;height:45px;line-height:45px;border-bottom: 1px solid #eee;color:#666;position:fixed;top:70px;left:0;width:100%;z-index:999;}
    #post .tab-header .tab-header-item{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;box-sizing: border-box;}
    .tab-header-on{border-bottom: 2px solid #469dc8;color:#469dc8;}
    .tab-content{margin-top:55px;}
    .tab-item li{padding: 15px;padding-right:0;}
    .tab-item-content{border-bottom: 1px solid #eee;padding-right: 15px;}
    .tab-item li:last-child .tab-item-content{border-bottom:0;padding-bottom: 10px;}
    .tab-item-title{font-size: 16px;}
    .tab-item-title span{font-size: 14px;display:inline-block;height:30px;padding:0 10px;border:1px solid #469dc8;line-height: 29px;border-radius:3px;margin-right: 10px;}
    .tab-item-sq,.tab-item-btn{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;padding-top: 30px;}
    .tab-item-sq p{margin-bottom:10px;}
    .tab-item-btn button{border:none;width:85px;height:40px;border-radius:40px;margin-bottom: 10px;box-shadow: 0px 3px 3px  #8fd6f4;}

    .tj-head{margin: 15px 0;border-radius: 50%;width:90px;height:90px;border-radius: 50%;}
	.tj-head img{width: 90px;height: 90px;border-radius: 50%}
	.tj-name{font-size: 16px;font-weight: 400;}
	.tj-name img{width: 14px;height: 16px;vertical-align: middle;margin-top: -3px;margin-left: 5px;}
	.tj-hot{padding-top: 3px;}
	.tj-hot span{font-size:14px;}

    .rm-eanking{padding-top:15px;}
    /* .rm-eanking-list{padding-top:55px;} */
	.rm-eanking-list li{margin-left: 15px;border-bottom: 1px solid #eee;padding:20px 0;padding-right: 15px;}
	.rm-eanking-list li:last-child,.drgl-list li:last-child{border:none;}
	.rm-eanking-list li div:first-child{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;}
	.rm-eanking-list li div:last-child{width: 90px;}
	.rm-eanking-list p{margin-bottom: 0;}
	.rm-eanking-list .tj-name{margin:15px 0;margin-top: 18px;}
	.rm-eanking-list  .tj-head{margin:0;}
	.rm-money{font-size:25px;padding-top: 15px;}
	.rm-eanking-list li div:last-child .rm-paiming{width: 30px;text-align: center;position: relative;height: 22px;margin:0 auto;}
	.rm-paiming i{font-size: 30px;}
    .rm-paiming i span{font-size: 12px;color: #fff;position: absolute;left:0;top:0;right:0;padding-top: 4px;}
    .tab-item-msg .tab-item-sq p{overflow: hidden;font-size: 20px;text-overflow:ellipsis;white-space: nowrap;}
    .icon-youjiantou{ line-height: 30px; font-size: 20px;}
    .itemwrap{    display: flex;width: 100%;}
    .itemwrap h4{width:100%;}
    .icon-youjiantou{float:right;}
    #need .finishorder{/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#c5c5c5+0,a1a1a1+100,207cca+100,7db9e8+100,a1a1a1+100,207cca+102 */
    background: #c5c5c5; /* Old browsers */
    background: -moz-linear-gradient(left,  #c5c5c5 0%, #a1a1a1 100%, #207cca 100%, #7db9e8 100%, #a1a1a1 100%, #207cca 102%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  #c5c5c5 0%,#a1a1a1 100%,#207cca 100%,#7db9e8 100%,#a1a1a1 100%,#207cca 102%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  #c5c5c5 0%,#a1a1a1 100%,#207cca 100%,#7db9e8 100%,#a1a1a1 100%,#207cca 102%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c5c5c5', endColorstr='#207cca',GradientType=1 ); /* IE6-9 */
    box-shadow: 0px 3px 3px #cec7c2;}
    ul.tab-item{padding-top:25px;}
</style>


<style>
    /* #need .mint-tab-container-item{overflow:auto;} */
    #need .mint-loadmore-bottom {display: none;}
    #need .mint-tab-container{height:100%;overflow-y:auto;}
    #need .mint-tab-container-wrap,#need .mui-content{height: 100%;}
    #need .mint-loadmore{height: 100%;overflow-y: auto;}
	#need .mint-loadmore-top,#need .mint-loadmore-text{font-size: 14px;}
	#need .v-modal{background:transparent;}
	#need .mint-popup{height:70px;line-height: 84px;background: rgba(0,0,0,.6);width: 100%;text-align: center;opacity: 1;color: #fff;}
	#need .mint-popup-top{z-index: 999999999 !important;}
	#need .page-infinite-loading{text-align: center;margin-bottom: 0;padding-top:10px;}
    #need .page-infinite-loading span{display: inline-block;vertical-align: middle;margin-right: 5px;}
    #need .mint-loadmore-top{margin-top:5px;}
    .main-need{position: fixed;top: 0;bottom: 0;width: 100%; overflow-y: auto;z-index: -1;}
    #need .mint-popup {height: 30px;line-height: 30px;background: rgba(0,0,0,.6);width: auto;text-align: center;opacity: 1;top: 50%;color: #fff;padding: 0 10px;border-radius: 4px;}

</style>
