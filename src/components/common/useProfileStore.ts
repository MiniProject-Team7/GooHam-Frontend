import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/utils/axiosInstance";
import { useAuthStore } from "@/components/common/useAuthStore"
import { API_BASE_URL } from "./config"

export interface RawProfile {
  id: string
  member_email: string
  member_name: string
  member_nickname: string
  profile_image: string
  birth_date: string | null
  member_introduce: string
  member_phone: string
  created_at: string
  updated_at: string
  notification_enable: "0" | "1"
  interests: { category_id: number; name: string }[]
  categoryIds: number[] | null
}

export interface UserProfile {
  id: number
  email: string
  name: string
  nickname: string
  profileImage: string
  birthDate: Date | null
  introduce: string
  phone: string
  createdAt: Date
  updatedAt: Date
  notificationEnabled: boolean
  interests: string[]
  categoryIds: number[]
}


export const useFetchUserProfile = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const email = useAuthStore((s) => s.email )

  return useQuery<UserProfile, Error>({
    // 1) 쿼리 키
    queryKey: ["userProfile"],

    // 2) 실제 데이터를 fetching 하는 함수
    queryFn: async () => {
      const token = localStorage.getItem("accessToken")
      if (!token) throw new Error("No access token")

      const { data: raw } = await axiosInstance.get<RawProfile>(
        "/users/mypage/detail",
         {
          params: { member_email: email },        // ← 여기
        }
      );

      return {
        id: Number(raw.id),
        email: raw.member_email,
        name: raw.member_name,
        nickname: raw.member_nickname,
        profileImage: raw.profile_image,
        birthDate: raw.birth_date ? new Date(raw.birth_date) : null,
        introduce: raw.member_introduce,
        phone: raw.member_phone,
        createdAt: new Date(raw.created_at),
        updatedAt: new Date(raw.updated_at),
        notificationEnabled: raw.notification_enable === "1",
        interests: raw.interests.map((i) => i.name),
        categoryIds: raw.categoryIds ?? [],
      }
    },

    // 3) 옵션
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    retry: 1,
  })
}
