<template>
	<div id="creditloan" class="wrap bg-f0">
   <x-header :left-options="{backText: ''}"  :title="title">
      <a slot="right"   @click="post_handle"><i class="iconfont icon-add-more" style="top: 23px;
    position: relative;"></i></a>
   </x-header>
		<!--  <i-header :title="title" :is_r="arrow"></i-header> -->
	<!-- 		<ul class="main-content-top clearfix">
				<li  @click="tabBtnClick('sq_content')" :class="active=='sq_content'?('active'):('')">个人</li>
				<li  @click="tabBtnClick('sh_content')" :class="active=='sh_content'?('active'):('')">公司</li>
				<li  @click="tabBtnClick('all_content')" :class="active=='all_content'?('active'):('')">热门</li>
			</ul> -->
      <div class="loan-top-wrap ">
          <tab :line-width="1" :custom-bar-width="getBarWidth"  active-color='#469dc8'>
            <tab-item selected @click.native="tabBtnClick('sq_content')" :class="active=='sq_content'?('active'):('')">个人</tab-item>
            <tab-item @click.native="tabBtnClick('sh_content')" :class="active=='sh_content'?('active'):('')">公司</tab-item>
            <tab-item @click.native="tabBtnClick('all_content')" :class="active=='all_content'?('active'):('')">热门</tab-item>
          </tab>

            <ul class="select-choice clearfix ">
              <li><select v-model="cityselected" @change="changeSelect" direction="rtl">  
                  <option v-for="(option,i) in cities" :key="i" v-bind:value="option.city"  direction="rtl">  
                    {{ option.city_name }} 
                  </option>  
                </select> <i class="iconfont icon-arrow-down"></i>
              </li>
              <li><select v-model="moneyselected" @change="changeSelect">  
                  <option v-for="(option,index) in moneys"  v-bind:value="option.pro_money" :key="index">  
                    {{ option.pro_money_name }}  
                  </option>  
                </select> <i class="iconfont icon-arrow-down"></i>
              </li>
              <li><select v-model="timeselected" @change="changeSelect">  
                  <option v-for="(option,index) in times" v-bind:value="option.pro_time" :key="index">  
                    {{ option.pro_time_name }}  
                  </option>  
                </select> <i class="iconfont icon-arrow-down"></i>
              </li>
            <!--   <li><select v-model="typeselected" @change="changeSelect">  
                  <option v-for="(option,index) in types" v-bind:value="option.pro_type" :key="index">  
                    {{ option.pro_type_name }}  
                  </option>  
                </select> <i class="iconfont icon-arrow-down"></i>
              </li> -->
            </ul>
      </div>
			<mt-tab-container v-model="active" :swipeable="false" class="fix-on-content" >
				<mt-tab-container-item id="sq_content">
          <div style="height:100%;overflow: scroll;">
					<mt-loadmore :top-method="grLoadTop"  :bottom-method="grLoadBottom"   ref="grLoadmore"
              :bottom-all-loaded="allLoaded" :auto-fill="false"  topPullText="↓下拉刷新"    topLoadingText="刷新中 ..." 
               topDropText="↑释放更新" :topDistance="50">
					<div class="mui-content">
						<ul class="rm-eanking-list ">
							<li v-for="(item,index) in gr" :key="++index" class="jinli clearfix" >
								<router-link :to="{path:'/credit/person-detail',query:{id:item.id}}">
								<div class="fr sec-one" >
									<div class="tj-name c-333">
										<span class="h3">{{item.nickname}}</span><span @click="alertmsg">
										<img v-lazy="require('@/assets/images/level_'+item.level+'.png')"  :onerror='defaultImg'  class='levelimg'></span>
									</div>
									<p class="tj-desc one-1 c-888">{{item.pro_type}}</p>
									<p class="tj-desc one-1 c-888">贷款期限：{{item.pro_time}}</p>
									<div class="rm-money c-ff6800">{{item.pro_money}}</div>
								</div>
								<div class="sec-con fl">
									<div class="tj-head"><img v-lazy="imgUrl+item.head_img" alt="" :onerror='defaultImg' ></div>
									<div class="tj-hot"><i class="iconfont icon-huore c-ff6800"></i><span class="c-888">{{item.click}}点击</span></div>
								</div>
								</router-link>
							</li>
						</ul>
					</div>	
					</mt-loadmore>
          </div>
				</mt-tab-container-item>
				<mt-tab-container-item id="sh_content">
          <div style="height:100%;overflow: scroll;">
					<mt-loadmore :top-method="gsLoadTop"  :bottom-method="gsLoadBottom"   ref="gsLoadmore"
              :bottom-all-loaded="allLoaded" :auto-fill="false"  topPullText="↓下拉刷新"    topLoadingText="刷新中 ..." 
               topDropText="↑释放更新" :topDistance="50">
					<div class="mui-content">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell mui-media" v-for="(n,index) in gs" :key="index">
								<router-link to="/credit/credit-detail">
									<img class="mui-media-object mui-pull-left" v-lazy="imgUrl+n.src" :onerror='defaultImg'>
									<div class="mui-media-body">
										{{n.name}}
										<p class="mui-ellipsis">{{n.hot}}人已申请</p>
										<i class="iconfont icon-youjiantou"></i>
									</div>
								</router-link>
								<div class="mui-table">
											<div class="mui-table-cell mui-col-xs-5">
												<h4>{{n.je}}</h4>
												<p>申请金额</p>
											</div>
											<div class="mui-table-cell mui-col-xs-4 mui-text-left">
												<h5>{{n.time}}</h5>
												<p>放款时间</p>
											</div>
											<div class="mui-table-cell mui-col-xs-3">
												<h5>{{n.lv}}</h5>
												<p>参考日利率</p>
											</div>
								</div>
							</li>
			
						</ul>
					</div>	
					</mt-loadmore>
           </div>
				</mt-tab-container-item>
				<mt-tab-container-item id="all_content">
          <div style="height:100%;overflow: scroll;">
					<mt-loadmore :top-method="rmLoadTop"  :bottom-method="rmLoadBottom"   ref="rmLoadmore"
              :bottom-all-loaded="allLoaded" :auto-fill="false"  topPullText="↓下拉刷新"    topLoadingText="刷新中 ..." 
               topDropText="↑释放更新" :topDistance="50">
					<div class="mui-content">
						<ul class="rm-eanking-list">
								<li v-for="(item,index) in rm" :key="++index" class="jinli clearfix">
                <router-link :to="{path:'/credit/person-detail',query:{id:item.id}}">
                  <div class="sec-con fl">
                    <div class="tj-head "><img  v-lazy="imgUrl+item.head_img"  alt=""  :onerror='defaultImg'></div>
                    <div class="tj-hot"><i class="iconfont icon-huore c-ff6800"></i><span class="c-888">{{item.click}}点击</span></div>
                  </div>
		            
                <div class="fr sec-one">
									<h3 class="tj-name c-333"><span>{{item.nickname}}</span><span @click="alertmsg"><img :src="item" alt=""></span></h3>
									<p class="tj-desc one-1 c-888">{{item.pro_type}}</p>
									<p class="tj-desc one-1 c-888">贷款期限：{{item.pro_time}}</p>
									<div class="rm-money c-ff6800">{{item.pro_money}}</div>
								</div>
                </router-link>
							</li>
						</ul>
					</div>	
					</mt-loadmore>
          </div>
				</mt-tab-container-item>
			</mt-tab-container>
				<div class="alert" v-show="alert" @click="hidemsg">
						<div class="alert-content">
							<div class="top-list">
							等级介绍<br><span>最专业的服务,最贴心的态度</span>
							</div>
							<div class="content" @click="hidemsgs(ev)">
								<ul class="mui-table-view">
									<li class=" mui-media" v-for="(item,index) in alertimg" :key="index" >
									<img :src="item.src" alt="">
									<div class="list-con mui-ellipsis">{{item.icon}}</div>
									</li>
									
								</ul>
							</div>
						</div>	
					</div>
					    <mt-popup v-model="popupVisible" modal="true" position="top">{{reloadState}}</mt-popup>

	</div>
