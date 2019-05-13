<template>
    <div id="header-b">
        <x-header :left-options="{backText: ''}" :title="title"></x-header>
    </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
    name : 'header-b',
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
    
</style>
<style>
    .vux-header .vux-header-title{font-size: 16px !important;}
</style>

