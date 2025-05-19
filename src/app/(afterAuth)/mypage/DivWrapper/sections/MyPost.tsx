"use client";

import React, { JSX, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Button } from "../../../../../components/ui/button";
import { Card } from "../../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs";

import PostCard from "@/components/common/PostCard";

import axiosInstance from "@/utils/axiosInstance";
import { useAuthStore } from "@/components/common/useAuthStore";
//import { Comment } from "@/types/comment";
//import CommentItem from "@/components/comments/CommentItem";
import { Post } from "@/types/post";

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
  profile_image: string;
};

export const MyPost = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useAuthStore((state) => state.userId);
  const [myPosts, setMyPosts] = useState<Post[]>([]);

  const [comments, setComments] = useState<UserComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const email = useAuthStore((state) => state.email);

  useEffect(() => {
    if (!email) {
      setError("로그인이 필요합니다.");
      return;
    }
    setLoading(true);

    axiosInstance
      .get<UserInfo>(`/users/mypage/detail?member_email=${email}`)
      .then((res) => {
        setUserInfo(res.data);
        setError(null);
      })
      .catch((err) => {
        setError("사용자 정보를 불러오는데 실패했습니다.");
        console.error(err);
      });

    setLoading(false);
  }, [email]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get<{
          status: string;
          message: string;
          data: Post[];
        }>(`/posts/users/${user}`);
        // console.log(res.data);
        setMyPosts(
          res.data.data.map((post) => ({
            ...post,
            images: post.images ?? [],
          }))
        );
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
      }
    };

    const fetchComments = async () => {
      setLoadingComments(true);
      try {
        const firstRes = await axiosInstance.get<CommentsApiResponse>(
          `/comments/users/${user}?page=0`
        );
        let allComments = firstRes.data.data.content;
        const totalPages = firstRes.data.data.totalPages;

        //  페이지 한개 이상이면 나머지 페이지도 호출
        for (let page = 1; page < totalPages; page++) {
          const res = await axiosInstance.get<CommentsApiResponse>(
            `/comments/users/${user}?page=${page}`
          );
          allComments = allComments.concat(res.data.data.content);
        }

        // 날짜 형식 변환 및 프로필 이미지 추가
        const apiComments = allComments.map((comment) => ({
          ...comment,
          createdAt: comment.createdAt.split("T")[0],
          profileImg: "https://via.placeholder.com/40",
        }));

        setComments(apiComments);
      } catch (err) {
        console.error("댓글 불러오기 실패", err);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchPosts();
    fetchComments();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;
  if (!userInfo) return <div>사용자 정보가 없습니다.</div>;

  return (
    <section className="w-full max-w-[940px] mx-auto mt-[10px]">
      {/* 사용자 정보 */}
      <div className="flex flex-col items-center md:items-start md:flex-row gap-6">
        <Avatar className="w-[120px] h-[120px]">
          <AvatarImage src={userInfo.profile_image} alt="Profile" className="object-cover" />
          <AvatarFallback>{userInfo.member_name}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col mt-[30px]">
          <div className="flex items-center gap-4">
            <h2 className="text-title-lg">{userInfo.member_name}</h2>
            <span className="text-lable-lg">{userInfo.birth_date}</span>
          </div>

          <p className="text-lable-lg text-center md:text-left">{userInfo.member_email}</p>
        </div>
      </div>

      {/* 탭 영역 */}
      <Tabs defaultValue="posts" className="mt-8 bg-white">
        <TabsList className="w-full justify-start gap-6 bg-white h-auto p-0">
          <TabsTrigger
            value="posts"
            className="cursor-pointer text-title-lg tracking-wide leading-[24px] data-[state=active]:text-primary-500 transition-all duration-300"
          >
            작성한 게시글
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="cursor-pointer text-title-lg tracking-wide leading-[24px] data-[state=active]:text-primary-500 transition-all duration-300"
          >
            작성한 댓글
          </TabsTrigger>
        </TabsList>

        {/* 작성한 게시글 */}
        <TabsContent value="posts" className="mt-6 space-y-6 overflow-x-auto ml-[55px]">
          {Array.isArray(myPosts) &&
            myPosts.map((post) => (
              <div key={post.id} className="inline-block min-w-[690px] max-w-[940px] mx-auto">
                <PostCard post={post} />
              </div>
            ))}
        </TabsContent>

        {/* 작성한 댓글 */}
        <TabsContent value="comments" className="mt-6 space-y-6">
          {loadingComments ? (
            <p>댓글 불러오는 중...</p>
          ) : comments.length === 0 ? (
            <p>작성한 댓글이 없습니다.</p>
          ) : (
            comments.map((comment) => (
              <Card key={comment.id} className="p-4 mb-4 bg-white border border-gray-22">
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

                <p className="mt-2 text-black">{comment.content}</p>

                <div className="flex justify-end mt-2">
                  <Button variant="default" className="px-8 py-3 text-white">
                    <a href={`/posts/${comment.postId}`}>원글 보러가기</a>
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