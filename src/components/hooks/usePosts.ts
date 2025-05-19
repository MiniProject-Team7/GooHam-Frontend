import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Post, FetchPostsResult } from "@/types/post";
import { PageRequestParams } from "@/types/pagination";
import {
  fetchAllPosts,
  fetchPostsByCategory,
  FetchPostsByCategoryOpts,
  fetchPostsByUser,
} from "@/components/api/PostApi";

const QUERY_KEY_BASE = "posts";

/**
 * 1) userId로 필터링 (페이징 없이)
 */
export const useUserPosts = (userId: number) => {
  return useQuery<Post[]>({
    queryKey: [QUERY_KEY_BASE, "user", userId],
    queryFn: () => fetchPostsByUser(userId),
    enabled: !!userId, // userId가 있을 때만 실행
    refetchOnWindowFocus: true, // 탭 복귀 시 자동 재요청
    refetchInterval: 1000 * 60 * 5, // 5분마다 백그라운드 재요청
  });
};

export const useCategoryPosts = (categoryId: number, opts: PageRequestParams = {}) => {
  // 1) categoryId + PageRequestParams 를 합쳐서 FetchPostsByCategoryOpts 생성
  const finalOpts: FetchPostsByCategoryOpts = {
    categoryId,
    ...opts,
  };

  const key = ["posts", "category", finalOpts] as const;

  // 2) React Query 훅
  return useQuery<FetchPostsResult, Error>({
    // a) 키에 finalOpts 전체를 포함해, page/size/sortFields/categoryId가 바뀌면 재요청
    queryKey: key,

    // b) 실제 호출에는 finalOpts 만 넘기면 됩니다
    queryFn: () => fetchPostsByCategory(finalOpts),

    // c) 옵션
    enabled: finalOpts.categoryId != null,
    refetchOnWindowFocus: true, // 탭 포커스 복귀 시 재요청
    refetchInterval: 1000 * 60 * 5, // 5분마다 자동으로 갱신
  });
};

export const useAllPosts = () => {
  return useQuery<Post[], Error>({
    // 1) 쿼리 키: 모든 포스트
    queryKey: ["posts", "all"],

    // 2) fetch 함수: fetchAllPosts 그대로 넘기면 Promise<Post[]>
    queryFn: () => fetchAllPosts(),

    // 3) 옵션

    // 탭으로 돌아올 때마다 재요청
    refetchOnWindowFocus: true,
    // 5분마다 백그라운드에서 다시 불러오기
    refetchInterval: 1000 * 60 * 5,
    // 에러 시 한 번만 재시도
    retry: 1,
  });
};

export const useRefreshPosts = () => {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({
      queryKey: [QUERY_KEY_BASE], // "posts" 네임스페이스 하위 모두 무효화
      exact: false, // 기본값(false)이어서 하위 키도 포함
    });
  };
};
