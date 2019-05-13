<template>
	<div id="tabbar">
		<mt-tabbar v-model="navTab" :fixed="true" >
			<mt-tab-item id="/index">
				<span class="iconfont icon-shouye"></span>
				<span>首页</span>
			</mt-tab-item>
			<!-- <mt-tab-item id="/post">
				<span class="iconfont icon-feiji"></span>
				<span>发帖</span>
			</mt-tab-item> -->
			<mt-tab-item id="/share">
				<span class="iconfont icon-msnui-share-big"></span>
				<span>分享</span>
			</mt-tab-item>
			<mt-tab-item id="/creditCircle">
				<span class="iconfont icon-iconquanzisel"></span>
				<span>交流圈</span>
			</mt-tab-item>
			<!-- <mt-tab-item id="/order">
				<span class="iconfont icon-dingdan"></span>
				<span>分享</span>
			</mt-tab-item> -->
            <mt-tab-item id="/my">
				<span class="iconfont icon-wode"></span>
				<span>我的</span>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';

export default {
	name: 'tabbar',
	data(){
		return {
			navTab:this.href,
			vuegConfig:{
				disable: true
			}
		}
	},
	watch:{
        navTab(link){
			this.$router.replace(link);
			//this.navTab = link;
			console.info(link)
			console.log(this.href)
        },
        '$route'(){
            this.navTab = this.$route.path;
        }
	},
	components:{
		Tabbar, TabItem
	},
	mounted(){
		// alert(this.navTab)
		// console.log($route.path)
	},
	props:["href"]
}
</script>
<!-- #f23031 -->
<style scoped>
    .mint-tabbar{background:#fff;border-top:1px solid #eee;z-index:50;display: block;margin:0;padding: 0px; width: 100%; overflow: hidden;}
    .mint-tab-item-label span:first-child{display:block;height:35px;line-height: 35px;}
    .mint-tab-item{padding-top: 2px;color:#888;}
    .mint-tabbar > .mint-tab-item.is-selected{color:#469dc8;background: transparent;}
	.icon-shouye{font-size:30px;}
	.icon-msnui-share-big{font-size: 26px;}
	.icon-iconquanzisel{font-size: 28px;}
	.icon-dingdan{font-size: 28px;}
	.icon-wode{font-size: 30px;padding-top: 2px;}
	.mint-tab-item{ display: inline-block; width: 25%; margin:0; float:left;}
	
</style>