// api/postDetailApi.ts
import axiosInstance from "@/utils/axiosInstance";
import { RawPost, RawPageResponse, Post, FetchPostsResult } from "@/types/post";
import { buildPageRequest, PageRequestParams } from "@/types/pagination";
import { mapRawToPost } from "./PostApi";

export const fetchPostById = async (postId: number): Promise<Post> => {
  const { data: resp } = await axiosInstance.get<{
    status: string;
    message: string;
    data: RawPost;
  }>(`/posts/${postId}`);

  return mapRawToPost(resp.data);
};

export interface Comment {
  userName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentPagination {
  currentPage: number;
  totalPages: number;
  totalComments: number;
}

export interface FetchCommentsResult {
  postId: number;
  comments: Comment[];
  pagination: CommentPagination;
}

export const fetchCommentsByPostId = async (
  postId: number,
  page: number = 0,
  size: number = 10,
  sort: "asc" | "desc" = "desc"
): Promise<FetchCommentsResult> => {
  const { data: resp } = await axiosInstance.get<{
    post_id: number;
    comments: {
      user_name: string;
      content: string;
      created_at: string;
      updated_at: string;
    }[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_comments: number;
    };
  }>(`/comments/${postId}`, {
    params: { page, size, sort },
  });

  return {
    postId: resp.post_id,
    comments: resp.comments.map((comment) => ({
      userName: comment.user_name,
      content: comment.content,
      createdAt: comment.created_at,
      updatedAt: comment.updated_at,
    })),
    pagination: {
      currentPage: resp.pagination.current_page,
      totalPages: resp.pagination.total_pages,
      totalComments: resp.pagination.total_comments,
    },
  };
};

export interface FetchPostDetailResult {
  post: Post;
  comments: Comment[];
  pagination: CommentPagination;
}

export const fetchPostDetail = async (postId: number): Promise<Post> => {
  const response = await axiosInstance.get<{ status: string; message: string; data: RawPost }>(
    `/posts/${postId}`
  );
  const post = mapRawToPost(response.data.data);
  console.log("Post data: ", response.data);
  return post;
};

export const fetchComments = async (
  postId: number,
  page = 0,
  size = 10,
  sort = "desc"
): Promise<{ comments: Comment[]; pagination: CommentPagination }> => {
  const response = await axiosInstance.get<{
    status: string;
    message: string;
    data: {
      content: Comment[];
      pagination: CommentPagination;
    };
  }>(`/comments/${postId}`, {
    params: { page, size, sort },
  });
  console.log("Comment data: ", response.data);
  return {
    comments: response.data.data.content,
    pagination: response.data.data.pagination,
  };
};
