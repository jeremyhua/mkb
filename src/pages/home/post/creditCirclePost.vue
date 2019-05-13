<template>
	<div id="creditCirclePost" class="wrap">
		<x-header :left-options="{backText: ''}"  title="发布" @click="is_fh()"></x-header>
		<div class="main-credit-circle bg-f0 fixed-content">
			<!--<div class="ft-content"><textarea name="" placeholder="请输入具体内容" v-model="textareas"></textarea>@on-focus="onEvent('focus')" @on-blur="onEvent('blur')" -->
				<group >
					 <x-textarea :max="200" :height="200"  v-model="textareas" :placeholder="'请输入具体内容'"  ></x-textarea>
				</group>
			<div class="ft-upload bg-fff">
				<div class="c-333 ft-title">上传相关图片</div>
				<div id="addImg_box" class="bg-fff mt-15"></div>
			</div>
		</div>
		<button class="head-bg post-btn c-fff"  @click="postData" :class='{pushable:!dis}'>发布</button>
		<mt-popup
		  v-model="popupVisible"
		  position="bottom" class="r-ter">
		  <span class="click_success c-ff6800" @click="is_fh">完成</span>
		  <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
		</mt-popup>
	</div>
</template>

<script>
	import { CellSwipe, Popup,Picker } from 'mint-ui'
	import { XTextarea, Group, XInput,XHeader } from 'vux'

	export default {
		name:"creditCirclePost",
		data(){
			return {
				popupVisible:false,
				select_content:"",
				textareas:'',
				slots: [
			        {
			          flex:1,
			          values: ['请选择 必填', '板块一', '板块二', '板块三', '板块四', '板块五'],
			          className: 'slot1',
			          textAlign: 'center'
			        }
				],
				user:localStorage.getItem('users') && JSON.parse(localStorage.getItem('users')) || {},
				imgurl:[],
				loadimg:[],
				imgsurl:[],//上传图片
				dis:false,
				allloaded:true,
			}
		},
		components:{
				CellSwipe, Popup,Picker,XHeader ,XTextarea,Group,XInput
		},
		mounted(){
			const that=this;
			let upload =this.$upload("addImg_box",{
				path:this.imgUrl+"/api/Upload/upload",//请求的地址
	            data:{//往后台传递的参数
	                type:"members"},
	            type:"post",//请求方式
	            addBtnName:"<span class='iconfont icon-tianjia3 add-file'><span>",//添加文件按钮名字
	            uploadBtnName:"上传图片",//上传文件按钮名字
	            delIcon:"×",//删除已选择文件的图标或按钮名字
	            autoUpload:true,//是否自动上传
	            fileNum:9,//上传文件数量
	            fileSize:20,//上传文件的大小，以MB为单位
	            // isRepeat:false,//是否可以重复选择文件(false->不重复选择)
	            // fileType:['jpg','png','gif','jpeg'],//上传文件的类型
	            showImgList:true,//是否显示缩略图
				uploadSuccess:function(results){//上传成功的回调
					if(results.code==200){
						that.allloaded=true;
						mui.hideLoading();//隐藏后的回调函数
						mui.toast('上传成功');
						// self.imgs = results.result;
						that.dis=true;
						results.data.url.forEach(function(item){
							that.imgsurl.push(item);
						});
					}else{
						mui.toast(results.msg)
					}
				},
				
	            uploadError:function(xhr,status){
					console.log(status)
					//上传出错的回调
	            },
	            delImgFn:function(_this,parentNode,delFile,fileSrc,fileList,filterFile,index){//删除文件前的回调
	                //下方是删除图片的操作，如需弹窗确定，可在本处执行并复制下列代码至确定事件内
					upload.delImg(parentNode,delFile,fileSrc,fileList,filterFile,index);
					// console.log(_this,index,that.imgsurl,that)
					that.imgsurl.splice(index,1)
					console.log(that.imgsurl)
	            }
			});
			that.loadimg=upload.fileSrc;
		},
		methods:{
            postData(){
				if(this.allloaded){
					 this.$axios.post("/api/Post/add_post",`data=${JSON.stringify({
						session_id:this.user.session_id,
						userId:this.user.userId,
						content:this.textareas,
						images:this.imgsurl
					})}`).then(results=>{
							if(results.code==200){
								mui.toast('发布成功');
								this.dis=true;
								setTimeout(() => {this.$router.push({path:'/creditCircle'})}, 2000);
							}
					}).catch(err=>{

					});
				}else{
					mui.toast("请等待上传成功")
				}
            },
			popup_fn(){
				this.popupVisible = true;
			},
			onValuesChange(picker, val){
				this.select_content = val[0];
			},
			handler(){

			},
			is_fh(){
				this.popupVisible = false;
			}
		},
		
		watch:{
			'allloaded':function(oV,nV){
				console.log(oV,nV)
			}
		}
	}
