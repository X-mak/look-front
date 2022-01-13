import {createRouter,createWebHistory} from 'vue-router'
import request from '../utils/request'
import store from '../store'

import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import Teacher from '../views/Teacher.vue'
import User from '../views/User/User.vue'
import UserInfo from "../views/User/UserInfo.vue"
import UserCourse from "../views/User/UserCourse.vue"
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
        component : User,
        children:[
            {
                path : "info",
                name : "userInfo",
                component : UserInfo
            },
            {
                path : "course",
                name : "userCourse",
                component : UserCourse
            }
        ]
    }
]


const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
  })


  const whiteUrls = ["/", '/login','/register'];
//路由拦截器，权限控制
router.beforeEach((to,from,next)=>{
    let token = sessionStorage.getItem("token");
    //不在白名单中需要token
    if(!whiteUrls.includes(to.path) && (token === null || token === "")){
        router.push("/login");
    }
    else{
        //有token无store,网页刚刷新,需要从后端拉取用户信息
        if(!(token === null || token === "") && JSON.stringify(store.state.user) === "{}"){
            request({
                url:"/user/confirm",
                method:"get"
            }).then((res)=>{
                store.commit("SET_USER", res.data);
            })
        }
        next();
    }
})
  
  export default router