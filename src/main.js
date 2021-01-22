import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/axios";
import "./plugins/bootstrap-vue";
import "./plugins/vue-the-mask";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
