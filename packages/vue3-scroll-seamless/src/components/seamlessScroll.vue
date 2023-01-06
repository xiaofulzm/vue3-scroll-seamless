<script lang="ts" setup>
import { animationFrame, arrayEqual } from "../utils";
import {
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  nextTick,
  watch,
  computed,
  ref,
  reactive,
} from "vue";

animationFrame();

// ref参数
const slotList = ref<HTMLElement | null>(null); // 插槽dom 参数
const wrap = ref<HTMLElement | null>(null); // 最外层盒子
const realBox = ref<HTMLElement | null>(null); //  实际滚动的区域

let copyHtml = ref<string>(), // copy插槽滚动数据
  initData = reactive({
    xPos: 0, // 单步滚动的距离
    yPos: 0, // 单步滚动的距离
    delay: 0, // 过渡动画类型
    ease: "ease-in", //  过渡动画类型
    height: 0, //  最外层盒子高度
    width: 0, // 最外层盒子宽度
    realBoxWidth: 0, // 内容实际宽度
    realBoxHeight: 0, // 内容实际高度
    isHover: false, // 鼠标移动 控制无缝滚动暂停
    reqFrame: null, // move动画的animationFrame定时器
    singleWaitTime: null, // 步骤动画定时器
  });

// 默认参数
const defaultOption = {
  step: 1, //步长
  limitMoveNum: 5, //启动无缝滚动最小数据数
  hoverStop: true, //是否启用鼠标hover控制
  direction: 1, // 0 往下 1 往上 2向左 3向右
  openTouch: true, //开启移动端touch
  singleHeight: 0, //单条数据高度有值hoverStop关闭
  singleWidth: 0, //单条数据宽度有值hoverStop关闭
  waitTime: 1000, //单步停止等待时间
  switchOffset: 30,
  autoPlay: true, // 判断是否可以开始滚动
  navigation: false, // 手动控制切换   autoPlay必须是false
  switchSingleStep: 134,
  switchDelay: 400, // 手动控制切换的时间
  switchDisabledClass: "disabled",
  isSingleRemUnit: false, // singleWidth/singleHeight 是否开启rem度量
};

// 回调事件
const emit = defineEmits(["ScrollEnd"]);
// Props 参数
const Props = defineProps({
  dataList: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: [],
  },
  classOptions: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {},
  },
});

// 挂载之前
onBeforeMount(() => {
  initData.ease = "ease-in";
  initData.isHover = false; // mouseenter mouseleave 控制this._move()的开关
  initData.reqFrame = null; // move动画的animationFrame定时器
  initData.singleWaitTime = null; // single 单步滚动的定时器
});
// 挂载完成
onMounted(() => {
  _initMove();
});
// 组件销毁前调用
onBeforeUnmount(() => {
  _cancle();
  clearTimeout(initData.singleWaitTime);
});

/***
 * 计算属性
 * **/
// 合并传参和默认参数 浅拷贝   *之后重写使用深拷贝
const options = computed(() => {
  return { ...defaultOption, ...Props.classOptions };
});
// 滚动方向   小于等于1上或下滚动   大于1左或右滚动
const isHorizontal = computed(() => options.value.direction > 1).value;
// 当左右滚动时  设置float

const float = computed(() => {
  let isFloat;
  if (isHorizontal) {
    isFloat = { float: "left", overflow: "hidden" };
  } else {
    isFloat = { overflow: "hidden" };
  }
  return isFloat;
});

const pos = computed(() => {
  return {
    transform: `translate(${initData.xPos}px,${initData.yPos}px)`,
    transition: `all ${initData.ease} ${initData.delay}ms`,
    overflow: "hidden",
  };
});

// 手动控制
const navigation = computed(() => options.value.navigation).value;
// 是否开启无缝滚动
const autoPlay = computed(() => {
  if (navigation) return false;
  return options.value.autoPlay;
});
// 判断是否可以开启无缝滚动
const scrollSwitch = computed(
  () => Props.dataList.length >= options.value.limitMoveNum
);

//  是否无缝滚动中
const hoverStopSwitch = computed(
  () => options.value.hoverStop && autoPlay.value && scrollSwitch.value
);

// 获取当前页面字体大小
const baseFontSize = computed(() =>
  options.value.isSingleRemUnit
    ? parseInt(window.getComputedStyle(document.documentElement, null).fontSize)
    : 1
).value;
const realSingleStopWidth = computed(
  () => options.value.singleWidth * baseFontSize
).value;
const realSingleStopHeight = computed(
  () => options.value.singleHeight * baseFontSize
).value;
// 单步滚动
const step = computed(() => {
  let singleStep: number;
  let step = options.value.step;
  if (isHorizontal) {
    // 判断上下滚动  还是左右
    singleStep = realSingleStopWidth;
  } else {
    singleStep = realSingleStopHeight;
  }
  if (singleStep > 0 && singleStep % step > 0) {
    console.error(
      "如果设置了单步滚动,step需是单步大小的约数,否则无法保证单步滚动结束的位置是否准确~~~~~"
    );
  }
  return step;
}).value;

/**
 *
 */

// 侦听器
watch(
  () => Props.dataList,
  (newValue, oldValue) => {
    _dataWarm(newValue);
    //监听data是否有变更
    if (!arrayEqual(newValue, oldValue)) {
      reset();
    }
  }
);

