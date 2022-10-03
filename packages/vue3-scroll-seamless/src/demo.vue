<script lang="ts" setup>
    import { reactive } from "vue";
import seamlessScrollVue from "./components/seamlessScroll.vue";

    const list = reactive([1,2,3,4,5])

</script>

<template>
  <div class="demo">
    <seamlessScrollVue :dataList="list" >
        <ul class="ui-wrap"  >
            <li class="li-item" v-for="item of list" >{{item}}</li>
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
        width: 500px;
        border: 2px solid pink;
    }
    .ui-wrap{
        width: 400px;
    }
    .li-item{
        margin-bottom: 10px;
        width: 100%;
        line-height: 30px;
        border: 2px solid blue;
        text-align: center;
    }
</style>
