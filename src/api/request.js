import axios from "axios";
// 引入进度条
// import nprogress from "nprogress";
// // start：进度条开始   done：进度条结束
// // 引入进度条的样式
// import "nprogress/nprogress.css";
// axios.defaults.withCredentials = true;

//1. 创建axios对象
const service = axios.create({
  // baseURL: "/api", //基础路径
  baseURL: "http://admin.youah.cc/",
  // baseURL: "http://localhost:3000/",
  // 请求超时时间
  timeout: 5000,
});

//2. 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 进度条开始
    // nprogress.start();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//3. 响应拦截器
service.interceptors.response.use(
  (response) => {
    //判断code码
    // 进度条结束
    // nprogress.done();
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
