<template>
    <div id="header-p"  class="header clearfix" >
        <div class="left-fanhui" v-show="is_r">
        <a @click="back()" href="javascript:void(0);" class="back">
          <span class="iconfont icon-fanhui"></span>
        </a>
      </div>
        <div class="header-entry">
          <div class="fl header-title">{{title}}</div>
          <span class="iconfont icon" :class="cls_icon" @click="icon_handle"></span>
        </div>
    </div>
</template>

<script>

export default {
  name: 'header-p',
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
  methods:{
      icon_handle(){
          // this.$emit("click");
      }
  },
  props:['title','cls_icon',"is_r"]
}
</script>

<style scoped>
    #header-p{width: 100%;height:70px;position:fixed;top:0;left:0;z-index:10;background:#469dc8;}
    .header-title{position: absolute;left:0;top:0;padding-top:32px;text-align: center;width: 100%;z-index: -1;font-size: 20px;}
    #header-p .header-entry{padding-top:30px;text-align: center;width: 100%;font-size: 18px;color: #fff;position:absolute;left: 0; }
    #header-p .icon{font-size: 22px;color: #fff;float: right;margin-right: 15px;font-weight:600;padding-top: 2px;}
    .arrow-right{position: absolute;left: 15px;font-size: 14px;bottom: 16px;}
    .left-fanhui{position: absolute;left: 10px;top: 30px;line-height: 23px;z-index:12;}
    .left-fanhui>a{color: #fff;}
    .left-fanhui .iconfont{font-size: 23px;}
      #header-p .back{display: table-cell;vertical-align: middle;font-size: 18px;color: #fff;}
</style>
