<template>
  <div id="bankcard" class="bg-f0">
	  <i-header :is_r="show" :title="title" ></i-header>
        <div class="mui-content">
             <transition>
            <ul class="mui-table-view tipsul" v-show="tips">
                <li class="tips"><i class="iconfont icon-jinggao" ></i>请确认好绑定的银行卡信息</li>
            </ul>
            </transition>
            <form class="mui-input-group ">
					<div class="mui-input-row huname">
						<label>户名</label>
						<!-- <input type="text" placeholder="陈奕迅"> -->
                        <input class="right-view" placeholder="请输入您的姓名" v-model="fullname">
					</div>
					<div class="mui-input-row "  @click="type_popup=true" :type="tousutype">
                                <label>银行</label>
						<i class="iconfont icon-arrow-down"></i>
						<span class="mui-pull-right bankselect">{{type_content}}</span>
					</div>
                    <div class="mui-input-row">
						<label>支行</label>
						<input type="text" class="mui-input-clear" placeholder="请填写开户银行支行" v-model="bankbranch">
					</div>
                    <div class="mui-input-row bankcardli">
                            <label>卡号</label>
                            <input type="text" class="mui-input-clear" placeholder="请填写银行卡号" v-model="bankbard">
                    </div>
			</form>
                    <div class="mui-input-row yzm">
                            <input type="text" class="mui-input-clear" placeholder="输入验证码" v-model="code">
                            <span class=" get" @click="getcode" v-if="getcoded">获取</span>
                            <span class="getcode"  v-if="!getcoded"><i>{{second}}</i>秒后重新发送</span>
                    </div>
                   <div class="footer"><button @click='addBankcard'>+绑定银行卡</button></div>
                   <div class="info-footer">如有疑问,请联系客服 <span>400-400-400</span>	</div> 
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
import iHeader from "@/components/header/header-r"
import {Toast} from 'mint-ui'
    export default{
		name:"set",
		data(){
			return{
            show:true,
            title:"我的银行卡",
            content:"",
            users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
            fullname:'',
            bankcard:'',
            bankbranch:'',
            bankbard:'',
            banklist:[],
            selectvalue:'',
            type_content:'',
            tousutype:'',
			type_list: [
			        {
			          flex:1,
			          values: [{link_value:'选择银行卡'}],
			          className: 'slot1',
			          textAlign: 'center'
			        }
            ],
            type_popup:false,
            getcoded:true,
            second:60,
            code:'',
            tips:true,
			}
		},components: {
            iHeader
        },methods:{
            is_fh(){
				this.type_popup=false;
            },	
            onTypeChange(picker, val){
				this.type_content = val[0].link_value;
				this.tousutype=val[0].link_name;
            },
            addBankcard(){
                if(!this.fullname){
                    Toast('请输入姓名')
                    return false;
                }
                 if(!this.tousutype){
                    Toast('请选择银行卡')
                    return false;
                }
                if(!this.bankbranch){
                    Toast('请填写开银行支行')
                    return false;
                } 
             /*    if(!(this.bankbard).match(/^\d{19}$/g)){
                    Toast('银行卡号填写错误')
                    return false;
                } */
                 if(!this.bankbard){
                    Toast('请填写银行卡号')
                    return false;
                }
                if(!this.code){
                    Toast('请填写验证码')
                    return false;
                }
                
                        this.$axios.post('/api/Usercenter/add_bank',`data=${JSON.stringify({
                                session_id:this.users.session_id,
                                userId:this.users.userId,
                                fullname:this.fullname,
                                branch:this.bankbranch,
                                bank:this.tousutype,
                                code:this.code,
                                bankbard:this.bankbard,
                                mobile:this.users.mobile,
                            })}`).then((res)=>{console.log(JSON.stringify(res))
                                    if(res.code==200){
                                        // console.log(res)
                                        // Toast(res.msg);
                                        setTimeout(() => {
                                        this.$router.push({path:'/my/my-bank'})
                                        }, 2000);
                                    }
                                    else if(res.code==999){
                                        Toast(res.msg)
                                    }
                            }).catch(err=>{})
            },
            getcode(){
                 this.$axios.post('/api/Privilege/get_code',`data=${JSON.stringify({
                                session_id:this.users.session_id,
                                userId:this.users.userId,
                                mobile:this.users.mobile,
                                type:'BINDBANK'
                            })}`).then((res)=>{console.log(JSON.stringify(res))
                                    if(res.code==200){
                                        console.log(res.data.limit_time)
                                        this.second=res.data.limit_time;
                                        this.getcoded=false;
                                        var timEnd=Number(res&&res.data.limit_time);
                                        console.log(timEnd)
                                        var _this=this;
                                        setTimeout(() => {
                                            _this.getcoded=true;
                                        }, timEnd*1000);
                                        setInterval(()=>{
                                            _this.second--;
                                            if(_this.second<=0){
                                                _this.second=timEnd;
                                            }
                                        },1000)
                                    }
                                    else if(res.code==999){
                                        Toast(res.msg)
                                    }
                            }).catch(err=>{})
            }
        },
        mounted(){
            //   console.log(this.users)
            
    
        },
        created(){
             this.$axios.post('/api/Usercenter/get_bank_list').then(
                    (res)=>{
                        console.log(JSON.stringify(res))
                        if(res.code==200){
                            // console.log(res)
                            var bankli=[];
                            var bankval={};
                                for(var i in Object.keys(res.data)){
                                         bankval.link_name=Object.keys(res.data)[i];
                                            this.type_list[0].values.push({link_name:Object.keys(res.data)[i],link_value:Object.values(res.data)[i]})
                                }
                                         console.log(this.type_list[0].values)
                        }
                        else if(res.code==999){
                            Toast(res.msg)
                        }
                }).catch(err=>{});
            var _this=this;    
            setTimeout(function(){_this.tips=false;},3000)
                
        }
    }
