"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardContent, CardFooter,} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const cards = [
  { title: "첫 번째 카드", desc: "이곳에 설명이 들어갑니다." },
  { title: "두 번째 카드", desc: "원하는 컴포넌트를 자유롭게 넣어보세요." },
  { title: "세 번째 카드", desc: "버튼이나 리스트도 OK!" },
];

export default function HomePage() {
  const [emblaApi, setEmblaApi] = React.useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);

  // Embla가 초기화된 후 API를 저장하고, 슬라이드 개수 세팅
  const handleApiInit = React.useCallback((api: CarouselApi) => {
    setEmblaApi(api);
    setSlideCount(api.scrollSnapList().length);
    // onSelect 콜백 등록
    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, []);

  const posts = [
    { id: 1, title: "게시물 제목", author: "/avatar.png", status: "모집 중" },
    { id: 2, title: "게시물 제목", author: "/avatar.png", status: "모집 중" },
    { id: 3, title: "게시물 제목", author: "/avatar.png", status: "모집 중" },
    { id: 4, title: "게시물 제목", author: "/avatar.png", status: "모집 중" },
    { id: 5, title: "게시물 제목", author: "/avatar.png", status: "모집 중" },
    { id: 6, title: "게시물 제목", author: "/avatar.png", status: "모집 중" },
    { id: 7, title: "게시물 제목", author: "/avatar.png", status: "모집 중" },
    /* … */
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto py-6">
      {/* 1행: 캐러셀 (가로 전체) */}
      <div>
        <Carousel
          opts={{ loop: true, align: "center" }}
          className="relative w-full max-w-full mx-auto h-64"
          setApi={handleApiInit}
        >
          <CarouselContent className="flex gap-6 h-64">
            {cards.map((slide, idx) => (
              <CarouselItem key={idx} className="pl-4">
                <div className="h-full w-full bg-yellow-200 rounded-lg p-6 flex flex-col items-center justify-center">
                  <h3 className="text-heading-lg mb-2 text-center">
                    {slide.title}
                  </h3>
                  <p className="text-body-md-regular mb-4 text-center">
                    {slide.desc}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            variant="ghost"
            className="left-2 bg-white/50 hover:bg-white/70"
          />
          <CarouselNext
            variant="ghost"
            className="right-2 bg-white/50 hover:bg-white/70"
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 text-white rounded px-5 py-1 text-sm">
            {selectedIndex + 1} / {slideCount}
          </div>
        </Carousel>
      </div>

      {/* 2행: 게시물 + 프로필 */}
      <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr] py-6 gap-6">
        {/* 2-1) 게시물 목록 섹션 */}
        <div className="space-y-6">
          {/* 제목 */}
          <h2 className="px-4 py-10 text-heading-lg font-bold">게시물 목록</h2>

          {/* 카드 그리드: 모바일 1열, sm 이상 2열 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.id}className="grid gap-6 px-10
              [grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))]
              ">
                <CardHeader className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author} alt="작성자 아바타" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <CardTitle>{post.title}</CardTitle>
                  </div>
                  <Badge variant="secondary">{post.status}</Badge>
                </CardHeader>
                <CardContent>내용이 들어갑니다.</CardContent>
                <CardFooter className="text-right">
                  <Button variant="link">자세히 보기</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* 2-2) 사이드바 프로필 (sticky) */}
        <aside className="sticky top-6 self-start mt-6 justify-self-center">
          <Card className="p-4 w-90 h-100">
            <CardHeader className="flex flex-col items-center space-y-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/my-avatar.png" alt="내 아바타" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>

              <CardContent className = "flex flex-col items-baseline space-y-5 bg-color-black/22 w-70">
                <h3 className = "text-title-small">홍길동</h3>
                <div className="text-sm text-muted-foreground">
                  hong@email.com
                </div>
                <Button variant="default" size="sm">
                  프로필 수정하기
                </Button>
              </CardContent>
            </CardHeader>
          </Card>
        </aside>
      </div>
    </div>
  );
}
