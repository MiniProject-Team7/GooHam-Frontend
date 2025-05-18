// src/types/notification.ts

// 서버가 반환하는 원본 알림 데이터
export interface RawNotification {
  id: number
  userId: number         // 알림을 받는 사용자
  postId: number
  postUserId: number     // 글 작성자
  participantId: number  // 참여자
  type: string           // "신청" 등
  createdAt: string      // ISO timestamp
  read: boolean
}

// 클라이언트에서 쓸 간편 타입
export interface Notification {
  id: number
  postId: number
  postUserId: number
  participantId: number
  type: string
  createdAt: Date
  read: boolean
}

// POST /notifications 요청 바디
export interface CreateNotificationRequest {
  userId: number
  postId: number
  postUserId: number
  participantId: number
  type: string
}

// 공통 응답 래퍼
export interface ApiResponse<T> {
  status: string
  message: string
  data: T
}
