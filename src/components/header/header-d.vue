<template>
    <div id="header-d">
        <x-header :left-options="{showBack: false}" :title="title" ></x-header>
    </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
    name : 'header-d',
    data() {
        return {
            
        }
    },
    props:['title'],
    components: {
        XHeader
    },
    created() {
    },
    mounted() {

    },
    distoryed() {
        
    },
    methods: {
    }
}
</script>

<style scoped lang="less">
@theme-color: #4aa7fc;
.vux-header{position: fixed;top: 0;width: 100%;background-color: @theme-color;z-index: 100;}

</style>
<style>
.mui-popover .mui-popover-arrow::after{background: #49484b !important;}

</style>

