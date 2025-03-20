var vue3ScrollSeamless = function(exports, vue) {
  "use strict";
  function animationFrame() {
    window.cancelAnimationFrame = function() {
      return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(id) {
        return window.clearTimeout(id);
      };
    }();
    window.requestAnimationFrame = function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1e3 / 60);
      };
    }();
  }
  function arrayEqual(arr1, arr2) {
    if (arr1 === arr2)
      return true;
    if (arr1.length !== arr2.length)
      return false;
    for (var i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i])
        return false;
    }
    return true;
  }
  const _hoisted_1 = ["innerHTML"];
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "seamlessScroll",
    props: {
      dataList: {
        type: Array,
        default: []
      },
      classOptions: {
        type: Object,
        default: {}
      }
    },
    emits: ["ScrollEnd"],
    setup(__props, { emit: __emit }) {
      animationFrame();
      const slotList = vue.ref(null);
      const wrap = vue.ref(null);
      const realBox = vue.ref(null);
      let copyHtml = vue.ref(), initData = vue.reactive({
        xPos: 0,
        yPos: 0,
        delay: 0,
        ease: "ease-in",
        height: 0,
        width: 0,
        realBoxWidth: 0,
        realBoxHeight: 0,
        isHover: false,
        reqFrame: null,
        singleWaitTime: null
      });
      const defaultOption = {
        step: 1,
        limitMoveNum: 5,
        hoverStop: true,
        direction: 1,
        openTouch: true,
        singleHeight: 0,
        singleWidth: 0,
        waitTime: 1e3,
        switchOffset: 30,
        autoPlay: true,
        navigation: false,
        switchSingleStep: 134,
        switchDelay: 400,
        switchDisabledClass: "disabled",
        isSingleRemUnit: false
      };
      const emit = __emit;
      const Props = __props;
      vue.onBeforeMount(() => {
        initData.ease = "ease-in";
        initData.isHover = false;
        initData.reqFrame = null;
        initData.singleWaitTime = null;
      });
      vue.onMounted(() => {
        _initMove();
      });
      vue.onBeforeUnmount(() => {
        _cancle();
        clearTimeout(initData.singleWaitTime);
      });
      const options = vue.computed(() => {
        return { ...defaultOption, ...Props.classOptions };
      });
      const isHorizontal = vue.computed(() => options.value.direction > 1).value;
      const float = vue.computed(() => {
        let isFloat;
        if (isHorizontal) {
          isFloat = { float: "left", overflow: "hidden" };
        } else {
          isFloat = { overflow: "hidden" };
        }
        return isFloat;
      });
      const pos = vue.computed(() => {
        return {
          transform: `translate(${initData.xPos}px,${initData.yPos}px)`,
          transition: `all ${initData.ease} ${initData.delay}ms`,
          overflow: "hidden"
        };
      });
      const navigation = vue.computed(() => options.value.navigation).value;
      const autoPlay = vue.computed(() => {
        if (navigation)
          return false;
        return options.value.autoPlay;
      });
      const scrollSwitch = vue.computed(
        () => Props.dataList.length >= options.value.limitMoveNum
      );
      const hoverStopSwitch = vue.computed(
        () => options.value.hoverStop && autoPlay.value && scrollSwitch.value
      );
      const baseFontSize = vue.computed(
        () => options.value.isSingleRemUnit ? parseInt(window.getComputedStyle(document.documentElement, null).fontSize) : 1
      ).value;
      const realSingleStopWidth = vue.computed(
        () => options.value.singleWidth * baseFontSize
      ).value;
      const realSingleStopHeight = vue.computed(
        () => options.value.singleHeight * baseFontSize
      ).value;
      const step = vue.computed(() => {
        let singleStep;
        let step2 = options.value.step;
        if (isHorizontal) {
          singleStep = realSingleStopWidth;
        } else {
          singleStep = realSingleStopHeight;
        }
        if (singleStep > 0 && singleStep % step2 > 0) {
          console.error(
            "\u5982\u679C\u8BBE\u7F6E\u4E86\u5355\u6B65\u6EDA\u52A8,step\u9700\u662F\u5355\u6B65\u5927\u5C0F\u7684\u7EA6\u6570,\u5426\u5219\u65E0\u6CD5\u4FDD\u8BC1\u5355\u6B65\u6EDA\u52A8\u7ED3\u675F\u7684\u4F4D\u7F6E\u662F\u5426\u51C6\u786E~~~~~"
          );
        }
        return step2;
      }).value;
      vue.watch(
        () => Props.dataList,
        (newValue, oldValue) => {
          _dataWarm(newValue);
          if (!arrayEqual(newValue, oldValue)) {
            reset();
          }
        }
      );
      vue.watch(autoPlay, (newBol) => {
        if (newBol) {
          reset();
        } else {
          _stopMove();
        }
      });
      function reset() {
        _cancle();
        _initMove();
      }
      function changeEnter() {
        if (hoverStopSwitch.value)
          _stopMove();
      }
      function changeLeave() {
        if (hoverStopSwitch.value)
          _startMove();
      }
      function _dataWarm(data) {
        if (data.length > 100) {
          console.warn(
            `\u6570\u636E\u8FBE\u5230\u4E86${data.length}\u6761\u6709\u70B9\u591A\u54E6~,\u53EF\u80FD\u4F1A\u9020\u6210\u90E8\u5206\u8001\u65E7\u6D4F\u89C8\u5668\u5361\u987F\u3002`
          );
        }
      }
      async function _initMove() {
        await vue.nextTick();
        const { switchDelay } = options.value;
        _dataWarm(Props.dataList);
        copyHtml.value = "";
        if (isHorizontal) {
          initData.height = wrap.value.offsetHeight;
          initData.width = wrap.value.offsetWidth;
          let slotListWidth = slotList.value.offsetWidth;
          if (autoPlay.value) {
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
        if (scrollSwitch.value) {
          let initTimer = null;
          copyHtml.value = slotList.value.innerHTML;
          if (initTimer)
            clearTimeout(initTimer);
          initTimer = setTimeout(() => {
            initData.realBoxHeight = realBox.value.offsetHeight;
            _move();
          }, 0);
        } else {
          _cancle();
          initData.xPos = 0;
          initData.yPos = 0;
        }
      }
      function _move() {
        if (initData.isHover)
          return;
        _cancle();
        initData.reqFrame = requestAnimationFrame(function() {
          const h = initData.realBoxHeight / 2;
          const w = initData.realBoxWidth / 2;
          let { direction, waitTime } = options.value;
          if (direction === 1) {
            if (Math.abs(initData.yPos) >= h) {
              emit("ScrollEnd");
              initData.yPos = 0;
            }
            initData.yPos -= step;
          } else if (direction === 0) {
            if (initData.yPos >= 0) {
              emit("ScrollEnd");
              initData.yPos = h * -1;
            }
            initData.yPos += step;
          } else if (direction === 2) {
            if (Math.abs(initData.xPos) >= w) {
              emit("ScrollEnd");
              initData.xPos = 0;
            }
            initData.xPos -= step;
          } else if (direction === 3) {
            if (initData.xPos >= 0) {
              emit("ScrollEnd");
              initData.xPos = w * -1;
            }
            initData.xPos += step;
          }
          if (initData.singleWaitTime)
            clearTimeout(initData.singleWaitTime);
          if (realSingleStopHeight) {
            if (Math.abs(initData.yPos) % realSingleStopHeight < step) {
              initData.singleWaitTime = setTimeout(() => {
                _move();
              }, waitTime);
            } else {
              _move();
            }
          } else if (realSingleStopWidth) {
            if (Math.abs(initData.xPos) % realSingleStopWidth < step) {
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
      function _cancle() {
        cancelAnimationFrame(initData.reqFrame || null);
      }
      function _stopMove() {
        initData.isHover = true;
        if (initData.singleWaitTime)
          clearTimeout(initData.singleWaitTime);
        _cancle();
      }
      function _startMove() {
        initData.isHover = false;
        _move();
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "wrap",
          ref: wrap
        }, [
          vue.createElementVNode("div", {
            onMouseenter: changeEnter,
            onMouseleave: changeLeave,
            ref_key: "realBox",
            ref: realBox,
            style: vue.normalizeStyle(pos.value)
          }, [
            vue.createElementVNode("div", {
              style: vue.normalizeStyle(float.value),
              ref_key: "slotList",
              ref: slotList
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 4),
            vue.createElementVNode("div", {
              style: vue.normalizeStyle(float.value),
              innerHTML: vue.unref(copyHtml)
            }, null, 12, _hoisted_1)
          ], 36)
        ], 512);
      };
    }
  });
  const entry = {
    install(app) {
      app.component(_sfc_main.name, _sfc_main);
    }
  };
  exports.default = entry;
  exports.vue3ScrollSeamless = _sfc_main;
  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  return exports;
}({}, Vue);