// 监听是否可以滚动
watch(autoPlay, (newBol) => {
  if (newBol) {
    reset();
  } else {
    _stopMove();
  }
});

// 重置滚动动画
function reset() {
  _cancle();
  _initMove();
}

// 鼠标移入
function changeEnter() {
  if (hoverStopSwitch.value) _stopMove();
}
// 鼠标移出
function changeLeave() {
  if (hoverStopSwitch.value) _startMove();
}

//  数据超过100条提示
function _dataWarm(data: unknown[]) {
  if (data.length > 100) {
    console.warn(
      `数据达到了${data.length}条有点多哦~,可能会造成部分老旧浏览器卡顿。`
    );
  }
}

// 初始化滚动
async function _initMove() {
  await nextTick();
  const { switchDelay } = options.value;
  _dataWarm(Props.dataList);
  copyHtml.value = ""; // 清空 copyHtml

  //  默认是false  ---  true 左右滚动 获取wrap盒子宽高 :
  if (isHorizontal) {
    initData.height = wrap.value.offsetHeight;
    initData.width = wrap.value.offsetWidth;
    let slotListWidth = slotList.value.offsetWidth; // 滚动最大宽度
    if (autoPlay.value) {
      // 水平滚动设置warp width
      // 修正offsetWidth四舍五入
      slotListWidth = slotListWidth * 2 + 1;
    }
    realBox.value.style.width = slotListWidth + "px";
    initData.realBoxWidth = slotListWidth;
  }
  if (autoPlay.value) {
    initData.ease = "ease-in";
    initData.delay = 0;
  } else {
    initData.ease = "linear";
    initData.delay = switchDelay;
    return;
  }

  // 是否可以滚动判断
  if (scrollSwitch.value) {
    let initTimer = null;
    copyHtml.value = slotList.value.innerHTML;
    if (initTimer) clearTimeout(initTimer);
    initTimer = setTimeout(() => {
      initData.realBoxHeight = realBox.value.offsetHeight;
      _move();
    }, 0);
  } else {
    _cancle(); // 停止执行动画
    initData.xPos = 0;
    initData.yPos = 0;
  }
}

// 执行动画  move
function _move() {
  // 鼠标移入时停止动画
  if (initData.isHover) return;
  _cancle(); //进入move立即先清除动画 防止频繁touchMove导致多动画同时进行
  initData.reqFrame = requestAnimationFrame(function () {
    const h = initData.realBoxHeight / 2; //实际显示高度
    const w = initData.realBoxWidth / 2; //宽度
    let { direction, waitTime } = options.value;
    // console.log(initData.yPos,initData.xPos)
    if (direction === 1) {
      // 上
      if (Math.abs(initData.yPos) >= h) {
        emit("ScrollEnd");
        initData.yPos = 0;
      }
      initData.yPos -= step;
    } else if (direction === 0) {
      // 下
      if (initData.yPos >= 0) {
        emit("ScrollEnd");
        initData.yPos = h * -1;
      }
      initData.yPos += step;
    } else if (direction === 2) {
      // 左
      if (Math.abs(initData.xPos) >= w) {
        emit("ScrollEnd");
        initData.xPos = 0;
      }
      initData.xPos -= step;
    } else if (direction === 3) {
      // 右
      if (initData.xPos >= 0) {
        emit("ScrollEnd");
        initData.xPos = w * -1;
      }
      initData.xPos += step;
    }

    if (initData.singleWaitTime) clearTimeout(initData.singleWaitTime);
    // !!  realSingleStopHeight: 设置的单步滚动距离默认0;
    if (realSingleStopHeight) {
      //是否启动了单行暂停配置
      if (Math.abs(initData.yPos) % realSingleStopHeight < step) {
        // 符合条件暂停waitTime
        initData.singleWaitTime = setTimeout(() => {
          _move();
        }, waitTime);
      } else {
        _move();
      }
      //  !! realSingleStopWidth: 设置的单步滚动距离默认0;
    } else if (realSingleStopWidth) {
      if (Math.abs(initData.xPos) % realSingleStopWidth < step) {
        // 符合条件暂停waitTime
        initData.singleWaitTime = setTimeout(() => {
          _move();
        }, waitTime);
      } else {
        _move();
      }
    } else {
      _move();
    }
  });
}

// 清除动画
function _cancle() {
  cancelAnimationFrame(initData.reqFrame || null);
}

// 鼠标移进 停止动画
function _stopMove() {
  initData.isHover = true; //关闭_move
  // 防止频频hover进出单步滚动,导致定时器乱掉
  if (initData.singleWaitTime) clearTimeout(initData.singleWaitTime);
  _cancle();
}
// 鼠标移出  开启动画
function _startMove() {
  initData.isHover = false; //开启_move
  _move();
}

defineExpose({
  reset
});
</script>

<template>
  <div ref="wrap">
    <div
      @mouseenter="changeEnter"
      @mouseleave="changeLeave"
      ref="realBox"
      :style="pos"
    >
      <div :style="float" ref="slotList"><slot></slot></div>
      <div :style="float" v-html="copyHtml"></div>
    </div>
  </div>
</template>
<style scoped></style>
