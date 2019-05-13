<template>
    <div id="index-list" class="mui-content" style="height: 100%;padding-top:75px;box-sizing:border-box;">
        <div id="list" class="mui-indexed-list" style="height: 100%;box-sizing:border-box;">
            <div class="mui-indexed-list-search mui-input-row mui-search mui-active">
                <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="" data-input-clear="1" data-input-search="1"><span class="mui-icon mui-icon-clear mui-hidden"></span><span class="mui-placeholder"><span class="mui-icon mui-icon-search"></span><span>搜索城市</span></span>
            </div>
            <div class="mui-indexed-list-bar" style="height: 98%;">
                <a style="height: 18.5385px; line-height: 18.5385px;">A</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">B</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">C</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">D</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">E</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">F</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">G</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">H</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">I</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">J</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">K</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">L</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">M</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">N</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">O</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">P</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">Q</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">R</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">S</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">T</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">U</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">V</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">W</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">X</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">Y</a>
                <a style="height: 18.5385px; line-height: 18.5385px;">Z</a>
            </div>
            <div class="mui-indexed-list-alert"></div>
            <div class="mui-indexed-list-inner" style="height: 100%;">
                <div class="mui-indexed-list-empty-alert">没有数据</div>
                <!-- <div class="mui-table-view">
                    <div v-for="(item,k) in indexList" :key="k">
                        <div :data-group="item.name" class="mui-table-view-divider mui-indexed-list-group">{{item.name}}</div>
                        <div  v-for="(cities,i) in item.cities" :key="i" :data-value="cities.cityid" :data-tags="cities.tags" class="mui-table-view-cell mui-indexed-list-item">{{cities.name}}</div>
                    </div>
                </div> -->
                <ul class="mui-table-view"></ul>
            </div>
        </div>
    </div>
</template>

<script>
// import indexList from '@/assets/data/index-list.json';

export default {
    name: "index-list",
    data() {
        return {
        }

    },
    components: {

    },
    created() {
    },
    mounted() {
        mui.init();
        mui.ready(function() {
            var list = document.getElementById('list');
            //calc hieght
            list.style.height =  (document.getElementById('location').offsetHeight - 61) +"px";//document.documentElement.clientWidth;
            //create
            
            if(window.indexedList){
               window.indexedList.el.styleForSearch.innerText = "";
               window.indexedList =  new mui.IndexedList(list); 
            }else{
                window.indexedList =  new mui.IndexedList(list); 
            }
        });
        let tableview = document.getElementsByClassName('mui-table-view')[0];
        tableview.addEventListener('click',(e) => {
            if(e.target.className.indexOf('mui-indexed-list-item') > -1){
                let  cityCode = this.getData(e.target,'value');
                //console.log(e.target.innerHTML, cityCode)
                this.$router.push({path:'/index',query:{address: e.target.innerHTML, cityCode }})
            }
        })
    },
    methods: {
        getData(el, name, val) {
            let prefix = 'data-'
            if (val) {
                return el.setAttribute(prefix + name, val)
            }
            return el.getAttribute(prefix + name)
        }
    }
}
</script>

<style scoped>

 
</style>
