import React, { JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

import PostItem from "@/components/posts/PostItem";

// 게시글 데이터
const posts = [
  {
    id: 3,
    userName: "홍길동",
    title: "서울 한강 러닝 같이 하실 분",
    content: "이번 주말에 한강에서 러닝하실 분을 모집합니다!",
    image: "/images/cat.jpg",
    maxParticipants: 5,
    currentParticipants: 2,
    categoryName: ["스포츠", "일상"],
    status: "모집완료",
    scheduleStart: "2025-05-10 09:00",
    scheduleEnd: "2025-05-10T11:00:00",
    location: "서울 여의도 한강공원",
    createdAt: "2025-05-01T14:00:00",
    updatedAt: "2025-05-01T14:00:00",
  },
  {
    id: 2,
    userName: "이영희",
    title: "비건 카페 탐방 같이 가실 분",
    content: "비건 디저트를 좋아하시는 분들과 소모임을 갖고 싶어요!",
    image: "/images/cat.jpg",
    maxParticipants: 3,
    currentParticipants: 1,
    categoryName: ["일상", "음식"],
    status: "모집 중",
    scheduleStart: "2025-05-15 14:00",
    scheduleEnd: "2025-05-15T16:00:00",
    location: "서울 성수동 카페 거리",
    createdAt: "2025-05-05T10:30:00",
    updatedAt: "2025-05-05T10:30:00",
  },
];

// 댓글 데이터
const comments = [
  {
    id: 1,
    title: "게시물 제목",
    author: "홍길동",
    time: "작성 시간",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has",
    image: "https://c.animaapp.com/Y3JyHhbU/img/rectangle-32.svg",
  },
  {
    id: 2,
    title: "게시물 제목",
    author: "홍길동",
    time: "작성 시간",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has",
    image: "https://c.animaapp.com/Y3JyHhbU/img/rectangle-32-1.svg",
  },
];

export const MyPost = (): JSX.Element => {
  return (
    <section className="w-full max-w-[940px] mx-auto mt-[10px]">
      {/* 사용자 정보 */}
      <div className="flex flex-col items-center md:items-start md:flex-row gap-6">
        <Avatar className="w-[120px] h-[120px]">
          <AvatarImage
            src="https://c.animaapp.com/Y3JyHhbU/img/image-4-1@2x.png"
            alt="Profile"
            className="object-cover"
          />
          <AvatarFallback>홍길동</AvatarFallback>
        </Avatar>

        <div className="flex flex-col mt-[30px]">
          <div className="flex items-center gap-4">
            <h2 className="text-title-lg">홍길동</h2>
            <span className="text-lable-lg">2000.00.00</span>
          </div>

          <p className="text-lable-lg text-center md:text-left">honghong@test.com</p>
        </div>
      </div>

      {/* 탭 영역 */}
      <Tabs defaultValue="posts" className="mt-8">
        <TabsList className="w-full justify-start gap-6 bg-transparent h-auto p-0">
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
        <TabsContent value="posts" className="mt-6 space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-xl">
              <PostItem post={post} />
            </div>
          ))}
        </TabsContent>

        {/* 작성한 댓글 */}
        <TabsContent value="comments" className="mt-6 space-y-6">
          {comments.map((comment) => (
            <Card key={comment.id} className="border border-gray-200 rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-[60px] h-[60px] bg-cover bg-center rounded"
                    style={{ backgroundImage: `url(${comment.image})` }}
                  />

                  <div className="flex-1">
                    <div className="text-base font-semibold text-black">{comment.author}</div>
                    <div className="text-sm text-black">{comment.time}</div>
                    <p className="mt-4 text-sm text-black">{comment.content}</p>

                    <div className="flex justify-end mt-4">
                      <Button
                        variant="outline"
                        className="h-[30px] text-primary-500 border-primary-500 text-sm"
                      >
                        원글 보기
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};
