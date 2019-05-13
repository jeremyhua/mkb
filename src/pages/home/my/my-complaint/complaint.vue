<template>
  <div id="complaint">
	<x-header :left-options="{backText: ''}">客服中心</x-header>
      <div class=" main-wrap content fixed-content" ref='qq'>
		   	<tab :line-width=2  active-color='#469dc8' v-model="index">
        	<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"  @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="500px" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
       
          <div class="tab-swiper vux-center" v-show="item=='投诉中心'">
		<!-- 	  	<select class="mui-btn mui-btn-block">
					<option value="item-1">item-1</option>
					<option value="item-2">item-2</option>
					<option value="item-3">item-3</option>
					<option value="item-4">item-4</option>
					<option value="item-5">item-5</option>
				</select> -->
					<group  @click.native="type_popup = true" :type="tousutype">
								<cell title="投诉类型" :value="type_content" is-link></cell>
					</group>	
					<group >
								<x-input title="投诉对象"  placeholder="投诉对象名称" v-model="complain_obj"></x-input>
					
							<x-input title="对方手机号"  v-model="complain_tel" :max="13" is-type="china-mobile"></x-input>
					
					
						<x-textarea :max="200" title="详细描述"  v-model="description"></x-textarea>
					</group>
						<div class="ft-upload bg-fff">
							<div class="c-333 ft-title">上传相关图片</div>
							<div id="addImg_box" class="bg-fff mt-15"></div>
						</div>
					<ul class="bottom">
						<li class="mui-table-view-cell outload" @click="tousu">
								<router-link to="" class="">立即投诉</router-link>						
						</li>
					</ul> 
             
          </div>
		     <div class="tab-swiper vux-center" v-show="item=='客服中心'">
        		<!-- <a target="_blank" href="mqqwpa://im/chat?chat_type=wpa&uin=244414635&version=1&src_type=web&web_src=bjhuli.com">客服中心</a> -->
				 <!--
				 <a href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=18863883&card_type=group&source=external">QQ群</a>
				 <a href="mqqwpa://im/chat?chat_type=wpa&uin=2679571084&version=1&src_type=web&web_src=bjhuli.com">报名咨询</a> -->
				 <!-- <div v-show='webview'> <cardWebview :target="blank"></cardWebview></div> -->
				 	<group>
					 	 <cell-box @click.native='KeFuQQ'>
							<img v-lazy="qqimg" class='iconimg iconqq'>	<a class="linkto" >qq咨询1</a>
						</cell-box>
						 <cell-box @click.native='KeFuQQ2'>
							<img v-lazy="qqimg" class='iconimg iconqq'>	<a class="linkto" >qq咨询2</a>
						</cell-box>
						<cell-box>
							<img v-lazy="telimg" class='iconimg'> <a href="tel:02788772910" class="linkto">电话咨询</a>
						</cell-box>
							
					</group>
          </div>
        </swiper-item>
      </swiper>

      </div>
	 	<mt-popup
		  v-model="type_popup"
		  position="bottom" class="r-ter">
		  <span class="click_success c-ff6800" @click="is_fh()">完成</span>
		  <mt-picker :slots="type_list" @change="onTypeChange" valueKey="link_value"></mt-picker>
		</mt-popup>
  </div>
