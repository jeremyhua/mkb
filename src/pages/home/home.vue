<template>
  <div id="home">
  <!-- 	<keep-alive>
    	<router-view></router-view>
  	</keep-alive> -->
    <transition :name='transitionName' >
    <router-view></router-view>
  </transition>
    <tabbar :href="$route.path"></tabbar>
  </div>
</template>

<script>
  import tabbar from "@/components/tabbar/tabbar"
  
  export default {
    name: 'home',
    data(){
        return {
            // vuegConfig:{  
            //     disable:true           
            // }
            transitionName:'',
        }
    },
    components:{
    	tabbar
    },mounted () {
          //  this.beforeRouteUpdate();
    },
    methods:{   
    },watch:{
              beforeRouteUpdate(to,from,next){
              let isBack = this.$router.isBack;
              if( isBack ){
                this.transitionName = 'slide-right'
              }else{
                this.transitionName = 'slide-left'
              }
              this.$router.isBack = false;
            }
    }    
  }
</script>
<style>
.slide-left-enter, .slide-right-leave-active { opacity: 0;-webkit-transform: translate(50px, 0);transform: translate(50px, 0);}
.slide-left-leave-active, .slide-right-enter {opacity: 0;-webkit-transform: translate(-50px, 0);transform: translate(-50px, 0);}
</style>

