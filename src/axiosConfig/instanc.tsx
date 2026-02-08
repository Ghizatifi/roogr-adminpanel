import axios from 'axios';
import { store } from '../store/store';
import { setLogout } from '../store/slices/auth';

const axiosInstance = axios.create({
  baseURL: 'https://roogr.sa/api/v1/admin',
});

axiosInstance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token');
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (err) => {
    return Promise.reject(err);
  },
);
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token');
      store.dispatch(setLogout());
      window.location.href = '/#/auth/login';
    }
    return Promise.reject(err);
  },
);

export default axiosInstance;