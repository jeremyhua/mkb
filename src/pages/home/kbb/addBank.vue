<template>
    <div id="addBank">
        <!-- <bheader title="添加银行卡" class="fixed-top"></bheader> -->
        <x-header :left-options="{backText: ''}">添加银行卡</x-header>
        <div class="fixed-con-lg ">
            <group>
                <!-- <x-input title="持卡人" v-model="name" :required="true" placeholder="请输入真实姓名" type="text"></x-input> -->
                <cell title="银行" :value="choosedBank.bank_name||choosedBank" is-link @click.native="chooseBank"></cell>
                <x-input title="卡号" v-model="bankCard" :required="true" placeholder="请输入卡号" type="number"></x-input>
                <popup-picker title="省市选择" :data="listArea" :required="true" :columns="3" v-model="area" show-name></popup-picker>
                <!-- <x-textarea title="详细地址" v-model="address" :required="true"  :height='24' :show-counter="false" :rows="1" autosize></x-textarea> -->
                <x-input title="支行" v-model="bankChild" :required="true" placeholder="请输入支行名称" type="text"></x-input>
                <x-input title="手机号" v-model="phone" :required="true" type="number" :max="11" placeholder="请输入手机号"></x-input>      
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
                        <!-- <icon class="iconfont" :class=" item.icon" :style='"color:#"+item.css'></icon>     -->
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
import bheader from "@/components/header/header-r";
import {XHeader,Group,Cell,Box,XButton,XDialog, TransferDomDirective as TransferDom, Datetime, XInput, PopupPicker,XTextarea } from "vux";

export default {
    name: "addBank",
    data() {
        return {
            showScrollBox: false,
            bankList:[],
            choosedBank:'请选择银行',
            bankChild:'',
            phone:'',
            bankCard:'',
            btnloading:false,
            btnWord:'确认添加',
            listArea:[],
            area:[],
            address:''
        }

    },
    directives: {
        TransferDom
    },
    components: {
        bheader,Group,Cell,Box,XButton,XDialog,Datetime,XInput,PopupPicker,XTextarea,XHeader
    },
    created() {

    },
    mounted() {
        this.queryArea()
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
            if(!this.bankChild) return mui.toast('请选择支行');
            if(!this.phone || !/^1[34578]\d{9}$/.test(this.phone)) return mui.toast('手机号格式不对');
            if(this.area.length<1) return mui.toast('请选择省市');
            const provin = this.area[0];
            const city = this.area[1];
            const {phone,bankCard,bankChild,address} = this.$data;
            const  bankName = this.choosedBank.bank_name;
            const  bankNo = this.choosedBank.acronym;
            const  bankId = this.choosedBank.lineno;
			const  bankInfoId = this.choosedBank.id;
            const payload = {phone,bankCard,bankChild,bankName,bankNo,bankId,provin,city,bankInfoId};//,address
            this.btnloading=true;
            this.btnWord='添加中...';
            this.$axios.post('/api/api/addBank','data='+JSON.stringify(payload))
            .then(res=>{
                this.btnloading=false;
                this.btnWord='确认添加';
                mui.toast(res.msg);
                if(res.code==1){
                     this.$router.go(-1);
                }
            })
        },
        log(val){
            // console.log(val)
        },
        change (value) {
            // console.log('change', value)
        },
        queryArea(){
            this.$axios.post('/api/Partner/getPrion')
                .then(res=>{
                    if(res.code==1){
                        this.listArea = res.result ;
                        // console.log(this.listArea)
                    }else{
                        mui.toast(res.msg)
                    }
                })
        }
    }
}
</script>

<style scoped lang="less">
    @import '~vux/src/styles/close';
    #addBank{width: 100%;height: 100%;background: #f0f0f0;}
    .add_info{background-color: #fff;width: 100%;}
    .banklist{height: 300px;overflow-y: scroll;-webkit-overflow-scrolling: touch;}
</style>    
<style>
   /*  #addBank .weui-cells .weui-cell .weui-cell__ft{width: 75%;text-align: left;color: #333;}
    #addBank .vux-no-group-title .vux-cell-bd p label{font-size: 15px;color: #333;display: inline-block;}
    #addBank .weui-cell_switch .weui-cell__bd .weui-label{font-size: 15px;color:#333;} */
    #addBank input{border:none;    margin-bottom: 0;}
    #addBank textarea.weui-textarea{height: auto !important;margin-bottom: 0;padding:0;}
    #addBank .weui-btn{line-height:2.9rem;}
    .vux-cell-bd>p{margin-bottom:0;}
    
        .weui-dialog{position: absolute;}
</style>
