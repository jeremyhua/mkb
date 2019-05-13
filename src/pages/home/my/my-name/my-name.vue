<template>
    <div id="my-name" class="bg-f0 wrap">
             <x-header :left-options="{backText: ''}"  title="实名认证"></x-header>
             <div class="fixed-content">
                <group>
                    <x-input placeholder="请输入你的真实姓名" :disabled="rz_disabled" v-model="realname" :max="5"></x-input>
                    <x-input placeholder="请输入你的身份证号码" v-model="card" :disabled="rz_disabled" :max='18' :min='18'></x-input>
                </group>
                <div class="camera-box"  @click="changeimg('zm_upload')"  id="zm_upload" :style="{background: '#ffb988 url('+ require('@/assets/images/id1.png') +') center center no-repeat',backgroundSize: '177px 97.5px'}" >
                    <img v-if="zm_path" :src="imgUrl+zm_path" class="img-zm">
                    <img :src="require('@/assets/images/pay/camera.png')" class="psa" >
                    <div class="psa">上传身份证正面</div>
                </div>
                <div class="camera-box"  @click="changeimg('fm_upload')" id="fm_upload"  :style="{background: '#ffb988 url('+ require('@/assets/images/id2.png') +') center center no-repeat',backgroundSize: '177px 97.5px'}" >
                    <img v-if="fm_path" :src="imgUrl+fm_path" class="img-zm">
                    <img class="psa" :src="require('@/assets/images/pay/camera.png')">
                    <div class="psa">上传身份证反面</div>
                </div>     
        <box gap="10px 10px">
          <XButton  :disabled='rz_disabled' class="renzen" :gradients="['#6fc6f1', '#469dc8']"  @click.native="post_data">{{rz_status}}</XButton>
        </box>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import {XTextarea, XHeader,Group, XInput,Box,XButton}from 'vux'
    export default{
        name:"my-name",
        data(){
            return{
                show:true,
                title:"实名认证",
                photo:{src:require('@/assets/images/pay/camera.png')},
                myphoto:{src:require('@/assets/images/my_photo_2.png')},
                myphotos:{src:require('@/assets/images/my_photo.png')},
                users:localStorage.getItem('users') && JSON.parse(localStorage.getItem('users')) || {},
                card:'',
                zm_path:'',
                fm_path:'',
                realname:'',
                onoff:'',
                bg:{background:"#fff","z-index":10,width:"100%"},
                rz_status:'认证',
                rz_disabled: '',
            }
        },
        components: {
            XHeader,XTextarea, Group, Box, XInput,XButton
        },
        mounted(){   
            this.checkStatus();  //查看状态
        },
        methods:{
            changeimg(even){
				$('#'+even+' .upload-addimg-btn').find("input[type=file]").click();
			},
            changePic(){},
            post_data(){
                if(this.realname==''){
                    Toast('名字不能为空');
                    return false;
                }else if(this.card==''){
                    Toast('身份证不能为空');
                    return false;
                }else if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test( this.card)){
                    Toast('请输入正确的身份证号码')
                    return  false;
                }
                this.$axios.post('/api/Usercenter/do_real_name',`data=${JSON.stringify({   session_id:this.users.session_id,
                        userId:this.users.userId, 
                        card:this.card,
                        realname:this.realname,
                        card_img_a:this.zm_path,
                        card_img_b:this.fm_path})}`)
                    .then(res=>{
                        if(res.code==200){
                            this.checkStatus()
                        }else{
                            Toast(res.msg)
                        }
                    })
                    
            },
            blurname(){
                 var username = /^[\u4E00-\u9FA5A-Za-z]+$/;
                if(!this.realname){
                   Toast('名字不能为空')
                }else if(!username.test(this.realname)){
                    Toast('请输入中文名字')
                }
            },
            blurcard(){
                 var cardreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
                 if(!this.card){
                   Toast('身份证不能为空')
                }else if(!cardreg.test( this.card)){
                    Toast('请输入正确的身份证号码')
                }
            },
            checkStatus(){
                const {userId, session_id} = this.users;
            //    console.log(this.users)
                this.$axios.post('/api/Usercenter/see_realname_apply',`data=${JSON.stringify({userId, session_id})}`)
                    .then(res=>{
                        // console.log(res)
                        if(res.code==200){
                                if(res.data.status==1){  //已实名
                                    this.rz_status = '已认证',
                                    this.rz_disabled = true,
                                    this.zm_path = res.data.card_img_a;
                                    this.fm_path = res.data.card_img_b;
                                    this.realname = res.data.realname;
                                    this.card = res.data.card;
                                }else if(res.data.status==0){ //审核中
                                    this.rz_status = '审核中',
                                    this.rz_disabled = true,
                                    this.zm_path = res.data.card_img_a;
                                    this.fm_path = res.data.card_img_b;
                                    this.realname = res.data.realname;
                                    this.card = res.data.card;
                                }else if(res.data.status==-1){ //被拒绝
                                    Toast(res.msg);
                                    this.rz_status = '重新提交',
                                    this.rz_disabled = false,
                                    this.zm_path = res.data.card_img_a;
                                    this.fm_path = res.data.card_img_b;
                                    this.realname = res.data.realname;
                                    this.card = res.data.card;
                                }
                                else{
                                    this.rz_disabled = false;
                                    // console.log('未备注状态')
                                }
                        }else{
                                    this.rz_status = '认证',
                                    this.rz_disabled = false,
                                    this.zm_path = res.data.card_img_a;
                                    this.fm_path = res.data.card_img_b;
                                    this.realname = res.data.realname;
                                    this.card = res.data.card;
                        };
                    })
            }
        },
        watch: {
            'rz_disabled'(val){
                // console.log(this.rz_disabled,val)
                if(!val){
                    const _this = this;
                    Uploader("zm_upload",{
                        path:this.imgUrl+"/api/Upload/upload",//请求的地址
                        data:{//往后台传递的参数
                                type:'card'
                        },
                        uploadSuccess:function(results){//上传成功的回调
                            if(results.code==200){
                                _this.zm_path = results.data.url[0];
                                // console.log(_this.zm_path)
                                mui.hideLoading();//隐藏后的回调函数
						        mui.toast('上传成功');
                            }else{
                                mui.toast(results.msg)
                            }
                        },
                        uploadError:function(xhr,status){
                            // console.log(status)
                            //上传出错的回调
                        }
                    });
                    Uploader("fm_upload",{
                        path:this.imgUrl+"/api/Upload/upload",//请求的地址
                        data:{//往后台传递的参数
                            type:'card'
                        },
                        uploadSuccess:function(results){//上传成功的回调
                        // console.log(results);
                            if(results.code==200){
                                _this.fm_path = results.data.url[0];
                                mui.hideLoading();//隐藏后的回调函数
						        mui.toast('上传成功');
                            }else{
                                mui.toast(results.msg)
                            }
                        },
                        uploadError:function(xhr,status){
                            // console.log(status)
                            //上传出错的回调
                        }
                    });
                }
            },
        }
    }
