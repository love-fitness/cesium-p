import { createApp } from "vue";
import App from "./App.vue";
import router from './router/index';
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { createPinia } from "pinia";

/** 添加公共样式 */
import '@/style/index.scss';

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.mount("#app");
