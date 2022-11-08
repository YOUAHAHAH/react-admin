import axios from "axios";

// axios.defaults.withCredentials = true;
const BASEURL = String(import.meta.env.VITE_APP_API1);

//1. 创建axios对象
const service = axios.create({
  baseURL: BASEURL,
  // baseURL: "http://localhost:3000/",
  // 请求超时时间
  timeout: 5000,
});

//2. 请求拦截器
service.interceptors.request.use(
  (config) => {
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
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
