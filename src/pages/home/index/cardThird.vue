<template>
    <div id="cardThird" class="webview">
        <i-header :title="$route.query.title" :is_r="true"></i-header>
        <cardWebview :target="$route.query.link"></cardWebview>
    </div>
</template>

<script>
import iHeader from "@/components/header/header-r";
import cardWebview from '@/components/webview/cardWebview'

export default {
    name: "cardThird",
    data() {
        return {
        }
    },
    components: {
        iHeader, cardWebview
    },
    created() {

    },
    mounted() {
    },
    methods: {

    }
}
</script>

<style scoped>
.webview{ height: 100%; width: 100%;top:0;bottom:0;position:fixed;background:#fff;}
 
</style>