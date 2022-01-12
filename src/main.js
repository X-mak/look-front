import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import '../src/assets/css/global.css'
import request from './utils/request';
const app = createApp(App)
app.use(ElementPlus).use(router).use(store).mount('#app')


