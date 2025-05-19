// src/api/notificationApi.ts
import axiosInstance from "@/utils/axiosInstance"
import type {
  RawNotification,
  CreateNotificationRequest,
  ApiResponse,
} from "@/types/notification"

// 1) 새 알림 생성
export const createNotification = async (
  body: CreateNotificationRequest
): Promise<RawNotification> => {
  const { data: resp } = await axiosInstance.post<ApiResponse<RawNotification>>(
    "/notifications",
    body
  )
  return resp.data
}

// 2) 알림 읽음 처리
export const markNotificationAsRead = async (
  id: number,
  userId: number
): Promise<void> => {
  await axiosInstance.patch<ApiResponse<string>>(
    `/notifications/${id}`,
    null,
    { params: { userId } }
  )
}

// 3) 특정 유저의 알림 목록 조회
export const fetchNotifications = async (
  userId: number
): Promise<RawNotification[]> => {
  const { data: resp } = await axiosInstance.get<ApiResponse<RawNotification[]>>(
    `/notifications/${userId}`
  )
  return resp.data
}

// 4) 특정 유저의 모든 알림 삭제
export const clearNotifications = async (
  userId: number
): Promise<void> => {
  await axiosInstance.delete<ApiResponse<string>>(`/notifications/${userId}`)
}
