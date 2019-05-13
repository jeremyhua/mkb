<template>
	<div id="cardWebview">
		<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=50524563&amp;site=qq&amp;menu=yes">客服中心</a>
	</div>
</template>

<script>
	export default {
		name:"cardWebview",
		data(){
			return {
				view:null,
				url:"",
				error:false,
				users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
			}
		},
		destroyed(){
			if(this.view !=null){
				this.view.close();
			}
			this.view.addEventListener('close',()=>{
				this.view = null;
			});
		},
		methods:{
			//返回上级
			clickButton(e){
				this.view.canBack((e)=>{
					if(!this.error && e.canBack) {
						this.view.back();
					}else{
						this.$router.push("/index");
					}
			    });
			},
			clickHome(){
				this.$router.push("/index");
			}
		},
		mounted(){
			console.log(this.users.userId)
			// let appid = hex_md5("byzk_shop_zl"+this.users.userId||"0");
			//let appid = "0";
			// console.log(appid)
			
			mui.plusReady(()=>{
				var all = plus.webview.all(); 
				var current = plus.webview.currentWebview().id;
				for(var i=0,len=all.length;i<len;i++){ 
				    if(all[i].id!==current){ 
				        all[i].close(); 
				    } 
				}
				// console.log(appid,this.target);
				this.view = plus.webview.create( this.target, "cardWebview",{
					top:"0px",
					bottom:'0px',
					'titleNView':{
						backgroundColor:"#469dc8",
						progress:{color:'#39ABFB'},
						titleText:"美卡宝",
						titleSize:"20px",
						titleColor:"#fff",
						buttons:[{text:'<',float:'left',onclick:this.clickButton,fontSize:"26px",fontWeight:"bold"}]
					}
					// ,
					// additionalHttpHeaders:{appid:appid}//设置头信息
				});
				this.view.setStyle({'popGesture':'none'});
				
				this.view.show();
				this.view.onerror = ()=>{
					this.error = true
				}



				this.view.addEventListener('progressChanged', (e)=>{
					if(e.progress==100){
						let url = plus.webview.getWebviewById('cardWebview').getURL();
						if(/#\/login/i.test(url)){
							this.$router.push("/my/login");
						}else if(/#\/my\//i.test(url)){

						}else if(/#\/my/i.test(url)){
							this.$router.push("/my");
						}
						console.log("当前页面URL："+plus.webview.getWebviewById('cardWebview').getURL());
					}
				}, false);
			});
		},
		props:["target","appid"]
	}
</script>

<style scoped>
	#hoppingCart{width: 100%;height: 100%;}
</style>