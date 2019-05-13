<template>
    <div id="seeProgram">
        <bheader title="还款" class="fixed-top"></bheader>

        <div class="fixed-con-lg">
            <div class="table_cont">
                <table border="1">
                    <thead>
                        <th v-for="(item,index) in tabData" :key="index">{{item}}</th>
                    </thead>
                    <tbody>
                        <tr v-if="listData.length>0" v-for="(item,index) in listData" :key="index">
                            <td>{{index+1}}</td>
                            <td>{{item.exechtime}}</td>
                            <td>{{item.type==1?'消费':'还款'}}</td>
                            <td>{{item.money/100}}</td>
                            <td :class="item.status==1?'c_jxz':item.status==2?'c_ywc':item.status==3?'c_end':'c_qx'">{{item.status==1?'执行中':item.status==2?'已完成':item.status==3?'已失败':'已取消'}}</td>
                        </tr>
                    </tbody>
                </table>
                <box gap="5px 10px" v-if="proStatus.status==1 || proStatus.status==2">
                    <x-button type="primary"  @click.native="endProgram">终止任务</x-button>
                </box>
              
            </div>
        </div>
    </div>
</template>

<script>
import { XButton, Box,Confirm,ConfirmPlugin,ToastPlugin } from 'vux'
import bheader from "@/components/header/header-b";
export default {
    name: "seeProgram",
    data() {
        return {
            pro_id: this.$route.query.pro_id,
            tabData:['期数','时间','类别','金额','状态'],
            listData:[],
            proStatus:[]
        }

    },
    components: {
        bheader,XButton, Box,Confirm,ConfirmPlugin,ToastPlugin
    },
    created() {
        this.$axios.post('/api/api/seeProgram',`data=${JSON.stringify({pro_id: this.pro_id})}`)
            .then(res=>{
                if(res.code==1){
                    console.log(res)
                    this.listData = res.result.repayList;
                    this.proStatus = res.result.repayProgram;
                }else{
                    mui.toast(res.msg)
                }
            })
    },
    mounted() {
        
    },
    methods: {
        endProgram(){
            const _this = this;
            _this.$vux.confirm.show({
                title: '确认终止该任务？',
                onCancel () {
                },
                onConfirm () {
                    _this.$axios.post('/api/api/endProgram',`data=${JSON.stringify({pro_id: _this.pro_id})}`)
                    .then(res=>{
                        mui.toast(res.msg)
                        if(res.code==1){
                            _this.$router.go(-1);
                        }
                    })
                 }
            })
        }
    }
}
</script>

<style scoped>
#seeProgram{width: 100%;height: 100%;background: #ffffff;}
.table_cont{margin: 10px 10px; display: block;height: 300%;}   /* height: 300%; */
.table_cont table{width: 100%;text-align: center;border: 1px solid #ddd;border-top:2px solid #469dc8;}
.table_cont table thead th{font-size: 14px;color: #333;padding: 5px}
.table_cont table tbody tr td{padding: 5px;font-size: 14px;color: #999;}
.table_cont table tbody tr td.c_jxz{color:#469dc8;}
.table_cont table tbody tr td.c_ywc{color:#999;}
.table_cont table tbody tr td.c_end{color:#ff0045;}
.table_cont table tbody tr td.c_qx{color:#999;}
button{padding:0;}
</style>
