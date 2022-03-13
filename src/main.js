import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/css/global.css'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(router).use(store).mount('#app')


