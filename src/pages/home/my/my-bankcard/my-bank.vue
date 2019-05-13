<template>
  <div id="mybank" class="bg-f0 wrap">
	  <i-header :is_r="show" :title="title" :right="right" v-on:increment='guanli'></i-header>
        <div class="content mui-content">
            <ul class="mui-table-view">
                <router-link to="/my/my-bankcard" class="mui-table-view-cell mui-media" tag="li"><i class="iconfont icon-add-more"></i><div class="mui-media-body">添加银行卡</div></router-link>
            </ul>
            <ul class="content mui-content">
                  <li v-for="(item,index) in rspdata" :key="index" class="mui-table-view-cell mui-media licontent">
                      <i class="iconfont" :class="item.icon" :style="'color:#'+item.color"></i>
                    <div class=" one" >
                        <div class="top">{{item.bankname}}</div> 
                        <div class="cardnum" :bankid='item.bank_id'>{{item.bankbard|capitalize}}</div>
                        <span class="delcard " v-show="del" @click="delmsg(index)">删除</span> 
                     </div>
                </li>
            </ul>
        </div>
        <router-view></router-view>
  </div>

</template>
<script>
import iHeader from "@/components/header/header-r"
import {Toast,MessageBox} from 'mint-ui'
    export default{
		name:"my-bank",
		data(){
			return{
            show:true,
            right:"管理",
            title:"我的银行卡",				
            users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
            content:[{src:require("@/assets/images/bank.png"),cont:"中国建设银行<br/>***   ****    ****   0085"},{src:require("@/assets/images/bank2.png"),cont:"中国招商银行<br/>***   ****    ****   0085"}],
            rspdata:[],
            del:false,
            bankid:'',
			}
		},components: {
            iHeader
        },created(){  
            // console.log(this.users)
            this.$axios.post('/api/Usercenter/getBank',`data=${JSON.stringify({
                    session_id:this.users.session_id,
                    userId:this.users.userId
                })}`).then(
                    (res)=>{
                        console.log(JSON.stringify(res))
                        if(res.code==200){
                            // Toast(res.msg)
                            this.rspdata=res.data;
                            console.log(this.rspdata)
                        }
                        else if(res.code==999){
                            // Toast(res.msg)
                        }
                }).catch(err=>{})
        },
        methods:{
            guanli(){
               if(this.right=="取消") {
                   this.del=false;
                   this.right="管理";
                }else if(this.right=="管理"){
                   this.del=true; 
                   this.right="取消";
               }
            },
            delmsg(index){
                MessageBox.confirm('确定删除?').then(action => {
                        this.$axios.post('/api/Usercenter/del_bank',`data=${JSON.stringify({
                            session_id:this.users.session_id,
                            userId:this.users.userId,
                            bank_id: this.rspdata[index].bank_id,
                            mobile:this.users.mobile
                        })}`).then(
                            (res)=>{
                                console.log(JSON.stringify(res))
                                if(res.code==200){
                                    this.rspdata.splice(index,1)
                                }
                                else if(res.code==999){
                                    Toast(res.msg)
                                }
                        }).catch(err=>{})
                });
            }
        },
        filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return "****   ****   ****      "+ value.slice(-4)
        }
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
.wrap{.pt(75px)}
#my-account{background:#f0f0f0;}
.mui-table-view li:before,.mui-table-view li:after,.mui-table-view:before,.mui-table-view:after{background:transparent;}
.content{background: #f0f0f0; .mui-table-view{background: #f0f0f0 !important;
li{background:#fff;height:105px;margin:20px;border-radius:5px;display: -webkit-box;display: -webkit-box-flex;display:flex;font-size:17px;
a{height:100%;
img{width: 70px;margin: 19px 5px;margin-right:10px;}
}
}
}
}
.mui-table-view .mui-media-object {
    line-height: 60px;
    max-width: 60px;
    height: 60px;
}
.mui-content img{align-self: center;
    margin-right: 10px;}
.mui-content .one{align-self: center;line-height: 31px;}   
#mybank .mui-table-view-cell.mui-media{background:#fff;height:105px;margin:20px;border-radius:5px;display: -webkit-box;display: -webkit-box-flex;display:flex;
img{width: 70px;margin: 19px 5px;}
.mui-media-body{align-self: center;color: #000;}
}
#mybank .icon-add-more{color:#000;width: 70px;margin: 19px 5px;text-align: center;font-size: 37px;line-height: 45px;}
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
.delcard{position: absolute;
    right: 10px;
    top: 10px;
    background: #ff3d01;
    color: #fff;
    padding: 2px 10px;
    border-radius: 10px;}
.licontent{padding-left:88px;position:relative;}
.licontent i{position:absolute;left:44px;height: 62px;    max-width: 80px;line-height:62px; display: block;font-size: 50px;top: 50%;transform: translate3d(-50%,-50%,0); }
</style>
<style>
#mybank .mint-msgbox-confirm{
    color: #469dc8;
}
</style>


