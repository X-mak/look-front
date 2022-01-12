import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/5e3633b162df5945932860ef/TEST1',
    baseURL:'http://localhost:8080',
    timeout: 50000,
    // headers:{'Content-Type':'application/x-www-form-urlencoded'}// 'multipart/form-data'   //  'application/x-www-form-urlencoded';
});

const whiteUrls = ["/user/check", '/user'];


service.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
        let token = sessionStorage.getItem("token");
        if (!whiteUrls.includes(config.url)) {  // 校验请求白名单
            if(token === null) {
                router.push("/login")
            } else {
                config.headers['token'] = token;  // 设置请求头
            }
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            let res = response.data;
            if (res.code === '401') {
                console.error("token过期，重新登录")
                router.push("/login")
            }
            return res;    
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
