// hooks/useCreateComment.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  CreateCommentRequest,
  deleteComment,
  updateComment,
} from "@/components/api/commentApi";
import { fetchCommentsByPostId } from "../api/postDetailApi";

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Omit<CreateCommentRequest, "postId"> & { postId: number }>({
    mutationFn: (data) => createComment(data),
    onSuccess: () => {
      // 댓글 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};

export const useComment = (postId: number) => {
  const queryClient = useQueryClient();

  const commentQuery = useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsByPostId(postId),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      postId,
      commentId,
      userId,
      content,
    }: {
      postId: number;
      commentId: number;
      userId: number;
      content: string;
    }) => updateComment({ postId, commentId, userId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({
      postId,
      commentId,
      userId,
    }: {
      postId: number;
      commentId: number;
      userId: number;
    }) => deleteComment({ postId, commentId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  return {
    comments: commentQuery.data ?? [],
    isLoading: commentQuery.isLoading,
    isError: commentQuery.isError,
    updateComment: updateMutation.mutate,
    deleteComment: deleteMutation.mutate,
  };
};
