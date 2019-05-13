<template>
	<div id="article-details" class="bg-fff">
		<x-header :left-options="{backText: ''}">文章详情</x-header>
		<div class="article-content bg-fff content ">
			<div class="article-head">
				<h3 class="article-title c-333">{{article_data.title}}</h3>
				<div class="time c-888">
					<time>时间：{{moment(article_data.update_time*1000).format('YYYY-MM-DD')}}</time><b>丨</b><span>{{article_data.views}} 阅读</span> 
				</div>	
			</div>
				<img v-lazy="article_data.photo&&imgUrl+article_data.photo" alt="" data-preview-src=""> 
			<div class="article-content-details c-666" v-html="article_data.content">
			</div>
		</div>
		<div class="next-article one-1 bg-f0"  @click="next_article(article_data.next_article_id,$event)" v-if="article_data.next_article_id">
				<router-link to="" class="c-888">
					<span>下一篇:{{article_data.next_article_title}}</span>
					<i class="iconfont icon-youjiantou"></i>
				</router-link>
		</div>
	</div>
</template>

<script>
	import { XHeader} from "vux"

	export default {
		name:"article-details",
		components:{
			XHeader
		},
		data(){
			return {
                article_data:{},
				article_img:require("@/assets/images/article_img.png")
			}
        },
        computed:{
            users(){
                return this.$store.state.loginModule.users
            }
        },
        created(){
			if(isNaN(this.$route.query.id)){
				const payload = {
					userId:localStorage.getItem('Token')
				}
                this.$router.push({name:'cardThird',query:{payload,link:this.$route.query.id}}) 
			}
			this.get_article(this.$route.query.id);
        },
        methods:{
            next_article(id,ev){
                this.get_article(id);
                ev.preventDefault();
            },
            get_article(id){
                this.$axios.post("/api/Article/get_article_detail",`data=${JSON.stringify({
                    article_id: id
                })}`).then(results=>{
                    if(results.code==200){
                        this.article_data = results.data
                        console.log(this.article_data)
                    }
                }).catch(err=>{

                });
            }
        },
        watch:{
            $route(){
                if(this.$route.query.id){
                    this.get_article(this.$route.query.id);
                }
            }
        }
	}
</script>

<style scoped>
	#article-details{width: 100%;height: 100%;}
	.article-content{padding:15px 15px 50px 15px;}
	.article-head{padding:30px 0;padding-top:40px;border-bottom: 1px solid #ddd;}
	.article-title{font-size: 18px;margin-bottom: 15px;}
	.time{font-size: 14px;}
	.time b{font-weight: 400;}
	.article-content-details{padding-top: 15px;}
	.article-content-details p{font-size: 14px;line-height: 25px;}
	
	.next-article{height: 50px;line-height: 50px;font-size: 14px;position:fixed;bottom:0;width:100%;}
	.next-article a{display: block;padding: 0 15px;}
	.icon-youjiantou{position: absolute;right:15px;font-weight: 600;}
</style>
<style>
    #article-details .article-content-details p img{width: 100% !important;}
</style>
