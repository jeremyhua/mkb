<template>
    <div id="newTask">
        <x-header class="fixed-top" title="还款" :left-options="{preventGoBack: true,backText: ''}" @on-click-back="backwrad"></x-header>
        <div class="fixed-content">
            <group>
                <!-- <cell title="任务类型" >                
                    <span class="repay_hk" @click="checked=!checked" :class="{arrow_active:checked}">还款</span>
                    <span class="consume"  @click="type='consume'"  :class="{arrow_active:type==='consume'}">消费</span>
                </cell> -->
                <!-- <cell title="任务日期" :value="runDay" is-link @click.native="chooseDate" ></cell> -->
                <x-textarea title="选择还款日期" :value="runDay" :readonly="true" class="mytextArea" :height='24' is-link @click.native="chooseDate" :show-counter="false" :rows="1" autosize></x-textarea>
                <x-input v-model="totalMoney" text-align="right" placeholder-align="right" type='number' title="还款金额" placeholder="请输入还款金额" ></x-input>

                <!-- <cell title="预留方案" >                
                    <span class="repay_hk" @click="type='1'" :class="{arrow_active:type=='1'}">刷二还二</span>
                    <span class="consume"  @click="type='2'"  :class="{arrow_active:type=='2'}">刷二还一</span>
                </cell> -->


                 <cell title="还款通道" :value="choosedBank.name||choosedBank" is-link @click.native="chooseBank"></cell>
            </group>
            <div class="plan">
                <flexbox>
                    <flexbox-item>
                        <x-button type="primary" :disabled="generateBtn" @click.native="generate">生成计划列表</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button type="primary" :disabled="runBtn" @click.native="run">执行当前计划</x-button>
                    </flexbox-item>
                </flexbox>
                <div class="tishix">
                1.账单金额不能低于2000且账单金额必须为100的整数倍。<br/>
                2.单笔消费不能低于100（若账单计划生成失败请重新选择天数）。
                </div>
            </div>

            <div class="table_cont">
                <p class="plan_title">计划预览如下</p>
                <table border="1">
                    <thead>
                        <th v-for="(item,index) in titleData" :key="index">{{item}}</th>
                    </thead>
                    <tbody>
                        <tr v-if="tlist.length" v-for="(v,k) in tlist" :key="k">
                            <td>{{k+1}}</td>
                            <td>{{v.chtime}}</td>
                            <td>{{v.type==1?'消费':'还款'}}</td>
                            <td>{{v.money}}</td>
                        </tr>              
                    </tbody>
                </table>
            </div> 
        </div>   
        <loading :show="loading" text="生成中..."></loading>     


        <div v-transfer-dom>
            <x-dialog v-model="showScrollBox" class="dialog-demo" :dialog-style="{height: '200px'}">
                <p class="dialog-title" style="padding:5% 0;">请选择通道</p>
                <group class="banklist">     
                    <cell  v-for="(item,index) in bankList" @click.native="choose(item)" :key="index">
                        <span>{{item.name}}</span>
                    </cell>
                </group>   
                <div @click="showScrollBox=false" style="padding:3% 0;">
                    <span class="vux-close"></span>
                </div>
            </x-dialog>
        </div>
    </div>
</template>

<script>
import { XHeader , Group , Cell , XButton , Flexbox, XDialog , TransferDomDirective as TransferDom, FlexboxItem,AlertPlugin,XInput,Loading,XTextarea } from 'vux'

