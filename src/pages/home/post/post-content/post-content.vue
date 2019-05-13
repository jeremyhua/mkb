<template>
    <div id="post-content">
        <!-- <i-header :is_r="true" title="发布" @click="is_fh()"></i-header> -->
        <x-header title="发布" class="fixed-top" :left-options="{backText: ''}"></x-header>
		<div class="main bg-f0">
            <div class="m15">
                <div class="c-333 ft-title">发帖标题</div>
                <div class="select—box">
                    <input type="text" class="ft-name fs-15" placeholder="请输入发帖标题" v-model="fatie">
                </div>
                <div class="c-333 ft-title">产品类型</div>
                <div class="select—box" @click="type_popup = true">
                    <div class="select-wrap bg-fff flex">
                        <span :class="type_name">{{type_content}}</span>
                        <span :class="{is_arrow:type_popup}">
                            <b class="iconfont icon-arrow-down"></b>
                        </span>
                    </div>
                </div>

                <div class="c-333 ft-title">申请金额</div>
                <div class="select—box" @click="money_popup = true">
                    <div class="select-wrap bg-fff flex">
                        <span :class="money_name">{{money_content}}</span>
                        <span :class="{is_arrow:money_popup}">
                            <b class="iconfont icon-arrow-down"></b>
                        </span>
                    </div>
                </div>

                <div class="c-333 ft-title">贷款期限</div>
                <div class="select—box" @click="time_popup = true">
                    <div class="select-wrap bg-fff flex">
                        <span :class="time_name">{{time_content}}</span>
                        <span :class="{is_arrow:time_popup}">
                            <b class="iconfont icon-arrow-down"></b>
                        </span>
                    </div>
                </div>

                <div class="c-333 ft-title">真实姓名</div>
                <div class="select—box">
                    <input type="text" class="ft-name fs-15" placeholder="请输入您的真实姓名" v-model="realname">
                </div>

                <div class="c-333 ft-title">联系电话</div>
                <div class="select—box">
                    <input type="text" class="ft-name fs-15" placeholder="请输入您的联系电话" v-model="mobile">
                </div>

                <div class="c-333 ft-title">单位名称</div>

                <div class="select—box">
                    <input type="text" class="ft-name fs-15" placeholder="请输入您的单位名称" v-model="partname">
                </div>
                <div class="c-333 ft-title">工作职位</div>

                <div class="select—box">
                    <input type="text" class="ft-name fs-15" placeholder="请输入您的工作职位" v-model="partjob">
                </div>
                <div class="c-333 ft-title">单位座机号码</div>
                <div class="select—box">
                    <input type="text" class="ft-name fs-15" placeholder="请输入您的座机号码" v-model="phone">
                </div>

                <div class="c-333 ft-title">单位地址</div>
                <div class="select—box">
                    <input type="text" class="ft-name fs-15" placeholder="请输入您的单位地址" v-model="partwhere">
                </div>

                <div class="c-333 ft-title">收入情况</div>
                <div class="select—box">
                    <input type="text" class="ft-name fs-15" placeholder="请输入您的收入情况" v-model="income">
                </div>

                <div class="c-333 ft-title">借款用途</div>
                <div class="textarea-wrap">
                    <textarea name="" placeholder="150字以内" v-model="loanuse"></textarea>
                </div>
            </div>
		</div>
		
		<button class="head-bg post-btn c-fff" @click="post_loan">发布</button>
        <!-- 产品类型 -->
		<mt-popup
		  v-model="type_popup"
		  position="bottom" class="r-ter">
		  <span class="click_success c-ff6800" @click="is_fh()">完成</span>
		  <mt-picker :slots="type_list" @change="onTypeChange" valueKey="link_name"></mt-picker>
		</mt-popup>

        <!-- 申请金额 -->
		<mt-popup
		  v-model="money_popup"
		  position="bottom" class="r-ter">
		  <span class="click_success c-ff6800" @click="is_fh()">完成</span>
		  <mt-picker :slots="money_list" @change="onMoneyChange" valueKey="link_name"></mt-picker>
		</mt-popup>

        <!-- 贷款期限 -->
		<mt-popup
		  v-model="time_popup"
		  position="bottom" class="r-ter">
		  <span class="click_success c-ff6800" @click="is_fh()">完成</span>
		  <mt-picker :slots="time_list" @change="onTimeChange" valueKey="link_name"></mt-picker>
		</mt-popup>
    </div>
