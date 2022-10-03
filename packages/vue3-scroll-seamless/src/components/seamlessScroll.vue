<script lang="ts" setup>
import animationFrame from "../utils/animationFrame";
import { 
    onMounted,
    onBeforeMount,
    onBeforeUnmount,
    nextTick,
    watch,
    ref,
    isRef
} from "vue";

animationFrame()

// ref参数
const slotList = ref<HTMLElement>(null); // 插槽dom 参数
let copyHtml = ref<string>(); // copy插槽滚动数据

// 定义参数

// prosp 参数
const Prosp = defineProps({
    dataList:{
        type:Array,
        default:[]
    },
    classOptions:{
        type:Object,
        default:{}
    }
});

// 挂载之前
onBeforeMount(()=>{

})
// 挂载完成
onMounted(()=>{
    reset();
})
// 组件销毁前调用
onBeforeUnmount(() => {

})

// 侦听器
watch(Prosp.dataList, (newValue, oldValue) => {
    reset();
    console.log(newValue, oldValue)
})

// 重置滚动动画
function reset(){
    _initMove();
    
}

//  数据超过100条提示
function _dataWarm (data:unknown[]) {
    if (data.length > 100) {
        console.warn(`数据达到了${data.length}条有点多哦~,可能会造成部分老旧浏览器卡顿。`);
    }
}

 // 初始化滚动 
async  function _initMove(){
    await nextTick()
    copyHtml.value = "";
    _dataWarm(Prosp.dataList);
    copyHtml.value = slotList.value.innerHTML;


}

console.log(Prosp)

</script>

<template>
    <div class="real-box" >
        <div ref="slotList" ><slot></slot></div>
        <div v-html="copyHtml" ></div>
    </div>
</template>