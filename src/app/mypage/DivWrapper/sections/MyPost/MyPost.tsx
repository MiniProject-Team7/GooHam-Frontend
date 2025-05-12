import { CalendarIcon, MapPinIcon } from "lucide-react";
import React, { JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs";

// 게시글 데이터
const posts = [
  {
    id: 1,
    title: "게시물 제목",
    status: "모집 중",
    author: "홍길동",
    eventSchedule: "이벤트 일정",
    eventLocation: "이벤트 장소",
    tags: ["Text", "Text", "Text"],
    image: "https://c.animaapp.com/Y3JyHhbU/img/rectangle-31.svg",
  },
  {
    id: 2,
    title: "게시물 제목",
    status: "모집 중",
    author: "홍길동",
    eventSchedule: "이벤트 일정",
    eventLocation: "이벤트 장소",
    tags: ["Text", "Text", "Text"],
    image: "https://c.animaapp.com/Y3JyHhbU/img/rectangle-31-1.svg",
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
    <section className="w-full max-w-[940px] mx-auto mt-[25px]">
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

        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <h2 className="text-[24px] font-semibold [font-family:'Pretendard-SemiBold',Helvetica] text-[#000000] mt-[12px]">
              홍길동
            </h2>
            <span className="text-2xl font-normal [font-family:'Pretendard-Regular',Helvetica] text-[#000000]">
              2000.00.00
            </span>
          </div>

          <p className="text-2xl font-medium [font-family:'Pretendard-Medium',Helvetica] text-[#000000] text-center md:text-left">
            honghong@test.com
          </p>
        </div>
      </div>

      {/* 탭 영역 */}
      <Tabs defaultValue="posts" className="mt-8">
        <TabsList className="w-full justify-start gap-6 bg-transparent h-auto p-0">
          <TabsTrigger
            value="posts"
            className="font-lable-medium text-[16px] tracking-wide leading-[24px] text-[#000000] data-[state=active]:text-primary-500"
          >
            작성한 게시글
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="font-lable-medium text-[16px] tracking-wide leading-[24px] text-[#000000] data-[state=active]:text-primary-500"
          >
            작성한 댓글
          </TabsTrigger>
        </TabsList>

        {/* 작성한 게시글 */}
        <TabsContent value="posts" className="mt-6">
          <Card className="border border-solid border-[#00000038] rounded-xl p-6">
            <CardContent className="p-0 space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="border border-solid border-[#d9d9d9] rounded-xl p-4">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                      <div
                        className="w-full md:w-[280px] h-[200px] bg-cover bg-center rounded-md"
                        style={{ backgroundImage: `url(${post.image})` }}
                      />

                      <div className="w-full md:w-[304px] flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-title-large text-black text-xl font-semibold">
                            {post.title}
                          </h3>
                          <Badge className="bg-secondary-500 text-black rounded-xl px-4 py-1">
                            {post.status}
                          </Badge>
                        </div>

                        <p className="font-title-medium text-black text-base">{post.author}</p>

                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-5 h-5" />
                          <span className="text-sm text-black">{post.eventSchedule}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-3 h-[17px]" />
                          <span className="text-sm text-black">{post.eventLocation}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-surface rounded-2xl border-stroke"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button className="w-full h-10 bg-primary-500 text-white rounded-xl mt-2">
                          자세히 보기
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 작성한 댓글 */}
        <TabsContent value="comments" className="mt-6 space-y-6">
          {comments.map((comment) => (
            <Card key={comment.id} className="border border-solid border-[#00000038] rounded-xl">
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
