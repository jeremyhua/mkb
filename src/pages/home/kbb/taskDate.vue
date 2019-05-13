<template>
    <div id="taskDate">
        <x-header title="任务日期" :left-options="{backText:''}" >
            <span slot="right" @click="chooseAll(dates)">{{chooseTxt}}</span>
        </x-header>
        <div class="fixed-content">
            <div class="date-bg">
                <grid v-if="dates.length>0" :cols="7" class="grid-date">
                    <grid-item  v-for="(item,i) in dates" :key="i">
                        <span class="grid-center" :class="{checked: value.indexOf(item)>-1}" @click="check(item)"><i>{{getDate(item)}}</i><i class="xjshe">/{{getDateM(item)}}</i></span>
                    </grid-item>
                </grid>
            </div>
            <div class="circle"></div>
            <div class="choose-box">
                <p class="title"><span class="iconfont icon-richeng"></span>  已设定日期</p>
                <span class="choosed" v-for="(val,k) in value" :key="k">{{getDate(val)}}</span>
            </div>
            <box gap="15px 15px">
                <x-button  @click.native="confirm" type="primary">确定</x-button>
            </box>
        </div>
    </div>
</template>

<script>
import { XHeader, Grid, GridItem, XButton, Box  } from 'vux'


export default {
    name: "taskDate",
    data() {
        return {
            start:this.$route.query.start,
            end:this.$route.query.end,
            dates:[],
            value:this.$route.query.value && JSON.parse(this.$route.query.value) || [],
            chooseTxt:'全选'
        }

    },
    components: {
        XHeader, Grid, GridItem, XButton, Box
    },
    created() {
        this.dates = this.rangeArray(this.start,this.end)
        console.log(this.dates,'created')
    },
    mounted() {
        console.log(this.value,"mounted")
        /* 
        diff 11-14 包含14 有三天
        let bool = this.$moment('2017/12/14').diff(this.$moment('2017/12/11'),'d')
        console.log(bool)  //3
        */
    },
    methods: {
        rangeArray(start,end){
            let days = this.dayDiff(start,end);
            let _start = this.$moment(start);  //.subtract(1,'d')
            return Array(days-1).fill(0).map( v=> _start.add(1, 'days').format('YYYY/MM/DD'))
        },
        check(val){
            if(this.value.indexOf(val)>-1){
                this.value = this.value.filter(v=>v!==val)
            }else{
                this.value.push(val)
            }
        },
        chooseAll(arr){
            if(this.value.length==this.dates.length){
                this.value = [];
                this.chooseTxt = '全选';
            }else{
                this.value = this.dates;
                this.chooseTxt = '全不选';
            }
        },
        confirm(){
            if(this.value.length<1) return mui.toast('请选择日期');
            let query = this.$route.query;
            query['value'] = JSON.stringify(this.value);
            console.log(query)
            this.$router.replace({path: '/kbb/newTask',query})
        },
        dayDiff(a,b){
            console.log(a,b)
            return this.$moment(b).diff(this.$moment(a),'days')  //.subtract(1,'d')
        },
        getDate(dateString){
            if(!dateString) return ;
            return dateString.split('/')[2]
        },
        getDateM(dateString){
            if(!dateString) return ;
            return dateString.split('/')[1]
        }
    },
    watch: {
        
    }
}
</script>

<style scoped>
    #taskDate{width: 100%;height: 100%;background-color: #fff;}
    .date-bg{padding-top: 50px;background-color: #469dc8;padding-bottom: 50px;}
    .grid-center{display: block;width: 40px;height:100%;text-align: center;color: #fff;border-radius: 100%;margin: 0 auto;}
    .grid-center.checked{background-color:  #ffab71;}
    .weui-grid{padding: 0;height: 40px;line-height: 40px;text-align: center;}
    .choose-box{background-color: #fff;position: relative;margin-top: -40px;width: 90%;margin-left: 5%;min-height: 100px;padding:10px 10px;box-sizing: border-box;box-shadow: 0 3px 4px #ddd;}
    .choose-box span.choosed{display: inline-block;width: 26px;height: 26px;text-align: center;line-height: 26px;border-radius: 100%;background-color:#ffab71;color: #fff;margin-right: 5px;font-size: 14px;}
    .xjshe{ font-size: 12px;}
    .circle{width: 100%;height: 20px;border-radius: 100%;width: 100%;height: 60px;border-radius: 100%;margin-top: -30px;background: #ff8c3c;}
</style>

<style lang="css">
    #taskDate .weui-grid:after{border:none !important;}
    #taskDate .weui-grids:before{border:none !important; }
    #taskDate .weui-grids:after{border:none !important; }
    #taskDate .weui-grid:before{border:none !important; }
    #taskDate  .vux-header .vux-header-right { right: 15px;top: 34px;}
    button{padding: 0;}

</style>


