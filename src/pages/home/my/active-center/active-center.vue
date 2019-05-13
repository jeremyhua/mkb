<template>
  <div id="set">
	  <!-- <i-header :is_r="show" :title="title"></i-header> -->

      <x-header :left-options="{backText: ''}">活动中心</x-header>
      <div class="mui-content content fixed-content">
          <ul class="mui-table-view">
				<li class="s" v-for="item in content" :key="item.id">
                    <div class="time">{{moment.unix(item.create_time).format('YYYY-MM-DD')}}</div>
					<div class="content-wrap clearfix">
                        <div class="img">
                            <img :src="imgUrl+item.photo" alt="">
                        </div>
                        <div class="detail">{{item.title}}</div>
                        <div class="checkdetail mui-pull-right"><router-link :to="{path:'/index/article-list/article-details',query:{id:item.id}}">
                        查看详情<i class="iconfont icon-youjiantou"></i></router-link></div>
                    </div>    
				</li>
			
			</ul>
         
      </div>
  </div>
</template>
<script>
    import {XHeader} from "vux"
    export default{
        name:"set",
		components:{
			XHeader
		},
		data(){
			return{
			show:true,
            title:"活动中心",
            content:[/* {time:"2017-11-29",src:require("@/assets/images/title.png"),detail:"邀请好友赢 iPhone x , 你还等什么？",checkview:"查看详情"},{time:"2017-12-29",src:require("@/assets/images/title2.png"),detail:"邀请好友赢 iPhone x , 你还等什么？",checkview:"查看详情"} */]
			}
		},
        created () {
            //活动中心
            this.$axios.post("/api/Article/get_article",`data=${JSON.stringify({article_type:'ACTIVITY_CENTER'})}`).then(results=>{
                if(results.code==200){
                    this.content = results.data.list;
                }else{
                }
            }).catch(err=>{
            })
        },
		mounted(){
			mui.init({
				swipeBack:true //启用右滑关闭功能
			});
	
		}
    }
</script>
<style lang="less" scoped>
@l:left;
@gray:#555;
@lig:#e0e0e0;
@lit:#d1d1d1;
@ora:#469dc8;
@bg:#f0f0f0;
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
.set{height:100%;}
.mui-table-view:after,.mui-table-view:before{
	.bg(transparent)
}
.mui-content>.mui-table-view:first-child{
	.mt(0);
}
.mui-table-view{
        background: @bg;

    li{
        border-radius: 4px;
        .time{   
        color:#fff;
        background: @lig;
        border-radius: 17px;
        padding: 2px 10px;
        display: inline-block;
        margin-top: 10px;
        margin-left: 50%;
        transform: translate3d(-50%,0,0)
    }
        .content-wrap{
            width:94%;
            background:#fff;
            margin:15px 3%;
            box-shadow:0 0 3px @lig;
            img {width:100%;    border-radius: 4px 4px 0 0;}
            .detail{line-height: 42px;height: 42px;
            padding-left: 15px;position:relative;}
           .detail:after{background-color: #c8c7cc;position:absolute;left: 15px;right: 0;bottom:0;height:1px;content: '';} 
            .checkdetail{padding-right:15px;line-height:30px;color:@lc;height:30px;
                a{
                   color: #aaa;font-size: 13px;
                   i{font-size:14px;padding-left:2px;}
                }
            }
        }

    }
}


</style>
