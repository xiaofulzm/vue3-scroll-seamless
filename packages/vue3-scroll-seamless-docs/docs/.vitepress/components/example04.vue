<script lang="ts" setup>

import { reactive, ref, onMounted } from "vue";
// import {vue3ScrollSeamless} from "./utils";

const props = defineProps(['classOptions'])
const seamlessScroll = ref(null);


let list = reactive();

const classOptions = {
  limitMoveNum: 2,
};
onMounted(() => {
  list = [{
    'title': '水调歌头·明月几时有',
  }, {
    'title': '苏轼 〔宋代〕',
  }, {
    'title': '明月几时有？把酒问青天。',
  }, {
    'title': '不知天上宫阙，今夕是何年。',
  }]
})


</script>

<template>
  <div class="demo">
    <ClientOnly>
      <vue3ScrollSeamless ref="seamlessScroll" class="scroll-wrap" :classOptions="classOptions" :dataList="list">
        <ul class="ui-wrap">
          <li class="li-item" v-for="(item, i) of list" :key="i">
            <p :class="{ 'tit-txt': i === 0 }" class="txt">{{ item.title }}</p>
          </li>
        </ul>
      </vue3ScrollSeamless>
    </ClientOnly>

  </div>
</template>
<style scoped>
.demo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-wrap {
  height: 400px;
  width: 360px;
  overflow: hidden;
}

.ui-wrap {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
}

.li-item {
  padding: 0;
  margin-top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
}

.li-item:nth-child(4) {
  color: green;
}

.li-item:nth-child(6) {
  color: green;
}

.li-item:last-child {
  color: green;
}

.txt {
  line-height: 100%;
}

.tit-txt {
  font-weight: bold;
}
</style>
