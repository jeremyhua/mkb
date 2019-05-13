<template>
    <div id="creditCard">
        <router-link v-if="myheight==='160px'" v-for="(item,index) in creditCard" :key="index" :to="{path:item.path,query:{credit_id:item.credit_id}}" class="creditCard" :class="{test: !item.path}"  :style="{background:item.color,backgroundSize: '84.5px 91.5px',height:myheight}">
            <div class="bank_info">                
                <div class="iconBg">
                    <i class="iconfont" :class="item.icon" :style="{color:item.color}"></i>
                </div>
                <div class="bankName">
                    <p>{{item.bank_name}}</p>
                    <p class="name">{{item.name}} | 尾号 {{item.credit_code_tail}}</p>
                </div>
            </div>
            <div class="sj-bg"></div>
            <p class="sj"><span class="zd_time">账单日：{{item.bill_time}}日</span><span class="repay_time">还款日：{{item.repay_time}}日</span></p>
        </router-link>
        <router-link v-if="myheight==='100px'&&item.path==$route.path" v-for="(item,index) in creditCard" :key="index" :to="{path:item.path,query:{credit_id:item.credit_id}}" class="creditCard" :class="{test: !item.path}"  :style="{background:item.color,backgroundSize: '84.5px 91.5px',height:myheight}">
            <div class="bank_info">                
                <div class="iconBg">
                    <i class="iconfont" :class="item.icon" :style="{color:item.color}"></i>
                </div>
                <div class="bankName">
                    <p>{{item.bank_name}}</p>
                    <p class="name">{{item.name}} | 尾号 {{item.credit_code_tail}}</p>
                </div>
            </div>
            <div class="sj-bg"></div>
            <p class="sj"><span class="zd_time">账单日：{{item.bill_time}}日</span><span class="repay_time">还款日：{{item.repay_time}}日</span></p>
        </router-link>
        <swipeout>
            <swipeout-item  v-if="myheight==='100px'&&item.path!==$route.path" v-for="(item,index) in creditCard" :key="index">
                <div slot="right-menu">
                    <swipeout-button @click.native="onButtonClick(item.credit_id)" type="warn">删除</swipeout-button>
                </div>
                <div slot="content" class="demo-content vux-1px-t">
                    <router-link class="creditCard"  :to="{path:item.path,query:{credit_id:item.credit_id}}"  :style="{background:item.color,backgroundSize: '84.5px 91.5px',height:myheight}">
                        <div class="bank_info">                
                            <div class="iconBg">
                                <i class="iconfont" :class="item.icon" :style="{color:item.color}"></i>
                            </div>
                            <div class="bankName">
                                <p>{{item.bank_name}}</p>
                                <p class="name">{{item.name}} | 尾号 {{item.credit_code_tail}}</p>
                            </div>
                        </div>
                        <div class="sj-bg"></div>
                        <div class="sj"><span class="zd_time">账单日：{{item.bill_time}}日</span><span class="repay_time">还款日：{{item.repay_time}}日</span></div>
                    </router-link>
                </div>
            </swipeout-item>
        </swipeout>
    </div>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import { mapActions } from 'vuex'
export default {
    name: "creditCard",
    data() {
        return {
            users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):''
        }

    },
    props:['creditCard','myheight'],
    components: {
        Swipeout,SwipeoutItem,SwipeoutButton
    },
    created() {
        console.log(this.$props)
        
    },
    mounted() {

    },
    methods: {
        onButtonClick(id){
            const _this = this;
             const users = this.users;
             console.log(this.users);
            this.$vux.confirm.show({
                title: '确认删除？',
                onCancel () {
                },
                onConfirm () {
                _this.$axios.post('/api/Partner/delCredit',`data=${JSON.stringify({id})}`)
                    .then(res=>{
                             mui.toast(res.msg)
                            if(res.code==1){
                                _this.getCreditCard()
                            }
                    })
                }
            })
        },
        ...mapActions([
            'getCreditCard'
        ])
    }
}
</script>

<style scoped lang="less">
.creditCard{display: block;width: 100%;height: 100px;margin:10px 0;position: relative;}
.creditCard .bank_info{display: block;overflow: hidden;width: 100%;padding-top: 10px;padding-left: 15px;}
.creditCard .bank_info .iconBg{width: 42px;height: 42px;background-color: #dce5f6;border-radius: 50%;float: left;line-height: 46px;}
.creditCard .bank_info .iconBg i{color: #1d2087;font-size: 38px;padding-left: 2.9px;}
.creditCard .bank_info .bankName{float: left;margin-left: 10px;}
.creditCard .bank_info .bankName p{font-size: 15px;color: #fff;}
.creditCard .bank_info .bankName .name{font-size: 12px;color: #fff;}
.creditCard .bank_info .bankName .name i{font-style: normal;margin: 0 5px;}
.creditCard .sj-bg{position: absolute;bottom: 0;width:100%;height: 34px;background-color: #331414;filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;line-height: 34px;box-sizing: border-box;}
.creditCard .sj{position: absolute;bottom: 0;width:100%;text-align: right;color: #fff;font-size: 12px;line-height: 34px;padding-right: 15px;box-sizing: border-box;}
.creditCard .sj .zd_time{margin-right: 15px; color:#fff;}
.test{width: 100%;height: 160px;position: relative;padding: 25px;margin:0;}

.vux-swipeout-item{background-color: #E64340;}
.vux-swipeout-button-warn{border-radius: 0;}
</style>  
      