"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "../ui/card";
import { Button } from "@/components/ui/button";
//import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/types/comment";
import { ConfirmDialog } from "@/app/(afterAuth)/participation/Alertmessage";
import { useComment, useCreateComment } from "../hooks/useComment";
import { useAuthStore } from "../common/useAuthStore";

const CommentItem = ({ comment, postId }: { comment: Comment; postId: number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [currentContent, setCurrentContent] = useState(comment.content);
  const [isDeleted, setIsDeleted] = useState(false);

  const [content, setContent] = useState("");
  const { updateComment, deleteComment } = useComment(postId);

  const userId = useAuthStore((state) => state.userId);

  const handleSave = () => {
    if (!userId) {
      console.log("user id 정보가 존재하지 않습니다.");
      return;
    }
    console.log("수정된 내용:", editedContent);
    setCurrentContent(editedContent);
    setIsEditing(false);
    updateComment(
      {
        postId,
        commentId: Number(comment.id),
        userId: userId,
        content: editedContent,
      },
      {
        onSuccess: () => {
          setCurrentContent(editedContent);
          setIsEditing(false);
        },
        onError: (error) => alert("댓글 수정 실패: " + error.message),
      }
    );
  };

  const handleDelete = () => {
    console.log("댓글 삭제됨:", comment.id);
    setIsDeleted(true);
    deleteComment(
      {
        postId,
        commentId: Number(comment.id),
        userId,
      },
      {
        onSuccess: () => {
          setIsDeleted(true);
        },
        onError: (error) => alert("댓글 삭제 실패: " + error.message),
      }
    );
  };

  if (isDeleted) return null;

  const handleCancel = () => {
    setEditedContent(currentContent);
    setIsEditing(false);
  };

  return (
    <Card className="p-4 mb-4 bg-white">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={comment.profileImg} />
          <AvatarFallback>{comment.userName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{comment.userName}</p>
          <p className="text-sm text-black">{comment.createdAt}</p>
        </div>
      </div>

      {isEditing ? (
        <Textarea
          className="mt-2 text-black"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <p className="mt-2 text-black">{currentContent}</p>
      )}
      {comment.userId === Number(userId) && (
        <div className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button size="sm" variant="default" onClick={handleSave}>
                저장
              </Button>
              <Button size="sm" variant="secondary" onClick={handleCancel}>
                취소
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                className="text-sm text-gray-40 hover:text-gray-50"
                onClick={() => setIsEditing(true)}
              >
                수정하기
              </Button>

              <ConfirmDialog
                trigger={
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-sm text-gray-40 hover:text-gray-50"
                  >
                    삭제하기
                  </Button>
                }
                title="댓글을 삭제하시겠습니까?"
                description="삭제된 댓글은 복구할 수 없습니다."
                onConfirm={handleDelete}
              />
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default CommentItem;
