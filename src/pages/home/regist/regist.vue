<template>
  <div id="register" class="bg-f0">
        <x-header :left-options="{backText: ''}">注册</x-header>

        <div class="mui-content">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media">
					<router-link to="/my/login"> 
						<!-- <img class="mui-media-object mui-pull-right" src=""> -->
                        <i class="mui-media-object mui-pull-right iconfont icon-touxiang"></i>
						<div class="mui-media-body">
							已有帐号,去<span class="ora">登录</span>
							<p class="mui-ellipsis">会员注册</p>
						</div>
					</router-link>
				</li>
            </ul>
			<form id='regist-form' class="mui-input-group">
				<div class="mui-input-row">
                    <label for="account">+86  <i class="iconfont icon-arrow-down"></i></label> 
					<input id='account' type="text" v-model="tel" class="mui-input-clear mui-input" placeholder="请输入手机号">
				</div>
				<div class="mui-input-row">
                    <label for="yzm">验证码</label> 
					<input id='yzm' type="text" v-model="yzm" class="mui-input-clear mui-input password" placeholder="请输入验证码">
                    <input type="button" class="get-msg mui-btn mui-btn-warning mui-btn-outlined" :class="{getCode:is_setBtn}" :value="getBtn" @click="getCode()"/>
				</div>
                <div class="mui-input-row">
                    <label for="psd">密&nbsp;&nbsp;&nbsp;码</label> 
					<input id='psd' type="password" v-model="psw" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
                <div class="mui-input-row">
                    <label for="ac">确&nbsp;&nbsp;&nbsp;认</label> 
					<input id='ac' type="password" v-model="confirm_psw" class="mui-input-clear mui-input" placeholder="请确认密码">
				</div>
                <div class="mui-input-row">
                    <label for="yq">邀请码(选填)</label> 
					<input id='yq' type="text" class="mui-input-clear mui-input" v-model="yqm" placeholder="请输入邀请人手机号(选填)">
				</div>
			</form>
			
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-button" @click="reg_fn()">注册</button>
				<div class="link-area">
                    <!-- <mt-checklist
                    title="checkbox list"
                    v-model="value"
                    :options="['optionA', 'optionB', 'optionC']">
                    </mt-checklist> -->
                    <div class="mui-input-row mui-checkbox mui-left">
                        <label class="fs-14">
                        </label>
                        <span @click="target_handle">注册即表示您同意<router-link to="/index/privacy">
                        <i>《隐私政策和服务条款》</i>
                        </router-link>
                        </span>
                      
                        <input type="checkbox" class="clause-state" v-model="clause">
                    </div>
                    
				</div>
			</div>
	
		</div>
  </div>