export default {
    name: "newTask",
    data() {
        return {
            checked:true,   // consume
            type:'2',
            totalMoney:'',
            generateBtn:true,
            showScrollBox: false,
            bankList:[],
            choosedBank:'请选择通道',
            runBtn:true,
            titleData:['期数','时间','类别','金额'],
            tlist:[],
            runDay:'',
            taskDate:this.$route.query.value,
            bill_time:this.$route.query.bill_time,
            repay_time: this.$route.query.repay_time,
            credit_id:this.$route.query.credit_id,
            left:'',
            right:'',
            temp_id:'',
            bankCard:this.$route.query.bankCard,
            loading:false,
            total:'',
            minMoney:'',
            dMoney:'',
            sMoney:'',
            payNum:'',
            uuid:''
        }

    },
    directives: {
        TransferDom
    },
    components: {
        XHeader,Group,Cell,XButton,Flexbox,XDialog,FlexboxItem,XInput,Loading,XTextarea
    },
    created() {
        // console.log(this.$route.query.value)
       if(this.$route.query.value){
           this.runDay = JSON.parse(this.$route.query.value).map(v=>v.split('/')[2]).join(',')
       }else{
           this.runDay = '点击选择还款日期'
       }

       mui.plusReady(()=>{
                this.uuid = plus ? plus.device.uuid : '';
        });
    },
    mounted() { 
        //let bool = this.$moment('2017/12/14').isBetween(this.$moment('2017/12/12'), this.$moment('2017/12/14'))
        //console.log(bool)
    },
    methods: {
        chooseBank(){
            this.showScrollBox = true;
            if(this.bankList.length<1){
                this.$axios.post('/api/api/getRepayChannel')
                .then(res=>{
                    this.bankList = res.result;
                    //console.log(this.bankList)
                })
            }
        },
        choose(item){
            this.showScrollBox = false;
            this.choosedBank = item;
        },
        chooseDate(){
            if(!this.isTrueTime(this.bill_time,this.repay_time)) return mui.toast('请在账单日后，还款日前一天操作');
            let query = this.$route.query;
            query['start'] = this.$moment().format('YYYY/MM/DD');
            query['end']   = this.right.format('YYYY/MM/DD');
            console.log(query,'time')
            return this.$router.push({name: 'taskDate',query});
        },
        isTrueTime(bill_time, repay_time){
            //要求是 在账单日后包括当天 到 还款日前1天 添加任务  // isBetween 不包括边界值
            const now = this.$moment();
            const year = now.get('year');
            const month = now.get('month')+1;  // 0 to 11
            bill_time =  Number(bill_time);
            repay_time = Number(repay_time);
            console.log(bill_time,repay_time)
            this.left = this.$moment(`${year}/${month}/${bill_time}`);
            this.right = this.$moment(`${year}/${month}/${repay_time}`);

            let bool = false;
            console.log(this.left,this.right)
            if(bill_time<repay_time){  //账单日 还款日同一个月
                if(now.isBetween(this.left,this.right)) bool=true;
                else bool = false;
            }else{ //账单日 还款日不是同一个月
                // console.log(this.left)
                 this.right = this.right.subtract(-1,'months');
                 console.log(this.left,this.right)
                if(now.isBetween(this.left,this.right)) bool=true;
                else bool = false;
                console.log(bool); 
                bool = true;
            }
            return bool;
        },
        backwrad(){
            if(this.$route.query.value){
                this.$router.go(-2)
            }else{
                this.$router.go(-1)
            }
        },
        generate(){
            // console.log(this.$route.query.value)
            const keyname = this.choosedBank.keyname;
            if(!keyname) return mui.toast('请选择通道');
            const payload = {
                bankCard:this.bankCard,
                totalMoney:this.totalMoney,
                runDay:this.$route.query.value,
                keyname:keyname
                // pre_type:this.type,
            }
            this.loading = true;
            this.$axios.post('/api/api/produceProgram','data='+JSON.stringify(payload))
                .then(res=>{
                    // console.log(res)
                    if(res.code==1){
                         mui.toast(res.msg);
                        this.temp_id = res.result.temp_id+'/'+new Date();
                        this.tlist = res.result.data.list;
                        this.total = res.result.data.total;
                        this.dMoney = res.result.data.dMoney;
                        this.sMoney = res.result.data.sMoney;
                        this.minMoney = res.result.data.minMoney;
                        this.payNum = res.result.data.payNum;
                    }if(res.code=='-50'){
                        //跳转到第三方进行信用卡绑定   
                        mui.confirm("信用卡还款需要在第三方通道进行信用卡绑定，是否立即前往？","",["确认","取消"],(i)=>{
					        if(i.index==0){
                                const payload = {
                                }
                                this.$router.push({name:'cardThird',query:{payload,link:res.msg.url}});  
                            }
                        });
                    }else{
                        mui.toast(res.msg)
                    }
                    this.loading = false;
                })
        },
        run(){
            const payload = {
                bankCard:this.bankCard,
                uuid:this.uuid,
                temp_id: this.temp_id.split('/')[0]
            }
            const _this = this;
            const content = `<div class='con_fix'><span class='fl'>任务总额</span> <span class='fr'>${this.total}元</span></div>
                            <div class='con_fix'><span class='fl'>(任务总额+费用)×费率</span> <span class='fr'>${this.sMoney}元</span></div>
                            <div class='con_fix'><span class='fl'>消费金额服务费</span> <span class='fr disnone'>${this.dMoney}元</span></div>
                            <div class='con_fix disnone'><span class='fl'>银行代存</span> <span class='fr'>${this.payNum}元</span></div>
                            <div class='con_fix disnone'><span class='fl'>总服务费</span> <span class='fr'>${(Number(this.sMoney)+Number(this.dMoney)+Number(this.payNum)).toFixed(2)}元</span></div>
                            <div class='con_blue con_fix'><span class='fl'>最低预留额度</span> <span class='fr'>${this.minMoney}元</span></div>
                            <div class='con_fix tishi'><span class='fr'>重新生成计划可以改变预留额度</span></div>`;

            this.$vux.confirm.show({
                content:content,   
                confirmText:'去执行',
                cancelText:'再想想',                
                onCancel () {                  
                },
                onConfirm () {
                    _this.$axios.post('/api/api/executeProgram','data='+JSON.stringify(payload))
                    .then(res=>{
                        console.log(res.data)
                        mui.toast(res.msg)
                        if(res.code==1){
                            _this.$router.push({path:'/kbb/repay',query:{credit_id:_this.credit_id}})
                        }
                    })
                }
            }); 
           
        }
    },
    watch:{
        'taskDate'(){
            if(this.taskDate && this.totalMoney)  this.generateBtn=false;
            if(this.temp_id) this.runBtn=true;
        },
        'totalMoney'(){
            if(this.taskDate && this.totalMoney)  this.generateBtn=false;
            if(this.temp_id) this.runBtn=true;
        },
        'temp_id'(){
            if(this.temp_id) return this.runBtn=false;
        }
    }
}
</script>

