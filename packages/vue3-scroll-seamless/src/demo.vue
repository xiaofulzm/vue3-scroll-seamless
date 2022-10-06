<script lang="ts" setup>
    import { reactive } from "vue";
import seamlessScrollVue from "./components/seamlessScroll.vue";

    let  arr = reactive({list:[1,2,3,4,5,6]})

    setTimeout(()=>{
        console.log('123')
        arr.list= [1,2,3,4,5,6,7,8,0]
    },1000)
    const classOptions ={
        limitMoveNum: 6
    }
</script>

<template>
  <div class="demo">
    <seamlessScrollVue class="scroll-wrap" :classOptions="classOptions"  :dataList="arr.list" >
        <ul class="ui-wrap"  >
            <li class="li-item" v-for="item of arr.list" >{{item}}</li>
        </ul>
    </seamlessScrollVue>

  </div>
</template>
<style>
    .demo{
        margin: 100px auto;
        display:flex;
        align-items: center;
        justify-content: center;
        /* border: 2px solid pink; */
    }
    .scroll-wrap{
        height: 270px;
        width: 360px;
        margin: 0 auto;
        overflow: hidden;
    }
    .ui-wrap{
        list-style: none;
        padding: 0;
        margin: 0 auto;
    }
    .li-item{
        margin-bottom: 10px;
        width: 100%;
        /* line-height: 30px; */
        /* border: 2px solid blue; */
        text-align: center;
    }
</style>
