import axios from "axios";
import { Loading } from "element-ui";
let fetchLoading;

const instance = axios.create({
  baseURL: "http://localhost:8090"
});
//request 拦截器(interceptors)
instance.interceptors.request.use(
  config => {
    // console.log(config);
    fetchLoading = Loading.service({ text: "开始请求" });
    return config;
  },
  error => {
    console.log("请求失败");
    return Promise.reject(error);
  }
);
//response 拦截器(interceptors)
instance.interceptors.response.use(
  res => {
    fetchLoading.setText("请求完成");
    setTimeout(() => {
      fetchLoading.close();
    }, 500);
    return res;
  },
  err => {
    console.log("返回失败");
    return Promise.reject(err);
  }
);
export default instance;