</template>
<script>
import iHeader from "@/components/header/header-r.vue";
import { TabContainer, TabContainerItem, LoadMore, Popup } from "mint-ui";
import {Tab, TabItem,XHeader} from 'vux';
import "@/assets/css/main.css";
export default {
  name: "credit-loan",
  components: {
    iHeader,
    TabContainer,
    TabContainerItem,
    Popup,
    LoadMore,
    Tab,
    TabItem,
    XHeader
  },
  data() {
    return {
      users: localStorage.getItem("users")
        ? JSON.parse(localStorage.getItem("users"))
        : "",
      msg: "这个是信用贷页面",
      title: this.$route.query.name,
      arrow: true,
      alert: false,
      active: "sq_content",
      defaultImg: 'this.src="' + require('@/assets/images/head.png') + '"',
      alertimg: [
        {
          src: require("@/assets/images/my/alert-icon3.png"),
          icon: "态度热情，专业能力很强，细致耐心。"
        },
        {
          src: require("@/assets/images/my/alert-icon2.png"),
          icon: "专业能力极强，客户一致好评，值得信赖。"
        },
        {
          src: require("@/assets/images/my/alert-icon1.png"),
          icon: "最靠谱最贴心的伙伴，好评如潮，值得亲睐。"
        }
      ],
      rm: [],
      gr: [],
      gs: [],
      cityselected: 0,
      cities: [],
      timeselected: 0,
      times: [],
      moneyselected: 0,
      moneys: [],
      typeselected: 0,
      types: [],
      page: 1,
      popupVisible: false,
      allLoaded: false,
      reloadState:'',
      getBarWidth: function (index) {
        return (index + 1) * 22 + 'px'
      }
    };
  },
  methods: {
    post_handle(){
      if(this.users.is_manager==1){
        this.$router.push('/loan/push-product');
      }else{
        mui.toast("请先注册客户经理")
      }
      
    },
    tabBtnClick(type) {
      this.active = type;
      if (type == "sq_content") {
        this.getlenders();
        return false;
      } else if (type == "all_content") {
        this.gethot();
        return false;
      } else if (type == "sh_content") {
        $('#loan').css('background','#fff');
        this.getgs();
        return false;
      }
    },
    hidemsg: function() {
      this.alert = false;
    },
    hidemsgs: function(ev) {
      ev.preventDefault();
      this.alert = true;
    },
    alertmsg(ev) {
      ev = ev || window.event;
      ev.preventDefault();
      this.alert = true;
    },
    changeSelect() {
      this.$axios.post(
          "/api/Product/product_list",
          `data=${JSON.stringify({
            type:"LENDERS",
            page: this.page,
            city: this.cityselected,
            pro_time: this.timeselected,
            pro_money: this.moneyselected,
            pro_type: this.$route.query.id
          })}`
        )
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.gr = res.data.list;
          }
        })
        .catch(err => {
          throw err;
        });

      this.$axios.post(
          "/api/Product/product_list",
          `data=${JSON.stringify({
            type:"COMPANY",
            page: this.page,
            city: this.cityselected,
            pro_time: this.timeselected,
            pro_money: this.moneyselected,
            pro_type: this.$route.query.id
          })}`
        )
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.gs = res.data.list;
          }
        })
        .catch(err => {
          throw err;
        });

      this.$axios.post(
          "/api/Product/product_list",
          `data=${JSON.stringify({
            type: "HOT",
            page: this.page,
            city: this.cityselected,
            pro_time: this.timeselected,
            pro_money: this.moneyselected,
            pro_type:this.$route.query.id
          })}`
        )
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.rm = res.data.list;
          }
        })
        .catch(err => {
          throw err;
        });
    },
    getlenders() {
      //   个人产品
      this.$axios.post("/api/Product/product_list",`data=${JSON.stringify({type: "LENDERS",pro_type:this.$route.query.id,page: this.page})}`).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.gr=res.data.list;
            this.gr = { ...this.gr, ...res.data.list };
            this.$nextTick(function() {
              const _this = this;
              let getlength = res.data.list.length;
              if (getlength <= res.data.pageSize) {
                $(".mint-loadmore-bottom").text("暂无更多数据");
                // this.$refs.khLoadmore.onBottomLoaded();
                this.allLoaded = true;
              }
              if (this.page > 1) {
                setTimeout(() => {
                  _this.popupVisible = true;
                  _this.reloadState = "加载成功";
                  _this.$refs.grLoadmore.onBottomLoaded();
                }, 1000);
                setTimeout(() => {
                  _this.popupVisible = false;
                }, 2000);
              } else {
                setTimeout(() => {
                  _this.popupVisible = true;
                  _this.reloadState = "刷新成功";
                  _this.$refs.grLoadmore.onTopLoaded();
                }, 1000);
                setTimeout(() => {
                  _this.popupVisible = false;
                }, 2000);
              }
            });
          }
        })
        .catch(err => {
          throw err;
        });
    },
    gethot() {
      //   热门产品
      /* this.$axios.post('/api/Product/product_list',`data=${JSON.stringify({
					type:'HOT',
					page:this.page,
				})}`).then((res)=>{
					console.log(res)
					if(res.code==200){
						this.rm=res.data.list
					}
				}).catch((err)=>{throw err}); */
      //   个人产品
      this.$axios.post(
          "/api/Product/product_list",
          `data=${JSON.stringify({
            type: "HOT",
            pro_type:this.$route.query.id,
            page: this.page
          })}`
        )
        .then(res => {
          // console.log(res)
          if (res.code == 200) {
            this.rm = { ...this.rm, ...res.data.list };
            this.$nextTick(function() {
              let getlength = res.data.list.length;
              if (getlength <= res.data.pageSize) {
                $(".mint-loadmore-bottom").text("暂无更多数据");
                this.allLoaded = true;
              }
              if (this.page > 1) {
                setTimeout(() => {
                  this.popupVisible = true;
                  this.reloadState = "加载成功";
                  this.$refs.rmLoadmore.onBottomLoaded();
                }, 1000);
                setTimeout(() => {
                  this.popupVisible = false;
                }, 2000);
              } else {
                setTimeout(() => {
                  this.popupVisible = true;
                  this.reloadState = "刷新成功";
                  this.$refs.rmLoadmore.onTopLoaded();
                }, 1000);
                setTimeout(() => {
                  this.popupVisible = false;
                }, 2000);
              }
            });
          }
        })
        .catch(err => {
          throw err;
        });
    },
    getgs() {

      //   公司产品
      this.$axios.post(
          "/api/Product/product_list",
          `data=${JSON.stringify({
            type: "COMPANY",
            pro_type:this.$route.query.id,
            page: this.page
          })}`
        )
        .then(res => {
          // console.log(res)
          if (res.code == 200) {
            this.gs = { ...this.gs, ...res.data.list };
            this.$nextTick(function() {
              let getlength = res.data.list.length;
              if (getlength <= res.data.pageSize) {
                $(".mint-loadmore-bottom").text("暂无更多数据");
                this.allLoaded = true;
              }
              if (this.page > 1) {
                setTimeout(() => {
                  this.popupVisible = true;
                  this.reloadState = "加载成功";
                  this.$refs.rmLoadmore.onBottomLoaded();
                }, 1000);
                setTimeout(() => {
                  this.popupVisible = false;
                }, 2000);
              } else {
                setTimeout(() => {
                  this.popupVisible = true;
                  this.reloadState = "刷新成功";
                  this.$refs.rmLoadmore.onTopLoaded();
                }, 1000);
                setTimeout(() => {
                  this.popupVisible = false;
                }, 2000);
              }
            });
          }
        })
        .catch(err => {
          throw err;
        });
    },
    grLoadTop() {
      this.page = 1;
      this.getlenders();
    },
    grLoadBottom() {
      this.page++;
      this.getlenders();
    },
    gsLoadTop() {
      this.page = 1;
      // this.getlenders();
    },
    gsLoadBottom() {
      this.page++;
      // this.getlenders();
    },
    rmLoadTop() {
      this.page = 1;
      this.gethot();
    },
    rmLoadBottom() {
      this.page++;
      this.gethot();
    }
  },
  computed:{
    //   ft_gr(){
    //     let grfilter=this.gr.filter(v=>v.pro_type==this.$route.query.id)
    //     return grfilter;
    //  }   
  },
  created() {
    this.getlenders();

    //   公司产品
    /*    this.$axios.post('/api/Product/product_list',`data=${JSON.stringify({
		  type:'COMPANY',
		  page:1,
	  })}`).then((res)=>{
		  console.log(res)
		  if(res.code==200){
			  this.gs=res.data.list
		  }
	  }).catch((err)=>{throw err}); */
  },
  mounted() {
    //  Vue.nextTick()
        var screen_h = document.documentElement.clientHeight;
        //  通过window的onresize事件监控虚拟键盘的弹起过程
        window.onresize = function () {
          var cur_h = document.documentElement.clientHeight;
              //  过当前页面高度和全局的初始高度比较判断键盘是否在弹起或者消失的过程中
                if (screen_h === cur_h) {
                  $(".main").css('bottom','56px');
                  $('.tabbar').css('display','block');
                }else{
                  $(".main").css('bottom','0');
                  $('.tabbar').css('display','none');
                }
        };
  },
  beforeCreate() {
    this.$axios
      .post("/api/Product/get_product_map")
      .then(res => {
        if (res.code == 200) {
          console.log(res);
          this.cities = res.data.city;
          this.cities.unshift({ city: 0, city_name: "请选择城市" });
          this.moneys = res.data.money;
          this.moneys.unshift({ pro_money: 0, pro_money_name: "金额" });
          this.times = res.data.time;
          this.times.unshift({ pro_time: 0, pro_time_name: "期限" });
          this.types = res.data.type;
          this.types.unshift({ pro_type: 0, pro_type_name: "筛选" });
        } else if (res.code == 999) {
          Toast(res.msg);
        }
      })
      .catch(err => {
        throw err;
      });
  }
};
</script>

