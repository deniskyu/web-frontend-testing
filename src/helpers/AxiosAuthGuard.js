import axios from 'axios';

const url = `${import.meta.env.VITE_BACKEND_URL}`;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = [];
};

const axiosAuthGuard = axios.create({
    baseURL: url,
    timeout: 8000,
    withCredentials: true,
});

axiosAuthGuard.interceptors.response.use(
  res => res,
  async (error) => {
    const originalRequest = error.config;

    // IMPORTANT: doar 401 pornește refresh
    if (error.response?.status !== 401)
      return Promise.reject(error);

    if (originalRequest._retry)
      return Promise.reject(error);

    // dacă alt request e în refresh -> așteaptă
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => axiosAuthGuard(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshResponse = await axios.post(`${url}/api/refresh`, {}, { withCredentials: true });

      isRefreshing = false;
      processQueue(null);

      return axiosAuthGuard(originalRequest);

    } catch (err) {
      isRefreshing = false;
      processQueue(err);

      return Promise.reject(err);
    }
  }
);

export default axiosAuthGuard;
