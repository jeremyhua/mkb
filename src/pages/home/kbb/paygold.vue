<template>
	<div id="payweb">
        <x-header title="支付" class="fixed-top" :left-options="{backText: ''}"></x-header>
	</div>
</template>

<script>
import { XHeader } from 'vux';
	export default {
		name:"payweb",
		data(){
			return {
				view:null,
                url:"",
                target:"http://39.98.244.78:82/api/payment/getCode?pay_code=weixinH5&order_id="+this.$route.query.linkto,
                pay_timer:null,
                error:false,
                myaudio:'',
			}
		},
		mounted(){
            let myaudio;
            let _this = this;
            if(window.plus){
                    mui.plusReady(()=>{
                        this.myaudio = plus.audio.createPlayer('/static/audio/pulse.mp3');
                    })
            }
            
           
       
            console.log(this.target)//http://jcc.tw186.com//api/api/payMoney?userId=D6JQO4WF/qnkkgNaoe0&creditId=6&money=333&blockId=2
            // if(window.plus){

                this.view = plus.webview.create( this.target, "webviewPay",{
                    top:"67px",
                    bottom:'0px'
                });
                this.view.show();
                this.view.onerror = ()=>{
                    this.error = true
                }
            // }
            let _url = null;
            // console.log("baseURL是"+this.imgUrl);
            //console.log('目标网址为：'+this.target);//http://jcc.tw186.com//api/api/payMoney?userId=D6JQO4WF/qnkkgNaoe0&creditId=6&money=2332&blockId=2
            this.view.addEventListener('progressChanged', (e) => {
				if(e.progress==100 ){
                    this.url = decodeURIComponent(plus.webview.getWebviewById('webviewPay').getURL());
                    if(_url!==this.url){
                        //https://wx.tenpay.com/
                        //let check_url = "^"+this.imgUrl+'api/api/payReturn';
                        let check_url = "^https://wx.tenpay.com/";
                        let reg = new RegExp(check_url,'i');
                        //console.log('当前网址为：'+this.url,reg);//http://jcc.tw186.com/api/api/payReturn?code=-1&msg=String index out of range: 6
                        //console.log(reg.test(this.url))//true
                        if(reg.test(this.url)){
                            try {
                                _this.$router.go(-1);
                                // let str_data = this.url.replace(reg,"").split('?');
                                // let r_data = this.getUrlvalues(str_data[1]);
                                // console.log('数据是：'+JSON.stringify(r_data));
                                // mui.toast(r_data.msg);
                                // if(r_data.code==1){
                                //     _this.myaudio && _this.myaudio.play();
                                //     if(_query.type=='join'){
                                //          _this.$router.replace('/my/rate');
                                //     }else{
                                //         _this.$router.replace('/kbb/CreditCardReceipts');
                                //     }
                                    
                                // }else{
                                //     _this.$router.go(-1);
                                // }
                            } catch (error) {
                                //console.log(JSON.stringify(error))
                            }
                        }
                    } 
                    _url = this.url;
				}
            }, false);	
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
            getUrlvalues(url){
                let r_data = url.split('&');
                let key = null,newdata={};
                for(let k=0;k<r_data.length;k++){
                    key = r_data[k].split('=');
                    newdata[key[0]] = key[1];
                }
                return newdata
            },
            order_req(paydata,store_id){
                
            }
		},
		destroyed(){
			this.view.close();
			this.view.addEventListener('close',()=>{
				this.view = null;
            });
            if(this.pay_timer){
                clearInterval(this.pay_timer);
                this.pay_timer = null;
            }
		},
        components: {
            XHeader
        }
    }
    


    
</script>

<style scoped>
	
</style>