</script>
<style lang="less" scoped>
@l:left;
@gray:#555;
@lig:#e0e0e0;
@lit:#d1d1d1;
@ora:#469dc8;
@lc:#cccccc;
@aa:#aaaaaa;
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
#bankcard{padding-top:70px;}
.tips{padding-left:15px;line-height:42px;height:42px;font-size:14px;}
.my-account{height:100%;}
.select{position:relative;}
.select i{position:absolute;right:15px;width:20px;top: 17px; font-size: 24px;color:@gray;}
.mui-input-group .mui-input-row {height: 59px;padding: 10px 0px;}
.right-view{ display: block;margin-top: 10px;}
.mui-input-row label{width:20%;}
.mui-input-row label~input, .mui-input-row label~select, .mui-input-row label~textarea,label~span{width:80%;}
.yzm input{border: none;margin-bottom: 0;}
.yzm{margin-top: 10px;padding: 10px 0;background:#fff;position:relative;}
.footer{margin-top:20px;}
.yzm .get{position: absolute;right: 15px;padding: 3px 22px;color: #fff;background: #6fc6f1;top: 16px;border-radius: 21px;}
.footer button{width: 90%;height: 50px;color: #fff; background: -moz-linear-gradient(left,  #6fc6f1 1%, #469dc8 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left,  #6fc6f1 1%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right,  #6fc6f1 1%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6fc6f1', endColorstr='#ff3101',GradientType=1 ); ;top: 16px;font-size: 20px;border-radius: 30px; margin: 0 auto;display: block;}
.info-footer{text-align: center;font-size: 16px;color:@aa;margin-top:40px; span{color:@ora;}}
.icon-jinggao{color:#6fc6f1;margin-right:8px;}
.icon-arrow-down{position: absolute;right: 15px;top: 20px;}
.bankselect{    padding: 10px 0;color: #797676;font-size: 17px;line-height: 21px;}
.getcode{position: absolute;right: 15px;padding: 3px 18px;color: #fff;background: #969393;top: 16px;border-radius: 21px;}
.getcode i{font-style:normal;}
.get i{font-style:normal;}
.huname{margin-top:10px;}
  .tipsul.v-leave-active { transition: all 3s;}
  .tipsul.v-leave-to {margin-top:-34px;opacity: 0;}
  .tipsul.v-enter-active { transition: all 3s;}
  .tipsul.v-enter-to { margin-top:0; opacity: 0;}
.bankcardli:after {position: absolute;right: 0;bottom: 0;left: 0;height: 0;content: '';-webkit-transform: scaleY(.5);transform: scaleY(.5);background-color: #c8c7cc;}
</style>
<style>
	#bankcard .mint-cell-wrapper{padding: 15px;}
	#bankcard .mint-cell-value{width: 100%;justify-content:space-between;display: flex;height: 50px;line-height: 50px;}
	#bankcard .mint-popup,.picker-items{width: 100%;}
	#bankcard .picker-item.picker-selected{color:#6fc6f1;}
    #bankcard .click_success{padding: 15px 15px 0 0; display: block;}
</style>


