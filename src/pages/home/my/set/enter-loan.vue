<template>
	<div id="enter-loan" class="wrap bg-f0">
   <x-header slot='header' :left-options="{backText: ''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;">信贷人员入驻</x-header>
		<div class="enter-main content fixed-content">
			<ul class="mui-table-view table-view-one">
          <li class="list-li">
              <span class=" iconfont icon-shuxian"></span>
              姓名 <span class="mui-pull-right">*必填</span>
          </li>
          <li class="list-li">
              <!-- <input type="text" placeholder="请输入姓名" class="input-text" v-model="name"> -->
              <x-input placeholder="请输入姓名"  v-model="zsname"></x-input>
              
          </li>
          <li class="list-li">
              <span class=" iconfont icon-shuxian"></span>
              单位名称 <span class="mui-pull-right">*必填</span>
          </li>
          <li class="list-li">
              <!-- <input type="text" placeholder="请输入单位名称" class="input-text" v-model="name"> -->
              <x-input placeholder="请输入单位名称"  v-model="name"></x-input>
              
          </li>
           <li class="list-li">
              <span class=" iconfont icon-shuxian"></span>
              单位地址 <span class="mui-pull-right">*必填</span>
          </li>
          <li class="list-li">
              <!-- <input type="text" placeholder="请输入单位地址" class="input-text" v-model="area"> -->
              <x-input placeholder="请输入单位地址"  v-model="area"></x-input>
              
          </li>
           <li class="list-li">
              <span class=" iconfont icon-shuxian"></span>
              职位 <span class="mui-pull-right"></span>
          </li>
          <li class="list-li">
              <!-- <input type="text" placeholder="请输入您的职位" class="input-text" v-model="work"> -->
              <x-input placeholder="请输入您的职位"  v-model="work"></x-input>
              
          </li>
				<li class="list-li">
						<span class=" iconfont icon-shuxian"></span>
						产品类型<span class="mui-pull-right">*必填</span>
				</li>
				<li class="list-li">
						<select v-model="leixin">
              <option v-for="(option,i) in options" :key="i" v-bind:value="option.link_value">
                  {{ option.link_name }}
              </option>
            </select>
				</li>
          <li class="list-li">
              <span class=" iconfont icon-shuxian"></span>
              联系电话 <span class="mui-pull-right">*必填</span>
          </li>
          <!-- <li class="list-li">
              <input type="text" placeholder="请输入您的联系电话" class="input-text" v-model="tel">
          </li> -->
           <li class="list-li">
            <!-- <group > -->
                <x-input placeholder="请输入您的联系电话" type="tel"  v-model="tel"></x-input>
            <!-- </group> -->
           </li>
          <li class="list-li">
              <span class=" iconfont icon-shuxian"></span>
              联系QQ <span class="mui-pull-right">*必填</span>
          </li>
          <li class="list-li">
              <!-- <input type="text" placeholder="请输入您的联系QQ" class="input-text" v-model="qq"> -->
              <x-input placeholder="请输入您的联系QQ"  v-model="qq"></x-input>
          </li>
          <li class="list-li">
              <span class=" iconfont icon-shuxian"></span>
              微信号 <span class="mui-pull-right"></span>
          </li>
          <li class="list-li">
              <!-- <input type="text" placeholder="请输入您的微信号" class="input-text" v-model="weixin"> -->
              <x-input placeholder="请输入您的微信号"  v-model="weixin"></x-input>
          </li>
			</ul>
      <div class="ft-upload bg-fff table-view-four mui-table-view  mui-text-left">
				<div class="c-333 ft-title list-li"><i class="iconfont icon-shuxian"></i>上传职业照片</div>
				<div id="addImg_box" class="bg-fff mt-15"></div>
			</div>
       <div class="ft-upload bg-fff table-view-four mui-table-view  mui-text-left">
				<div class="c-333 ft-title list-li"><i class="iconfont icon-shuxian"></i>上传门店照片</div>
				<div id="addImg_boxs" class="bg-fff mt-15"></div>
			</div>
			<ul class=" table-view-bottom mui-text-center">
					<li class="clearfix kefu" @click="enterLoan">立即申请 </li>
			</ul>
		</div>
	</div>
</template>

