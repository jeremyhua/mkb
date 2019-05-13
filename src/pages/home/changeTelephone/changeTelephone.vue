<template>
  <div id="load" class="h100p bg-f0">
        <r-header :is_r="true" title="更改手机号"></r-header>
        <div class="mui-content">
			<form id='regist-form' class="mui-input-group">
				<div class="mui-input-row">
                    <label for="account">新的手机号</label> 
					<input id='account' type="text" v-model="tel" class="mui-input-clear mui-input" placeholder="请输入手机号">
				</div>
				<div class="mui-input-row">
                    <label for="yzm">验证码</label> 
					<input id='yzm' type="text" v-model="yzm" class="mui-input-clear mui-input password" placeholder="请输入验证码">
                    <input type="button" class="get-msg mui-btn mui-btn-warning mui-btn-outlined" :class="{getCode:is_setBtn}" :value="getBtn" @click="getCode()"/>
				</div>
             
			</form>
			
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-button" @click="reg_fn()">确认修改</button>
				
			</div>
	
		</div>
  </div>
</template>
<script>
    import { Checklist,Toast } from 'mint-ui';
    import rHeader from "@/components/header/header-r"

    export default{
        name:"load",
        data(){
            return {
                click_state:true,
                is_setBtn:false,
                getBtn:"获取",
                time:60,
                yzm:"666666",
                tel:"",
                yqm:"",
                confirm_psw:"",
                clause:"1"
            }
        },
        methods:{
            //注册提交
            reg_fn(){
                if(!this.yzm){
                    Toast("请输入验证码");
                    return false;
                }else if(!this.tel){
                    Toast("请输入新的手机号");
                    return false;
                }

                this.$store.dispatch("forgetPassword", {
                    data: "data="+JSON.stringify({
                        mobile:this.tel,
                        editcode:this.yzm,
                        newpassword:this.psw
                    }),
                    fn: (code, msg) => {
                        switch (code) {
                            case 200:
                                let instance = Toast('修改成功');
                                setTimeout(() => {
                                    instance.close();
                                    this.$router.go(-1);
                                }, 2000);
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
                        data:`data=${JSON.stringify({mobile:this.tel,type:'MODIFYPWD'})}`,
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
        },
        components:{
            Toast,Checklist,rHeader
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
.pr(@p){padding-right: @p}
.bg(@b){background:@b}
.fw(@w){font-weight:@w}
#load{background: #fff;}
.mui-table-view:after,.mui-table-view:before,#regist-form:before,#regist-form:after{
    background-color:transparent;
}
.mui-content>.mui-table-view:first-child {
    margin-top: 0;
    .p(48px 0px);
}
.mui-input-group .mui-input-row:after{right:15px;}
.mui-content{background: #fff;padding-top: 70px;}
.mui-table-view-cell{
    //  padding:66px 0;
    i.iconfont{
        .fz(54px);.lh(54px);.mr(7px);
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
        background: #4097c2; /* Old browsers */
        background: -moz-linear-gradient(left,  #6fc6f1 1%, #469dc8 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left,  #6fc6f1 1%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right,  #6fc6f1 1%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#ff3101',GradientType=1 ); /* IE6-9 */
        height: 50px;
        line-height: 23px;
}
.link-area a{color:@gray;.fz(13px)}
// #vueg-background{background: #fff;}
.mui-input-row{
    .h(56px);
     label{.w(30%);.pr(0);.h(56px);padding: 0;line-height: 56px;padding-left: 15px;}
     input{.h(60px);}
     label~input,  label~select,  label~textarea{.w(70%)}
     .password{position: relative;}
     .get-msg{position: absolute;right: 16px;top:50%;transform:translateY(-50%);color: @ora;border: 1px solid @ora;.p(6px 0);
     .w(65px);height: 34px;}
}
.ora,.icon-arrow-down{.c(@ora);}

#load .getCode{width:130px;border:1px solid #999;color:#999;}

.link-area label{width:150px;padding:0;position:absolute;z-index:999;height:28px;line-height: 28px;top:12px;}
.link-area span i,#load .clause-state[type=checkbox]:checked:before{color:#469dc8;}
.link-area span i{font-style: normal;}
.link-area span{width:100%;font-size:14px;margin-top:16px;display:block;text-align: left;padding-left:32px;}
#load .link-area .clause-state{width:20px;height:20px;left:0;top:11px;}
.link-area .mui-checkbox{position:relative;}
#load .mui-content .mui-content-padded{background:#fff;margin:0;padding:10px;padding-top: 30px;}
#load .mui-input{font-size:16px;padding: 0;height:56px;padding-left: 5px;}
</style>
