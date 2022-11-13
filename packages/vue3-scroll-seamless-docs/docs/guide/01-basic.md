# 01-默认配置


<Example01from :classOptions="{limitMoveNum: 6}" ></Example01from>
```vue
<script lang="ts" setup>
import { reactive } from "vue";
import {vue3ScrollSeamless} from "vue3-scroll-seamless";
let list = reactive([{
          'title': '水调歌头·明月几时有',
        }, {
          'title': '苏轼 〔宋代〕',
        }, {
          'title': '明月几时有？把酒问青天。',
        }, {
          'title': '不知天上宫阙，今夕是何年。',
        }, {
          'title': '我欲乘风归去，又恐琼楼玉宇，高处不胜寒',
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
        }
        ]);

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
            <p>{{item.title}}</p>
        </li>
      </ul>
    </vue3ScrollSeamless>
  </div>
</template>
<style>
.demo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.scroll-wrap {
  height:400px;
  width: 360px;
  margin: 0 auto;
  overflow: hidden;
}
.ui-wrap {
  list-style: none;
  padding: 0;
  margin: 0 auto;
}
.li-item {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
}
</style>

```
