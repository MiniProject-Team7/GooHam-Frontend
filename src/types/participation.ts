export interface RawParticipation {
  userId: number
  postId: number
  userName: string
  title: string
  status: string
  joinedAt: string
}

export interface PageResponse<T> {
  content: T[]
  pageNumber: number
  pageSize: number
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
}

export interface Participation {
  id: number         // userId 혹은 고유 신청 ID
  postId: number
  applicantName: string
  // applicantAvatar: string // 필요하다면 API에 맞게 매핑
  status: string
  appliedDate: string
  title: string
}

// 1) 페이징 조회용 파라미터
export interface FetchParticipationOpts {
  postId: number
  page: number
  size: number
}

// 2) 승인/거절 요청 바디
export interface ApprovalRequest {
  userId: number
  postId: number
  participantId: number
}

export type ParticipationMutationVars = ApprovalRequest & Omit<FetchParticipationOpts, "postId">

