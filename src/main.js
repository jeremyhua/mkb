// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/store.js"
import vueg from 'vueg'
import MintUI from 'mint-ui'

import "@/assets/fonts/iconfont.css"
import "@/assets/fonts/iconfont.js"
import 'mint-ui/lib/style.css'
import "@/assets/css/main.css"
import "@/assets/css/preview.css"
import 'vueg/css/transition-min.css'
import { startMove } from "@/assets/js/public.js"
import {UploaderPost,Loading,}  from "@/assets/js/upload.js"
import axios from "@/http/http.js"
//import fastclick from 'fastclick'
import "babel-polyfill"
import { setTimeLanguages } from "@/utils/utils.js";
import moment from 'moment';
import '@/assets/css/weui.less'; //修改主题色
// import { sync } from 'vuex-router-sync';

setTimeLanguages(moment);

Vue.config.productionTip = false;

Vue.prototype.imgUrl = 'http://www.qyy2018.com/';//http://my.dkb.com/  http://jcc.tw186.com/
Vue.prototype.webUrl = 'http://www.qyy2018.com/';
Vue.prototype.$http = 'http://www.qyy2018.com/';
// Vue.prototype.imgUrl = 'http://39.98.244.78:82';//http://my.dkb.com/  http://jcc.tw186.com/
// Vue.prototype.webUrl = 'http://39.98.244.78:82';
// Vue.prototype.$http = 'http://39.98.244.78:82';

Vue.prototype.$startMove = startMove;
Vue.prototype.$upload =UploaderPost;
Vue.prototype.$Loading =Loading;
Vue.prototype.$axios = axios;
Vue.prototype.moment = moment;
Vue.prototype.$moment = moment;

store.axios = axios;

// const options = {
//     duration: '0.3',
//     forwardAnim: 'slideInRight',
//     backAnim: 'slideInLeft',
//     sameDepthDisable: true,
//     shadow: false,
//     disable: false
// }

// Vue.use(vueg, router, options);
Vue.use(MintUI, moment );

//fastclick.attach(document.body); // init fastclick

function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
}; 
//滚动卡死解决方法
/* jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ){
        if ( ns.includes("noPreventDefault") ) {
            this.addEventListener("touchstart", handle, { passive: false });
        } else {
            this.addEventListener("touchstart", handle, { passive: true });
        }
    }
}; */
/* window.addEventListener("touchend", function (event) {
    event.preventDefault();
    }, {
     passive:false
 }); */

 import { ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
 /*import { Promise } from 'es6-promise';*/
  
 Vue.use(ToastPlugin)
 Vue.use(AlertPlugin)
 Vue.use(ConfirmPlugin)
 Vue.use(LoadingPlugin)
 /*  
 const Message = {};
 Message.install = () => {
     const msg = {
         $toast: config => {
             let def = {
                 type:'text',
                 text:''
             }
             if(typeof  config  === 'string' || typeof  config  === 'number'){
                 Vue.$vux.toast.show({type:'text',text:config})
             }else{
                 Vue.$vux.toast.show(Object.assign(def,config))
             }
  
         },
         $alert: config => {
             let def = {
                 title:'提示',
                 content:'系统异常，请重新登录后再试！',
                 buttonText:'确定'
             }
             if(typeof  config  === 'string' || typeof  config  === 'number'){
                 Vue.$vux.alert.show(Object.assign(def,{content:config}));
             }else{
                 Vue.$vux.alert.show(Object.assign(def,config));
             }
         },
         $confirm: config => {
             let isConfirm = false;
             let def = {
                 title:'提示',
                 content:'系统异常，请重新登录后再试！',
                 confirmText:'确定',
                 cancelText:'取消',
                 onConfirm:() =>{
                     isConfirm = true;
                 }
             }
             if(typeof  config  === 'string' || typeof  config  === 'number'){
                 Vue.$vux.confirm.show(Object.assign(def,{content:config}));
             }else{
                 Vue.$vux.confirm.show(Object.assign(def,config));
             }
            //  return new Promise((resolve,reject) => {
            //      if(isConfirm){
            //          resolve();
            //      }
            //  })
         },
         $showLoading: config => {
             let def = {
                 text: '加载中...'
             }
             if(typeof  config  === 'string' || typeof  config  === 'number'){
                 Vue.$vux.loading.show(Object.assign(def,{text:config}));
             }else{
                 Vue.$vux.loading.show(Object.assign(def,config));
             }
         }
  
     }
     Object.entries(msg).forEach(([method,fn]) => {
         Vue.prototype[method] = fn;
     })
 }
 Vue.use(Message)
 */
router.beforeEach((to, from, next) => {
   // console.log(to.path)
    if(to.path=='/my/login'){
        //console.log(!isEmptyObject(JSON.parse(localStorage.getItem('users'))));
        if(!isEmptyObject(JSON.parse(localStorage.getItem('users')))){
            next({ path: '/my' });
            return false;
        }else{
            next()
        }
    }
    if (to.meta.auth) { // 判断该路由是否需要登录权限
        // console.log(isEmptyObject(JSON.parse(localStorage.getItem('users'))),localStorage.getItem('users'));
        if (!isEmptyObject(JSON.parse(localStorage.getItem('users')))) {
            if (to.meta.validate) { //判断是否需要实名认证
                if (JSON.parse(localStorage.getItem('users')).is_validate == 1) {
                    next();
                } else {
                    next({ path: '/my/my-name' });
                }
            } else {
                next();
            }
        } else {
            next({
                path: '/my/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})