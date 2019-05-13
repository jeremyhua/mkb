<template>
    <div id="push-content">
        <!-- <i-header :is_r="true" title="发布" @click="is_fh()"></i-header> -->
        <x-header :left-options="{backText:''}">发布</x-header>
		<div class="main bg-f0">
            <div class="m15">
                <div class="c-333 ft-title">产品名称</div>
                <div class="select—box">
                    <input type="text" class="ft-name fs-15" placeholder="请输入发布的产品名称" v-model="fatie">
                </div>

                <div class="c-333 ft-title">放贷金额</div>
                <div class="select—box" @click="type_popup = true">
                    <div class="select-wrap bg-fff flex">
                        <span>{{type_content}}</span>
                        <span :class="{is_arrow:type_popup}">
                            <b class="iconfont icon-arrow-down"></b>
                        </span>
                    </div>
                </div>

                <div class="c-333 ft-title">放贷区域</div>
                <div class="select—box" @click="area_popup = true">
                    <div class="select-wrap bg-fff flex">
                        <span>{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</span>
                        <span :class="{is_arrow:area_popup}">
                            <b class="iconfont icon-arrow-down"></b>
                        </span>
                    </div>
                </div>

                <div class="c-333 ft-title">贷款期限</div>
                <div class="select—box" @click="time_popup = true">
                    <div class="select-wrap bg-fff flex">
                        <span>{{time_content}}</span>
                        <span :class="{is_arrow:time_popup}">
                            <b class="iconfont icon-arrow-down"></b>
                        </span>
                    </div>
                </div>
                
                <div class="c-333 ft-title">贷款类型</div>
                <div class="select—box" @click="leixin_popup = true">
                    <div class="select-wrap bg-fff flex">
                        <span>{{leixin_content}}</span>
                        <span :class="{is_arrow:leixin_popup}">
                            <b class="iconfont icon-arrow-down"></b>
                        </span>
                    </div>
                </div>

                <div class="c-333 ft-title">具体描述</div>
                <div class="select—box discrib">
                    <textarea class="discrib-detail" placeholder="150字以内" v-model="discrib"></textarea>
                </div>
                <!-- <div class="c-333 ft-title">上传相关图片</div> -->
                <!-- <div class="select—box discrib">
                    <i class="iconfont icon-tianjia3"></i>    
                </div> -->
                <!-- <div class="ft-upload bg-fff">
                  <div id="addImg_box" class="bg-fff mt-15"></div>
                </div> -->
                <div class="c-333 ft-title">产品特点</div>
                <div class="textarea-wrap">
                    <textarea name="" placeholder="请输入您发布产品特点" v-model='product'></textarea>
                </div>
                <div class="c-333 ft-title">申请条件</div>
                <div class="textarea-wrap">
                    <textarea name="" placeholder="请输入申请需要的条件" v-model="need"></textarea>
                </div>
                <div class="c-333 ft-title">需要资料</div>
                <div class="textarea-wrap">
                    <textarea name="" placeholder="请输入申请需要的资料" v-model="needbook"></textarea>
                </div>
            </div>
		</div>
		
		<button class="head-bg push-btn c-fff" @click="push_loan">发布</button>

        <!-- 产品类型 -->
		<mt-popup
		  v-model="type_popup"
		  position="bottom" class="r-ter">
		  <span class="click_success c-ff6800" @click="is_fh()">完成</span>
		  <mt-picker :slots="type_list" @change="onTypeChange" valueKey="link_name"></mt-picker>
		</mt-popup>

        <!-- 放贷区域-->
		<mt-popup
		  v-model="area_popup"
		  position="bottom" class="r-ter">
		  <span class="click_success c-ff6800" @click="is_fh()">完成</span>
		  <mt-picker :slots="area_list" @change="onAreaChange" valueKey="name"></mt-picker>
		</mt-popup>

        <!-- 贷款期限 -->
		<mt-popup
		  v-model="time_popup"
		  position="bottom" class="r-ter">
		  <span class="click_success c-ff6800" @click="is_fh()">完成</span>
		  <mt-picker :slots="time_list" @change="onTimeChange" valueKey="link_name"></mt-picker>
		</mt-popup>
        <mt-popup
		  v-model="leixin_popup"
		  position="bottom" class="r-ter">
		  <span class="click_success c-ff6800" @click="is_fh()">完成</span>
		  <mt-picker :slots="leixin_list" @change="onLeixinChange" valueKey="link_name"></mt-picker>
		</mt-popup>
    </div>
</template>

<script>
import { CellSwipe, Popup, Picker,Toast  } from "mint-ui";
import {mapGetters } from "vuex"
import {XHeader } from  'vux'
export default {
  name: "push",
  data() {
    return {
      users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
      fatie:'',
      discrib:'',
      product:'',
      need:'',
      needbook:'',
      type_name:'',
      type_popup: false,
      type_content: "",
      area_popup: false,
      area_content: "",
      area_name:'',
      time_popup: false,
      time_content: "",
      time_name:'',
      leixin_popup: false,
      leixin_content: "",
      leixin_name:"",
      valone:0,
      valtwo:0,
      myaddress:'',
      type_list: [
        {
         flex:1,
          values:[{link_name:'请选择放贷金额'}],
          className: "slot1",
          textAlign: "center"
        }
      ],
      area_list: [
        {
          flex:1,
          values:[],
          className: "slot1",
          textAlign: "center"
        },{
          flex:1,
          values: [],
          className: "slot2",
          textAlign: "center"
        },
        {
          flex:1,
          values: [],
          className: "slot3",
          textAlign: "center"
        }
      ],
      time_list: [
        {
          flex:1,
          values: [{link_name:"请选择贷款期限"}],
          className: "slot1",
          textAlign: "center"
        }
      ],
      leixin_list: [
        {
          flex:1,
          values: [{link_name:"请选择贷款类型"}],
          className: "slot1",
          textAlign: "center"
        }
      ],
      onoff:true,
      myAddressProvince:'省',
      myAddressCity:'市',
      myAddresscounty:'区/县',
      myAddressProvincename:'',
      myAddressCityname:'',
      myAddresscountyname:'',
      res:'',
      url:[],
      arr:[]
    };
  },
  mounted() {
   
    //请求类型
        this.$axios.post('/api/Product/get_add_product_condition',`data=${JSON.stringify({
                    session_id:this.users.session_id,
                    userId:this.users.userId
                })}`).then(
				res=> {if(res.code==200){
          this.res=res;
                        for(let  i in res.data.PRODUCT_TYPE.items){
                        this.leixin_list[0].values.push( res.data.PRODUCT_TYPE.items[i]);
                        }; 
                        for(let i in res.data.LOAN_AMOUNT.items){
                        this.type_list[0].values.push( res.data.LOAN_AMOUNT.items[i]);
                        };
                        for(let i in res.data.LOAN_TERM.items){
                        this.time_list[0].values.push( res.data.LOAN_TERM.items[i]);
                        }; 
                        for(let i in res.data.REGION_LIST){
                              this.area_list[0].values.push(res.data.REGION_LIST[i]);
                              // for(let j in res.data.REGION_LIST[1].childs){
                              //       this.area_list[1].values=res.data.REGION_LIST[1].childs[j].name;
                              //       for(let k in res.data.REGION_LIST[1].childs){
                              //       this.area_list[2].values=res.data.REGION_LIST[1].childs[0].childs[k].name;
                              //        };
                              // }; 
                        }
					}
          });
    console.log('---------------------------------------------------mounted-----------------------------------------------------')
			var _this=this;
			let upload = Uploader("addImg_box",{
				path:this.imgUrl+"/api/Upload/upload",//请求的地址
	            data:{//往后台传递的参数
	                type:"members"},
	            type:"post",//请求方式
	            addBtnName:"<span class='iconfont icon-tianjia3 add-file'><span>",//添加文件按钮名字
	            uploadBtnName:"上传图片",//上传文件按钮名字
	            delIcon:"×",//删除已选择文件的图标或按钮名字
	            autoUpload:true,//是否自动上传
	            fileNum:5,//上传文件数量
	            fileSize:1,//上传文件的大小，以MB为单位
	            isRepeat:false,//是否可以重复选择文件(false->不重复选择)
	            fileType:['jpg','png','gif','jpeg'],//上传文件的类型
	            showImgList:true,//是否显示缩略图
				uploadSuccess:function(results){//上传成功的回调
					// console.log(results)
					if(results.code==200){
						Toast('上传成功')
						results.data.url.forEach(function(item){
							_this.url.push(item)
						});
					}else{
					  Toast(results.msg)
					}
				},
	      uploadError:function(xhr,status){
					console.log(status)//上传出错的回调
	      },
	      delImgFn:function(_this,parentNode,delFile,fileSrc,fileList,filterFile,index){//删除文件前的回调
	                //下方是删除图片的操作，如需弹窗确定，可在本处执行并复制下列代码至确定事件内
	                upload.delImg(parentNode,delFile,fileSrc,fileList,filterFile,index);
	      }
			});
      this.loadimg=upload.fileSrc;
       var screen_h = document.documentElement.clientHeight;
      //  通过window的onresize事件监控虚拟键盘的弹起过程
      
      // window.onresize = function () {
      //   var cur_h = document.documentElement.clientHeight;
      //       //  过当前页面高度和全局的初始高度比较判断键盘是否在弹起或者消失的过程中
      //         if (screen_h === cur_h) {
      //           $(".push-btn").css("display","block");
      //         }else{
      //           $(".push-btn").css("display","none");
      //         }
      // };
  },
  methods: {
    onTypeChange(picker, val) {
        this.type_content = val[0].link_name;
        this.type_name=val[0].link_value;
    },
    onAreaChange(picker, values) {
      if(values[0]){
        this.myAddressProvince = values[0].name;
        this.myAddressProvincename = values[0].code;
            const index=values[0].code;
           const child=this.res.data.REGION_LIST[index].childs;
         picker.setSlotValues(1,Object.values(this.res.data.REGION_LIST[index].childs));
            if(values[1]){
              this.myAddressCity =values[1].name;
              this.myAddressCityname =values[1].code;
                 picker.setSlotValues(2,Object.values(values[1].childs));
                  if(values[2]){
                      this.myAddresscounty =values[2].name;
                      this.myAddresscountyname = values[2].code;
                  }
            }
      }
      
      //console.log(test)
     /* if(typeof(values[0]) == "object"){
       var index=values[0].code;
     } */
     // var index=values[0].code;
    //  for(let j in this.res.data.REGION_LIST[index].childs){
                  //this.area_list[1].values=this.res.data.REGION_LIST[index].childs[j].name;
     // }; 
          //this.myAddressProvince = values[0].name;       
          // this.myAddressCity = values[1].name;
          // this.myAddresscounty = values[2].name;
         // this.myAddressProvincename = values[0].code;       
          // this.myAddressCityname = values[1].code;
          // this.myAddresscountyname = values[2].code;
          // console.log(this.myAddressProvincename,this.myAddressCityname,this.myAddresscountyname)
    },
    onTimeChange(picker, val) {
        this.time_content = val[0].link_name;
        this.time_name=val[0].link_value;
    },
    onLeixinChange(picker, val) {
       this.leixin_content = val[0].link_name;
        this.leixin_name=val[0].link_value;
    },
    is_fh() {
      this.type_popup = false;
      this.area_popup = false;
      this.leixin_popup = false;
      this.time_popup = false;
    },
    push_loan(){
                if(!this.fatie){
                    Toast('产品名称不能为空')
                    return false;
                }else if(!this.type_name){
                    Toast("请选择放贷金额")
                    return false;
                }else if(!this.myAddressProvincename){
                    Toast("放贷区域不能为空")
                    return false;
                }else if(!this.time_name){
                    Toast("请选择贷款期限")
                    return false;
                }else if(!this.leixin_name){
                    Toast("请选择贷款类型")
                    return false;
                }else if(!this.discrib){
                    Toast("详细描述不能为空")
                    return false;
                }
            /*     else if(!this.url){
                    Toast("相关图片不能为空")
                    return false;
                } */
                else if(!this.product){
                    Toast("产品特点不能为空")
                    return false;
                }else if(!this.need){
                    Toast("申请条件不能为空")
                    return false;
                }else if(!this.needbook){
                    Toast("申请资料不能为空")
                    return false;
                };
                    this.$axios.post('/api/Lenders_product/add_product',`data=${JSON.stringify({
                    session_id:this.users.session_id,
                    userId:this.users.userId,
                    pro_name:this.fatie,
                    pro_money:this.type_name,
                    province:this.myAddressProvincename,
                    city:this.myAddressCityname,
                    area:'',
                    pro_time:this.time_name,
                    pro_type:this.leixin_name,
                    pro_desc:this.discrib,
                    // pro_img:this.url,
                    pro_seo:this.product,
                    pro_conditions:this.need,
                    pro_data:this.needbook
                    })}`).then(
                    res=> {if(res.code==200){
                            Toast("发布成功");
                            setTimeout(() => {
                                this.$router.push({path:'/my/my-product'})
                            }, 1000);
                        }else{
                          Toast(res.msg)
                        }
                    })
    }
  },
  components: {
    CellSwipe,
    Popup,
    Picker,
    XHeader
  }
};
</script>

<style scoped>
.main {
  height: 100%;
  padding-top: 70px;
  padding-bottom: 50px;
}
.select—box {
  width: 100%;
  text-align: right;
  height: 45px;
  margin: 15px 0;
}
.select—box span {
  margin-top: 14px;
  padding: 0;
  font-size: 15px;
  width: 100px;
}
.click_success {
  display: inline-block;
  margin: 10px 15px 0 0;
}

.select—box input {
  height: 100%;
  text-align: left;
  padding: 0 10px;
}
.ft-title {
  border-left: 5px solid #469dc8;
  height: 20px;
  line-height: 21px;
  padding-left: 10px;
}
.ft-name {
  border: none;
  text-align: right;
  padding: 0;
}
.ft-content {
  padding: 15px;
}
.ft-content textarea {
  font-size: 15px;
  border: none;
  height: 300px;
  margin: 0;
  padding-bottom: 0;
}
.ft-upload {
  padding: 15px;
}
.push-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  font-size: 16px;
  border: none;
  border-radius: 0;
  background:#469dc8;
}
@media screen and (max-width: 320px) {
  .ft-content textarea {
    height: 200px;
  }
}

