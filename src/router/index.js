import {createRouter,createWebHistory} from 'vue-router'

import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
const routes = [
    {
        path : "/",
        component : Index
    },
    {
        path : "/login",
        component : Login
    }
]


const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
  })
  
  export default router