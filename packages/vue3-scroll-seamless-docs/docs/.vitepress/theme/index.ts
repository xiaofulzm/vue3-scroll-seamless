
// 导入scroll 组件
import Example01from from "../components/example01.vue";
import Example02 from "../components/example02.vue";
import Example03 from "../components/example03.vue";
import Example04 from "../components/example04.vue";


import {vue3ScrollSeamless} from "vue3-scroll-seamless";


import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册一个全局组件
    app.component('Example01from',Example01from)
    app.component('Example02',Example02)
    app.component('Example04',Example04)
    app.component('vue3ScrollSeamless',vue3ScrollSeamless)
  }
}