</script>

<style scoped>
	.main{height: 100%;padding-top: 70px;padding-bottom: 50px;}
	.select—box{width: 140px;text-align: right;height: 100%;}
	.select—box span{margin-top: 14px;padding: 0;font-size: 15px;width: 100px;}
	.click_success{display:inline-block;margin: 10px 15px 0 0;}
	.select—box span.is_arrow{transform: rotate(180deg);display: inline-block;width: 15px;height: 15px;vertical-align: middle;margin-top: 30px;}
	.ft-title{border-left:5px solid #469dc8;height: 20px;line-height: 21px;padding-left: 10px;}
	.ft-name{border:none;text-align: right;padding: 0;}
	.ft-content{padding: 15px;}
	.ft-content textarea{font-size: 15px;border:none;height: 300px;margin: 0;padding-bottom: 0;}
	.ft-upload{padding: 15px;}
	.post-btn{position: fixed;bottom:0;left:0;width: 100%;height: 50px;font-size: 16px;border:none;border-radius: 0;}
	.pushable.head-bg{background:#b2b2b2;}
	@media screen and (max-width: 320px){
		.ft-content textarea{height: 200px;}
	}
</style>
<style>
	#creditCirclePost #addImg_box{display: flex;margin-top: 15px;}
	#creditCirclePost .upload-addimg-btn:first-child,.upload-btn-box{position: relative;cursor: pointer;display: inline-block;width: 80px;height: 80px;}
	#creditCirclePost .upload-btn-box{width: 0;}
	#creditCirclePost .upload-img-box{margin-left: -3px;}
	#creditCirclePost .upload-img-box:after{clear: both;width: 0;height: 0;display: block;overflow:hidden;}
	#creditCirclePost .upload-addimg-btn:first-child input{width: 80px;height: 80px;position: absolute;left:0;top:0;z-index: 9;opacity: 0;}
	#creditCirclePost .add-file{font-size: 80px;display: inline-block;width: 80px;height: 80px;line-height: 80px;color:#ccc;}
	#creditCirclePost .upload-img-item{float: left;width: 76px;height: 76px;margin-left:5px;margin-top:2px;margin-bottom:13px;position: relative; border:1px solid #ddd;margin-top:-2px;}
	#creditCirclePost .upload-img-item:first-child{margin-left: 87px;}
	#creditCirclePost .upload-img-item img{width: 100%;height: 100%;}
	#creditCirclePost .delimg-btn{position: absolute;top:-2px;right: 0;font-size: 30px;color:#ccc;}
	#creditCirclePost .mint-cell-wrapper{padding: 0 15px;}
	#creditCirclePost .mint-cell-value{width: 100%;justify-content:space-between;display: flex;height: 50px;line-height: 50px;}
	#creditCirclePost .mint-popup,.picker-items{width: 100%;}
	#creditCirclePost .picker-item.picker-selected{color:#469dc8;}
	.uploadprogress{width: 100%;bottom:0px;position: absolute;transform: translateY(-50%);height: 9px;background:#469dc8;}
	progress::-webkit-progress-bar {background: #469dc8;border-radius: 8px;}   
	progress::-webkit-progress-value {background: #469dc8;border-radius: 8px;}   
	.pr.alert::-webkit-progress-value {background: red;}
	.mui-show-loading {position: fixed;padding: 5px;width: 120px;min-height: 120px;top: 45%;left: 50%;margin-left: -60px;background: rgba(0, 0, 0, 0.6);
		text-align: center;border-radius: 5px;color: #FFFFFF;visibility: hidden;margin: 0;z-index: 2000;-webkit-transition-duration: .2s;transition-duration: .2s;
		opacity: 0;-webkit-transform: scale(0.9) translate(-50%, -50%);transform: scale(0.9) translate(-50%, -50%);-webkit-transform-origin: 0 0;transform-origin: 0 0;}
	.mui-show-loading.loading-visible {opacity: 1;visibility: visible;-webkit-transform: scale(1) translate(-50%, -50%);transform: scale(1) translate(-50%, -50%);}
	.mui-show-loading .mui-spinner{margin-top: 24px;width: 36px;height: 36px;}
	.mui-show-loading .text {line-height: 1.6;font-family: -apple-system-font,"Helvetica Neue",sans-serif;font-size: 14px;margin: 10px 0 0;color: #fff;}
	.mui-show-loading-mask {position: fixed;z-index: 1000;top: 0;right: 0;left: 0;bottom: 0;}
	.mui-show-loading-mask-hidden{display: none !important;}
	#creditCirclePost .weui-cells{margin-top: 0;}

</style>