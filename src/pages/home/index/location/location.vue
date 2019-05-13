<template>
	<div id="location">
        <x-header :left-options="{'backText':''}">选择地址</x-header>
        <!-- <keep-alive> -->
			<index-list></index-list>
		<!-- </keep-alive> -->
	</div>
</template>

<script>
import {XHeader} from "vux"
import indexList from "@/components/index-list/index-list.vue";

export default {
    name:"location",
    data(){
        return {
            
        }
    },
    methods:{
        
    },
    created () {
		
    },
    mounted(){
      
    
    },
    components:{
        XHeader, indexList
    },
    methods: {
    }
}
</script>

<style scoped>
 #location{ width:100%; height: 100%;}
 .mui-content{ width:100%; height: 100%;}
 #index-list{margin-top:-75px;}
</style>

<style>
	
</style>