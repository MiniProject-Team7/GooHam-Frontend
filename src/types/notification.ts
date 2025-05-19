// src/types/notification.ts

// 서버가 반환하는 원본 알림 데이터
export interface RawNotification {
  id: number
  userId: number         // 알림을 받는 사용자
  postId: number
  postTitle: string
  postUserId: number     // 글 작성자
  participantId: number  // 참여자
  participantName: string
  type: string           // "신청" 등
  createdAt: string      // ISO timestamp
  read: boolean
}

// 클라이언트에서 쓸 간편 타입
export interface Notice {
  id: string;            // 문자열 ID
  type: string;          // "신청" | "승인" | "댓글" 등
  from?: string;         // 알림을 보낸 사람 (participantName)
  postTitle: string;     // 게시글 제목
  createdAt: string;     // ISO 문자열
  link: string;          // 이동할 경로
  is_read: boolean;      // 읽음 여부
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