</template>
<script>
    import { Checklist,Toast } from 'mint-ui';
    import {XInput, Group,XHeader} from  'vux'

    export default{
        name:"register",
        components:{
            Toast,Checklist,XInput, Group,XHeader
        },
        data(){
            return {
                click_state:true,
                is_setBtn:false,
                getBtn:"获取",
                time:60,
                yzm:"",
                tel:"",
                psw:"",
                yqm:"",
                confirm_psw:"",
                clause:"1",
                is_r:true,
                title:"注册",
            }
        },
        methods:{
            //注册提交
            reg_fn(){
                if(!this.yzm){
                    Toast("请输入验证码");
                    return false;
                }else if(!this.tel){
                    Toast("请输入手机号");
                    return false;
                }else if(!this.psw){
                    Toast("请输入密码");
                    return false;
                }else if(this.psw!=this.confirm_psw){
                    Toast("您输入的两次密码不一致");
                    return false;
                }else if(!this.clause){
                    Toast("请勾选隐私政策和服务条款");
                    return false
                }

                this.$store.dispatch("register", {
                    data: "data="+JSON.stringify({
                        mobile:this.tel,
                        code:this.yzm,
                        password:this.confirm_psw,
                        agree:this.clause,
                        invite_code:this.yqm
                    }),
                    fn: (code, msg) => {
                        switch (code) {
                            case 200:
                                this.$router.push("/my");
                                break;
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
            //获取验证码
            getCode(){
                if(this.tel==""){
                    Toast("请输入手机号码")
                    return false;
                }else if(!(/^1[3578]\d{9}$/.test(this.tel))){
                    Toast("您输入的手机号码有误");
                    return false;
                }

                if(this.click_state){
                    this.click_state = false;
                    this.$store.dispatch("verificationCode",{
                        data:`data=${JSON.stringify({mobile:this.tel,type:"REGISTER"})}`,
                        fn:(code,msg)=>{
                            switch (code) {
                                case 200:
                                    //const date = new Date();
                                    this.countDown(msg.limit_time);
                                    Toast("验证码获取成功");
                                    break;
                                case -1:
                                    Toast(msg);
                                    this.click_state = true;
                                    break;
                                default:
                                    Toast("请求出错");
                                    this.click_state = true;
                                    break;
                            }
                        }
                    });
                }
            },
            zeroFill(time){
                return time<10?`0${time}`:time;
            },
            countDown(time){
                setTimeout(()=>{
                    --time;
                    if(time<1){
                        time = 60;
                        this.getBtn = "重新获取";
                        this.is_setBtn = false;
                        this.click_state = true;
                    }else{
                        this.is_setBtn = true;
                        this.getBtn = `${this.zeroFill(time)}S 后可重新获取`;
                        this.countDown(time);
                    }
                },1000);
            },
            target_handle(e){

                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        }
    }
</script>

<style scoped lang="less" >
@l:left;
@gray:#555;
@lig:#e0e0e0;
@lit:#d1d1d1;
@ora:#6fc6f1;
.h(@h){height:@h}
.c(@h){color:@h}
.lh(@h){line-height:@h}
.w(@h){width:@h}
.mt(@mt){margin-top:@mt}
.mr(@mr){margin-right:@mr}
.fz(@f){font-size: @f}
.fl(@f){float:@f}
.p(@p){padding: @p}
.pr(@p){padding-right: @p}
.bg(@b){background:@b}
.fw(@w){font-weight:@w}
#register{background: #fff;padding-top:70px;}
.mui-table-view:after,.mui-table-view:before,#regist-form:before,#regist-form:after{
    background-color:transparent;
}
.mui-content>.mui-table-view:first-child {
    margin-top: 0;
    .p(20px 0px);
}
.mui-input-group .mui-input-row:after{right:15px;}
.link-area span i{ font-size: 14px;}
.mui-content{background: #fff;}
.mui-table-view-cell{
    //  padding:66px 0;
    i.iconfont{
        // .fz(54px);.lh(54px);.mr(7px);
    color:@lig;
   }
    .mui-media-body{.fz(16px);color:@gray;
             .mui-ellipsis{
                 color:@gray;
                 .fz(26px);.lh(36px);
            }
    }
}
.mui-button{color: #fff;.fz(18px);border:none;}
.mui-button{
        background: #6fc6f1; /* Old browsers */ /* IE6-9 */
        height: 50px;
        line-height: 23px;
}
.link-area a{color:@gray;.fz(13px)}
// #vueg-background{background: #fff;}
.mui-input-row{
    .h(56px);
     label{.w(20%);.pr(0);.h(56px);padding: 0;line-height: 56px;padding-left: 15px;}
     input{.h(60px);}
     label~input,  label~select,  label~textarea{.w(80%)}
     .password{position: relative;}
     .get-msg{position: absolute;right: 16px;top:50%;transform:translateY(-50%);color: @ora;border: 1px solid @ora;.p(6px 0);
     .w(65px);height: 34px;}
}
.ora,.icon-arrow-down{.c(@ora);}

#register .getCode{width:130px;border:1px solid #999;color:#999;}

.link-area label{width:150px;padding:0;position:absolute;z-index:999;height:28px;line-height: 28px;top:12px;}
.link-area span i,#register .clause-state[type=checkbox]:checked:before{color:#6fc6f1;}
.link-area span i{font-style: normal;}
.link-area span{width:100%;font-size:14px;margin-top:16px;display:block;text-align: left;padding-left:32px;}
#register .link-area .clause-state{width:20px;height:20px;left:0;top:11px;}
.link-area .mui-checkbox{position:relative;}
#register .mui-content .mui-content-padded{background:#fff;margin:0;padding:10px;padding-top: 30px;}
#register .mui-input{font-size:16px;padding: 0;height:56px;padding-left: 5px;}
.mui-table-view-cell i.iconfont{ font-size: 47px;line-height: 47px;margin-right: 19px;margin-top: 8px;}

</style>
