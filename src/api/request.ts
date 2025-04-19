/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { getAccessToken, removeAccessToken } from "../hooks/useAuth";

interface CustomAxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.status === 401) {
      removeAccessToken();

      message.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const request = axiosInstance as unknown as CustomAxiosInstance;

export default request;
