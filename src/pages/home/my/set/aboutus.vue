<template>
  <div class="aboutus">
	  <!-- <i-header :is_r="true" :title="title"></i-header> -->
    <x-header :left-options="{backText: ''}">关于我们</x-header>

<div class="mainwrap">
    <p  v-html="article_data"></p>
</div>
  </div>
</template>
<script>
    import {XHeader} from "vux"

    export default{
        name:'aboutus',
        data(){
            return{
                article_data:'',
            }
        },
        components:{
            XHeader
        },methods:{
             get_article(id){
                this.$axios.post("/api/Article/get_article_detail",`data=${JSON.stringify({
                    article_id: id
                })}`).then(results=>{
                    if(results.code==200){
                        this.article_data = results.data.content
                    }
                }).catch(err=>{

                });
            },
        },
        mounted(){
            this.get_article(84);
        }
    }
</script>
<style scoped>
    .mainwrap{width:100%;height: 100%;overflow-y:auto; background:#fff;-webkit-overflow-scrolling: touch;}
    /*position: fixed;top:70px;bottom:0;*/
</style>
<style>


    .mainwrap>p>p{padding: 8px;font-size:15px;line-height: 30px;color:rgb(44, 43, 43);}

</style>
