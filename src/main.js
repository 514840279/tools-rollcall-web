import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import http from "./lib/http"
import router from './router'
import store from './store'

const app = createApp(App);

app.config.globalProperties.$http=http;

app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount('#app')

