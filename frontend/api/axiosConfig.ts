import { API_BASE_URL } from '@/constants/config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or any custom headers here

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors globally
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // redirect to login if unauthorized
        window.location.href = '/sign-in';
      }
    } else {
      console.error('Network error or no response:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