<script>
import {XHeader,XInput, Group, XButton, Cell } from "vux";
import {Toast} from "mint-ui";
import {mapGetters } from "vuex"
export default {
  name: "my", 
  components: {
    XHeader,XInput, Group, XButton, Cell
  },
  data() {
    return {
      is_r: true,
      zsname:"",
      name:"",
      area:"",
      work:"",
      leixin:"", 
      options: [],
      tel:"",
      qq:"",
      weixin:"",
      fourth: { src: require("@/assets/images/my/loan.png") },
      fiveth: [
        { src: require("@/assets/images/my/loan3.png") },
        { src: require("@/assets/images/my/loan2.png") }
      ],
      users:localStorage.getItem('users') && JSON.parse(localStorage.getItem('users')) || {},
      job_img:[],
      company_img:[]
    };
  }, 
  computed:{
    ...mapGetters(['get_product'])
  },
  watch:{
      leixin(val, oldVal) {
        this.leixin=val
      }
  },
  mounted(){
      // console.log(this.users,this.get_product)
			const that=this;
			let upload =this.$upload("addImg_box",{
				      path:this.imgUrl+"/api/Upload/upload",//请求的地址
	            data:{//往后台传递的参数
	                type:"members"},
	            type:"post",//请求方式
	            addBtnName:"<span class='iconfont icon-tianjia3 add-file'><span>",//添加文件按钮名字
	            uploadBtnName:"上传图片",//上传文件按钮名字
	            delIcon:"×",//删除已选择文件的图标或按钮名字
	            autoUpload:true,//是否自动上传
	            fileNum:9,//上传文件数量
	            fileSize:20,//上传文件的大小，以MB为单位
	            // isRepeat:false,//是否可以重复选择文件(false->不重复选择)
	            // fileType:['jpg','png','gif','jpeg'],//上传文件的类型
	            showImgList:true,//是否显示缩略图
				      uploadSuccess:function(results){//上传成功的回调
                if(results.code==200){
                  that.allloaded=true;
                  mui.hideLoading();//隐藏后的回调函数
                  mui.toast('上传成功');
                  // self.imgs = results.result;
                  results.data.url.forEach(function(item){
                    that.job_img.push(item);
                  });
                }else{
                  mui.toast(results.msg)
                }
              },
	            uploadError:function(xhr,status){
                console.log(status)//上传出错的回调
	            },
	            delImgFn:function(_this,parentNode,delFile,fileSrc,fileList,filterFile,index){//删除文件前的回调
	                //下方是删除图片的操作，如需弹窗确定，可在本处执行并复制下列代码至确定事件内
					        upload.delImg(parentNode,delFile,fileSrc,fileList,filterFile,index);
					        that.imgsurl.splice(index,1)
					        console.log(that.imgsurl)
	            }
			});
		//	that.job_img=upload.fileSrc;

      let uploads=this.$upload("addImg_boxs",{
				path:this.imgUrl+"/api/Upload/upload",//请求的地址
	            data:{//往后台传递的参数
	                type:"members"},
	            type:"post",//请求方式
	            addBtnName:"<span class='iconfont icon-tianjia3 add-file'><span>",//添加文件按钮名字
	            uploadBtnName:"上传图片",//上传文件按钮名字
	            delIcon:"×",//删除已选择文件的图标或按钮名字
	            autoUpload:true,//是否自动上传
	            fileNum:9,//上传文件数量
	            fileSize:20,//上传文件的大小，以MB为单位
	            // isRepeat:false,//是否可以重复选择文件(false->不重复选择)
	            // fileType:['jpg','png','gif','jpeg'],//上传文件的类型
	            showImgList:true,//是否显示缩略图
				      uploadSuccess:function(results){//上传成功的回调
                if(results.code==200){
                  that.allloaded=true;
                  mui.hideLoading();//隐藏后的回调函数
                  mui.toast('上传成功');
                  // self.imgs = results.result;
                  results.data.url.forEach(function(item){
                    that.company_img.push(item);
                  });
                }else{
                  mui.toast(results.msg)
                }
              },
	            uploadError:function(xhr,status){
                console.log(status)//上传出错的回调
	            },
	            delImgFn:function(_this,parentNode,delFile,fileSrc,fileList,filterFile,index){//删除文件前的回调
	                //下方是删除图片的操作，如需弹窗确定，可在本处执行并复制下列代码至确定事件内
					        upload.delImg(parentNode,delFile,fileSrc,fileList,filterFile,index);
					        that.imgsurl.splice(index,1)
					        console.log(that.imgsurl)
	            }
			});
     // that.company_img=uploads.fileSrc;

      this.$axios.post('/api/Product/get_product_type')
          .then(res=>{
              if(res.code==200){
                  this.options=res.data;
                  this.leixin=this.options[0].link_value;
              }else{
                Toast(res.msg)
              }
              
          })
	},
 
  methods:{
    enterLoan(){
      if(this.zsname==""){
          Toast("请输入姓名")
          return false;
      }else if(this.name==""){
          Toast("请输入单位名称")
          return false;
      }else if(this.area==""){
          Toast("请输入单位地址");
          return false;
      }else if(this.tel==""){
          Toast("请输入联系电话");
          return false;
      }else if(!(/^1[3456789]\d{9}$/.test(this.tel))){
        Toast("请输入正确的联系电话");
        return false;
      }
        this.$store.dispatch("enterLoan", {
          data: "data="+JSON.stringify({
              session_id:this.users.session_id,
              userId:this.users.userId,
              zsname:this.zsname,
              company:this.name,
              company_address:this.area,
              product_type:this.leixin,
              contact:this.tel,
              job:this.work,
              qq:this.qq,
              weixin:this.weixin,
              job_img:this.job_img,
              company_img:this.company_img
          }),
          fn: (code, msg) => {
              switch (code) {
                  case 200:
                      // console.log(resulte)
                      this.$router.push({path:'/my'})
                      break;
                  case -1:
                      Toast(msg)
                      break;
                  default:
                      Toast("请求出错")
                      break;
              }
          }
      })
    },
    uploadimg(){

    },
    uploadimgs(){
      
    }
  }
};
</script>
<style scoped lang="less">
.table-view-two:before,
.table-view-two:after,
.table-view-one:after,
.table-view-one:before,
.content-top:after,
#loan .content-top:before,
.table-view-three:before,
.table-view-four:before {
  background: transparent;
}
.wrap {
  height: 100vh;
}
.mui-table-view:before {
  left: 15px;
}
.table-view-one {
  line-height: 50px;
  background: #f0f0f0;
  li {
    background: #fff;
    height: 50px;
    padding: 0 12px;
    span {
      color: #469dc8;
    }
    .iconfont {
      font-size: 19px;
      position: relative;
      top: 3px;
    }
    input {
      border: none;
    }
  }
  li:nth-of-type(2n) {
    margin-bottom: 10px;
  }
  li:nth-of-type(2n + 1) {
    border-bottom: 1px solid #f0f0f0;
  }
  .input-text {
    color: #b5b5b5;
  }
}
#enter-loan .table-view-three {
  padding: 12px 12px 30px;
  .list-li {
    font-size: 18px;
  }
  li {
    line-height: 32px;
    .icon-shuxian {
      font-size: 20px;
      color: #469dc8;
      position: relative;
      top: 2px;
      left: -5px;
      margin-right: -7px;
    }
    .iconleft {
      padding-right: 9px;
      color: #a5a5a5;
    }
  }
  .content-list {
    // margin-top: 3px;
    line-height: 32px;
    .mui-table-view-cell {
      font-size: 14px;
    }
  }
}
#enter-loan .table-view-four {
	.icon-tianjia3 {
      font-size: 95px;
      line-height: 95px;
      color: #c7c7c7;
    }
  padding: 12px 12px 30px;
  .list-li {
    font-size: 18px;
    line-height: 32px;
  
    .icon-shuxian {
      font-size: 20px;
      color: #469dc8;
      position: relative;
      top: 2px;
      left: -5px;
      margin-right: -7px;
    }
  }
  .content-list > i {
    width: 95px;
    height: 95px;
    display: inline-block;
    overflow: hidden;
    margin-left: 14px;
    .mui-media-img {
      line-height: 96px;
      min-width: 96px;
      height: 96px;
      float: left;
    }
  }
}
.table-view-bottom {
  .kefu {
    font-size: 18px;
    height: 52px;
    line-height: 52px;
    color: #fff;
    background: #469dc8; /* Old browsers */
    background: -moz-linear-gradient(
      left,
      #469dc8 0%,
      #4097c2 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      left,
      #469dc8 0%,
      #4097c2 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to right,
      #469dc8 0%,
      #4097c2 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient(
        startColorstr="#469dc8",
        endColorstr="#4097c2",
        GradientType=1
      ); /* IE6-9 */
  }
}
	/* 消除mui默认样式 */
