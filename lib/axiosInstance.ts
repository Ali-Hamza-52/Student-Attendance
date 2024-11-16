import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ggcb-attendance.vercel.app/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
