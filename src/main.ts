/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* @import '@ionic/vue/css/palettes/dark.always.css'; */
import "@ionic/vue/css/palettes/dark.class.css";
// import '@ionic/vue/css/palettes/dark.system.css';
/* Theme variables */
import "./theme/variables.css";
import "moment/locale/ru";

import { IonicVue } from "@ionic/vue";
import moment from "moment";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

moment.locale("ru");

import Bugsnag from "@bugsnag/js";
import BugsnagPluginVue from "@bugsnag/plugin-vue";

Bugsnag.start({
  apiKey: "2045ddbe9316078f44e5396db36338be",
  plugins: [new BugsnagPluginVue()],
  appVersion: "3.0.1-web",
});

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(Bugsnag.getPlugin("vue"))
  .use(createPinia().use(piniaPluginPersistedstate));

router.isReady().then(() => {
  app.mount("#app");
});
