<template>
  <div id="header1" :class="bgfff "  class="header1 clearfix">
      <div class="fl header-entry" v-show="is_r">
        <a class="back" @click="back()">
          <span class="iconfont icon-fanhui"></span>
        </a>
      </div>
      <div class="fl header-title">{{title}}
          <!-- <span class="iconfont icon-fanhui"  ></span> -->
          <span class="fr arrow-right" v-on:click="incrementTotal">{{right}}</span><!-- @click="guanli" -->
          <span class="iconfont icon-xiaoxi" v-show="$route.path==='/creditCircle'" @click="$router.push({path:'/my/my-post'})"></span>
          <span class="iconfont icon-zhaoxiang" v-show="$route.path==='/creditCircle'" @click="$router.push({path:'/creditCircle/creditCirclePost'})"></span>
          <!-- <router-link class="iconfont icon-bianji" v-if="edit" :to="editPath"></router-link> -->
      </div>
         
      <i class="fr iconfont icon-fenxiang" v-show="share" @click="shares"></i>
  </div>
</template>

<script>
export default {
  name: 'header1',
  data(){
    return {
    }
  },
  created(){
    
  },
  methods:{
    back(){
      // this.$router.back();
      if((this.$route.path).indexOf('login')>-1){
      // console.log(this.$route.query.redirect)
        this.$router.push(this.$route.query.redirect);
      }
      this.$router.go(-1);
      // this.$emit("click");
    },
    incrementTotal:function () {
      this.$emit('increment');
    },
    shares:function(){
      this.$emit('shares');
    }
  },
  mounted(){
// console.log(this.$route.path)
  },
  watch:{
  },
  components:{
  },
  props:["title","is_r","qd","sign","share","bgfff","right","edit","editPath",'isr',"transparent",'bg']
}
</script>
<style scoped>
  #header1.transparent{background:transparent;}
  #header1.bgfff{background:transparent;}
  #header1{z-index:10000;position:fixed;top:0;left:0;width: 100%;height:70px;  background:#469dc8;color: #fff;z-index: 10;}
  #header1 div{display: table;height: 100%;}
  #header1 .header-entry{width: 40px;text-align: center;}
  #header1 .back{display: table-cell;vertical-align: middle;font-size: 18px;color: #fff;}
  #header1 .icon-fanhui{font-size: 22px;margin-top: 16px;display: block;color: #fff;}
  #header1 .header-title{position: absolute;left:0;top:0;padding-top:32px;text-align: center;width: 100%;z-index: -1;font-size: 20px;}
  .icon-fenxiang{position: absolute;right: 14px;top: 47%;font-size: 21px;}
  .arrow-right{position: absolute;right: 15px;font-size: 14px;bottom: 16px;}
    .icon-zhaoxiang{position: absolute;font-size: 26px;color: #fff;right: 0;margin-right: 15px;}
    .icon-xiaoxi{position: absolute;font-size: 20px;color: #fff;right: 0;margin-right:65px;}
    .icon-bianji{position: absolute;display: inline-block;font-size: 26px;color: #fff;right: 0;margin-right: 15px;}
    /* #header1.bg{background:#f9f990;} */
  
</style>
