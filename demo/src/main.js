import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import axios from "axios";
import moment from "moment";
import echarts from "echarts";
Vue.use(Vant);

Vue.config.productionTip = false;

Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
