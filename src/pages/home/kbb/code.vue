<template>
	<div id="yzmcode">
        <x-header title="输入验证码支付" class="fixed-top" :left-options="{backText: ''}"></x-header>
		<div class="mui-content content fixed-content">
			<div class="code-tips">本次交易需要短信确认，验证码已发送至您的手机!<br />请输入6位数验证码。</div>
			<div class="mui-content fixed-content">
				<form id='regist-form' class="mui-input-group">
					<div class="mui-input-row">
						<input id='yzm' type="text" v-model="yzm" class="mui-input-clear mui-input password" maxlength="6" placeholder="请输入验证码">
					</div>
				</form>
				<div class="mui-content-padded">
					<button id='login' class="mui-btn mui-btn-block mui-button" @click="code_pay"> {{content}}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { XHeader } from 'vux';
	export default {
		name:"yzmcode",
		data(){
			return {
				content: '下一步',  // 按钮里显示的内容
				totalTime: 30,
				canClick: true,
				money_order_no:this.$route.query.money_order_no,
				yzm:""
				 
			}
		},
		mounted(){
		},
        methods:{
			code_pay(){
				if (!this.canClick) return  //改动的是这两行代码
					 this.canClick = false
					 this.content = '等待数据传输'
					 let clock = window.setInterval(() => {
					  this.content = '等待数据传输'
					  if (this.totalTime < 0) {
					   // window.clearInterval(clock)
					   this.content = '返回重新提交订单'
					   this.totalTime = 10
					   this.canClick = true  //这里重新开启
					  }
					 },1000)
				const codedata = {money_order_no:this.money_order_no,sms_code:this.yzm};
				console.log(codedata)
				this.$axios.post('api/Cardpay/payConfirm',{data:JSON.stringify(codedata)})
				.then(res=>{
					if(res.code==200){
						let order_no = this.$route.query.money_order_no;
						console.log(order_no)
						this.$router.push({
							path:'/kbb/payresult',
							query:{
								order_no:order_no}
							})
					}else{
						mui.toast(res.msg)
						return false;
					}
				})
			}
		},
        components: {
            XHeader
        }
    }
</script>

<style scoped >

.code-tips{padding: 20px 30px; font-size: 14px; color: #999999; text-align: center;}
#code-form{height: 400px;}
#login{background: #0062CC;color:#fff;}
</style>
