<template>
  <div id="scanning">
    <!-- <z-header title="扫一扫" :is_r="true"></z-header> -->
    <x-header :left-options="{backText:''}">扫一扫</x-header>
    <div id="bcid"></div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
import mycenterWeb from "@/components/webview/mycenterweb"
export default {
  name: 'scanning',
  data(){
    return {
        vuegConfig:{  
          disable: false
        }
    }
  },
  created(){
    
  },
  methods:{
    onerror(err){
      mui.alert("识别出错");
    },
    onmarked( type, result ) {
        let text = '未知: ';
        // switch(type){
        //   case plus.barcode.QR:
        //   text = '';
        //   break;
        //   case plus.barcode.EAN13:
        //   text = 'EAN13: ';
        //   break;
        //   case plus.barcode.EAN8:
        //   text = 'EAN8: ';
        //   break;
        // }
        oScan.vibrate = true;//识别成功后手机震动提示
        //alert(result)
        // this.$router.push({path:'/thirdWeb',query:{link:result,title:'中龙在线'}})
         
       const payload = {
					userId:localStorage.getItem('Token')
				}

        this.$router.push({name:'cardThird',query:{payload,link:result}});
        // oScan.start(); 
        //scan.cancel();
        oScan.close();
      },
      startRecognize() {
        const _this = this;
        oScan = new plus.barcode.Barcode('bcid');
        setTimeout(function(){
          oScan.onmarked = _this.onmarked;
          oScan.onerror = _this.onerror;
          oScan.start();
        },1000);
      }
  },
  mounted(){
    setTimeout(()=>{
      plus&&this.startRecognize();
    }, 400);
  },
  beforeRouteLeave (to, from, next) {
    next();
    oScan.close();
  },
  watch:{
    
  },
  components:{
    XHeader,mycenterWeb
  }
}
</script>

<style scoped>
  #scanning{position: relative;height: 100%;width: 100%;}
  #bcid{background:rgb(0,0,0);position: absolute;top: 68px;bottom: 0px;left: 0;right: 0;}
</style>
