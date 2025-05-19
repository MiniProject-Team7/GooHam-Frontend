// api/postApi.ts
import axiosInstance from "@/utils/axiosInstance";
import { RawPost, RawPageResponse, Post, FetchPostsResult } from "@/types/post";
import { buildPageRequest, PageRequestParams } from "@/types/pagination";

// 공통: RawPost → Post 매핑
export const mapRawToPost = (raw: RawPost): Post => ({
  id: raw.id,
  userName: raw.userName,
  title: raw.title,
  content: raw.content,
  maxParticipants: raw.maxParticipants,
  currentParticipants: raw.currentParticipants,
  categoryName: raw.categoryName,
  status: raw.status,
  scheduleStart: raw.scheduleStart,
  scheduleEnd: raw.scheduleEnd,
  location: raw.location,
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
  eventStart: raw.eventStart,
  images: raw.postImage,
});

/**
 * 1) userId 로 검색 (페이징 없이 전체 가져오기)
 */
export const fetchPostsByUser = async (userId: number): Promise<Post[]> => {
  const { data: resp } = await axiosInstance.get<{
    status: string;
    message: string;
    data: RawPageResponse<RawPost>;
  }>("/posts", {
    params: { userId },
  });

  return resp.data.content.map(mapRawToPost);
};

/**
 * 2) categoryId 로 검색 (페이징 필요)
 */
export interface FetchPostsByCategoryOpts extends PageRequestParams {
  categoryId: number;
}
export const fetchPostsByCategory = async (
  opts: FetchPostsByCategoryOpts
): Promise<FetchPostsResult> => {
  // buildPageRequest 로 page/size/sort 생성
  const base = buildPageRequest(opts);
  // categoryId 만 추가
  const params = { ...base, categoryId: opts.categoryId };

  const { data: resp } = await axiosInstance.get<{
    status: string;
    message: string;
    data: RawPageResponse<RawPost>;
  }>("/posts", {
    params,
  });

  const { content, pageNumber, pageSize, totalPages, totalElements, last, first } = resp.data;

  return {
    posts: content.map(mapRawToPost),
    pagination: { pageNumber, pageSize, totalPages, totalElements, last, first },
  };
};

/**
 * 3) 전체 검색 (페이징 없이 전체 가져오기)
 */
export const fetchAllPosts = async (): Promise<Post[]> => {
  const { data: resp } = await axiosInstance.get<{
    status: string;
    message: string;
    data: RawPageResponse<RawPost>;
  }>("/posts", {
    params: {
      page: 0,
      size: 4,
    },
  });

  return resp.data.content.map(mapRawToPost);
};

export const fetchAllPostsPaged = async (opts: PageRequestParams): Promise<FetchPostsResult> => {
  const base = buildPageRequest(opts);

  const { data: resp } = await axiosInstance.get<{
    status: string;
    message: string;
    data: RawPageResponse<RawPost>;
  }>("/posts", {
    params: base,
  });

  const { content, pageNumber, pageSize, totalPages, totalElements, last, first } = resp.data;

  return {
    posts: content.map(mapRawToPost),
    pagination: { pageNumber, pageSize, totalPages, totalElements, last, first },
  };
};
