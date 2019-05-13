<template>
  <div id="myheader"  class="header" :class="bg">
    
      <div class='header-title'>{{title}}</div>
      <!-- <div class="fl search">
        <div class="mui-input-row mui-search">
            <input type="text" class="search-input" placeholder="搜索全部商品" ref="search">
            <span class="iconfont icon-sousuo search-icon"></span>
        </div>
      </div > -->
       <div class="header-entry" v-show="$route.path!='/my'">
        <router-link to="/index/location">
          <span class="iconfont icon-luxiandingwei"></span>
          <span v-if="$route.query.address">{{$route.query.address}}</span> 
          <span v-if="!$route.query.address">{{address||daddress}}</span> 
        </router-link>
      </div>
      <div class="header-entry" v-show="$route.path!='/my'">
        <router-link to="/index/scanning">
          <span class="iconfont icon-saomiao"></span>
        </router-link>
      </div>
       
  </div>
</template>

<script>

export default {
  name: 'myheader',
  data(){
    return {
      daddress:"定位中",
    }
  },
  created(){
    //console.log()
  },
   props:["title","bg","address"],
   mounted(){
    //  $route.query.addres
   }
}
</script>

<style scoped>
 #myheader.bgfff{background: transparent;}
  #myheader{width: 100%;height:70px;position:fixed;top:0;left:0;z-index:10; background:#469dc8;}
  #myheader div{display: table;height: 100%;padding: 0 15px;}
  #myheader .header-entry{width: 100px;text-align: left;float:left;}
  #myheader .header-entry:last-child{text-align: right;float:right;}
  #myheader div a{font-size: 12px;color: #fff;margin-top:30px;display: block;}
  #myheader .header-entry:last-child a{margin-top:26px;}
  #myheader .icon-luxiandingwei{font-size: 25px;display: inline-block;vertical-align: middle;margin-top: -5px;}
  #myheader .icon-saomiao{font-size: 26px;}
  #myheader .header-title{padding-top: 30px;text-align: center;width: 100%;font-size: 20px;color: #fff;position: absolute;left: 0;}
</style>
