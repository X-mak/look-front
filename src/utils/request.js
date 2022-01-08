import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/5e3633b162df5945932860ef/TEST1',
    baseURL:'http://localhost:8080',
    timeout: 50000,
    // headers:{'Content-Type':'application/x-www-form-urlencoded'}// 'multipart/form-data'   //  'application/x-www-form-urlencoded';
});

service.interceptors.request.use(
    config => {
        // console.log('config.method---:   ' + config.method);
        console.log('config.url---:   ' + config.url)
        console.log('config.data---:   ' + config.data);
        // console.log('config.params---:   ' + config.params);
        debugger
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
            // console.log('response.data---:   ' + response.data.status)
            return response.data;
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
