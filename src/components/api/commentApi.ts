// api/commentApi.ts
import axiosInstance from "@/utils/axiosInstance";

export interface CreateCommentRequest {
  postId: number;
  userId: number;
  content: string;
}

export const createComment = async (data: CreateCommentRequest): Promise<void> => {
  await axiosInstance.post("/comments", data);
};

// export const fetchComments = async (postId: number): Promise<Comment[]> => {
//   const res = await axiosInstance.get(`/comments/${postId}`);
//   return res.data.data.comments;
// };

export const updateComment = async ({
  postId,
  commentId,
  userId,
  content,
}: {
  postId: number;
  commentId: number;
  userId: number;
  content: string;
}) => {
  return axiosInstance.patch(`/comments/${commentId}`, {
    postId,
    commentId,
    userId,
    content,
  });
};

export const deleteComment = async ({
  postId,
  commentId,
  userId,
}: {
  postId: number;
  commentId: number;
  userId: number;
}) => {
  return axiosInstance.delete(`/comments/${postId}/${commentId}/${userId}`);
};
