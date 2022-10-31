<script lang="ts" setup>
import { reactive } from "vue";
import {vue3ScrollSeamless} from "../../../node_modules/vue3-scroll-seamless/dist/vue3-scroll-seamless.mjs";
let list = reactive([{
          'title': '无缝滚动第一行无缝滚动第一行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第二行无缝滚动第二行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第三行无缝滚动第三行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第四行无缝滚动第四行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第五行无缝滚动第五行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第六行无缝滚动第六行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第七行无缝滚动第七行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第八行无缝滚动第八行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第九行无缝滚动第九行',
          'date': '2017-12-16'
        }]);

        const classOptions = {
            limitMoveNum: 6,
        };

</script>

<template>
  <div class="demo">
    <vue3ScrollSeamless
      class="scroll-wrap"
      :classOptions="classOptions"
      :dataList="list"
    >
      <ul class="ui-wrap">
        <li class="li-item" v-for="(item,i) of list" :key="i">
            <p class="txt" >{{item.title}}</p>
            <span>{{item.date}}</span>
        </li>
      </ul>
    </vue3ScrollSeamless>
  </div>
</template>
<style scoped >
.demo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.scroll-wrap {
  height:400px;
  width: 360px;
  overflow: hidden;
}
.ui-wrap {
  display: flex;
   flex-direction: column;
  list-style: none;
  margin:0;
  padding:0;
}
.li-item {
  padding:0;
  margin-top:0;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
}

.txt{
    line-height: 100%;
}

</style>
