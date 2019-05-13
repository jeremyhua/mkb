<template>
    <div id="circleTitle">
        <div class="_title" :class="{g_title:greytitle}">
            <span class="little"></span>
            <span class="small"></span>
            <span class="open_zc">{{title}}</span>
            <span class="small"></span>
            <span class="little"></span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import bheader from "@/components/header/header-b";
export default {
    name: "circleTitle",
    data() {
        return {

        }

    },
    props:['title','greytitle'],
    components: {
        bheader
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
#circleTitle{width: 100%;text-align: center;background-color: #fff;border-radius: 20px;height: auto;min-height: 100px;padding: 20px 0;margin-bottom: 10px;}
._title  .open_zc{display: inline-block;font-size: 16px;letter-spacing: 1px;padding: 4px 20px;background-color: #8f87ff;color: #fff;border-radius: 18px;text-shadow: 0 4px 4px #6967f5;font-weight: 700;} 
._title .little,._title .small{border-radius: 50%;background-color: #8f87ff;display: inline-block;vertical-align: middle;}
._title  .small{width: 10px;height: 10px;}
._title .little{width: 5px;height: 5px;}

.g_title .open_zc{background-color:#bebebe;font-weight: normal;text-shadow: none;}
.g_title .little,.g_title .small{background-color:#bebebe;}
</style>
