<template>
  <div id="set" class="h100p bg-f0">
		<x-header :left-options="{backText: ''}">设置</x-header>

      <div class="mui-content content fixed-content">
          <ul class="mui-table-view">
			<!-- 	<li class="mui-table-cell " >
						消息推送
						<div class=" mui-active mui-pull-right switcher" >
						<mt-switch v-model="switcherchoice" @change="handleChange"></mt-switch>
						</div>
				</li> -->
				 <group>
					<x-switch title="消息推送" v-model="value"></x-switch>
				</group>
				<li class="mui-table-view-cell" @click="clear_emory">
						清除缓存
						<i class="iconfont icon-youjiantou mui-pull-right"></i>
						<span class="mui-pull-right"></span>
				</li>
			</ul>
      
		<ul class="mui-table-view">
			<li class="mui-table-view-cell"  @click="updateapp(1)">
				检测更新
				<i class="iconfont icon-youjiantou mui-pull-right"></i>
				<span class="mui-pull-right">V1.0.1</span>
			</li>
		</ul> 
		<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				最近登录记录
				<span class="mui-pull-right">{{moment.unix(users.last_login_time||0).format('YYYY-MM-DD hh:mm:ss')}}</span>
			</li>
			<li class="mui-table-view-cell" >
				<router-link :to="{path:'/my/login/forgetPassword',query:{psw:'修改密码'}}">
					修改密码
					<i class="iconfont icon-youjiantou mui-pull-right"></i>
				</router-link>
				
			</li>
				<!-- <router-link to="/index/changetel" tag='li' class="mui-table-view-cell">
					修改手机号
					<i class="iconfont icon-youjiantou mui-pull-right"></i>
					<span class="mui-pull-right">{{(users ? (users.mobile):'电话号码')|regMobile}}</span>
				</router-link> -->
		</ul> 
		<!--<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<router-link to="/set/loan-enter">信贷人员入住<i class="iconfont icon-youjiantou mui-pull-right"></i></router-link>	
			</li>
			<li class="mui-table-view-cell">
				<router-link to="/my/my-invitation">	邀请好友
				<i class="iconfont icon-youjiantou mui-pull-right"></i></router-link>
			</li>
		</ul>-->
          <ul class="mui-table-view">
				<li class="mui-table-view-cell about">
					<router-link to="/my/aboutus">
					关于<i class="iconfont icon-youjiantou mui-pull-right"></i>
					</router-link>
				</li>
          </ul> 
		  <ul class="mui-table-view outlogin" v-show="users">
				<li class="mui-table-view-cell outload"  @click="signout()">退出登录</li>
          </ul> 
      </div>
  </div>
