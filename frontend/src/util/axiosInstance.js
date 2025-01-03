// src/utils/axiosInstance.js
import axios from 'axios';

// Tạo một instance của axios
const api = axios.create({
  baseURL: 'https://your-backend-api.com', // Địa chỉ backend của bạn
  headers: {
    'Content-Type': 'application/json',
  }
});

// Thêm interceptor cho yêu cầu (request)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho phản hồi (response)
api.interceptors.response.use(
  (response) => response, // Nếu không có lỗi, trả về response
  async (error) => {
    if (error.response && error.response.status === 401) { // Nếu token hết hạn
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          // Gửi yêu cầu để refresh token
          const refreshResponse = await axios.post('/refresh-token', { refresh_token: refreshToken });
          const newAccessToken = refreshResponse.data.access_token;
          localStorage.setItem('access_token', newAccessToken);
          
          // Thực hiện lại yêu cầu ban đầu với token mới
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        } catch (refreshError) {
          console.error('Error refreshing token', refreshError);
          window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập nếu không thể refresh token
        }
      } else {
        window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập nếu không có refresh token
      }
    }
    return Promise.reject(error);
  }
);

export default api;