</template>
<script>
import { Tab, TabItem, Sticky, Divider,  Swiper, SwiperItem  , Box , XButton,CheckIcon, XHeader,XInput, XTextarea, Group, Cell, CellBox, } from 'vux'
import cardWebview from '@/components/webview/webqq'
	// import {XHeader,XInput, Group, Cell, CellBox, XTextarea } from "vux"
	import { CellSwipe, Popup,Picker,Toast } from 'mint-ui'
    export default{
		name:"set",
		components:{
			 cardWebview,CellSwipe, Popup,Picker,Toast,Tab, TabItem, Sticky, Divider,  Swiper, SwiperItem  , Group , Box , XButton,CheckIcon, XHeader,XInput, Group, Cell, CellBox, XTextarea
		},
		data(){
			return{
			users:localStorage.getItem('users') && JSON.parse(localStorage.getItem('users')) || {},
			blank:'mqqwpa://im/chat?chat_type=wpa&uin=244414635&version=1&src_type=web&web_src=bjhuli.com',
			target:'http://wpa.qq.com/msgrd?v=3&amp;uin=50524563&amp;site=qq&amp;menu=yes',
			 index: 0,
			 webview:false,
			demo2: '美食',
			list2:['投诉中心','客服中心' ],
			type_popup:false,
			description:'',
			type_content:"",
			tousutype:'',
			type_list: [
			        {
			          flex:1,
			          values: [{link_value:'选择投诉类型'}],
			          className: 'slot1',
			          textAlign: 'center'
			        }
			],
			complain_obj:'',
			complain_tel:'',
			show:true,
			title:"投诉中心",
			two:{name:"详细描述"},
			three:{name:"上传相关图片"},
			loadimg:[],
			imgurl:[],
			qqimg:require("@/assets/images/my/qq.png"),
			telimg: require("@/assets/images/my/tel.png"),
			
			}
		},
		created(){
			this.getlist()
		},
		mounted(){
		
			this.addImg();
		},
		
		methods:{
			KeFuQQ(){
            if (plus.os.name == "iOS") {  
                plus.runtime.launchApplication({  
                    action: "mqq://im/chat?chat_type=wpa&uin=1054564&version=1&src_type=web"  
                }, function(e) {  
                    plus.nativeUI.confirm("检查到您未安装qq，请先到appstore搜索下载？", function(i) {  
                        if (i.index == 0) {  
                            iosAppstore("itunes.apple.com/cn/app/mqq/");  
                        }  
                    });  
                });  
            }else if (plus.os.name == "Android") { 
                var main = plus.android.runtimeMainActivity(); 
                var Intent = plus.android.importClass('android.content.Intent'); 
                var Uri = plus.android.importClass('android.net.Uri'); 
                var intent = new Intent(Intent.ACTION_VIEW, Uri.parse("mqqwpa://im/chat?chat_type=wpa&uin=1054564")); 
                main.startActivity(intent); 
            } 
		},
			KeFuQQ2(){
            if (plus.os.name == "iOS") {  
                plus.runtime.launchApplication({  
                    action: "mqq://im/chat?chat_type=wpa&uin=9705417&version=1&src_type=web"  
                }, function(e) {  
                    plus.nativeUI.confirm("检查到您未安装qq，请先到appstore搜索下载？", function(i) {  
                        if (i.index == 0) {  
                            iosAppstore("itunes.apple.com/cn/app/mqq/");  
                        }  
                    });  
                });  
            }else if (plus.os.name == "Android") { 
                var main = plus.android.runtimeMainActivity(); 
                var Intent = plus.android.importClass('android.content.Intent'); 
                var Uri = plus.android.importClass('android.net.Uri'); 
                var intent = new Intent(Intent.ACTION_VIEW, Uri.parse("mqqwpa://im/chat?chat_type=wpa&uin=9705417")); 
                main.startActivity(intent); 
            } 
        },
		addImg(){
				// alert(12)
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
			is_fh(){
				this.type_popup=false;
			},
			onTypeChange(picker, val){
				this.type_content = val[0].link_value;
				this.tousutype=val[0].link_name;
			},
			tousu(){
				console.log(this.tousutype)
				if(!this.tousutype){
						Toast("请选择投诉类型");
						return false;
				}
				 if(!this.complain_obj){
						Toast("请输入投诉对象");
						return false;
				} if(!this.complain_tel){
						Toast("请输入投诉电话");
						return false;
				} if(!this.description){
						Toast("请输入具体描述");
						return false;
				}
				
				this.$axios.post('/api/Usercenter/do_complain',`data=${JSON.stringify({
					session_id:this.users.session_id,
                    userId:this.users.userId,
					complain_type:this.type_content,
					complain_obj:this.complain_obj,
					complain_tel:this.complain_tel,
					description:this.description,
					images:this.imgurl
                })}`).then(
				res=> {
					if(res.code==200){
						mui.toast(res.msg)
						setTimeout(() => {
							this.$router.push({path:'/index'})
						}, 3000);
					}else if(res.code==999){mui.toast(res.msg)}
				}).catch(err=>{alert(err)})
			},
			getlist(){
				this.$axios.post('/api/Usercenter/complain_list').then(
				res=> {
					if(res.code==200){
						var obj=res.data;
						for (const key in obj) {
								const element = obj[key];
								this.type_list[0].values.push(element);
						}
					}else if(res.code==999){Toast(res.msg)}
				}).catch(err=>{alert(err)})
			}
		},
		watch:{
			index(v){
				console.log(v)
				if(v=='1'){
					var _this=this;
					setTimeout(() => {
							_this.addImg()
					}, 1000);
							

				}

			}
		}
    }
</script>
<style lang="less" scoped>
@l:left;
@gray:#555;
@lig:#e0e0e0;
@lit:#d1d1d1;
@ora:#6fc6f1;
@lc:#cccccc;
.h(@h){height:@h}
.c(@h){color:@h}
.lh(@h){line-height:@h}
.w(@h){width:@h}
.mt(@mt){margin-top:@mt}
.mb(@mb){margin-bottom:@mb}
.mr(@mr){margin-right:@mr}
.fz(@f){font-size: @f}
.fl(@f){float:@f}
.p(@p){padding: @p}
.pr(@p){padding-right: @p}
.pt(@p){padding-top:@p}
.bg(@b){background:@b}
.fw(@w){font-weight:@w}
.mui-table-view:after,.mui-table-view:before,.mui-table-view li:after{
	.bg(transparent)
}
.mui-content>.mui-table-view:first-child{
	.mt(0);
}
#complaint .mui-table-view{
	.mb(15px);
	.mui-table-view-cell{
	span,i{.c(@lc;)}
	}
	.about{.p(17px)}
}
.mui-table-view-cell a:hover,.mui-table-view-cell a:visited,.mui-table-view-cell a:active,.mui-table-view-cell a:link{background: transparent;}

