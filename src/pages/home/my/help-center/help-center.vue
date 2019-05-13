<template>
  <div id="help">
	  <!-- <i-header :is_r="show" :title="title"></i-header> -->
	  	<x-header :left-options="{backText: ''}">帮助中心</x-header>

      <div class="mui-content content fixed-content">
          <ul class="mui-table-view" >
				<li class="mui-table-view-cell " v-for="i in list" :key='i.id'>
					<router-link :to="{path:'/index/article-list/article-details',query:{id:i.id}}">
                    <span class="mui-pull-left"><i class="iconfont icon-orange-dot"></i></span>
						{{i.title}}
						<i class="iconfont icon-youjiantou mui-pull-right"></i>
                    </router-link>    
				</li>
		<!-- 		<li class="mui-table-view-cell">
                    <span class="mui-pull-left"><i class="iconfont icon-orange-dot"></i></span>
						都支持哪些还款方式？如何还款？
						<i class="iconfont icon-youjiantou mui-pull-right"></i>
				</li>
                <li class="mui-table-view-cell ">
                    <span class="mui-pull-left"><i class="iconfont icon-orange-dot"></i></span>
						申请贷款多久后能出审核结果？
						<i class="iconfont icon-youjiantou mui-pull-right"></i>
                        
				</li>
				<li class="mui-table-view-cell">
                    <span class="mui-pull-left"><i class="iconfont icon-orange-dot"></i></span>
						都支持哪些还款方式？如何还款？
						<i class="iconfont icon-youjiantou mui-pull-right"></i>
				</li>
                <li class="mui-table-view-cell ">
                    <span class="mui-pull-left"><i class="iconfont icon-orange-dot"></i></span>
						申请贷款多久后能出审核结果？
						<i class="iconfont icon-youjiantou mui-pull-right"></i>
                        
				</li>
				<li class="mui-table-view-cell">
                    <span class="mui-pull-left"><i class="iconfont icon-orange-dot"></i></span>
						都支持哪些还款方式？如何还款？
						<i class="iconfont icon-youjiantou mui-pull-right"></i>
				</li>
                <li class="mui-table-view-cell ">
                    <span class="mui-pull-left"><i class="iconfont icon-orange-dot"></i></span>
						申请贷款多久后能出审核结果？
						<i class="iconfont icon-youjiantou mui-pull-right"></i>
                        
				</li>
				<li class="mui-table-view-cell">
                    <span class="mui-pull-left"><i class="iconfont icon-orange-dot"></i></span>
						都支持哪些还款方式？如何还款？
						<i class="iconfont icon-youjiantou mui-pull-right"></i>
				</li>
                <li class="mui-table-view-cell ">
                    <span class="mui-pull-left"><i class="iconfont icon-orange-dot"></i></span>
						申请贷款多久后能出审核结果？
						<i class="iconfont icon-youjiantou mui-pull-right"></i>
                        
				</li>
				<li class="mui-table-view-cell">
                    <span class="mui-pull-left"><i class="iconfont icon-orange-dot"></i></span>
						都支持哪些还款方式？如何还款？
						<i class="iconfont icon-youjiantou mui-pull-right"></i>
				</li> -->
			</ul>
       
      </div>
  </div>
</template>
<script>
	import {XHeader} from "vux"
	import {mapGetters } from "vuex"

    export default{
		name:"set",
		components:{
			XHeader
		},
		data(){
			return{
				users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
				show:true,
				title:"帮助中心",
				list:'',
			}
		}, 
		mounted(){
			mui.init({
				swipeBack:true //启用右滑关闭功能
			});
			this.$axios.post('/api/Article/get_article',`data=${JSON.stringify({
                            session_id:this.users.session_id,
                            userId:this.users.userId,
							article_type:'HELPCENTER',
							page:1
                })}`).then(res=>{
					// console.log(JSON.stringify(res))
					if(res.code==200){
						this.list=res.data.list;
					}
				})
	
		}
    }
</script>
<style lang="less" scoped>
#help{background: #f0f0f0;width: 100%;position: fixed;top:0;bottom:55px;overflow-y: auto;}
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
	.mb(0);
	.mui-table-view-cell{.p(17px  15px);
    }
}
.icon-orange-dot{.c(@ora);font-size: 32px;line-height: 24px;width: 10px;display: block; position: relative;left: -14px;}
.icon-youjiantou{color:#aaa;line-height: 24px;font-size: 18px;}

</style>
