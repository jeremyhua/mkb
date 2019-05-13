<template>
  <div id="my-account" class="bg-f0 ">
	  <!-- <i-header :is_r="show" :title="title"></i-header> -->
	  <x-header :left-options="{backText: ''}">账户信息</x-header>
        <div class="mui-content fixed-content">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell touxiang" @click.stop="changeimg(this)" >
					更换头像
					<i class="iconfont icon-youjiantou mui-pull-right"></i>
                    <span class="mui-pull-right touxiang-wrap" id="addImg"><img :src='users?(imgUrl+users.head_img):""' :onerror='defaultImg' alt="头像" height="73" class="img-self"></span>
				</li>
				<li class="mui-table-view-cell nicknameli">
					昵称
					<i class="iconfont icon-youjiantou mui-pull-right"></i>
					<input type="text" v-model="nickname" class="fr nickname" :class="border" :contenteditable="nickedit" v-on:focus="focusnick" v-on:blur="blurnick">
				</li>
                <li class="mui-table-view-cell about">
                    手机号
                    <i class="iconfont icon-youjiantou mui-pull-right"></i>
					<span class="mui-pull-right"> {{(users ? (users.mobile):'电话号码')|regMobile}} </span>
                </li>
          </ul>
        </div>
      
  </div>
</template>
<script>
import iHeader from "@/components/header/header-r"
import {mapState,mapMutations,mapGetters} from 'vuex'
import {Toast} from 'mint-ui'
import {XHeader} from 'vux'
    export default{
		name:"myaccount",
		components: {
            XHeader
		},
		data(){
			return{
				users:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):'',
				defaultImg: 'this.src="' + require('@/assets/images/head.png') + '"',
				show:true,
				title:"账户信息",
				nickname:'',
				touxiang:'',
				nickedit:false,
				border:'',
				userimg:{},

			}
		},
		computed:{
			get_userinfo(){return this.$store.getters.get_userinfo},
			head_img(){return this.$store.state.login.users.head_img},
		},
		filters: {
			regMobile: function (value) {
				if (!value) return '';
				var new_mobile ;
				if (value.length > 7) {
			　　　	new_mobile = value.substr(0, 3) + '****' + value.substr(7);
			　　}
			　　return new_mobile;
			}
		},
		methods:{
			// ...mapMutations(['SAVE_USERS']),
			preventdefault(event){
 			event.cancelBubble = true;
			},
			changeimg(even){
				$('.upload-addimg-btn').find("input[type=file]").trigger('click');
			},
			focusnick(){
				this.edit=true;
				this.border='border';
			},
			blurnick(){
				this.edit=false;
				this.border='';
				this.$axios.post('/api/Usercenter/change_nickname',`data=${
					JSON.stringify({
						session_id:this.users.session_id,
						userId:this.users.userId,
						nickname:this.nickname
					})
				}`).then(res=>{
					// console.log(JSON.stringify(res))
					if(res.code==200){
						var usenickname=this.users;
						usenickname.nickname=this.nickname;
						this.$store.commit("SAVE_USERS",usenickname);
						Toast("修改成功")
					}else{
						Toast(res.msg)
					}
				})
			}
		},
		mounted(){
			this.nickname=this.users.nickname;
			var _this=this;
			let upload = Uploader("addImg",{
				path:this.imgUrl+"/api/Upload/upload",//请求的地址
	            data:{//往后台传递的参数
	                type:"members"
	            },
	            type:"post",//请求方式
	            autoUpload:true,//是否自动上传
	            fileNum:Number.POSITIVE_INFINITY,//上传文件数量
	            fileSize:20,//上传文件的大小，以MB为单位
	            uploadSuccess:function(results){//上传成功的回调
					if(results.code==200){
						var userimg=_this.users;
						this.head_img=results.data.url[0];
						  _this.$axios.post('/api/Usercenter/change_head_img',`data=${JSON.stringify({
							userId:_this.users.userId,
							session_id:_this.users.session_id,
							head_img:results.data.url[0]
						})}`).then(results=>{
						// console.log('change_head_img'+JSON.stringify(results))
						// console.log('userimg'+JSON.stringify(userimg))
						if(results.code==200){
							userimg.head_img=results.data.head_img;
							_this.$store.commit("SAVE_USERS",userimg);
						}
							Toast(results.msg);
							mui.hideLoading();//隐藏后的回调函数
						}).catch(err=>{
						}); 
					}else{
						mui.hideLoading();//隐藏后的回调函数
						mui.toast(results.msg)
					}
	            }
			});
		},
		watch:{
			'nickname'(val){
				//console.log(val)
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
.content2{.mt(15px)}
.mui-table-view-cell{.p(20px 15px)}
.touxiang{line-height: 64px;padding:23px 15px 23px;}
.img-self{background: #f0f0f0;text-align: center;line-height: 72px;color: #999;height:100%; width: 100%;display: inline-block;}
.gray{.c(@aa);a{.c(@aa);}}
#my-account{
	.mui-content>.mui-table-view:first-child {margin-top: 0px;}
	.mui-table-view:before{background:transparent;}
	.mui-table-view-cell span{margin-right:15px;}
} 
.touxiang-wrap{width:73px;height:73px;border-radius:50%;overflow:hidden;}
span[contenteditable]{border:1px solid #aaa;top: 12px;width:200px;height: 35px;line-height: 35px;right: 22px;position: absolute;padding-left: 5px;padding-right: 5px;}
.nickname{position: relative;top:11px;padding:10px;width: 50%;display: block;text-align:right;margin-right:15px;margin:0;border:none;}
.border.nickname{border:1px solid #aaa;}
#my-account .nicknameli{height:65px;line-height:65px;padding: 0 15px;}
</style>
<style lang="less">
#my-account #addImg{
	position: relative;
	.upload-addimg-btn .iconfont{display:none;}
    .upload-btn-box{color: transparent;opacity: 0;position: absolute; top: 0;left:0;z-index:1000;}
    input[name=file]{width: 100%;height: 93px;display: block;position: relative; top: 0; z-index:15; line-height:93px;}
}
.fr{float:right;}
</style>


