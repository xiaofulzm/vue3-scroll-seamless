10 - 滚动列表动态追加数据

# 09 - 复杂结构数组属性更新问题


<Example03 :isPush="true" ></Example03>
```vue
<script lang="ts" setup>
import { reactive,ref,onMounted } from "vue";
import {vue3ScrollSeamless} from "vue3-scroll-seamless";
const seamlessScroll = ref(null);

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
    onMounted(()=>{
        setTimeout(() => {
            list[3] = {
                title: '不知天上宫阙，今夕是何年。被更新了。'
            }
            list[5] = {
                title: '起舞弄清影，何似在人间。被更新了。'
            }
            const arr = {title: '追加的数据~~~~~~~~~~~~',}
            list.push(arr)
            // list length无变化，仅仅是属性变更，手动调用下组件内部的reset方法
            seamlessScroll.value.reset()
        }, 2000);
    })


</script>

<template>
  <div class="demo">
    <ClientOnly>
        <vue3ScrollSeamless
        ref="seamlessScroll"
        class="scroll-wrap"
        :classOptions="props.classOptions"
        :dataList="list"
        >
        <ul class="ui-wrap">
            <li class="li-item" v-for="(item,i) of list" :key="i">
                <p :class="{'tit-txt':i===0}" class="txt" >{{item.title}}</p>
            </li>
        </ul>
        </vue3ScrollSeamless>
    </ClientOnly>

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
.li-item:nth-child(4){
    color: green;
}
.li-item:nth-child(6){
    color: green;
}
.txt{
    line-height: 100%;
}
.tit-txt{
    font-weight: bold;
}
</style>

```