</script>
<style lang="less" scoped>

.camera-box{position: relative;width: 94%;height: 150px;text-align: center;color: #fff;   margin: 10px 3%;}
.camera-box img{display: inline-block;width: 44px;margin-top: 30px;}
.psa{z-index:3;position:relative;}
.camera-box .img-zm{display:block;width:100%;height: 100%; position: absolute;margin-top: 0px;}
</style>
<style>
#my-name .weui-cells{margin-top: 0 !important;}
#my-name .vux-no-group-title{margin-top: 0 !important;}
#my-name .weui-label{font-size:14px;}
#my-name input{border:none !important; margin-bottom: 0;}
#my-name{background: #fff;}
#my-name  .psa{z-index:3;position:relative;}
#my-name  .upload-img-box,.upload-btn-box,.upload-addimg-btn:first-child input{position:absolute;left:0;top:0;width:100%;height:100%;}
#my-name  .upload-img-box{z-index:1;opacity: 0;}
#my-name  .upload-btn-box{z-index:4;opacity: 0;}
#my-name  .upload-addimg-btn:first-child input{opacity:0;}
#my-name  .upload-img-item,.upload-img-item img{height:100%;}
#my-name  input{border: none;}
.table-cell{position: relative;}
#my-name .upload-img-item{padding: 8px 16px 0;    background: #fff;}
#my-name .upload-img-item img{width:100%;height: 143px;}
#my-name .delimg-btn{opacity:0;position: absolute;right:18px;width: 17px;z-index:10;font-size: 30px;color: #ccc; }

#zm_upload {z-index:100;}
#fm_upload {z-index:100;}


	.mui-show-loading {position: fixed;padding: 5px;width: 120px;min-height: 120px;top: 45%;left: 50%;margin-left: -60px;background: rgba(0, 0, 0, 0.6);
		text-align: center;border-radius: 5px;color: #FFFFFF;visibility: hidden;margin: 0;z-index: 2000;-webkit-transition-duration: .2s;transition-duration: .2s;
		opacity: 0;-webkit-transform: scale(0.9) translate(-50%, -50%);transform: scale(0.9) translate(-50%, -50%);-webkit-transform-origin: 0 0;transform-origin: 0 0;}
	.mui-show-loading.loading-visible {opacity: 1;visibility: visible;-webkit-transform: scale(1) translate(-50%, -50%);transform: scale(1) translate(-50%, -50%);}
	.mui-show-loading .mui-spinner{margin-top: 24px;width: 36px;height: 36px;}
	.mui-show-loading .text {line-height: 1.6;font-family: -apple-system-font,"Helvetica Neue",sans-serif;font-size: 14px;margin: 10px 0 0;color: #fff;}
	.mui-show-loading-mask {position: fixed;z-index: 1000;top: 0;right: 0;left: 0;bottom: 0;}
	.mui-show-loading-mask-hidden{display: none !important;}
</style>

