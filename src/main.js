import { createApp } from "vue";
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { createPinia } from "pinia";
import { routes } from "./router.js";
import install from "@ui/index.js";
// import uiVendors from '@ui/uiVendors.js';
//import routeGuard from '@core/iframe/routeGuard';
import PageLoader from "@core/iframe/pageLoader";
import appView from "./app.vue";
const sourceData = require("@core/iframe/sourceData.json");
const appConfig = require("./app.config.json");
import "@static/styles/index.less";
if (module.hot) {
  module.hot.accept();
}
const useVue = () => {
  const router = createRouter({
    history: appConfig.PRE_RENDER ? createWebHistory() : createWebHashHistory(),
    routes,
  });
  const pinia = createPinia();
  const app = createApp(appView);
  app.use(install).use(pinia);
  //routeGuard(router,{ index: '/index', login: '/login' });// 添加路由守卫
  app.use(router);
  app.config.errorHandler = (err) => {
    /* 处理错误 */
    console.log("eeerrr=", err);
  };
  return app;
};
const _main = () => {
  const app = useVue();
  const loader = new PageLoader({ imgList: sourceData.sourceList });
  loader.addEventListener("page-loading", (evt) => {
    if (window.loadingPage && evt.data && evt.data.precent) {
      window.loadingPage.updateProgress(evt.data.precent / 100);
    }
  });
  loader.addEventListener("page-loaded", () => {
    if (window.loadingPage) {
      window.loadingPage.updateForLoaded();
      window.loadingPage = null;
    }
    app.mount("#app");
  });
  loader.start();
};
const _domReadyHandler = () => {
  document.removeEventListener("DOMContentLoaded", _domReadyHandler, false);
  _main();
};
switch (document.readyState) {
case "loading":
  document.addEventListener("DOMContentLoaded", _domReadyHandler, false);
  break;
case "interactive":
case "complete":
default:
  _main();
}
