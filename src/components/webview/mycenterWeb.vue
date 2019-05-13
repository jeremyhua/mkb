<template>
	<div id="webview">
		<!-- <input type="hidden" v-model="url" :value="target"/> -->
	</div>
</template>

<script>
	export default {
		name:"webview",
		data(){
			return {
				view:null,
				url:"",
				error:false
			}
		},
		destroyed(){
			this.view.close();
			this.view.addEventListener('close',()=>{
				this.view = null;
			});
		},
		methods:{
			//返回上级
			clickButton(e){
				this.view.canBack((e)=>{
					if(!error && e.canBack) {
						this.view.back();
					}else{
						this.$router.push("/index");
					}
			    });
			},
			getUrlvalues(url){
                let r_data = url.split('&');
                let key = null,newdata={};
                for(let k=0;k<r_data.length;k++){
                    key = r_data[k].split('=');
                    newdata[key[0]] = key[1];
                }
                return newdata
            },
		},
		mounted(){
			let appid = hex_md5("byzk_shop_zl"+this.$store.state.loginModule.appid||"0");
			const opa = {
				top:"75px",
				bottom:'0px'
			};

			    var all = plus.webview.all(); 
				var current = plus.webview.currentWebview().id; 
				for(var i=0,len=all.length;i<len;i++){ 
				    if(all[i].id!==current){ 
				        all[i].close(); 
				    } 
				} 
			this.view = plus.webview.create( this.baseUrl+this.target+"?appid="+appid, "webviewMy",opa);
			console.log(this.$store.state.loginModule.appid)

			this.view.show();

			this.view.onerror = ()=>{
                this.error = true
            }

			this.view.addEventListener('progressChanged', (e)=>{
				if(e.progress==100){
					let url = plus.webview.getWebviewById('webviewMy').getURL();
					if(/Mobile\/index\/index/i.test(url)||url=="https://app.zlkgsy.com"||url=="https://app.zlkgsy.com/"||url=="https://m.zlkgsy.com"||url=="https://m.zlkgsy.com/"){
						this.$router.push("/index");
					}else if(/Mobile\/User\/login/i.test(url)){
						this.$router.push("/login");
					}else if(/mobile\/User\/reg/i.test(url)){
						this.$router.push("/register");
					}else if(/mobile\/User\/index/i.test(url)){
						this.$router.push("/my");
					}else if(/Mobile\/Outlinestore\/callPayCode/i.test(url)){   //测试扫码
						let getData = this.getUrlvalues(url.split('?')[1]);
						this.$router.push({path:"/scanning",query:getData});
                    }else if(/Mobile\/Outlinestore\/callComment/i.test(url)){   //返回评论
                        let getData = this.getUrlvalues(url.split('?')[1]);
                        let {store_id,order_sn} = getData;
						this.$router.push({path:'/evaluate',query:{store_id,order_sn}});
                    }else if(/Mobile\/Outlinestore\/callStore/i.test(url)){   //返回商家
                        let getData = this.getUrlvalues(url.split('?')[1]);
                        let {store_id} = getData;
						this.$router.push({path:'/details',query:{store_id}});
					}
                    else{
						console.log('没有匹配的地址')
					}
					console.log("当前页面URL："+plus.webview.getWebviewById('webviewMy').getURL());
				}
			}, false);	
			
		},
		props:["target","appid","title"]
	}
</script>

<style scoped>
	#hoppingCart{width: 100%;height: 100%;}
</style>