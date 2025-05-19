// PostDetailPageClient.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchPostDetail, fetchComments } from "@/components/api/postDetailApi";
import PostDetailItem from "@/components/posts/PostDetailItem";
import CommentForm from "@/components/comments/CommentForm";
import CommentList from "@/components/comments/CommentList";
import JoinProfileCard from "@/components/posts/JoinProfileCard";
import ParticipantList from "@/components/posts/ParticipantList";
import { useAcceptedParticipations } from "@/components/hooks/useParticipation";


export default function ClientPostDetail({ postId }: { postId: number }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  // const [participants, setParticipants] = useState([]);
  // const [size, setSize] = useState(4);
  // const page = 0;

  useEffect(() => {
    fetchPostDetail(postId).then((post) => {
      post.createdAt = post.createdAt.replace("T", " ").slice(0, 16);
      post.eventStart = post.eventStart.replace("T", " ").slice(0, 16);
      setPost(post);
    });
  }, [postId]);

  const fetchAndSetComments = () => {
    fetchComments(postId).then(({ comments }) => {
      console.log("새로 받아온 댓글:", comments);

      const formattedComments = comments.map((comment) => ({
        ...comment,
        createdAt: comment.createdAt.replace("T", " ").slice(0, 16),
      }));
      setComments(formattedComments);
    });
  };

  useEffect(() => {
    fetchAndSetComments();
  }, [postId]);

  const { data: pageResp, isLoading, isError } = useAcceptedParticipations(postId); // 기본 page = 0, size = 8

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생</p>;

  const participants =
    pageResp?.content.map((item) => ({
      id: item.userId,
      name: item.userName,
    })) ?? [];
  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="flex justify-center px-6 py-10 gap-6">
      <div className="w-[50%]">
        <PostDetailItem post={post} />

        <h3 className="mt-10 mb-3 text-lg font-semibold">댓글</h3>
        <CommentForm postId={postId} onCommentCreated={fetchAndSetComments} />
        <CommentList comments={comments} postId={postId} />
      </div>

      <div className="w-[15%] relative">
        <div className="sticky top-0 flex flex-col gap-4">
          <JoinProfileCard post={post} />
          <ParticipantList participants={participants} />
        </div>
      </div>
    </div>
  );
}