<style scoped lang="less">
// #order{background: #f0f0f0;width: 100%;position: fixed;top:0;bottom:55px;overflow-y: auto;}
.mui-table-view:after{background:transparent;}
@l:left;
@gray:#555;
@lit:#d1d1d1;
@ora:#469dc8;
.h(@h){height:@h}
.c(@h){color:@h}
.lh(@h){line-height:@h}
.w(@h){width:@h}
.mt(@mt){margin-top:@mt}
.mr(@mr){margin-right:@mr}
.fz(@f){font-size: @f}
.fl(@f){float:@f}
.p(@p){padding: @p}
.bg(@b){background:@b}
.fw(@w){font-weight:@w}
	#order{.h(100%)}
	.main{position: relative;
			ul.main-content-top{position:fixed;left: 0;top: 70px;z-index: 10;}
	}
	.main-content-top{
		.w(100%);.p(0 2%);.bg(#fff);
		li{.fl(@l);.w(33.33%);text-align: center;padding: 10px 0;color:@gray;}
		li.active{color: #469dc8;border-bottom: 2px solid @ora;}
	}
	.mui-media-body{position: relative;
		i.iconfont{position: absolute;top:50%;right: 0;transform:translateY(-50%);font-size: 20px;color:@lit;}
	}
	.mint-tab-container{width:100%; }
	.mui-table-view-cell{padding-top:20px;}
	.select-choice{
    // width: 100%;border-top: 1px solid @lit;position: fixed;top: 113px;z-index: 10;height: 53px;padding: 0 15px 0 0;
    // background: #fff;
    li{position: relative;width:25%;float:left;.mt(-1px);
    select{width: 100%;/* direction: rtl; */text-align:center;height: 100%;padding: 0;display: block;height: 53px;padding-right: 12px;}i{position: absolute;right:0px;top:15px;font-size: 12px;
    color: #999;}
		}
	}
	.mui-table{.p(10px 0);
				.mui-table-cell{h4{.fz(18px);.lh(30px);.c(@ora);.fw(400)}h5{.fz(17px);.lh(30px);.c(@ora)}button{border-radius: 30px;.p(7px 20px);
						   /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#6fc6f1+0,469dc8+100,469dc8+100,2989d8+100,469dc8+100 */
						background: #6fc6f1; /* Old browsers */
						background: -moz-linear-gradient(left,  #6fc6f1 0%, #469dc8 100%, #469dc8 100%, #2989d8 100%, #469dc8 100%); /* FF3.6-15 */
						background: -webkit-linear-gradient(left,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* Chrome10-25,Safari5.1-6 */
						background: linear-gradient(to right,  #6fc6f1 0%,#469dc8 100%,#469dc8 100%,#2989d8 100%,#469dc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
						filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6fc6f1', endColorstr='#469dc8',GradientType=1 ); /* IE6-9 */
						}
					} 
	}
	.mui-content > .mui-table-view:first-child{margin-top: 57px;}
	//热门
	.rm-eanking{padding-top:15px;}
	.rm-eanking-list{.bg(#fff);}
	.rm-eanking-list li{margin-left: 15px;border-bottom: 1px solid #eee;padding:20px 0;padding-right: 15px;}
	.rm-eanking-list li:last-child,.drgl-list li:last-child{border:none;}
	// .jinli>a div:first-child{width:100%;display: inline-block;}
	.jinli>a .sec-con{width:120px;position: absolute;left: 0;top:0;}
	.jinli>a{display: block;position: relative;}
	.rm-eanking-list p{margin-bottom: 0;}
	.rm-eanking-list .tj-name{margin:15px 0;margin-top: 18px;}
	.rm-eanking-list  .tj-head{margin:0;}
	.rm-money{font-size:25px;padding-top: 15px;}
	.rm-eanking-list li div:last-child .rm-paiming{width: 30px;text-align: center;position: relative;height: 22px;margin:0 auto;}
	.rm-paiming i{font-size: 30px;}
	.rm-paiming i span{font-size: 12px;color: #fff;position: absolute;left:0;top:0;right:0;padding-top: 4px;}
	.tj-head{margin: 15px 0;text-align: center;}
	.tj-head img{width: 90px;height: 90px;border-radius: 50%;}
	.tj-hot{text-align: center;}

	.alert{background:rgba(0,0,0,.4);position: fixed;left:0;right:0;top:0;bottom:0;z-index:99999999;
	.alert-content{position: absolute;height: 405px;margin: 0 auto;background: #fff;left:32px;right:32px;top:14%;border-radius:10px;
	.top-list{height:88px;border-radius:10px 10px 0 0;padding-top:18px;font-size:21px;line-height:31px;color:#fff;text-align:center;/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#c09044+0,dab580+100 */
	background: #c09044; /* Old browsers */
	background: -moz-linear-gradient(left,  #c09044 0%, #dab580 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(left,  #c09044 0%,#dab580 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to right,  #c09044 0%,#dab580 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c09044', endColorstr='#dab580',GradientType=1 ); /* IE6-9 */
	span{font-size: 12px;line-height:20px;display: block;}}
	ul{padding: 26px 18px 0;}
	li{border: 1px solid #f0f0f0;border-radius:10px;padding: 10px 0 10px 18px;color:#b5b5b5;margin-bottom:16px;img{margin-bottom:2px;}.list-con{font-size: 10px;line-height: 20px;height: 20px;}}}}
	@media screen and (max-width:350px){
		.alert .alert-content li{padding:5px}.alert .alert-content{height:377px;}
	}
	.h3{font-size: 24px;}
	.mui-table-cell p{font-size: 11px;}
	.tj-name img{margin-left: 8px;}
	.jinli .tj-head{margin-top:25px;}
	.levelimg{position: relative;top: 3px;}
	#creditloan .mint-popup {height: 30px;line-height: 30px;background: rgba(0,0,0,.6);width: auto;text-align: center;opacity: 1;top: 50%;color: #fff;padding: 0 10px;border-radius: 4px;}
  .jinli .sec-one{width:180px; float:right; }
  .select-choice li select{    direction: rtl;padding-right: 22px;}
</style>
<style>
#creditloan .mint-popup {
  height: 70px;
  line-height: 84px;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  text-align: center;
  opacity: 1;
  color: #fff;
}
#loan .mint-popup-top {
  z-index: 999 !important;
}
#creditloan .v-modal {
  background: transparent;
}
#creditloan .mint-tab-container-wrap {
  border-top: 1px solid #f0f0f0;     background-color: #fff;
}
#creditloan .mint-loadmore-content {
 height: 100%;
}
.loan-top-wrap {top:67px;height: 100px; position: fixed; background: #f0f0f0;width: 100%;z-index: 100;}
.vux-tab-ink-bar{height:2px !important;}
.vux-tab .vux-tab-item{font-size:14px; }
.fix-on-content{padding-top:100px;background: #f0f0f0;width: 100%;overflow-y: auto;}
#creditloan .vux-header {position: fixed; top:0px; width: 100%;}
#creditloan .mint-tab-container-wrap,#creditloan  .mint-loadmore{ height:100%;overflow-y: auto; }
#creditloan .mint-tab-container{    height: 100%;display: block;}
.select-choice{display:flex;}
.select-choice>li{flex: 1;}
#creditloan .vux-tab{display:block;}
#creditloan .vux-tab>div{width:33.3%;float:left;}
.mint-loadmore-bottom{margin-bottom: 0px;position: absolute;bottom: -50px;text-align: center;width: 100%; display: none;}
.mui-table-view {
    position: inherit;}
</style>
