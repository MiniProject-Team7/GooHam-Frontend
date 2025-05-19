import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  RawNotification,
  CreateNotificationRequest,
} from "@/types/notification";
import {
  createNotification,
  markNotificationAsRead,
  fetchNotifications,
  clearNotifications,
} from "@/components/api/notificationApi";

const KEY_BASE = "notifications"

/** 1) 특정 유저의 알림 목록 조회 */
export const useNotifications = (userId: number) =>
  useQuery<RawNotification[], Error>({
    queryKey: [KEY_BASE, userId] as const,
    queryFn: () => fetchNotifications(userId),
    enabled: Boolean(userId),
  })

/** 2) 새 알림 생성 */
export const useCreateNotification = () => {
  const qc = useQueryClient()

  return useMutation<RawNotification, Error, CreateNotificationRequest>({
    // mutationFn 프로퍼티에 함수 지정
    mutationFn: (body) => createNotification(body),
    onSuccess: (newNoti, body) => {
      // body.userId 대상의 목록을 무효화
      qc.invalidateQueries({ queryKey: [KEY_BASE, body.userId], exact: false })
    },
  })
}

/** 3) 알림 읽음 처리 */
export const useMarkAsRead = () => {
  const qc = useQueryClient()

  return useMutation<void, Error, { id: number; userId: number }>({
    mutationFn: ({ id, userId }) => markNotificationAsRead(id, userId),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: [KEY_BASE, vars.userId], exact: false })
    },
  })
}

/** 4) 알림 전체 삭제 */
export const useClearNotifications = () => {
  const qc = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: (userId) => clearNotifications(userId),
    onSuccess: (_, userId) => {
      qc.invalidateQueries({ queryKey: [KEY_BASE, userId], exact: false })
    },
  })
}
