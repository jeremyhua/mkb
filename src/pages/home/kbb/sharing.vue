<template>
    <div id="sharing">
        <x-header title="分享好友" class="fixed-top" :left-options="{backText: ''}"></x-header>
        <div class="fixed-con ">
            <tab v-model="index">
                <tab-item selected >全部</tab-item>
                <tab-item >已认证</tab-item>
                <tab-item >未认证</tab-item>
            </tab>
            <swiper v-model="index" height="auto" :show-dots="false">
                <swiper-item>
                    <div class="share_hy fix" v-for="(item,index) in shareList" :key="index">
                         <div  class="fl ing_info">
                        <img :src="webUrl+item.head_pic" :onerror="defaultImg">
                        </div>
                        <div class="fl hy_info">
                            <span><i class="iconfont icon-huiyuan"></i>{{item.level_name}}</span>
                            <span><i class="iconfont icon-dianhua"></i>{{item.tel}} <b class="fr" @click='call(item.tel)'>联系他/她</b></span>                   
                            <div class="line"></div>
                            <span><i class="iconfont icon-shijian-copy-copy"></i>{{item.ctime}}</span>
                            <span class="rz_c">
                                <i class="iconfont icon-weirenzheng" :class="{current:item.is_validate}"></i>
                                {{item.is_validate==0?'未认证':'已认证'}}
                                {{item.mlgb==0?'未绑卡':'已绑卡'}}
                            </span>
                        </div>
                          <div style="clear: both;"></div>
                    </div>
                    
                </swiper-item>
                <swiper-item>
                    <div class="share_hy fix" v-for="(item,index) in shareList.filter(v=>v.is_validate==1)" :key="index">
                        <div  class="fl ing_info">
                            <img :src="webUrl+item.head_pic" :onerror="defaultImg">
                        </div>
                        <div class="fl hy_info">
                            <span><i class="iconfont icon-huiyuan"></i>{{item.level_name}}</span>
                            <span><i class="iconfont icon-dianhua"></i>{{item.tel}} <b class="fr" @click='call(item.tel)'>联系他/她</b></span>                                    
                            <div class="line"></div>
                            <span><i class="iconfont icon-shijian-copy-copy"></i>{{item.ctime}}</span>
                            <span class="rz_c"><i class="iconfont icon-weirenzheng current" ></i>已认证{{item.mlgb==0?'未绑卡':'已绑卡'}}</span>
                        </div>
                        <div style="clear: both;"></div>
                    </div>
                    
                </swiper-item>
                <swiper-item>
                    <div class="share_hy fix" v-for="(item,index) in shareList.filter(v=>v.is_validate==0)" :key="index">
                          <div  class="fl ing_info">
                                 <img :src="webUrl+item.head_pic" :onerror="defaultImg">
                        </div>
                        <div class="fl hy_info">
                            <span><i class="iconfont icon-huiyuan"></i>{{item.level_name}}</span>
                            <span><i class="iconfont icon-dianhua"></i>{{item.tel}} <b class="fr" @click='call(item.tel)'>联系他/她</b></span>                                  
                            <div class="line"></div>
                            <span><i class="iconfont icon-shijian-copy-copy"></i>{{item.ctime}}</span>
                            <span class="rz_c"><i class="iconfont icon-weirenzheng" ></i>未认证 {{item.mlgb==0?'未绑卡':'已绑卡'}}</span>
                        </div>
                         <div style="clear: both;"></div>
                    </div>

                </swiper-item>
            </swiper>
        </div>   
    </div>
</template>

<script>
import { XHeader,Tab,TabItem,Swiper, SwiperItem  } from "vux";

import share_01 from '@/assets/images/pay/share_01.png'

export default {
    name: "sharing",
    data() {
        return {
            index:0,
            defaultImg: 'this.src="' + require('@/assets/images/pay/headimg.jpg') + '"',
            is_validate:true,         
            shareList:[]
        }

    },
    components: {
        XHeader,Tab,TabItem,Swiper, SwiperItem 
    },
    created() {

    },
    mounted() {
        const is_validate = 1;
        this.$axios.post('/api/my_invite/my_invite_list','data='+JSON.stringify({is_validate}))
            .then(res=>{
                if(res.code==1){
                    if(res.result.list.length>0){
                        this.shareList = res.result.list
                    }
                }
            })
    },
    methods: {
        call(tel){
            const _this = this;
            this.$vux.confirm.show({
                title:'是否拨打电话',
                content: `<p style="text-align:center;">${tel}</p>`,
                onCancel () {
                },
                onConfirm () {
                    plus && plus.device.dial( tel, false );
                }
            })
            
        }
    }
}
</script>

<style scoped>
.fixed-con{height:100%;}
#sharing{width: 100%;height: 100%;background-color: #f9f9f9;}
.share_hy{width: 100%;border-top:1px solid #ddd;border-bottom:1px solid #ddd; padding: 5px 0 5px 15px;background-color: #fff;margin-bottom: 10px;}
.share_hy img{width: 45px;height: 45px; margin-top: 20px;  margin-right: 15px;border-radius: 100%;}
.share_hy .hy_info{width: 80%;float:left;}
.share_hy .hy_info .line{width: 100%;height: 1px;background-color: #ddd;}
.share_hy .ing_info{ float:left;}
.share_hy .hy_info span{display: block;font-size: 12px;color: #999;}
.share_hy .hy_info .rz_c{color: #4aa7fc;}
.share_hy .hy_info i{font-size: 16px;padding-right: 15px;}
.share_hy .hy_info b{font-size: 14px;font-weight: normal;color: #4aa7fc;}
.share_hy .hy_info .icon-huiyuan{color: #f39801;}
.share_hy .hy_info .icon-dianhua{color: #43b347;}
.share_hy .hy_info .icon-shijian-copy-copy{color: #4aa7fc;}
.share_hy .hy_info .icon-weirenzheng{color: #bbb;}
.share_hy .hy_info .current{color: #fc835e;}
</style>
<style>
#sharing .vux-tab-wrap{padding-top:20px;}
#sharing  .vux-tab-container{position:relative;}
#sharing .vux-slider{height: 85%;padding:10px;}
#sharing .vux-slider .vux-swiper{height: 100% !important;overflow-x: hidden;overflow-y: scroll;}
</style>
