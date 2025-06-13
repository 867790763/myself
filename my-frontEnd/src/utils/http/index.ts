import Axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type AxiosRequestConfig
} from "axios";
import { ContentTypeEnum, ResultEnum } from "@/enums/request-enum";
import NProgress from "../progress";
import { useUserStore } from "@/stores/modules/user";
import { message } from "ant-design-vue";
console.log(import.meta.env.VITE_BASE_API);
// 默认 axios 实例请求配置
const configDefault = {
  headers: {
    "Content-Type": ContentTypeEnum.JSON
  },
  timeout: 0,
  baseURL: import.meta.env.VITE_BASE_API,
  data: {}
};

class Http {
  // 当前实例
  private static axiosInstance: AxiosInstance;
  // 请求配置
  private static axiosConfigDefault: AxiosRequestConfig;

  // 请求拦截
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      config => {
        NProgress.start();
        // 发送请求前，可在此携带 token
        const token = useUserStore().getToken;
        if (token) {
          config.headers["x-token"] = token;
        }
        return config;
      },
      (error: AxiosError) => {
        message.error(error.message);
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done();
        console.log(response);
        // 与后端协定的返回字段
        const { data } = response;
        console.log(data);
        // 判断请求是否成功
        const isSuccess =
          data &&
          Reflect.has(response.data, "code")
          response.status === 200
          // && code === ResultEnum.SUCCESS;
        if (isSuccess) {
          return data;
        } else {
          // 处理请求错误
          return Promise.reject(response.data);
        }
      },
      (error: AxiosError) => {
        NProgress.done();
        // 处理 HTTP 网络错误
        let msg = "";
        // HTTP 状态码
        const status = error.response?.status;
        switch (status) {
          case 400:
            msg = "请求错误";
            break;
          case 401:
            msg = "未授权，请登录";
            break;
          case 403:
            msg = "拒绝访问";
            break;
          case 404:
            msg = `请求地址出错: ${error.response?.config?.url}`;
            break;
          case 408:
            msg = "请求超时";
            break;
          case 500:
            msg = "服务器内部错误";
            break;
          case 501:
            msg = "服务未实现";
            break;
          case 502:
            msg = "网关错误";
            break;
          case 503:
            msg = "服务不可用";
            break;
          case 504:
            msg = "网关超时";
            break;
          case 505:
            msg = "HTTP版本不受支持";
            break;
          default:
            msg = "网络连接故障";
        }
        message.error(msg);
        return Promise.reject(error);
      }
    );
  }

  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config;
    Http.axiosInstance = Axios.create(config);
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  // 通用请求函数
  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export const http = new Http(configDefault);
