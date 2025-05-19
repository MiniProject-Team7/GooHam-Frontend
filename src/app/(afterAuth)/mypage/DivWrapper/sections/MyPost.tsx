"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/common/PostCard";
import { useAuthStore } from "@/components/common/useAuthStore";
import { usePresignedUrls } from "@/components/hooks/usePresignedImage";
import type { Post } from "@/types/post";

export interface UserComment {
  id: number;
  userName: string;
  content: string;
  createdAt: string;
  profileImg: string;
  postId: number;
}

interface CommentsApiResponse {
  status: string;
  message: string;
  data: {
    content: UserComment[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
  };
}

type UserInfo = {
  member_name: string;
  birth_date: string;
  member_email: string;
  profile_image: string; // S3 키
};

export const MyPost = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = useAuthStore((state) => state.userId);
  const email  = useAuthStore((state) => state.email);

  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<UserComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  // ─── 여기에 presign 훅을 최상단에 호출 ─────────────────────────────────
  const presignedProfile = usePresignedUrls(userInfo?.profile_image ?? null);
  // presignedProfile 이 string|null|string[] 이므로, 단일 string 으로 정리
  const avatarSrc =
    typeof presignedProfile === "string"
      ? presignedProfile
      : "/images/default_profile.png";

  // ─── 사용자 정보 로드 ────────────────────────────────────────────────────
  useEffect(() => {
    if (!email) {
      setError("로그인이 필요합니다.");
      return;
    }
    setLoading(true);
    axiosInstance
      .get<UserInfo>(`/users/mypage/detail?member_email=${encodeURIComponent(email)}`)
      .then((res) => {
        setUserInfo(res.data);
        setError(null);
      })
      .catch(() => {
        setError("사용자 정보를 불러오는데 실패했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email]);

  // ─── 게시글 & 댓글 로드 ─────────────────────────────────────────────────
  useEffect(() => {
    if (!userId) return;

    // 내 게시글
    axiosInstance
      .get<{ status: string; message: string; data: Post[] }>(`/posts/users/${userId}`)
      .then((res) => {
        setMyPosts(
          res.data.data.map((p) => ({
            ...p,
            images: p.images ?? [],
          }))
        );
      })
      .catch((err) => console.error("게시글 불러오기 실패", err));

    // 내 댓글 (페이징 전부)
    setLoadingComments(true);
    axiosInstance
      .get<CommentsApiResponse>(`/comments/users/${userId}?page=0`)
      .then(async (firstRes) => {
        let all = firstRes.data.data.content;
        const total = firstRes.data.data.totalPages;
        for (let p = 1; p < total; p++) {
          const res = await axiosInstance.get<CommentsApiResponse>(
            `/comments/users/${userId}?page=${p}`
          );
          all = all.concat(res.data.data.content);
        }
        setComments(
          all.map((c) => ({
            ...c,
            createdAt: c.createdAt.split("T")[0],
          }))
        );
      })
      .catch((err) => console.error("댓글 불러오기 실패", err))
      .finally(() => setLoadingComments(false));
  }, [userId]);

  // ─── 로딩/에러/없음 처리 ───────────────────────────────────────────────
  if (loading)        return <div>로딩중...</div>;
  if (error)          return <div className="text-red-500">{error}</div>;
  if (!userInfo)      return <div>사용자 정보가 없습니다.</div>;

  // ─── JSX 반환 ─────────────────────────────────────────────────────────
  return (
    <section className="w-full max-w-[940px] mx-auto mt-4">
      {/* 사용자 정보 */}
      <div className="flex flex-col items-center md:flex-row gap-6">
        <Avatar className="w-[120px] h-[120px]">
          {/* presigned URL 만 사용하도록 변경 */}
          <AvatarImage src={avatarSrc} alt={userInfo.member_name} className="object-cover" />
          <AvatarFallback>{userInfo.member_name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-title-lg">{userInfo.member_name}</h2>
          <p className="text-lable-lg">{userInfo.birth_date}</p>
          <p className="text-lable-lg">{userInfo.member_email}</p>
        </div>
      </div>

      {/* 탭 영역 */}
      <Tabs defaultValue="posts" className="mt-8">
        <TabsList className="gap-6">
          <TabsTrigger value="posts">작성한 게시글</TabsTrigger>
          <TabsTrigger value="comments">작성한 댓글</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6 space-y-6 overflow-auto">
          {myPosts.map((post) => (
            <div key={post.id} className="min-w-[690px] mx-auto">
              <PostCard post={post} />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="comments" className="mt-6 space-y-6">
          {loadingComments ? (
            <p>댓글 불러오는 중…</p>
          ) : comments.length === 0 ? (
            <p>작성한 댓글이 없습니다.</p>
          ) : (
            comments.map((c) => (
              <Card key={c.id} className="p-4 border border-gray-22">
                <div className="flex items-center gap-2">
                  {/* 댓글 아바타는 기존 그대로 */}
                  <Avatar>
                    <AvatarImage src={c.profileImg} />
                    <AvatarFallback>{c.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{c.userName}</p>
                    <p className="text-sm">{c.createdAt}</p>
                  </div>
                </div>
                <p className="mt-2">{c.content}</p>
                <div className="flex justify-end mt-2">
                  <Button variant="default">
                    <a href={`/posts/${c.postId}`}>원글 보러가기</a>
                  </Button>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};
