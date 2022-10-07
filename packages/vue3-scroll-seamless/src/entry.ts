import vue3ScrollSeamless from "./components/seamlessScroll.vue";

import { App } from "vue";

console.log(vue3ScrollSeamless);

export { vue3ScrollSeamless };

export default {
  install(app: App) {
    app.component(vue3ScrollSeamless.name, vue3ScrollSeamless);
  },
};