.m15 {
  margin: 15px;
}
.select-wrap {
  height: 100%;
  padding: 0 15px;
}
.select-wrap span:first-child {
  margin-top: 0;
  line-height: 45px;
  -webkit-box-flex: 1;-webkit-flex:1;flex:1;
  text-align: left;
  color: #333;
}
.select-wrap span:last-child {
  margin: 0;
  width: 15px;
  height: 15px;
  margin-top: 12px;
  color: #ddd;
}
.select—box span.is_arrow {
  transform: rotate(180deg);
  margin-top: 16px;
}
.textarea-wrap {
  margin-top: 15px;
}
.textarea-wrap textarea {
  border: none;
  height: 94px;
}
	.ft-name{border:none;text-align: right;padding: 0;}
	.ft-content{padding: 15px;}
	.ft-content textarea{font-size: 15px;border:none;height: 300px;margin: 0;padding-bottom: 0;}
	.ft-upload{margin: 15px 0;}
</style>
<style >
#addImg_box {
  display: flex;
  margin-top: 15px;
}
.upload-addimg-btn:first-child,
.upload-btn-box {
  position: relative;
  cursor: pointer;
  display: inline-block;
  width: 80px;
  height: 80px;
}
.upload-btn-box {
  width: 0;
}
.upload-img-box {
  margin-left: -3px;
}
.upload-img-box:after {
  clear: both;
  width: 0;
  height: 0;
  display: block;
  overflow: hidden;
}
.upload-addimg-btn:first-child input {
  width: 80px;
  height: 80px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  opacity: 0;
}
.upload-addimg-btn:last-child {
  display: none;
}
.add-file {
  font-size: 80px;
  display: inline-block;
  width: 80px;
  height: 80px;
  line-height: 80px;
  color: #ccc;
}
.upload-img-item {
  float: left;
  width: 76px;
  height: 76px;
  margin-left: 5px;
  margin-top: 2px;
  margin-bottom: 3px;
  position: relative;
  border: 1px solid #ddd;
}
.upload-img-item:first-child {
  margin-left: 87px;
}
.upload-img-item img {
  width: 100%;
  height: 100%;
}
.delimg-btn {
  position: absolute;
  top: -2px;
  right: 0;
  font-size: 30px;
  color: #ccc;
}

