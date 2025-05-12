"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CommentForm = () => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    // api 호출
    console.log("댓글 작성:", content);
    setContent("");
  };

  return (
    <div className="border border-gray rounded-xl p-4 mb-6 bg-white">
      <Textarea
        placeholder="댓글을 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border border-gray mb-3 resize-none"
        rows={3}
      />
      <div className="text-right">
        <Button onClick={handleSubmit}>작성</Button>
      </div>
    </div>
  );
};

export default CommentForm;
