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
					<button id='login' class="mui-btn mui-btn-block mui-button" @click="code_pay()">下一步</button>
					
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
				money_order_no:this.$route.query.money_order_no,
				yzm:"",
			}
		},
		mounted(){
			// let sms_code = this.yzm;
			// console.log(sms_code)
		},
        methods:{
			code_pay(){
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

</style>
