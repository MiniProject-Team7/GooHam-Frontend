// components/common/apiClient.ts
import axios from "axios"
import { API_BASE_URL } from "./config"

// 1) 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,   // 쿠키 전송 용
})

// 2) 요청 인터셉터로 Authorization 헤더 자동 주입
apiClient.interceptors.request.use((config) => {
  // localStorage에서 꺼내오기
  const token = localStorage.getItem("accessToken")
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
