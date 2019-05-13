<template>
	<div id="click" class="wrap bg-f0">
    <x-header :left-options="{backText: ''}" :title="title">点击率购买</x-header>  
		<div class="click-main">
			<div class="top-content">
				<img :src="top.src" class="bg" alt="">
				<div class="top-con clearfix">
					<div class="mui-pull-left"><span class="num">{{data.week_click}}</span><span class="spll">本周点击率<i class="iconfont icon-zengchang"></i></span></div>
					<div class="mui-pull-right"><img :src="top.range" alt=""><span>{{data.sort}}</span></div>
				</div>
			</div>	
			<ul class="mui-table-view table-view-one">
        <li class="list-li" style="border-bottom: #ccc solid 1px;">
							可用金豆
              <span class="mui-pull-right">{{loancenter.venosa}}</span>
				</li>

				<li class="list-li">
							购买数量<input type="text"  class="mui-pull-right buynum" placeholder="请输入购买数量" v-model="num" >
				</li>
				<li class="list-li-sec">
						<span class="mui-pull-right">本次需要支付金豆:<strong>{{num}}</strong></span>
				</li>
			
			</ul>
			<div class="table-view-three">
				<div class="top"><i class="iconfont icon-shuxian"></i>点击率购买说明</div>
				<ul>
					<li v-for="(item,index) in licon" :key="index">{{item.li}}</li>
				</ul>
			</div>
			<ul class=" table-view-bottom mui-text-center">
					<li class="clearfix kefu" @click="tobuy">确认购买 </li>
			</ul>
		</div>
	</div>
</template>

<script>
import {Toast} from "mint-ui"
import {XHeader} from "vux"

export default {
  name: "my",
  data() {
    return {
      users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '',
      loancenter:localStorage.getItem('loancenter')?JSON.parse(localStorage.getItem('loancenter')):'',
      is_r: true,	 
      title: "点击率购买",
      bgfff: "background:transparent",
      top: {
        src: require("@/assets/images/my/clickbg.png"),
        range: require("@/assets/images/my/range.png"),
        tel: require("@/assets/images/my/icon_03.png"),
        list: require("@/assets/images/my/icon_07.png"),
        list2: require("@/assets/images/my/icon_10.png")
      },
      licon: [
        { li: "① 兑换比例为1金豆=1点击率;" },
        { li: "② 每次兑换最多不得大于5000点击率；" },
        { li: "③ 兑换数量输入整数1的倍数。" }
      ],
      data:'',
      num:'',
      transparent:true
    };
  },
  components: {
    XHeader
  },
  methods:{
  	getlist(){
			this.$axios.post('/api/Lenders_product/product_detail',`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                product_id:this.$route.query.id,
                })}`).then((res)=>{
                if(res.code==200){
					      this.data=res.data;
					        // console.log(JSON.stringify(this.getlist))
                }else{
                    Toast(res.msg)
                }
            }).catch((err)=>{throw err});
    },
    tobuy(){
            // if(this.num%100!=0){
            //   Toast('请输入100倍数的点击率')
            //   return false;
            // }
      			this.$axios.post('/api/Lenders/lenders_buy_click',`data=${JSON.stringify({
                session_id:this.users.session_id,
                userId:this.users.userId,
                product_id:this.$route.query.id,
                click_num:this.num,
                })}`).then((res)=>{
                  if(res.code==200){
                    Toast('购买成功');
                    setTimeout(() => {
                      this.$router.push({path:'/my/my-product'})
                    }, 1000);
                  }else{
                      Toast(res.msg)
                  }
            }).catch((err)=>{throw err});
    }
  },
  created(){
    this.getlist();
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
.top-content {
  position: relative;
  height: 196px;
  background: #eeeeee;
  overflow: hidden;
  position: relative;
  img.bg {
    width: 100%;
    min-height: 196px;
    position: absolute;
  }
  .top-con {
    padding: 79px 12px 40px;
    color: #fff;
    z-index: 5;
    position: absolute;
    width: 100%;
    height: 196px;
    .mui-pull-left {
      .num {
        font-size: 39px;
        line-height: 60px;
        display: block;
      }
      .spll {
        i {
          font-size: 23px;
          line-height: 8px;
          position: relative;
          top: 4px;
        }
        font-size: 14px;
        line-height: 16px;
        color: #fff;
        display: block;
      }
    }
    .mui-pull-right {
      position: relative;
      margin-top: 15px;
      span {
        position: absolute;
        left: 50%;
        top: 4px;
        color: #469dc8;
        transform: translate3d(-50%, 0, 0);
        font-size: 13px;
      }
    }
  }
}
.table-view-one {
  li {
    padding: 0 19px 0 12px;
    height: 64px;
    line-height: 64px;
    color: #8f8f94;
    span {
      color: #373737;
    }
  }
  .list-li-sec {
    background: #f0f0f0;
    span {
      color: #999999;
      strong {
        color: #469dc8;
      }
    }
  }
}
.table-view-three {
  padding: 16px 11px;
  background: #fff;
  .top {
    line-height: 37px;
  }
  .icon-shuxian {
    color: #469dc8;
    font-size: 20px;
    position: relative;
    top: 3px;
  }
  ul {
    font-size: 12px;
    line-height: 30px;
    color: #a6a6a6;
    padding: 0 14px;
  }
}
.table-view-bottom {
  padding: 10px 26px;
  .kefu {
    width: 100%;
    height: 45px;
    line-height: 45px;
    color: #fff;
    background: #469dc8;
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#469dc8),
      to(#4097c2)
    );
    background: linear-gradient(to right, #469dc8 0%, #4097c2 100%);
  }
}
#click {
  background: #fff;
  .click-main{ background: #fff;}
}
.buynum{
    position: absolute;
    right: 0;
    width: 60%;
    height: 64px;
    text-align: right;
    border: none;
}
 input::-webkit-input-placeholder{
            color:#ddd;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#ddd;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#ddd;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#ddd;
        }
</style>