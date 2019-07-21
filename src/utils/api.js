import axios from 'axios'
import { Toast } from 'vant';

if(process.env.NODE_ENV == 'pruduction'){
  axios.defaults.baseURL = 'http://47.105.50.132:8080'
}
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    if(token && userId){
      config.headers.token = token
      config.headers.user_id = userId
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    let errRestult = error.response.data
    if(errRestult.errorKey === "INTERNAL_ERROR"){
      Toast.fail('系统内部异常!')
    }else if(errRestult.errorKey === "BUSINESS_ERROR"){
      Toast.fail(errRestult.errorMsg)
    }else if(errRestult.errorKey === "NEED_LOG"){
      Toast.fail('登陆超时，请重新登陆！')
    }else{
      return Promise.reject(error);
    }
});

export default axios;