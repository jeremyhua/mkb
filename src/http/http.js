import axios from "axios"
//axios.defaults.baseURL = 'http://www.qyy2018.com/'; //http://my.dkb.com/ http://jcc.tw186.com/
axios.defaults.baseURL = 'http://39.98.244.78:82';
axios.defaults.timeout = 30000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;
//请求前拦截  这里可以拦截用户的所有请求  请求之前发生   use 有个回调 config
axios.interceptors.request.use(function(config) {
    //业务在这里处理console.log(request init)
    //  console.log(/(getMoneyList|my_invite_info|seeBank|bankInfo)/.test(config.url),config.url.indexOf('bankInfo')>0)
    if(/(addBank|addCredit|bankInfo|choiceBank|CreditCardReceipts|creditProList|delCredit|delBank|editCredit|executeProgram|endProgram|getMoneyList|getPayBlock|getReal|getPrion|withdraw|my_invite_list|my_invite_info|my_profit|userFeilv|seeCredit|seeBank|seeProgram|produceProgram|payTypeBlock|payMoney|payReturn)/.test(config.url))
    {
        const AUTH_TOKEN = localStorage.getItem('Token');
        if (AUTH_TOKEN) {
            config.headers['userId'] = AUTH_TOKEN
        }
        //发起请求时，取消掉当前正在进行的相同请求
        if (promiseArr[config.url]) {
            promiseArr[config.url]('操作取消')
            promiseArr[config.url] = cancel
        } else {
            promiseArr[config.url] = cancel
        };
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

//请求后拦截  响应拦截     回调response   响应之后没有拦截return response
axios.interceptors.response.use(function(response) {

    if (typeof response.data == 'string' || response.data == 'String') {
        return JSON.parse(response.data); //直接返回数据
    }

    if(response.data.code&&response.data.code == "401"){
        localStorage.clear();
    }
    return response.data; //直接返回数据
}, function(error) {
    if (error.response) {
        switch (error.response.status) {
            case 401:
        }
    }
    return Promise.reject(error.response);
});

// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.Authorization = `token ${store.state.token}`;
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });

// // http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 返回 401 清除token信息并跳转到登录页面
//                     store.commit(types.LOGOUT);
//                     router.replace({
//                         path: 'login',
//                         query: {redirect: router.currentRoute.fullPath}
//                     })
//             }
//         }
//         return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//     });
// export default axios;
//设置请求超时 10s
axios.defaults.timeout = 10000;


export default {
    //get请求
    get(url, param) {
        return axios({
            method: 'get',
            url,
            params: param,
            cancelToken: new CancelToken(c => {
                cancel = c
            })
        })
    },
    //post请求
    post(url, param) {
        return axios({
            method: 'post',
            url,
            data: param,
            cancelToken: new CancelToken(c => {
                cancel = c
            })
        })
    }
}