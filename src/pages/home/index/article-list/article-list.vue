<template>
	<div id="article-list" class="bg-fff">
		<!-- <r-header title="文章列表" :is_r="true"></r-header> -->
        <x-header :left-options="{backText:''}">文章列表</x-header>
        <div style="height:100%;overflow: scroll;">
		<mt-loadmore :top-method="loadTop" :distanceIndex="5" :autoFill="true" topPullText="↓ 下拉刷新" topDropText="↑ 释放更新" topLoadingText="正在加载 ..." :topDistance="80" ref="loadmore">
            <ul class="drgl-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" :infinite-scroll-distance="50">
                <li v-for="(item,index) in drgl" :key="index">
                    <div  class="flex" @click="article_target(item.id)">
                        <div class="drgl-content" >
                            <h4 class="c-333">{{item.title}}</h4>
                            <div class="flex drgl-content-item c-888">
                                <div>{{item.views}}阅读</div>
                                <div>{{moment(item.update_time*1000).format('YYYY-MM-DD')}}</div>
                            </div>
                        </div>
                        <div class="degl-img c-ter lazy-c bg-f5">
                            <img v-lazy="imgUrl+item.photo" alt="">
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
		<popup v-model="popupVisible" modal="true" position="top">{{this.reloadState==1?"更新成功":this.reloadState==2?"更新失败":this.reloadState==3?"请求出错":""}}</popup>
	</div>
</template>

<script>
	import moment from 'moment';
    import { Loadmore,Popup,Lazyload } from 'mint-ui'
    import {XHeader} from 'vux'

	export default {
		name:"article-list",
		data(){
			return {
                page:1,
				popupVisible:false,
                reloadState:1,
                more_state:1,
				drgl:[
		        	// {
		        	// 	photo:require("@/assets/images/glt1.png"),
		        	// 	title:"这样填表  办理大额信用卡通过率高达99%",
		        	// 	views:100,
		        	// 	update_time: 1513154496*1000,
		        	// 	id:""	
		        	// },
		        	// {
		        	// 	photo:require("@/assets/images/glt2.png"),
		        	// 	title: "出门旅游 只知道申请个人旅游贷款？",
		        	// 	views: 100,
		        	// 	update_time: 1513154496*1000,
		        	// 	id: ""	
		        	// }
		        ]
			}
		},
		methods:{
            getArticleList(page=1,callback,reload){
                this.$axios.post("/api/Article/get_article",`data=${JSON.stringify({
                    article_type:'EASYARTICLE',
                    page:page
                })}`).then(results=>{
                    if(results.code==200){
                        callback&&callback();
                        if(results.data.list.length<1){
                            this.more_state = 2;
                            this.loading = true;
                        }
                        if(reload){
                            this.drgl = results.data.list;
                            this.reloadState = 1;
                            return false;
                        }
                        this.drgl = [...this.drgl,...results.data.list];
                        // console.log(this.drgl)
                        // console.log(results.data.list)
                    }else{
                        this.reloadState = 2;
                    }
                }).catch(err=>{
                    this.reloadState = 3;
                })
            },
            article_target(_id){
                console.log(_id)
                this.$router.push({name:'articleDetails',query:{id:_id}})
            },
			loadMore(){
                this.page++;
                this.loading = true;
                this.getArticleList(this.page,()=>{
                    this.loading = false;
                });
			},
			loadTop() {
				// this.allLoaded = true;
                this.page = 1;
                this.getArticleList(this.page,()=>{
                    this.popupVisible = true;
                    this.$refs.loadmore.onTopLoaded();
                    this.more_state = 1;
                    this.loadMore();
                    
                    setTimeout(()=>{
                        this.popupVisible = false;	
                    },2000);
                },true)
			}
        },
        created(){
            this.getArticleList();
        },
		components:{
			Loadmore,Popup,XHeader
		}
	}
</script>

<style scoped>
	#article-list{width: 100%;height: 100%;padding-top: 70px;}
	/* .drgl-list li:last-child{border:none;} */
	.drgl-content{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;padding-right: 15px;}
	.degl-img{width: 110px;height: 66px;}
	.degl-img img{width: 100%;height: 100%;}
	.drgl-list li{margin-left: 15px;padding:15px 0;padding-right: 15px;border-bottom: 1px solid #eee;}
	.drgl-content-item{justify-content:space-between;margin-top: 5px;font-size:14px;}
	.drgl-content h4{font-size:16px;font-weight: 400;line-height: 22px;height:44px;}
</style>

<style>
	#article-list .mint-loadmore{height: 100%;overflow-y: auto;}
	#article-list .mint-loadmore-top,#article-list .mint-loadmore-text{font-size: 14px;}
	#article-list .v-modal{background:transparent;}
	#article-list .mint-popup{height:70px;line-height: 70px;background: rgba(0,0,0,.8);width: 100%;text-align: center;opacity: 1;color: #fff;}
	#article-list .mint-popup-top{z-index: 999999999 !important;}
	#article-list .page-infinite-loading{text-align: center;margin-bottom: 0;}
	#article-list .page-infinite-loading span{display: inline-block;vertical-align: middle;margin-right: 5px;}
</style>