p{margin-bottom:0;color:#666;}
@media screen and (max-width: 350px) {
}
</style>

<style>
  #enter-loan .weui-cell{margin-top:0;padding: 0px;border:none;color:#666;}
  #enter-loan input{border: none;margin-bottom:0;}
  #enter-loan #addImg_box{display: flex;margin-top: 15px;}
	#enter-loan .upload-addimg-btn:first-child,.upload-btn-box{position: relative;cursor: pointer;display: inline-block;width: 80px;height: 80px;}
	#enter-loan .upload-btn-box{width: 0;}
	#enter-loan .upload-img-box{margin-left: -3px;}
	#enter-loan .upload-img-box:after{clear: both;width: 0;height: 0;display: block;overflow:hidden;}
	#enter-loan .upload-addimg-btn:first-child input{width: 80px;height: 80px;position: absolute;left:0;top:0;z-index: 9;opacity: 0;}
	#enter-loan .add-file{font-size: 80px;display: inline-block;width: 80px;height: 80px;line-height: 80px;color:#ccc;}
	#enter-loan .upload-img-item{float: left;width: 76px;height: 76px;margin-left:5px;margin-top:2px;margin-bottom:3px;position: relative; border:1px solid #ddd;margin-top:-2px;}
	#enter-loan .upload-img-item:first-child{margin-left: 87px;}
	#enter-loan .upload-img-item img{width: 100%;height: 100%;}
	#enter-loan .delimg-btn{position: absolute;top:-2px;right: 0;font-size: 30px;color:#ccc;}
	#enter-loan .mint-cell-wrapper{padding: 0 15px;}
	#enter-loan .mint-cell-value{width: 100%;justify-content:space-between;display: flex;height: 50px;line-height: 50px;}
	#enter-loan .mint-popup,.picker-items{width: 100%;}
	#enter-loan .picker-item.picker-selected{color:#469dc8;}
  #enter-loan #addImg_boxs{display: flex;margin-top: 15px;}
  
</style>
