<template>
<div id="header-tx">
    <div id="header-credit"  class="header clearfix">
         <div class="left-fanhui" v-show="is_r">
        <a @click="back()" href="javascript:void(0);" class="back">
          <span class="iconfont icon-fanhui"></span>
        </a>
      </div>
        <div class="header-entry">
          <div class="fl header-title">{{title}}</div>
          <span class="iconfont icon-zhaoxiang" v-show="$route.path==='/creditCircle'"></span>
        </div>

         <router-link to="/kbb/withdrawalLog">
          <span class="header-fr">记录</span>
        </router-link>
    </div>
</div>
</template>

<script>

export default {
  name: 'header-tx',
  data(){
    return {
      back(){
      // window.history.back();
      this.$router.back();
      // this.$emit("click");
        }
    }
  },
  created(){
    //console.log()
  },
   props:['title','cls_icon',"is_r"]
}
</script>

<style scoped>
    #header-credit{width: 100%;height:70px;position:fixed;top:0;left:0;z-index:99999;background:#469dc8;}
    .header-title{position: absolute;left:0;top:0;padding-top:32px;text-align: center;width: 100%;z-index: -1;font-size: 18px;}
    #header-credit .header-entry{padding-top:30px;text-align: center;width: 100%;font-size: 18px;color: #fff;}
    #header-credit .icon-zhaoxiang{font-size: 26px;color: #fff;float: right;margin-right: 15px;}
    .arrow-right{position: absolute;left: 15px;font-size: 14px;bottom: 16px;}
    .left-fanhui{position: absolute;left: 10px;top: 30px;line-height: 23px;z-index:12;}
    .left-fanhui>a{color: #fff;}
    .left-fanhui .iconfont{font-size: 18px; font-weight:normal;}
      #header-p .back{display: table-cell;vertical-align: middle;font-size: 18px;color: #fff;}
      .header-fr{float: right;color: #fff;margin-right: 20px;}
</style>
