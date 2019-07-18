import axios from 'axios'
import { Toast } from 'vant';

let token = localStorage.getItem('token')
let userId = localStorage.getItem('userId')
axios.defaults.headers.common['token'] = token
axios.defaults.headers.common['user_id'] = userId

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
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
      Toast.fail(errRestult.errorMsg)
    }else if(errRestult.errorKey === "BUSINESS_ERROR"){
      Toast.fail('系统内部异常!')
    }else if(errRestult.errorKey === ""){
      Toast.fail('登陆超时，请重新登陆！')
    }else{
      return Promise.reject(error);
    }
});

export default axios;