</template>

<script>
    import iHeader from "@/components/header/header-r"
    import { CellSwipe, Popup,Picker,Toast } from 'mint-ui'
    import {XHeader} from 'vux'
	export default {
		name:"post-content",
		components:{
			iHeader,CellSwipe, Popup,Picker,XHeader
		},
		data(){
			return {
                users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
                fatie:'',
                type_popup:false,
                type_content:"",
                type_name:'',
                money_name:'',
                time_name:'',
                val_key:"",
                money_popup:false,
                money_content:"",
                time_popup:false,
                time_content:"",
                realname:'',
                mobile:'',
                phone:'',
                loanuse:'',
                partname:'',
                partwhere:'',
                income:'',
                partjob:'',
				type_list: [
			        {
			          flex:1,
			          values: [{link_name:'请选择产品类型'}],
			          className: 'slot1',
                      textAlign: 'center'
			        }
                ],
                money_list: [
			        {
			          flex:1,
			          values: [{link_name:'请选择申请金额'}],
			          className: 'slot1',
			          textAlign: 'center'
			        }
                ],
                time_list: [
			        {
			          flex:1,
			          values: [{link_name:'请选择贷款期限'}],
			          className: 'slot1',
			          textAlign: 'center'
			        }
                ],
			}
        },
		mounted(){
            console.log(this.val_key)
            this.$axios.post('/api/Product/get_add_product_condition',`data=${JSON.stringify({
                    session_id:this.users.session_id,
                    userId:this.users.userId
                })}`).then(
				res=> {if(res.code==200){
                        for(let  i in res.data.PRODUCT_TYPE.items){
                        this.type_list[0].values.push( res.data.PRODUCT_TYPE.items[i]);
                        }; 
                        for(let i in res.data.LOAN_AMOUNT.items){
                        this.money_list[0].values.push( res.data.LOAN_AMOUNT.items[i]);
                        };
                        for(let i in res.data.LOAN_TERM.items){
                        this.time_list[0].values.push( res.data.LOAN_TERM.items[i]);
                        }; 
					}
					})
		},
		methods:{
			onTypeChange(picker, val){
                this.type_content = val[0].link_name;
                this.type_name=val[0].link_value;
            },
           onMoneyChange(picker, val){
                this.money_content = val[0].link_name;
                this.money_name=val[0].link_value;
            },
            onTimeChange(picker, val){
                this.time_content = val[0].link_name;
                this.time_name=val[0].link_value;
			},
			handler(){

			},
			is_fh(){
                this.type_popup = false;
                this.money_popup = false;
                this.time_popup = false;
            },
            post_loan(){
                if(!this.fatie){
                    Toast('发帖标题不能为空')
                    return false;
                }else if(!this.type_name){
                    Toast("发帖类型不能为空")
                    return false;
                }else if(!this.money_name){
                    Toast("申请金额不能为空")
                    return false;
                }else if(!this.time_name){
                    Toast("贷款期限不能为空")
                    return false;
                }else if(!this.realname){
                    Toast("真实姓名不能为空")
                    return false;
                }else if(!this.mobile){
                    Toast("联系号码不能为空")
                    return false;
                }else if(!this.partname){
                    Toast("单位名称不能为空")
                    return false;
                }else if(!this.partjob){
                    Toast("公司职位不能为空")
                    return false;
                }else if(!this.phone){
                    Toast("座机号码不能为空")
                    return false;
                }else if(!this.partwhere){
                    Toast("单位地址不能为空")
                    return false;
                }else if(!this.income){
                    Toast("收入情况不能为空")
                    return false;
                }else if(!this.loanuse){
                    Toast("借款用途不能为空")
                    return false;
                }
                    this.$axios.post('/api/Loan_post/add_loan_post',`data=${JSON.stringify({
                    session_id:this.users.session_id,
                    userId:this.users.userId,
                    title:this.fatie,
                    product_type:this.type_name,
                    apply_money:this.money_name,
                    loan_limit:this.time_name,
                    realname:this.realname,
                    telphone:this.mobile,
                    company:this.partname,
                    company_tel:this.phone,
                    company_address:this.partwhere,
                    income:this.income,
                    loan_reason:this.loanuse,
                    job:this.partjob,
                    })}`).then(
                    res=> {if(res.code==200){
                            Toast("发布成功");
                            setTimeout(() => {
                                this.$route.push({path:'/post'})
                            }, 2000);
                        }
                    })
            }
		}
	}
