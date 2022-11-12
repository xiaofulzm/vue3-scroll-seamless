# 03 - 向右滚动

<Example02 :classOptions="{limitMoveNum: 2,direction: 3,}" ></Example02>
```vue
<script lang="ts" setup>
import { reactive } from "vue";
import {vue3ScrollSeamless} from "vue3-scroll-seamless";
let list = reactive([1, 2, 3, 4, 5, 6]);
const classOptions = {
    limitMoveNum: 2,
    direction: 3,
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
<style scoped >
.demo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.scroll-wrap {
  height:200px;
  width: 800px;
  overflow: hidden;
}
.ui-wrap {
  display: flex;
  list-style: none;
  margin:0;
  padding:0;
}
.li-item {
  padding:0;
  margin-top:0;
  margin-left: 20px;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 28px;
  background-color: rgb(171, 167, 168);
  
}
</style>

```