</template>
<script>
	import{ XHeader,InlineXSwitch, XSwitch, Group} from "vux"
    export default{
		name:"set",
		components:{
			XHeader,  InlineXSwitch,XSwitch,Group
		},
		data(){
			return{
			users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
			switcherchoice:true,
			mobile:'',
			border:'',
			edit:false,
			versionNumber:0,
			value: false
			}
		},
		mounted(){
			// mui.init({
			// 	swipeBack:true //启用右滑关闭功能
            // });
			// console.log(JSON.stringify(this.users))
			if(window.plus){
				//plus.push.createMessage("测试消息", "LocalMSG", {cover:false});
			}

			localStorage.setItem("update","true");
			  	   var timer = setInterval(()=>{
						if(localStorage.getItem("update")=="true"){
							clearInterval(timer);
							this.updateapp(0);  
						}
					}, 500);
        },
		filters: {
			regMobile: function (value) {
				if (!value) return '';
				var new_mobile ;
				if (value.length > 7) {
			　　　	new_mobile = value.substr(0, 3) + '****' + value.substr(7);
			　　}
			　　return new_mobile;
			}
		},
        methods:{
			handleChange(event) {
				// console.log(event);
			},
			defalute(event){
					event.preventDefault();
					event.stopPropagation();
			},
            signout(){
                this.$store.dispatch("signOut");
                this.$router.push("/my/login");
			},
			focusnick(){
				this.edit=true;
				this.border='border';
			},
			blurnick(){
				this.edit=false;
				this.border='';
			},
			updateapp(gish) {
				var server = 'api/api/config'; //获取升级描述文件服务器地址
				let apptype = "";
				var BrowserInfo = {
					userAgent: navigator.userAgent.toLowerCase(),
					isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
					isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
					isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
					isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
					};
				if(BrowserInfo.isIphone){
					apptype = 1;
					// console.log('iphone')
				}else if(BrowserInfo.isAndroid){
					apptype = 0;
					// console.log('andir')
				};
				this.$axios.post(server,`data=${JSON.stringify({apptype:apptype})}`).then((data)=> {
					if (data.code == 1) {
						// console.log(data)
						var entity=data.result.appVersion;
						//console.log(entity, this.versionNumber, entity>this.versionNumber)
						if(entity>this.versionNumber){
						mui.confirm(data.result.content, '版本更新', ["取消","立即更新"], (e) => {
								if (e.index == 1) {
								if(plus.os.name=="Android"){
									this.downWgt(data.result.appUrl);  // 下载升级包 安卓
									this.versionNumber=entity;
								}else{
									if(data.result.appUrl.indexOf('wgt')>-1){
										this.downWgt(data.result.appUrl);
										this.versionNumber=entity;
									}else{
										plus.runtime.openURL("itms-apps://" + data.result.app_store_url);  //data.result.app_store_url 
									}
								}
								}/* else{
								localStorage.removeItem("update");
								} */
						});
						}else{
						if(gish==1){
						mui.toast('已是最新版本~');
						localStorage.removeItem("update");
						}
						} 
					} else {
					mui.toast('检测更新失败！');
					//localStorage.removeItem("update");
					}
				});
        	},
			clear_emory(){
				mui.confirm("清理缓存会清理所有缓存数据，您确定要清理吗？","",["确认","取消"],(i)=>{
					if(i.index==0){
						this.$store.dispatch("signOut",{
			            });
			            // this.$store.dispatch("handleIs_show",false);
						localStorage.clear();
						plus.storage.clear();
						plus.cache.clear(()=>{
				            mui.toast("清理成功");
							setTimeout(()=>{
								this.$router.push("/index");	
							},500);
				        });
			        }
				});
			},
		downWgt(url){//下载
          let options = {filename:"_doc/update/"};
          let dtask = plus.downloader.createDownload(url, options);
          dtask.addEventListener('statechanged',(task, status)=>{
              if(!dtask) return;
              switch (task.state) {
                  case 0: //开始下载
                      this.download.isdownloading = true;
                      this.download.downstate = '即将开始';
                      break;
                  case 2: //已连接到服务器
                      this.download.downstate = '已连接到服务器';
                      break;
                  case 3: //已接收到数据
                      this.download.downstate = '正在下载';
                      this.download.currentsize = (task.downloadedSize / 1024 / 1024).toFixed(1) + 'MB';
                      this.download.totalsize = (task.totalSize / 1024 / 1024).toFixed(1) + 'MB';
                      this.download.progress = Math.round((task.downloadedSize / task.totalSize) * 100) + '%';
                      break;
                  case 4: //下载完成
                      this.download.downstate = '下载完成';
                      this.download.isdownloading = false; 
                      this.installWgt(task.filename); // 安装wgt包
                      break;
              }
          });
          dtask.start();
        },  installWgt(path){//安装
          plus.nativeUI.showWaiting("正在安装...");
          plus.runtime.install(path,{},function(){
              plus.nativeUI.closeWaiting();
            //   console.log("安装成功！");
              plus.nativeUI.alert("更新完成！",function(){
                  plus.runtime.restart();
              });
              localStorage.removeItem("update");
          },function(e){
              plus.nativeUI.closeWaiting();
            //   console.log("安装失败["+e.code+"]："+e.message);
              plus.nativeUI.alert("安装失败["+e.code+"]："+e.message);
              //localStorage.removeItem("update");
          });
        },
		
        },
		
    }
</script>
<style lang="less" scoped>
@l:left;
@gray:#555;
@lig:#e0e0e0;
@lit:#d1d1d1;
@ora:#469dc8;
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
.mui-table-view:after,.mui-table-view:before{.bg(transparent)}
.mui-content>.mui-table-view:first-child{.mt(0);}
.mui-table-view{.mb(15px);.mui-table-view-cell{.p(15px);span,i{.c(@lc;)}}.about{.p(15px)}.outload{.p(14px);text-align: center;.c(#fff);
background: #4097c2; /* Old browsers */background: -moz-linear-gradient(left,  #6fc6f1 1%, #469dc8 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  #6fc6f1 1%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */background: linear-gradient(to right,  #6fc6f1 1%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#469dc8', endColorstr='#ff3101',GradientType=1 ); /* IE6-9 */}}
.mui-table-view-cell a:hover,.mui-table-view-cell a:visited,.mui-table-view-cell a:active,.mui-table-view-cell a:link{background: transparent;}
.switcher{position: absolute;right: 15px;top: 10px;}
.outlogin{margin-top:10px;margin-bottom:0;}
.mobilechange{border: none;position: absolute;right: 37px;width: 143px;text-align: right;top: 6px;padding-right: 0;color:#ccc;}
.border{border:1px solid #aaa;}
.mui-table-cell{padding: 15px;width: 100%; overflow: hidden;height: 50px;display: block;position:relative;}
.mui-table-cell:after {position: absolute;right: 0; bottom: 0;left: 15px;height: 1px;content: '';-webkit-transform: scaleY(.5);transform: scaleY(.5);background-color: #c8c7cc;}
.vux-x-switch.weui-cell_switch {padding: 16px;font-size: 16px;}
.mui-content{height:auto;}
</style>
<style>
#set .mint-switch-input:checked + .mint-switch-core {border-color: #469dc8;background-color: #469dc8;}
#set .vux-x-switch.weui-cell_switch:after {background: #f0f0f0;left: 15px;}
#set .weui-cells:after{left:15px;}

</style>