<style scoped lang="less">
    #newTask{background:#fff;height:100%;}
    .fixed-content .weui-cell .weui-cell__ft span{padding:5px 25px;border:1px solid #ddd;font-size:14px;border-radius:4px;}
    .fixed-content .weui-cell .weui-cell__ft .arrow_active{border:1px solid #469dc8;color:#469dc8;background: url('../../../assets/images/pay/repay_07.png') no-repeat right bottom;background-size:15px 15px;}
    .fixed-content .weui-cell .weui-cell__ft .consume{margin-right:30px;}
    .fixed-content .weui-cell .weui-cell__ft .repay_hk{margin-right:10px;}
    .plan{height:150px;background-color: #f1f2f3;width: 100%;padding: 25px;}
    .plan .tishix {font-size: 12px;margin-top: 10px;}
    .plan button.weui-btn{width: 90%;font-size: 16px;}
    .plan .weui-btn:after{border:none;}
    .table_cont{padding: 0 15px;background: #fff;padding-bottom: 10px;}
    .table_cont table{width: 100%;text-align: center;border: 1px solid #ddd;border-top:2px solid #469dc8;}
    .table_cont table thead th{font-size: 14px;color: #333;padding: 5px}
    .table_cont table tbody tr td{padding: 5px;font-size: 14px;color: #999;}
    .plan_title{padding-top:10px;padding-bottom:15px;text-align:center;font-size:14px;color:#000;}
    .banklist{height: 300px;overflow-y: scroll;-webkit-overflow-scrolling: touch;}
    .weui-dialog{position: absolute;}
</style>
<style>
    .fl{float:left}.fr{float:right}
    #newTask input{border: none;margin-bottom:0;}
    button{padding:0;}
    #newTask .vux-confirm .vux-x-dialog .weui-dialog .weui-dialog__bd div{line-height: 1.6em;}
    div.con_fix{overflow: hidden;padding: 4px 0;color: #666;font-size: 14px; }
    div.con_blue{color: #469dc8;padding: 20px 0 0;}
    div.tishi{color: #f00;font-size: 10px;margin-top: 8px;}
    #newTask textarea.weui-textarea{padding: 0 !important;height: auto;margin-bottom: 0;text-align: right;}
    .disnone{ display: none;}
    .vux-label{ color: #000;}
</style>   