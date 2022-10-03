import { h,createApp } from "vue";
import Demo from "./demo.vue";

createApp({
  render: () => h(Demo),
}).mount("#app");
