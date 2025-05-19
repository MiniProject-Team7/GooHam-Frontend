// utils/axiosInstance.ts
import axios from "axios";
import { API_BASE_URL } from "@/components/common/config";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/gooham`, // API 루트 경로
  withCredentials: true, // 쿠키 인증 필요 시 true
  headers: {                    
    "Content-Type": "application/json",
  },
});

// 토큰 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // localStorage와 Zustand 스토어 모두 확인
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 토큰 만료 시 리프레시 대응 가능
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러일 때 리프레시 시도
    if (
      error.response?.status === 401 &&
      !originalRequest._retry // 무한 루프 방지
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = (await axios.post("/gooham/users/refresh", null, {
          withCredentials: true,
        })) as {
          data: {
            status: string;
            message: string;
            data: {
              token: string;
            };
          };
        };

        const newAccessToken = refreshResponse.data.data.token;
        localStorage.setItem("accessToken", newAccessToken);

        // 새 토큰으로 원래 요청 다시 시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        window.location.href = "/account/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

