import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchParticipations,
  fetchParticipationStatus,
  approveParticipation,
  rejectParticipation,
} from "@/components/api/ParticipationApi";
import type {
  RawParticipation,
  PageResponse,
  ParticipationMutationVars,
} from "@/types/participation"

const BASE_KEY = "participations"

export const useParticipations = (
  postId: number,
  page: number = 0,
  size: number = 8,
) => {
  const queryKey = [BASE_KEY, postId, page, size ] as const

  return useQuery<PageResponse<RawParticipation>, Error>(
    {
      queryKey,
      queryFn: () => fetchParticipations({ postId, page, size }),
      enabled: postId > 0,
    }
  )
}

/**
 * 2) 단일 참여자 상태 조회
 */
export const useParticipationStatus = (
  postId: number,
  userId: number
) => {
  const queryKey = ["participationStatus", postId, userId] as const

  return useQuery<RawParticipation, Error>(
    {
      queryKey,
      queryFn: () => fetchParticipationStatus(postId, userId),
      enabled: postId > 0 && userId > 0,
    }
  )
}

export const useApproveParticipation = () => {
  const qc = useQueryClient()

  return useMutation<void, Error, ParticipationMutationVars>({
    mutationFn: ({ userId, postId, participantId }) =>
      approveParticipation({ userId, postId, participantId }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: [
          BASE_KEY,
          vars.postId,
          vars.page,
          vars.size,
        ] as const,
        exact: false,
      })
    },
  })
}

/** 거절 훅 */
export const useRejectParticipation = () => {
  const qc = useQueryClient()

  return useMutation<void, Error, ParticipationMutationVars>({
    mutationFn: ({ userId, postId, participantId }) =>
      rejectParticipation({ userId, postId, participantId }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: [
          BASE_KEY,
          vars.postId,
          vars.page,
          vars.size,
        ] as const,
        exact: false,
      })
    },
  })
}
