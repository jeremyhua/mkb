<template>
	<div id="my-post-detail" class="wrap bg-f0">
		<i-header :title="title" :is_r="is_r"></i-header>
		<div class="mui-table-view" id="my-post-content">
                        <section class="li bg-f0 clearfix postli" >
                            <div class="right-con ">
                                <i class="lazy-c bg-f5 img-wrap-left">
									<img alt="" v-lazy="msgdata && (imgUrl+msgdata.detail.head_img)" :onerror='defaultImg' >
									</i>
							<div class="clearfix">
								<a href="javascript:void(0);" v-if='msgdata.detail.nickname'>{{msgdata.detail.nickname}}</a>
                                <a href="javascript:void(0);" v-if='msgdata.detail.nickname==null'>匿名用户</a>
                                <div class="main-content-one"  @click="show5=true">{{msgdata && msgdata.detail.content}}</div>
							</div>
                                
                                <ul class="main-content-two clearfix">
                                    <li class="lazy-c bg-f5 cont-two-li" :key="i" v-for="(item,i) in msgdata.detail.images">
                                        <img alt="" v-lazy="msgdata.detail.images && imgUrl+item" data-preview-src="" data-preview-group="1">
                                    </li>
                                </ul>
                                <div class="main-content-last clearfix">
                                <span class="fl time-updata" ><!-- :class='item.is_likenum==1?"c-ff6800":"c-666"' -->
                                        {{moment.unix(msgdata && msgdata.detail.addtime).format('ll HH:mm ')}}
                                    </span>  
                                   <span class=" right-content">
                                        <div class="left-comment " :class="leftonoff?'':'left-commenthide' ">
                                                <span v-if="dianzan"><i class='iconfont icon-dianzanb' @click="zan(msgdata.detail.id)"></i>赞</span>
                                                <span v-if="!dianzan" @click="zan(msgdata.detail.id)"><i class='iconfont icon-dianzanb' ></i>取消</span>
                                                <span @click="buttonTodo(msgdata.detail.id)"><i class="iconfont icon-pinglun1" ></i>评论</span></div>
                                        <div class="right-comment "  @click="leftid()">
                                            <i class="iconfont icon-ttpodicon" ></i>
                                        </div>
                                    </span> 
                                </div>
                            </div>
                            <div class="main-content-add" >
                                <ul class="main-content-add-con"  >
                                     <div class="dianzan" ><i class='iconfont icon-dianzanb'></i>已有{{msgdata &&msgdata.detail.click_num}}人点赞</div>
                                    <li class="content-com" v-for="(item,index) in msgdata &&msgdata.comment" :key='index.id' 
									@click="buttonTodo(msgdata.detail.id,item.id,item.is_my_comment)">
										<img alt="" v-lazy="imgUrl+item.head_img" class="common-img" :onerror='defaultImg' >
                                        <div class="content-inner clearfix" >
                                            <a href="javascript:void(0)">{{item.nickname}}</a>
											 <a href="javascript:void(0);" v-if='!item.nickname'>匿名用户</a>
											<span class="fr createtime">{{moment.unix(item.create_time).format('LL  H:mm ')}}</span>
                                            </div>
                                        <div class="inner-wrap">
													<span v-if='item.to_user'>回复<a href="javascript:void(0)">{{item.to_user}}</a>:</span>{{item.content}}
                                        </div>          
                                    </li>
                                </ul>
                            </div>    
                      			<!-- <div class="input-all" >
                                    <textarea  v-focus='inputfocus' placeholder="评论" ref="inputfocusfff" class="activeinput" v-model="textmodel" @blur='blurfocus()'></textarea>
                                    <input type="submit" value="发送" class="right-input" :readonly='readonly'  @click="buttonAddTodo(msgdata.detail.id)"/>
                                </div> -->
                        </section>
                    
					</div>
		<confirm v-model="show5"
            ref="confirm5"
            @on-cancel="onCancel"
            @on-confirm="onConfirm5"
            @on-show="onShow5"
            >
            <textarea name="" id="" cols="16" rows="5" v-model="textmodel"></textarea>
        </confirm>			
	</div>
</template>

