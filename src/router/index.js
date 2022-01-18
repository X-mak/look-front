import {
    createRouter,
    createWebHistory
} from 'vue-router'
import request from '../utils/request'
import store from '../store'

import Login from '../views/Login.vue'
import Index from '../views/Main/Index.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import Teacher from '../views/Teacher.vue'
import User from '../views/User/User.vue'
import UserInfo from "../views/User/UserInfo.vue"
import UserCourse from "../views/User/UserCourse.vue"
import Search from "../views/Main/Search.vue"
import Main from "../views/Main/Main.vue"
import {
    toRaw
} from '@vue/reactivity'
const routes = [{
        path: "/",
        name: "index",
        component: Index,
        redirect:"/main",
        children:[
            {
                path : "search",
                name : "search",
                component : Search,
            },
            {
                path : "main",
                name : "main",
                component : Main,
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: '/user',
        name: 'user',
        component: User,
        redirect: "/user/info",
        children: [{
                path: "info",
                name: "userInfo",
                component: UserInfo
            },
            {
                path: "course",
                name: "userCourse",
                component: UserCourse
            },
            {
                path: "/teacher/manage",
                name: "teacher-manage",
                component: Teacher
            },
            {
                path: "/admin/manage",
                name: "admin-manage",
                component: Admin
            }
        ]
    }
]


const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})


const whiteUrls = ['/login', '/register', '/'];
const teacherUrls = ['/teacher/manage'];
//路由拦截器，权限控制
router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem("token");
    //不在白名单中需要token
    //有token无store,网页刚刷新,需要从后端拉取用户信息
    if (!(token === null || token === "") && JSON.stringify(store.state.user) === "{}") {
        request({
            url: "/user/confirm",
            method: "get"
        }).then((res) => {
            if (res.code === "200") {
                store.commit("SET_USER", res.data);
            } else {
                sessionStorage.setItem("token", "");
                router.push("/login");
            }

        })
    }
    if (!whiteUrls.includes(to.path)) {
        if (token === null || token === "") {
            router.push("/login");
        } else {
            //在教师页面中
            if (to.path.indexOf("teacher") != -1) {
                setTimeout(() => {
                    let userRole = toRaw(store.state.user).userRole;
                    if (!userRole.includes("teacher")) {
                        router.push("/");
                    }
                })
                next();
            } else if (to.path.indexOf("admin") != -1) {
                setTimeout(() => {
                    let userRole = toRaw(store.state.user).userRole;
                    if (!userRole.includes("admin")) {
                        router.push("/");
                    }
                })
                next();
            } else {
                next();
            }

        }
    } else {
        next();
    }

})

export default router