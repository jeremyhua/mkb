<template>
    <div id="more-hot">
              <x-header :left-options="{backText:''}">每周热门排行</x-header>  
    <!--         <div class="flex tj-title m-zy15">
                <div>每周热门排行</div>
            </div> -->
            <ul class="rm-eanking-list">
					<li v-if="rm.length>0" v-for="(item,index) in rm" :key="++index" class="flex">
						<div>
							<router-link :to="{path:'/credit/person-detail',query:{id:item.id}}">
							<h3 class="tj-name c-333"><span>{{item.nickname}}</span>
							<img  :src="(item.level=='3'?level[3]:level=='2'?level[2]:level=='1'?level[1]:level=='0'?level[0]:'')" v-if="level" alt=""></h3>
							<p class="tj-desc one-1 c-888">{{item.pro_type}}</p>
							<p class="tj-desc one-1 c-888">贷款期限：{{item.pro_time}}</p>
							<div class="rm-money c-ff6800">{{item.pro_money}}</div>
							</router-link>
						</div>
						<div>
							<div class="rm-paiming"><i class="iconfont icon-huangguan-copy" :class="index==1?'c-ffb900':index==2?'c-ff6800':index==3?'c-957dfd':index==4?'c-A47450':'c-888'"><span>{{index}}</span></i></div>
							<div class="tj-head c-ter lazy-c "><img v-lazy="imgUrl+item.head_img" alt=""></div>
							<div class="tj-hot"><i class="iconfont icon-huore c-ff6800"></i><span class="c-888">{{item.week_click||0}}点击</span></div>
						</div>
					</li>
					<li v-if="rm.length==0" style="text-align:center;">
						<img :src="require('@/assets/images/nodata.png')" width="196" style="margin-top:30px;">
					</li>
				</ul>
    </div>
</template>
<script>
    import {XHeader} from 'vux'
    export default{
        data(){
            return{
                 rm:[],
                 is_r:true,
                 title:'每周热门排行',
            }
        },
        methods:{
            getlist(){
                this.$axios.post("/api/Lenders/get_start_lenders")
                .then((results) => {
                    if(results.code==200 && results.data.list.length>0){
                        this.rm = results.data.list
                    }else{
                        Toast(results.msg)
                    }
                });
            }
               
        },
        created(){
           this.getlist();
        },
        components:{
            XHeader
        }
    }

</script>

<style scoped>
    /* #more-hot{background: #f0f0f0;width: 100%;position: fixed;top:0;bottom:55px;overflow-y: auto;} */
    .rm-eanking-list{background:#fff;}
	.rm-eanking-list li{margin-left: 15px;border-bottom: 1px solid #eee;padding:20px 0;padding-right: 15px;}
	.rm-eanking-list li:last-child,.drgl-list li:last-child{border:none;}
	.rm-eanking-list li div:first-child{-webkit-box-flex: 1;-webkit-flex:1;flex:1;-webkit-flex:1;flex:1;}
	.rm-eanking-list li div:last-child{width:100px;}
	.rm-eanking-list p{margin-bottom: 0;}
	.rm-eanking-list .tj-name{margin:15px 0;margin-top: 18px;}
	.rm-eanking-list  .tj-head{margin:0;}
	.rm-eanking-list li div .rm-money{font-size:25px;padding-top: 15px;width:auto;}
	.rm-eanking-list li div:last-child .rm-paiming{width: 30px;text-align: center;position: relative;height: 22px;margin:0 auto;}
    .tj-title{justify-content:space-between;}
	.tj-title div:first-child{border-left:5px solid #469dc8;height: 20px;padding-left: 10px;line-height: 20px;font-size:16px;}
	.tj-title div:nth-child(2){-webkit-box-flex: 2;-webkit-flex:2;flex:2;margin-top: -3px;padding-left: 10px;font-size: 14px;}
	.tj-title div:nth-child(2) span{display: inline-block;border:1px solid #ddd;height: 25px;line-height: 25px;padding:0 1px;border-radius: 3px;}
    #more-hot{padding-top:70px;background: #fff;height: 100%;}
    img{max-width: 90%;}
    .rm-paiming i{font-size: 30px;}
    .rm-paiming i span{font-size: 12px;color: #fff;position: absolute;left: 0;top: 0;right: 0;padding-top: 4px;}
    .tj-head img{border-radius:50%;    width: 90px;height: 90px;}
</style>
