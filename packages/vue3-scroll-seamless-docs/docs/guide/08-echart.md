# 08 - echart图表无缝滚动

<Example02 :isEcharts="true" :classOptions="{limitMoveNum: 2,direction: 3,}" ></Example02>
```vue
<script>
import { reactive,onMounted } from "vue";
import {vue3ScrollSeamless} from "vue3-scroll-seamless";
import echarts from "echarts"
 function drawChart (dom) {
        const myChart = echarts.init(dom)
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
              ]
            }
          ]
        });
}
 onMounted(()=>{
    // echart渲染放到setTimeout宏任务,这时vue-seamless-scroll组件内部复制完成
    setTimeout(() => {
        document.querySelectorAll('.li-item').forEach(dom => {
            drawChart(dom);
        });
    }, 0);
 })
let list = reactive([1, 2, 3, 4, 5, 6]);
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
