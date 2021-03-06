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
import Course from '../views/Course/Course.vue'
import CourseVideo from '../views/Course/CourseVideo.vue'
import UserPage from '../views/User/UserPage.vue'
import UserSubscribeList from "../views/User/UserSubscribeList.vue"
const routes = [{
        path: "/",
        name: "index",
        component: Index,
        redirect: "/main",
        children: [{
                path: "search",
                name: "search",
                component: Search,
            },
            {
                path: "main",
                name: "main",
                component: Main,
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
                path:"subscribeList",
                name:"subscribe-list",
                component : UserSubscribeList
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
    },
    {
        path: "/course",
        name: "course",
        component: Course,
    },
    {
        path: "/course/video",
        name: "courseVideo",
        component: CourseVideo,
    },
    {
        path : "/userPage/:account",
        name : "user-page",
        component: UserPage,
    }
]


const router = createRouter({
    // 4. ??????????????? history ???????????????????????????????????????????????????????????? hash ?????????
    history: createWebHistory(),
    routes, // `routes: routes` ?????????
})


const whiteUrls = ['/login', '/register', '/main', '/search'];
const teacherUrls = ['/teacher/manage'];
//??????????????????????????????
router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem("token");
    //????????????????????????token
    //???token???store,???????????????,?????????????????????????????????
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
            //??????????????????
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