</script>

<style scoped>
	.main{height: 100%;padding-top: 70px;padding-bottom: 50px;}
	.select—box{width: 100%;text-align: right;height: 45px;margin:15px 0;}
	.select—box span{margin-top: 14px;padding: 0;font-size: 15px;width: 100px;}
	.click_success{display:inline-block;margin: 10px 15px 0 0;}
    
    .select—box input{height: 100%;text-align: left;padding:0 10px;}
	.ft-title{border-left:5px solid #469dc8;height: 20px;line-height: 21px;padding-left: 10px;}
	.ft-name{border:none;text-align: right;padding: 0;}
	.ft-content{padding: 15px;}
	.ft-content textarea{font-size: 15px;border:none;height: 300px;margin: 0;padding-bottom: 0;}
	.ft-upload{padding: 15px;}
	.post-btn{position: fixed;bottom:0;left:0;width: 100%;height: 50px;font-size: 16px;border:none;border-radius: 0;}
	@media screen and (max-width: 320px){
		.ft-content textarea{height: 200px;}
    }
    
    .m15{margin:15px;}
    .select-wrap{height: 100%;padding:0 15px;}
    .select-wrap span:first-child{margin-top: 0;line-height: 45px;-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;text-align: left;color:#333;}
    .select-wrap span:last-child{margin:0;width: 15px;height: 15px;margin-top:12px;color:#ddd;}
    .select—box span.is_arrow{transform: rotate(180deg);margin-top: 16px;}
    .textarea-wrap{margin-top:15px;}
    .textarea-wrap textarea{border:none;height: 120px;}
</style>
<style>
	#addImg_box{display: flex;margin-top: 15px;}
	.upload-addimg-btn:first-child,.upload-btn-box{position: relative;cursor: pointer;display: inline-block;width: 80px;height: 80px;}
	.upload-btn-box{width: 0;}
	.upload-img-box{margin-left: -3px;}
	.upload-img-box:after{clear: both;width: 0;height: 0;display: block;overflow:hidden;}
	.upload-addimg-btn:first-child input{width: 80px;height: 80px;position: absolute;left:0;top:0;z-index: 9;opacity: 0;}
	.upload-addimg-btn:last-child{display: none;}
	.add-file{font-size: 80px;display: inline-block;width: 80px;height: 80px;line-height: 80px;color:#ccc;}
	.upload-img-item{float: left;width: 76px;height: 76px;margin-left:5px;margin-top:2px;margin-bottom:3px;position: relative;border:1px solid #ddd;}
	.upload-img-item:first-child{margin-left: 87px;}
	.upload-img-item img{width: 100%;height: 100%;}
	.delimg-btn{position: absolute;top:-2px;right: 0;font-size: 30px;color:#ccc;}

	#post-content .mint-cell-wrapper{padding: 0 15px;}
	#post-content .mint-cell-value{width: 100%;justify-content:space-between;display: flex;height: 50px;line-height: 50px;}
	#post-content .mint-popup,.picker-items{width: 100%;}
	#post-content .picker-item.picker-selected{color:#469dc8;}
    /* .slot3{display:none;} */
</style>