#push-content .mint-cell-wrapper {
  padding: 0 15px;
}
#push-content .mint-cell-value {
  width: 100%;
  justify-content: space-between;
  display: flex;
  height: 50px;
  line-height: 50px;
}
#push-content .mint-popup,
.picker-items {
  width: 100%;
}
#push-content .picker-item.picker-selected {
  color: #469dc8;
}
#push-content .discrib {
  height: 94px;
  width: 100%;
  background: #fff;
}
#push-content .discrib-detail {
  width: 100%;
  height: 100%;
  display: block;
  border: none;
  font-size: 16px;
  color: #666;
  text-align: left;
}
.iconfont.icon-tianjia3{float:left;font-size:60px;color:#f0f0f0;line-height:94px;}
#push-content #addImg_box{display: flex;margin-top: 15px;}
	#push-content .upload-addimg-btn:first-child,.upload-btn-box{position: relative;cursor: pointer;display: inline-block;width: 80px;height: 80px;}
	#push-content .upload-btn-box{width: 0;}
	#push-content .upload-img-box{margin-left: -3px;}
	#push-content .upload-img-box:after{clear: both;width: 0;height: 0;display: block;overflow:hidden;}
	#push-content .upload-addimg-btn:first-child input{width: 80px;height: 80px;position: absolute;left:0;top:0;z-index: 9;opacity: 0;}
	#push-content .add-file{font-size: 80px;display: inline-block;width: 80px;height: 80px;line-height: 80px;color:#ccc;}
	#push-content .upload-img-item{float: left;width: 76px;height: 76px;margin-left:5px;margin-top:2px;margin-bottom:3px;position: relative; border:1px solid #ddd;margin-top:-2px;}
	#push-content .upload-img-item:first-child{margin-left: 87px;}
	#push-content .upload-img-item img{width: 100%;height: 100%;}
	#push-content .delimg-btn{position: absolute;top:-2px;right: 0;font-size: 30px;color:#ccc;}
	#push-content .mint-cell-wrapper{padding: 0 15px;}
	#push-content .mint-cell-value{width: 100%;justify-content:space-between;display: flex;height: 50px;line-height: 50px;}
	#push-content .mint-popup,.picker-items{width: 100%;}
	#push-content .picker-item.picker-selected{color:#469dc8;}
</style>