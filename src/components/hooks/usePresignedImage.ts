import { useQueries } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

type MaybeStringArray = string | string[];

/**
 * s3Key가 단일 문자열이든, 문자열 배열이든,
 * 내부에서는 배열로 정규화한 뒤 presign URL을 가져옵니다.
 */
export function usePresignedUrls(keys: MaybeStringArray): string | string[] | null {
  const keyList = keys === null ? [] : Array.isArray(keys) ? keys : [keys];

  const results = useQueries({
    queries: keyList.map((key) => ({
      queryKey: ["presignImage", key] as const,
      queryFn: async () => {
        if (!key) throw new Error("No image key");
        const { data } = await axiosInstance.get<{ url: string }>(
          "/images/presign",
          { params: { key } }
        );
        return data.url;
      },
      enabled: Boolean(key),
      staleTime: 1000 * 60 * 5,
      retry: 1,
    })),
  });

  if (keys === null) {
    return null;
  }

  // 배열 입력이면 배열 출력, 단일 입력이면 첫 번째 URL만 반환
  const urls = results.map((r) => r.data ?? null).filter((url): url is string => url !== null);
  return Array.isArray(keys) ? urls : urls[0] ?? null;
}