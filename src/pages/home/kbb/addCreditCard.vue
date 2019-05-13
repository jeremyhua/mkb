<template>
    <div id="addCreditCard">
        <bheader title="添加信用卡" class="fixed-top"></bheader>
        <div class="fixed-con-lg ">
            <group>
                <!-- <x-input title="持卡人" v-model="name" :required="true" placeholder="请输入真实姓名" type="text"></x-input> -->
                <cell title="银行" :value="choosedBank.bank_name||choosedBank" is-link @click.native="chooseBank"></cell>
                <x-input title="卡号" v-model="bankCard" :required="true" placeholder="请输入卡号" type="number"></x-input>
                
            </group>
            <div class="yhcdtx">* 各大银行存贷合一信用卡暂时无法使用还款功能</div>
            <group>     
                <x-input title="安全码" v-model="safeCode" :required="true"  :max="3" placeholder="信用卡后面三位数"></x-input>
                <datetime
                    v-model="expDate"
                    @on-change="change"
                    title="有效期"
                    format="MM-YYYY"
                    @on-cancel="log('cancel')"
                    @on-confirm="log('confirm')"
                    @on-hide="log('hide', $event)"></datetime>
                <x-input title="手机号" v-model="phone" :required="true" :max="11" placeholder="请输入手机号"  type="number"></x-input>      
            </group>
            <group>     
                <x-input title="账单日" v-model="billTime" :max="2" placeholder="请输入账单日(选填)"></x-input>
                <x-input title="还款日" v-model="repayTime" :max="2"  placeholder="请输入还款日(选填)"></x-input>
            </group>   
            <box gap="5px 10px">
                <x-button type="primary" :disabled="btnloading" @click.native="confirmBang">{{btnWord}}</x-button>
            </box>  
        </div>
        <div v-transfer-dom>
            <x-dialog v-model="showScrollBox" class="dialog-demo" :dialog-style="{height: '400px'}">
                <p class="dialog-title" style="padding:5% 0;">请选择银行</p>
                <group class="banklist">     
                    <cell  v-for="(item,index) in bankList" @click.native="choose(item)" :key="index">
                        <!-- <img :src="baseURL+item.imgsrc"> -->
                        <span>{{item.bank_name}}</span>
                    </cell>
                </group>   
                <div @click="showScrollBox=false" style="padding:3% 0;">
                    <span class="vux-close"></span>
                </div>
            </x-dialog>
        </div>
    </div>
</template>

<script>
import bheader from "@/components/header/header-b";
import { Group,Cell,Box,XButton,XDialog, TransferDomDirective as TransferDom, Datetime, XInput } from "vux";

export default {
    name: "addCreditCard",
    data() {
        return {
            showScrollBox: false,
            bankList:[],
            choosedBank:'请选择银行',
            phone:'',
            bankCard:'',
            safeCode:'',
            billTime:'',
            repayTime:'',
            expDate:'',
            btnloading:false,
            btnWord:'确认添加',
        }

    },
    directives: {
        TransferDom
    },
    components: {
        bheader,Group,Cell,Box,XButton,XDialog,Datetime,XInput
    },
    created() {

    },
    mounted() {

    },
    methods: {
        chooseBank(){
            this.showScrollBox = true;
            if(this.bankList.length<1){
                this.$axios.post('/api/api/bankInfo')
                .then(res=>{
                    this.bankList = res.result;
                    //console.log(this.bankList)
                })
            }
        },
        choose(item){
            this.showScrollBox = false;
            this.choosedBank = item;
        },
        confirmBang(){
            if(typeof this.choosedBank === 'string') return mui.toast('请选择银行');
            if(!this.expDate) return mui.toast('请选择有效期');
            if(!this.phone || !/^1[34578]\d{9}$/.test(this.phone)) return mui.toast('手机号格式不对');

            const {phone,bankCard,expDate,safeCode,billTime,repayTime} = this.$data;
            const  bankName = this.choosedBank.bank_name;
            const  bankNo = this.choosedBank.acronym;
            const  bankId = this.choosedBank.lineno;
            const payload = {phone,bankCard,expDate,safeCode,billTime,repayTime,bankName,bankNo,bankId};
            this.btnloading=true;
            this.btnWord='添加中...';
            this.$axios.post('/api/api/addCredit','data='+JSON.stringify(payload))
            .then(res=>{
                this.btnloading=false;
                this.btnWord='确认添加';
                mui.toast(res.msg)
                if(res.code == 1){
                    this.$router.go(-1);
                }
            })
        },
        log(val){
            console.log(val)
        },
        change (value) {
            console.log('change', value)
        }
    }
}
</script>

<style scoped lang="less">
    @import '~vux/src/styles/close';
    #addCreditCard{width: 100%;height: 100%;background: #f0f0f0;}
    .add_info{background-color: #fff;width: 100%;}
    .banklist{height: 300px;overflow-y: scroll;-webkit-overflow-scrolling: touch;}
    .yhcdtx{color: #fd0000;text-align: right;margin-right: 10px;margin-top: 10px;    font-size: 12px;}
</style>    
<style>
    #addCreditCard input{border:none;margin-bottom:0;}
    button{padding:0;}
    p{margin-bottom:0;}
    .weui-dialog{position: absolute;}
</style>
