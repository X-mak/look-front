import {createRouter,createWebHistory} from 'vue-router'

import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import Teacher from '../views/Teacher.vue'
import User from '../views/User.vue'
const routes = [
    {
        path : "/",
        name : "index",
        component : Index,
    },
    {
        path : "/login",
        name : "login",
        component : Login
    },
    {
        path : "/register",
        name : "register",
        component : Register
    },
    {
        path : '/admin',
        name : 'admin',
        component : Admin
    },
    {
        path : '/teacher',
        name : 'teacher',
        component : Teacher
    },
    {
        path : '/user',
        name : 'user',
        component : User
    }
]


const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
  })
  
  export default router