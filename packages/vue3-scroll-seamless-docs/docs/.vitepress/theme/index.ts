
// 导入scroll 组件
import Example01from from "../components/example01.vue";

import {vue3ScrollSeamless} from "../components/utils";


import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册一个全局组件
    app.component('Example01from',Example01from)
    app.component('vue3ScrollSeamless',vue3ScrollSeamless)
  }
}