<script>
import iHeader from "@/components/header/header-r.vue"
import { TabContainer, TabContainerItem,Toast,MessageBox } from "mint-ui"
import  { ConfirmPlugin,Confirm} from 'vux'
export default {
    name: "my-post-detail",
    data() {
        return {
		users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
		defaultImg: 'this.src="' + require('@/assets/images/head.png') + '"',
		title:"详情",
		is_r:true,
		msgdata:'',
		textmodel:'',
		readonly:true,
		id:'',
		touserid:'',
		leftonoff:false,
		dianzan:true,
		show5:false,
        };
    },
    components: {
		ConfirmPlugin,Confirm,
        iHeader,
    }, 
    created() {
			 
	},
	mounted(){
		this.getlist();
		// console.log(this.msgdata);
	},
    methods:{
		  onConfirm5 (value) {
                // this.$refs.confirm5.setInputValue('')
                // this.textmodel="";
                 this.buttonAddTodo();
          },   
          onShow5 () {
            // this.$refs.confirm5.setPlaceHolder('输入评价内容')
            },
           onConfirm (msg) {
                    if (msg) {
                        alert(msg)
                    }
            },
           onCancel () {
                console.log('on cancel')
            },
        getlist(){
			  this.$axios.post('/api/Post/post_detail',`data=${JSON.stringify({
		    			session_id:this.users.session_id,
							userId:this.users.userId,
							post_id:this.$route.query.id
				})}`).then((res)=>{
					// console.log(res)
					if(res.code==200){
						this.msgdata=res.data;
					}
				}).catch((err)=>{throw err});
		},
		buttonAddTodo(id,touserid){
			this.show5=true;
            if(!this.textmodel){
                Toast('请输入内容');
                return false;
			};
			if(!this.touserid){
                this.$axios.post('/api/Post/do_comment',`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                post_id:this.id,
                content:this.textmodel,
                })}`).then((res)=>{
                if(res.code==200){
					this.getlist();
					// this.msgdata.comment.push({nickname:this.users.nickname,content:this.textmodel,post_id:id,head_img:this.users.head_img});
					this.textmodel='';
                    Toast(res.msg);
                }else{
                    Toast(res.msg)
                }
                }).catch((err)=>{throw err});
				return false;
			}else{
 						this.$axios.post('/api/Post/do_comment',`data=${JSON.stringify({
                            session_id:this.users.session_id,
                            userId:this.users.userId,
                            post_id:this.id,
                            content:this.textmodel,
                            pid:this.touserid,
                            })}`).then((res)=>{
                            if(res.code==200){
								this.getlist();
								this.textmodel='';
								Toast(res.msg);
								this.touserid='';
                            }else{
                                Toast(res.msg)
                            }
                        }).catch((err)=>{throw err});
			}
		},
		buttonTodo(id,touserid,comment){
			this.id=id;
			if(!!touserid){this.touserid=touserid;};
			this.leftonoff=false;
			if(comment==1){
				MessageBox.confirm('确定删除该评论?').then(action => {
						this.$axios.post('/api/Post/del_my_comment',`data=${JSON.stringify({
                            session_id:this.users.session_id,
                            userId:this.users.userId,
                            id:this.touserid,
                            })}`).then((res)=>{
                            if(res.code==200){
								Toast(res.msg);
								this.touserid='';
								this.getlist();
                            }else{
                                Toast(res.msg)
                            }
                        }).catch((err)=>{throw err});
				});
				return false;
			}else {
				this.show5=true;
				return false;
			}
		},
		leftid(){
				let getzan=localStorage.getItem('dianzan')
				 if(getzan=='true'){
					 this.dianzan=true;
				 }
				  else if(getzan=='false'){
					 this.dianzan=false;
				 }
                this.leftonoff=!this.leftonoff;
		},
		zan(id,index){
            this.$axios.post('/api/Post/do_likenum',`data=${JSON.stringify({
            session_id:this.users.session_id,
            userId:this.users.userId,
            post_id:id
            })}`).then((res)=>{
            if(res.code==200){
                	this.leftonoff=false;
					if(this.dianzan==true){
						  	this.dianzan=false;
                    		localStorage.setItem('dianzan',false)
					}else if(this.dianzan==false){
						  	this.dianzan=false;
                    		localStorage.setItem('dianzan',true)
					};
					this.getlist();
            }else{
                Toast(res.msg)
            }
            }).catch((err)=>{throw err});
        },
	},
	watch:{
		// textmodel:function(val,oldval){
		// 	if(val!=''){
		// 		this.readonly=false;
		// 	}else{
		// 		this.readonly=true;
		// 	}
		// 	   $(this.$refs.inputfocusfff).css('height', '30px');
        //       $(this.$refs.inputfocusfff).css('height', (this.$refs.inputfocusfff).scrollHeight);
		// }
	},
	directives : {
            "focus" : function (el,binding) {
                if(binding.value){
                    el.focus();
                }
            }
        },
};
</script>
<style scoped lang="less">
.page-infinite-loading{padding-bottom:10px;}
.h(@h){height:@h}
.w(@h){width:@h}
.mt(@mt){margin-top:@mt}
.mr(@mr){margin-right:@mr}
.fz(@f){font-size: @f}
.mui-table-view{background:#f1f1f1;.li{margin-bottom:10px;}}
.mui-table-view:before,.mui-table-view:after{background:transparent;}
#credit_circle {
  .h(100%)
}
.main {.mt(70px)}
.top {padding: 30px 15px 20px;i {float: left;.w(60px);.h(60px);.mr(12px);border-radius: 50%;background-size: 100%;overflow: hidden;}
  img{width:100%;height:100%;}h4 {font-weight: normal;line-height: 40px;.h(40px);.fz(16px);}h5 {line-height: 20px;.h(20px);.fz(14px)}
}
.li {background: #fff;}
.main-content-one {padding-right:15px;line-height: 25px;margin-bottom: 10px;    margin-top: 5px;line-height: 20px;.fz(15px)}
.main-content-two {width: 100%;overflow: hidden;padding-bottom: 15px;
	li {float: left;height: 100px;width:100px;margin-right: 10px; margin-bottom: 10px;img {width: 100%;height: 100%;}
	}
}
.fl {float: left;}
.fr {float: right;}
.main-content-last {.w(100%);padding-right:10px;.fr {color: #666;}span > i {margin-right: 5px;}}
.comment{background: rgba(23, 14, 14, 0.67);font-style: normal;padding: 7px 15px;color: #fff;display: block;}
.comwrap{width:50%;position:absolute;left:0;}
.activedzan{color:#469dc8;}
.main-content-add{padding: 15px 15px 30px 15px;}
.main-content-add-con{background: #f1f1f1;padding-left:8px;padding-right:8px;}
.main-content-add-con li:nth-last-child(1){padding-bottom:8px;}
.main-content-add-con li:first-child{padding-top:8px;}
.main-content-add-con li:first-child:before{height: 0px;width: 0px;content:'';position: absolute;top:-10px;left:15px;border-bottom:5px solid #f0f0f0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid transparent;}
.content{width:100%;}
.content-com{position:relative;font-size: 14px;line-height:25px;min-height: 55px;padding-right:15px;    padding-left: 57px;padding-top: 7px;}
.content-com a{line-height: 20px;}
.content-com .img{position: absolute;left:5px;width: 40px;height:40px;border-radius: 50%;overflow: hidden;}
.content-com .img img{width:100%;height:100%;}
.content-inner{font-size:18px;}
.time-com{font-size:11px;color: #7d7878; line-height: 25px;}
.innercom{line-height: 20px;padding-left: 10px;}
#my-post-detail {position:fixed;width:100%;top:0;bottom:0;left:0;right:0; height: 100%;   overflow-y: auto; }
#my-post-detail .img-wrap-left{width:45px;height:45px;position: absolute;left:10px;top:10px;}
#my-post-detail .img-wrap-left img{width:100%;height:100%;}
#my-post-detail .right-con{width: 100%;padding-left:60px;padding-top:8px;position:relative;}
#my-post-content{position:fixed;width:100%;top:74px;bottom:0;left:0;right:0; height: 100%;overflow-y: auto;}
.right-content{position:relative;width:100%;display: block;height: 21px;}
.right-comment{position:absolute;right:0;z-index:1;}
.left-comment span{width:81px;display: inline-block;text-align: center;transition:all .3s;}
.left-comment.left-commenthide{width:170px;transition:all .3s;height: 43px;overflow: hidden;transform: translate3d(100%,0,0);opacity: 0;}
.left-comment{width: 170px;transition:all .3s;border-radius: 4px;height:36px;top: -9px;overflow: hidden;background: rgba(0,0,0,0.7);color: #fff;position: absolute;right: 30px;padding: 6px 0;z-index: 0;display: block;font-size: 16px}
.left-comment .iconfont{ position: relative;top: 2px;}
.icon-dianzanb{font-size:24px;}
.icon-pinglun1{font-size:20px;}
.dianzan:before{height: 0px;width: 0px;content:'';position: absolute;top:-10px;left:15px;border-bottom:5px solid #f0f0f0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid transparent;}
.dianzan{padding: 5px;border-bottom: 1px solid #ccc;color: #469dc8;position: relative;}
.dianzan .icon-dianzanb{font-size:20px;}
.common-img{width:36px;height:36px;position: absolute;left:15px;top: 7px;}
.content-inner>a{font-size:13px;line-height:18px;}
.content-inner{line-height:18px;}
.inner-wrap{font-size: 15px;}
.createtime{font-size: 13px;color: #5a5252;}
.input-all{position: fixed;width:100%;z-index:10;background:#fff;bottom:0;padding:3px 10px;z-index:2;min-height:36px;}
.input-all textarea{height:30px;width:82%;display: block;float:left;border:none;border-bottom: 1px solid #469dc8;max-height:150px;
 background: #fff;border-radius:0;margin-bottom:0;padding-left:0;padding: 0;}
.input-all input{height:30px;width:15%;background:#469dc8;border:1px solid #469dc8;float:right;text-align: center;margin-left:3%;position: absolute;right: 2%;top: 50%;-webkit-transform: translateY(-50%);transform: translateY(-50%)}
.input-all input[readonly=readonly]{background:#aaa;border: 1px solid #aaa;}
.time-updata{font-size: 12px;}
.postli{width: 100%;overflow: hidden;padding-bottom: 85px;}
@media screen and (max-width: 375px)and (min-width: 350px){  
	.main-content-two li {height: 90px;width: 90px;margin-right:3px;margin-bottom: 3px;}
}
@media screen and (max-width: 350px){
	.main-content-two li{height: 80px;width: 80px;margin-right: 3px;margin-bottom: 3px;}
}
</style>
<style>
#my-post-detail .weui-dialog__bd:first-child {
    padding: 8px;
}
</style>

