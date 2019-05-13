<template>
  <div id="load" class="bg-f0" >
      	<x-header :left-options="{preventGoBack:true,backText:''}"  @on-click-back="back" class="mui-bar mui-bar-nav">登录</x-header>

        <div class="mui-content fixed-load" >
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media">
                    <!-- <img class="mui-media-object mui-pull-right" src=""> -->
                    <i class="mui-media-object mui-pull-right iconfont icon-touxiang"></i>
                    <div class="mui-media-body">
                        hello,
                        <p class="mui-ellipsis">欢迎登录</p>
                    </div>
				</li>
            </ul>
			<form id='login-form' class="mui-input-group">
				<!-- <div class="mui-input-row"> -->
                 <group>
                    <!-- <x-input  id='account' name="username" placeholder="请输入账号" v-model="tel" v-focus></x-input> -->
                    <x-input placeholder="请输入账号"  id='account' type='number'  v-model="tel" :max="13" is-type="china-mobile"  v-focus ></x-input>
                    <x-input  id='password' name="username"   v-model="psw" type="password"  placeholder="请输入密码"  v-focus ></x-input>
                </group>
				<!-- <div class="mui-input-row">
					<input id='password' v-model="psw" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div> -->
			</form>
			
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-button" @click="signIn()">登录</button>
				<div class="link-area"> 
                    <router-link to="/my/login/regist" id='reg' class="fl">注册账号</router-link>      
                    <router-link to="/my/login/forgetPassword" id='forgetPassword' class="mui-pull-right">忘记密码</router-link>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
    import { Toast } from 'mint-ui'
    import {XInput, Group,XHeader} from  'vux'
    export default{
        name:"load",
        data(){
            return {
                users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
                tel:"",
                psw:"",
                title:"登录",
                screenHeight:'',
                newHeight:0,
            }
        },components:{
            Toast,XInput, Group,XHeader
        },
        methods:{
            signIn(){
                if(this.tel==""){
                    Toast("请输入手机号码")
                    return false;
                }else if(!(/^1[3456789]\d{9}$/.test(this.tel))){
                    Toast("您输入的手机号码有误");
                    return false;
                }else if(!this.psw){
                    Toast("请输入密码");
                    return false;
                }
                this.$store.dispatch("signIn", {
                    data: "data="+JSON.stringify({
                        mobile:this.tel,
                        password:this.psw
                    }),
                    fn: (code, msg) => {
                        switch (code) {
                            case 200:
                                Toast("登录成功")
                                var straddress="my/set";
                                if(straddress.indexOf(this.$route.query.redirect)>-1){
                                        this.$router.push('/my')
                                }else{
                                        this.$router.push(this.$route.query.redirect||'/');
                                        break;
                                }
                               
                            case -1:
                                Toast(msg)
                                break;
                            default:
                                Toast("请求出错")
                                break;
                        }
                    }
                })
            },
            back(){
                this.$router.push('/index');
            }
        },
        mounted(){
                // const that = this;
                // $("input").bind("propertychange",function(e){
                // window.onresize = () => {
                    // return (() => {
                        // console.log(that.screenHeight)
                        // window.screenHeight = document.body.clientHeight;
                        // that.screenHeight = window.screenHeight;
                    // })()
                // });
                // console.log(this.screenHeight)
             
        },

        computed:{
            // windowDistance(){
            //       return  $(window).height()-$(document).height();
            // }
        },
        directives:{
            "focus" :{
                 inserted:function(el){
                     el.focus();
                 }
            }
        },
        watch:{
            //  windowDistance:function(v){
            //      console.log(v)
            //      if(v<0){
            //          $('#load').height($(window).height()+'px');  
            //      }
                    
            //  }
        }
        
    }
</script>
<style scoped lang="less" >
@l:left;
@gray:#555;
@lig:#e0e0e0;
@lit:#d1d1d1;
@ora:#469dc8;
.h(@h){height:@h}
.c(@h){color:@h}
.lh(@h){line-height:@h}
.w(@h){width:@h}
.mt(@mt){margin-top:@mt}
.mr(@mr){margin-right:@mr}
.fz(@f){font-size: @f}
.fl(@f){float:@f}
.p(@p){padding: @p}
.bg(@b){background:@b}
.fw(@w){font-weight:@w}
#load{background: #fff;}
.mui-table-view:after,.mui-table-view:before,#login-form:before,#login-form:after{
    background-color:transparent;
}
.mui-content>.mui-table-view:first-child {
    .p(30px 0px 0px);
}
.mui-input-group .mui-input-row:after{right:15px;}
.mui-input-row{height: 60px;}
.mui-content{background: #fff;}
.mui-table-view-cell{
    i.iconfont{
    color:@lig;
   }
    .mui-media-body{.fz(16px);color:@gray;
             .mui-ellipsis{
                 color:@gray;
                 .fz(26px);.lh(36px);
            }
    }
}
.mui-button{color: #fff;.fz(18px);border:none;margin-bottom: 15px;}
.mui-button{background: #469dc8;}
.link-area a{color:@gray;.fz(13px)}
.mui-input{font-size:16px;padding:0;height:100%;padding-left: 15px;}
.mui-content-padded{margin:15px;padding-top: 20px;}
.mui-table-view-cell i.iconfont{ font-size: 47px;line-height: 47px;margin-right: 19px;margin-top: 8px;}
button{padding:13px; font-size:14px;}
.fixed-load{width:100%; height: 420px;}
#load .mui-content > .mui-table-view:first-child{padding:0;}
</style>
<style>
/* #load .vux-header{position:relative !important;} */
.mui-bar{height:67px;}
#load input[type=text],#load input[type=password],#load input[type=number]{padding: 0;font-size: 16px;}
#load .weui-cells:before{border-top:none;}
.weui-cells:after{left:15px;}

</style>
