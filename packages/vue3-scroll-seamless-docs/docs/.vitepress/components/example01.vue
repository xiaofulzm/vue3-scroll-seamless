<script lang="ts" setup>

import { reactive } from "vue";
import {vue3ScrollSeamless} from "../../../../vue3-scroll-seamless/dist/vue3-scroll-seamless.mjs";
let list = reactive([{
          'title': '水调歌头·明月几时有',
        }, {
          'title': '苏轼 〔宋代〕',
        }, {
          'title': '明月几时有？把酒问青天。',
        }, {
          'title': '不知天上宫阙，今夕是何年。',
        }, {
          'title': '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。',
        }, {
          'title': '起舞弄清影，何似在人间。',
        }, {
          'title': '转朱阁，低绮户，照无眠。',
        }, {
          'title': '不应有恨，何事长向别时圆？',
        }, {
          'title': '人有悲欢离合，月有阴晴圆缺，此事古难全。',
        }, {
          'title': '但愿人长久，千里共婵娟。',
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
            <p :class="{'tit-txt':i===0}" class="txt" >{{item.title}}</p>
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
.tit-txt{
    font-weight: bold;
}
</style>
