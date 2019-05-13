<template>
  <div id="app">
      <!-- <keep-alive> -->
        <router-view class="view"></router-view>
     <!-- </keep-alive> -->
        <!-- keep-alive  缓存-->
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted(){
    }
  }
</script>

<style lang='less'>
html,body{
    position:relative;
    height:100%;
    min-height:100%;
}
.fix-top{
    position:absolute;
    top:0;
}
  .view{width: 100%;height: 100%;}
  .mui-preview-image.mui-fullscreen{z-index: 1000;}
  // body {-webkit-overflow-scrolling: touch; overflow-scrolling: touch;}
  .vux-header{width:100%;position:absolute;left:0;top:0;z-index:10;}
  .fixed-con-lg {
    position: fixed;
    top: 67px;
    bottom: 0px;
    overflow-y: scroll;
    width: 100%;
   margin-top: -1px;
}
 /*  @import '~vux/src/styles/reset.less';
  @import './assets/css/theme.less'; */
// .fixed-content {
//     padding-top:67px;
//     height:100%;
// }
.view {
    width: 100%;
    height: 100%;
    padding-top:67px;
   margin-top: -1px;
    
} 
.vux-swipeout-button-warn {
    background-color: #469dc8;
}
.vux-swipeout-item{
    background-color: #3c6cc3;
}
.vux-header{position:fixed !important;top:0;}
p{margin-bottom:0;}
input[type=color], input[type=date], input[type=datetime-local], input[type=datetime], 
input[type=email], input[type=month], input[type=number], input[type=password],
input[type=search], input[type=tel], input[type=text], input[type=time],
input[type=url], input[type=week], select, textarea{margin-bottom:0;}
.transparent{background:transparent !important;}
.vux-header .vux-header-left .left-arrow:before{
transform:rotate(315deg);
-ms-transform:rotate(315deg); 	/* IE 9 */
-moz-transform:rotate(315deg); 	/* Firefox */
-webkit-transform:rotate(315deg); /* Safari 和 Chrome */
-o-transform:rotate(315deg); 	/* Opera */
}
.weui-cell{
        display: box;              /* OLD - Android 4.4- */
        display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;      /* TWEENER - IE 10 */
        display: -webkit-flex;     /* NEW - Chrome */
        display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
.weui-cell__bd{
        -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
        -moz-box-flex: 1;         /* OLD - Firefox 19- */
        width: 20%;               /* For old syntax, otherwise collapses. */
        -webkit-flex: 1;          /* Chrome */
        -ms-flex: 1;              /* IE 10 */
        flex: 1;       
}
.flex{  display: -webkit-box;
  display: -webkit-box-flex;
  display:flex;}
  .tj-title div:nth-child(2) {
    -webkit-box-flex: 2;
    -webkit-flex:2;flex:2;
    -ms-flex: 2;
    flex: 2;
    margin-top: -3px;
    padding-left: 10px;
    font-size: 14px;
}
</style>

