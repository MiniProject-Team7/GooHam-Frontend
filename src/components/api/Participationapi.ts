import axiosInstance from "@/utils/axiosInstance";
import type { RawParticipation, PageResponse, ApprovalRequest, FetchParticipationOpts } from "@/types/participation";

// 1) 특정 postId의 참여 목록 (페이징)
export const fetchParticipations = async (
  opts: FetchParticipationOpts
): Promise<PageResponse<RawParticipation>> => {
  const { postId, page, size } = opts
  const params : {
    page : number
    size : number
  } = {
    page,
    size,
  }
  const { data: resp } = await axiosInstance.get<{
    status: string
    message: string
    data: PageResponse<RawParticipation>
  }>(`/participants/${postId}`, { params })

  return resp.data
}

// 2) 단일 참여자 상태 조회
export const fetchParticipationStatus = async (
  postId: number,
  userId: number
): Promise<RawParticipation> => {
  const { data: wrapper } = await axiosInstance.get<{
    status: string
    message: string
    data: RawParticipation
  }>(`/participants/${postId}/${userId}/status`)

  return wrapper.data
}

// 3) 참여 승인
export const approveParticipation = async (
  body: ApprovalRequest
): Promise<void> => {
  await axiosInstance.patch("/participants/approve", {
    userId: body.userId,
    postId: body.postId,
    participantId: body.participantId,
  })
}

// 4) 참여 거절
export const rejectParticipation = async (
  body: ApprovalRequest
): Promise<void> => {
  await axiosInstance.patch("/participants/reject", {
    userId: body.userId,
    postId: body.postId,
    participantId: body.participantId,
  })
}
