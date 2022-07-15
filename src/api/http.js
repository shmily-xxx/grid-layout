import axios from 'axios';
import httpIntercept from "cloud-lib/src/utils/http-intercept";

let http = axios.create({
  timeout: 10000,
});
// 调用公共组件request拦截器，实现loading、get请求增加时间戳、增加公共headers
http.interceptors.request.use(
  httpIntercept.httpRequestInterceptor,
  (error) => {
    return Promise.reject(error);
  }
);
// 业务如果有自定义的request拦截，可追加拦截器
http.interceptors.request.use(
  (config) => {
    // 根据业务需要，修改此处config，
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 调用公共组件response拦截器，实现关闭loading、判断是否登陆并回退到登录页
http.interceptors.response.use(
  httpIntercept.httpResponseInterceptor,
  (error) => {
    // 此处针对非2**的请求，统一处理状态码并提示
    httpIntercept.httpResponseCatch(error);
    // 错误抛出，业务可捕捉后进行相应处理
    return Promise.reject(error);
  }
);
export default http;
