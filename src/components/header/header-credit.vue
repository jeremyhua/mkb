<template>
<div id="header-c">
    <div id="header-credit"  class="header">
        <div class="header-entry">
          <div class="fl header-title">{{title}}</div>
          <span class="iconfont icon-zhaoxiang" v-show="$route.path==='/creditCircle'"></span>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'header-c',
  data(){
    return {
      
    }
  },
  created(){
    //console.log()
  },
  props:['title']
}
</script>

<style scoped>
    #header-credit{width: 100%;height:70px;position:fixed;top:0;left:0;z-index:99999;background:#469dc8;}
    .header-title{position: absolute;left:0;top:0;padding-top:32px;text-align: center;width: 100%;z-index: -1;font-size: 20px;}
    #header-credit .header-entry{padding-top:30px;text-align: center;width: 100%;font-size: 18px;color: #fff;}
    #header-credit .icon-zhaoxiang{font-size: 26px;color: #fff;float: right;margin-right: 15px;}
</style>
