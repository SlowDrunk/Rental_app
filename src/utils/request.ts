import axios from "axios";
import { Toast } from 'antd-mobile'

// 创建 axios 实例
const service = axios.create({
    baseURL: 'http://localhost:8080', // 环境测试
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器

axios.interceptors.response.use(function (response) {
    
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default service;