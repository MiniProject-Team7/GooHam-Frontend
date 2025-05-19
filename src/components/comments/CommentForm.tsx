"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateComment } from "../hooks/useComment";
import { useAuthStore } from "../common/useAuthStore";

const CommentForm = ({ postId }: { postId: number }) => {
  const [content, setContent] = useState("");
  const { mutate: createComment, isLoading } = useCreateComment(postId);
  const userId = useAuthStore((state) => state.userId);
  const handleSubmit = () => {
    if (!content.trim()) return;
    if (!userId) return;
    createComment(
      { postId, userId, content },
      {
        onSuccess: () => setContent(""),
        onError: (error) => alert("댓글 작성 실패: " + error.message),
      }
    );
  };

  return (
    <div className="rounded-xl p-4 mb-6 bg-white">
      <Textarea
        placeholder="댓글을 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className=" mb-3 resize-none"
        rows={3}
      />
      <div className="text-right">
        <Button onClick={handleSubmit}>작성</Button>
      </div>
    </div>
  );
};

export default CommentForm;
