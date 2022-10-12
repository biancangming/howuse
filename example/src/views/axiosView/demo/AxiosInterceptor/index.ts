
import { createAxios } from "howuse/axios";

const { useAxiosRequest, useBlobDownload, server } = createAxios({
  baseURL: "/",
  timeout: 0
});

// 请求拦截器
server.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem("USER_TOKEN")
    if (!token) {
      console.warn("token获取失败...")
    }
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token || process.env.VUE_APP_TOKEN}`
    }
  });

// 响应拦截器 适合做一些不影响数据结构的操作，例如token失效返回登录页面等
server.interceptors.response.use(
  (response) => {
    // return response.data
    // 网上许多示例将此处直接设置为 response.data ，一定程度上影响未来响应头的获取，一旦需要使用响应头时，变得异常困难
    // 正确的方式应该是将响应的server二次封装
    return response
  },
  (error) => {
    console.log(error);
  }
)
