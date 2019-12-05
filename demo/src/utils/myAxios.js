import axios from "axios";
import { Loading } from "element-ui";
import { localStorage } from "@/storage";

const fetch = ({ url, method = "GET", params } = {}) => {
  let fetchLoading;
  let _opt = {
    method,
    url,
    params
  };
  const instance = axios.create({
    baseURL: "http://localhost:8090"
  });
  instance.interceptors.request.use(
    config => {
      config.headers = {
        ...config.headers,
        session_id: localStorage.loadFromLocal("token")
      };
      fetchLoading = Loading.service({ text: "开始请求" });
      return config;
    },
    error => {
      console.log("请求失败");
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    res => {
      fetchLoading.setText("请求完成");
      setTimeout(() => {
        fetchLoading.close();
      }, 500);
      console.log(res);
      return res;
    },
    err => {
      console.log("返回失败");
      return Promise.reject(err);
    }
  );
  return new Promise((resolve, reject) => {
    instance(_opt)
      .then(res => {
        if (res.data.status === 200) {
          resolve(res);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
export default fetch;
