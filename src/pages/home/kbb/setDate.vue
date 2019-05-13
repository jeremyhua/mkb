<template>
	<div id="setDate">
		<x-header title="还款"  :left-options="{backText: ''}"></x-header>
		<div class="card_con ">
			<creditCard :creditCard="creditCard" myheight="100px"></creditCard>
		</div>
		<group>
			<x-input v-model="phone" text-align="right" placeholder-align="right" title="手机号" placeholder="请输入手机号" ></x-input>
			<x-input v-model="billTime" text-align="right" placeholder-align="right" title="账单日" placeholder="请输入账单日" ></x-input>
			<x-input v-model="repayTime" text-align="right" placeholder-align="right" title="还款日" placeholder="请输入还款日" ></x-input>
		</group>
		<box gap="10px 10px">
            <x-button type="primary" @click.native="edit">修改</x-button>
        </box>
	</div>
</template>

<script>
	import creditCard from './../../../components/creditCard/creditCard'
	import { XHeader,Group,Box,XButton,XInput } from 'vux'
	
	export default {
	    name: "setDate",
	    data() {
	        return {
				phone:'',
				billTime:0,
				repayTime:0,
				credit_id: this.$route.query.credit_id,
				bankCard: '',
				vux_credit_id: localStorage.getItem('creditCard') ? JSON.parse(localStorage.getItem('creditCard')) : '',

	        }
	
		},
		computed: {
			creditCard(){
				let _creditCard =  this.vux_credit_id.filter(v=>v.credit_id==this.credit_id);
				_creditCard.map(v=>v['path']='/kbb/setDate');
				return _creditCard;            
			}
		},
	    components: {
	        XHeader,creditCard,Group,Box,XButton,XInput 
	    },
	    created() {
			console.log(this.creditCard,this.vux_credit_id)
	    },
	    mounted() {
			this.phone    = this.creditCard[0].phone;
			this.billTime = this.creditCard[0].bill_time  || '';
			this.repayTime = this.creditCard[0].repay_time || '';
			this.bankCard  = this.creditCard[0].credit_code;
	    },
	    methods: {
			edit(){
				let {phone, billTime, repayTime, bankCard} = this.$data ;
				this.$axios.post('/api/api/editCredit','data='+JSON.stringify({phone, billTime, repayTime, bankCard}))
					.then(res=>{
						if(res.code==1){
							mui.toast(res.msg);
							this.$router.replace('/kbb/repayMent')
						}else{
							mui.toast(res.msg);
						}
					})
			}
	    }
	}

</script>

<style scoped lang="less">
	#setDate{width: 100%;height: 100%;background: #f0f0f0;}
	.card_con{    height: 127px;padding: 17px 15px 10px; background: #fff;background: #fff;}
	.weui-btn{line-height: 2em;}
</style>
<style type="text/css">
	#setDate input{border:none;margin-bottom:0;}
	#setDate .weui-cells{margin-top: 10px;}
	#setDate .card_con #creditCard .creditCard{margin: 0;}
	p{margin-bottom:0;}
</style>