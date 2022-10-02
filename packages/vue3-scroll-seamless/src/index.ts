import { h } from "vue";
import { createApp } from "vue/dist/vue.esm-browser";

import Demo from "./demo.vue";

createApp({
  render: () => h(Demo),
}).mount("#app");
