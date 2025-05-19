"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateComment } from "../hooks/useComment";
import { useAuthStore } from "../common/useAuthStore";
import { CheckDialog } from "@/app/(afterAuth)/participation/Alertmessage";

interface CommentFormProps {
  postId: number;
  onCommentCreated: () => void; // 댓글 작성 성공 시 호출할 콜백
}

const CommentForm = ({ postId, onCommentCreated }: CommentFormProps) => {
  const [content, setContent] = useState("");
  const { mutate: createComment, isLoading } = useCreateComment(postId);
  const userId = useAuthStore((state) => state.userId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({ title: "", description: "" });

  const handleSubmit = () => {
    if (!content.trim()) return;
    if (!userId) return;
    createComment(
      { postId, userId, content },
      {
        onSuccess: () => {
          console.log("댓글 작성 성공! onCommentCreated 호출 전");
          onCommentCreated();
          console.log("onCommentCreated 호출 완료");
          setContent("");
        },
        onError: (error) => {
          setDialogMessage({
            title: "댓글 작성 실패!",
            description: error.message || "댓글 작성에 실패했습니다.",
          });
          setDialogOpen(true);
        },
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
        <Button onClick={handleSubmit} disabled={isLoading}>
          작성
        </Button>
      </div>
      <CheckDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        title={dialogMessage.title}
        description={dialogMessage.description}
        onConfirm={() => {}}
      />
    </div>
  );
};

export default CommentForm;
