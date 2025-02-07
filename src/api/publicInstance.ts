import axios from 'axios';

const publicInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 5000, // 타임아웃 설정
});

publicInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // 최대 2번까지만 재시도
    if (!config || !config.retry) {
      config.retry = 0;
    }

    if (config.retry >= 2) {
      return Promise.reject(error);
    }

    config.retry += 1;
    await new Promise((resolve) => setTimeout(resolve, 1000 * config.retry));
    return publicInstance(config);
  },
);

export default publicInstance;
