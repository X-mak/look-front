import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import '../src/assets/css/global.css'
const app = createApp(App)
app.use(ElementPlus).use(router).use(store).mount('#app')


//路由拦截器，权限控制
router.beforeEach((to,from,next)=>{
    console.log(to);
    let userJson = JSON.parse(sessionStorage.getItem("LoginUser"));
    if(to.path.indexOf("/user") >= 0){
        if(userJson.userRole.indexOf('student') >= 0){
            next();
        }else{
            router.push("/login");
        }
    }else if(to.path.indexOf("/teacher") >= 0){
        if(userJson.userRole.indexOf('teacher') >= 0){
            next();
        }else{
            router.push("/login");
        }
    }else if(to.path.indexOf("/admin") >= 0){
        if(userJson.userRole.indexOf('admin') >= 0){
            next();
        }else{
            router.push("/login");
        }
    }
    else{
        next();
    }
})