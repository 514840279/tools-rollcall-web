import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

import http from "./lib/http"
import router from './router'
import store from './store'

const app = createApp(App);

app.config.globalProperties.$http=http;

app.use(store).use(router).use(VuesticPlugin).mount('#app')