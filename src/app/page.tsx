"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardAction} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { statusToBadgeVariant } from "@/utils/statusVariant";

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

  const posts = [{
    id: 1,
    title: "게시물 제목",
    author: "홍길동",
    avatar: "/avatar.png",
    status: "모집 중",
    date: "2025-05-15",
    location: "서울시 강남구",
    interests: ["스포츠", "여행", "음식"],
  },
  {
    id: 2,
    title: "게시물 제목",
    author: "홍길동",
    avatar: "/avatar.png",
    status: "모집 중",
    date: "2025-05-15",
    location: "서울시 성동구",
    interests: ["스포츠", "여행", "음식"],
  },
  {
    id: 3,
    title: "게시물 제목",
    author: "홍길동",
    avatar: "/avatar.png",
    status: "모집 중",
    date: "2025-05-15",
    location: "서울시 강남구",
    interests: ["스포츠", "여행", "음식"],
  },
  {
    id: 4,
    title: "게시물 제목",
    author: "홍길동",
    avatar: "/avatar.png",
    status: "모집 중",
    date: "2025-05-15",
    location: "서울시 성동구",
    interests: ["스포츠", "여행", "음식"],
  },
];


  return (
    <div className="relative w-full max-w-7xl mx-auto py-6">
      {/* 1행: 캐러셀 (가로 전체) */}
      <div className="overflow-hidden rounded-2xl">
        <Carousel
          opts={{ loop: true, align: "center" }}
          className="relative w-full max-w-full mx-auto h-64 overflow-hidden"
          setApi={handleApiInit}
        >
          <CarouselContent className="flex gap-6 h-64">
            {cards.map((slide, idx) => (
              <CarouselItem key={idx} className="pl-4">
                <div className="h-full w-full bg-yellow-200 rounded-2xl p-6 flex flex-col items-center justify-center">
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
          <div
            className="
              grid
              gap-6
              [grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))]
            "
          >
            {posts.map((post) => (
              <Card
                key={post.id}
                className="rounded-2xl w-100 h-65 overflow-hidden flex flex-col hover:shadow-lg"
              >
                {/* 1) 헤더 */}
                <CardHeader className="flex items-start justify-between px-4 pt-4 pb-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12 ring-1 ring-gray-200">
                      <AvatarImage src={post.author} alt="작성자 아바타" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{post.title}</CardTitle>
                      <div className="text-xs text-muted-foreground">{post.author}</div>
                    </div>
                  </div>
                  <CardAction>
                    <Badge variant={statusToBadgeVariant(post.status)} className="px-3 py-1 rounded-full text-xs">
                      {post.status}
                    </Badge>
                  </CardAction>
                </CardHeader>

                {/* 2) 본문: 일정/장소 */}
                <CardContent className="px-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{post.location}</span>
                  </div>
                </CardContent>

                {/* 3) 관심사 태그 */}
                <div className="px-4 flex flex-wrap gap-2">
                  {post.interests.map((tag, i) => (
                    <Badge key={i} variant="default" className="px-2 py-1 rounded-full text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* 4) 자세히 보기 버튼 (푸터) */}
                <CardFooter className="px-4 pb-4 pt-2">
                  <Button variant="default" className="w-full py-2 text-sm">
                    자세히 보기
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* 2-2) 사이드바 프로필 (sticky) */}
        <aside className="sticky top-6 self-start mt-12 justify-self-end">
          <Card className="p-6 w-90 rounded-2xl">
            {/* 1) 카드 제목 */}
            <CardTitle className="text-lg font-bold mb-4">마이 프로필</CardTitle>

            {/* 2) 프로필 정보 */}
            <div className="flex flex-col items-center space-y-3 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/my-avatar.png" alt="내 아바타" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <h3 className="text-base font-semibold">홍길동</h3>
              <p className="text-sm text-muted-foreground">hong@email.com</p>
              <Button variant="edit" size="sm" className="mt-2 w-full">
                프로필 수정하기
              </Button>
            </div>

            {/* 3) 관심 카테고리 */}
            <div className="space-y-2">
              <div className="text-sm font-medium">관심 카테고리</div>
              <div className="flex flex-wrap gap-2">
                {["스포츠", "일상", "자기계발"].map((cat) => (
                  <Badge
                    key={cat}
                    variant="default"
                    className="px-3 py-1 rounded-full text-sm"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