#complaint .mui-table-view{background:#f0f0f0;
	li{margin-top:9px;background:#fff;color:#7d7d7d;
	span{color:#333333;}
	i.icon-shuxian{color:#469dc8;font-size: 19px;position: relative;top: 2px;}
	textarea{border: none;padding: 5px;height: 120px;margin-bottom:0;}
	.icon-tianjia3{display: block;font-size: 96px;margin: 20px 10px 0;height: 100px;line-height: 96px;}}}
#complaint .mint-popup{width: 100%;padding: 10px 10px 0;}

	// .main-wrap{padding-bottom:50px;}
	.ft-upload{padding: 15px;}
	.post-btn{position: fixed; bottom:0;left:0;width: 100%;height: 50px;font-size: 16px;border:none;border-radius: 0;}
.mui-pull-right input[name=text]{margin-bottom:0;padding:0;width:100%;font-size: 18px;text-align: right;border:none;}
.mui-table-view .mui-table-view-cell{line-height: 40px;    padding: 5px 15px;font-size: 15px;}
.text-con .mui-pull-right{width:65%;}
.bottom{margin-top:10px;height:50px;text-align: center;.c(#fff);/* position:fixed; */bottom:0;width: 100%; background: #4097c2; /* Old browsers */
        background: -moz-linear-gradient(left,  #6fc6f1 1%, #469dc8 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left,  #6fc6f1 1%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right,  #6fc6f1 1%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#ff3101',GradientType=1 ); /* IE6-9 */}
			/* 消除mui默认样式 */
p{margin-bottom:0;color:#666;}
input[type=text]{border: none;text-align: right;margin-bottom:0;}
textarea{padding:0;margin-bottom:0;}
.weui-cell_access .weui-cell__ft{height: 40px;line-height: 40px;	}
.main-wrap{color:#666;}
.linkto{color:#666;display: block; width: 100%;height: 100%;}
.iconimg{width:26px;height:26px;margin-right:10px;}
.iconqq{height: 20px;width: 23px;position: relative;top: 3px;}
</style>

<style>
	#complaint textarea{padding:0;}
	#complaint  .weui-cells {margin-top: 0;}
	#complaint #addImg_box{display: flex;margin-top: 15px;}
	#complaint .upload-addimg-btn:first-child,.upload-btn-box{position: relative;cursor: pointer;display: inline-block;width: 80px;height: 80px;}
	#complaint .upload-btn-box{width: 0;}
	#complaint .upload-img-box{margin-left: -3px;}
	#complaint .upload-img-box:after{clear: both;width: 0;height: 0;display: block;overflow:hidden;}
	#complaint .upload-addimg-btn:first-child input{width: 80px;height: 80px;position: absolute;left:0;top:0;z-index: 9;opacity: 0;}
	/* #complaint .upload-addimg-btn:last-child{display: none;} */
	#complaint .add-file{font-size: 80px;display: inline-block;width: 80px;height: 80px;line-height: 80px;color:#ccc;}
	#complaint .upload-img-item{float: left;width: 76px;height: 76px;margin-left:5px;margin-top:2px;margin-bottom:3px;position: relative; border:1px solid #ddd;margin-top:-2px;}
	#complaint .upload-img-item:first-child{margin-left: 87px;}
	#complaint .upload-img-item img{width: 100%;height: 100%;}
	#complaint .delimg-btn{position: absolute;top:-2px;right: 0;font-size: 30px;color:#ccc;}
	#complaint .mint-cell-wrapper{padding: 0 15px;}
	#complaint .mint-cell-value{width: 100%;justify-content:space-between;display: flex;height: 50px;line-height: 50px;}
	#complaint .mint-popup,.picker-items{width: 100%;}
	#complaint .picker-item.picker-selected{color:#469dc8;}
	#complaint input[type=text]{border: none;text-align: right;}
	#complaint .vux-slider{padding-top:47px;}
	#complaint .vux-tab-wrap {position: fixed;top: 67px;height: 47px;width: 100%;    z-index: 2;}
</style>

