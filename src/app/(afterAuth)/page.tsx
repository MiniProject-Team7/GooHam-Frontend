"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { statusToBadgeVariant } from "@/utils/statusVariant";
import { useAllPosts } from "@/components/hooks/usePosts";
import { useFetchUserProfile } from "@/components/common/useProfileStore";
import { usePresignedUrls } from "@/components/hooks/usePresignedImage";
import type { Post } from "@/types/post";
import Link from "next/link";

const cards = [
  { img: "Carousel_1.png", category: 1, path: "/posts/category/여행" },
  { img: "Carousel_2.png", category: 2, path: "/posts/category/공동구매" },
  { img: "Carousel_3.png", category: 3, path: "/posts/category/취미오락" },
  { img: "Carousel_4.png", category: 4, path: "/posts/category/문화예술" },
  { img: "Carousel_5.png", category: 5, path: "/posts/category/행사" },
];

export default function HomePage() {
  const [emblaApi, setEmblaApi] = React.useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);

  const router = useRouter();
  const { data: profile } = useFetchUserProfile();
  const imageKey = profile?.profileImage;
  const presigned = usePresignedUrls(imageKey ?? "");
  const defaultAvatar = "/images/default_image.png";

  const avatarSrc = React.useMemo(() => {
    if (presigned === null) return defaultAvatar;
    if (Array.isArray(presigned)) return presigned[0] ?? defaultAvatar;
    return presigned;
  }, [presigned]);

  const handleApiInit = React.useCallback((api: CarouselApi) => {
    setEmblaApi(api);
    setSlideCount(api.scrollSnapList().length);
    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, []);

  const { data: allPosts, isLoading, isError } = useAllPosts();

  return (
    <div className="relative w-full max-w-7xl mx-auto py-6">
      {/* 1행: 캐러셀 */}
      <div className="overflow-hidden rounded-2xl">
        <Carousel
          opts={{ loop: true, align: "center" }}
          className="relative w-full max-w-full mx-auto h-64 overflow-hidden"
          setApi={handleApiInit}
        >
          <CarouselContent className="flex gap-6 h-64">
            {cards.map((slide, idx) => (
              <CarouselItem key={idx} className="pl-4">
                <div
                  onClick={() => router.push(`/posts?category=${slide.category}`)}
                  className="h-full w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                >
                  <img
                    src={`/images/${slide.img}`}
                    alt={`카테고리 ${slide.category}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious variant="ghost" className="left-2 bg-white/50 hover:bg-white/70" />
          <CarouselNext variant="ghost" className="right-2 bg-white/50 hover:bg-white/70" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 text-white rounded px-5 py-1 text-sm">
            {selectedIndex + 1} / {slideCount}
          </div>
        </Carousel>
      </div>

      {/* 2행: 게시물 + 프로필 */}
      <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr] py-6 gap-6">
        {/* 게시물 목록 */}
        <div className="space-y-6">
          <h2 className="px-4 py-10 text-heading-lg font-bold">게시물 목록</h2>
          {isLoading && <p className="px-4">로딩 중…</p>}
          {isError && <p className="px-4 text-red-500">게시물을 불러오는 데 실패했습니다.</p>}

          {!isLoading && !isError && (
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))]">
              {allPosts?.map((post: Post) => (
                <Card
                  key={post.id}
                  className="rounded-2xl overflow-hidden flex flex-col hover:shadow-lg border border-gray-22"
                >
                  <CardHeader className="flex items-start justify-between px-4 pt-4 pb-2">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-base">{post.title}</CardTitle>
                      <div className="text-xs text-muted-foreground">{post.userName}</div>
                    </div>
                    <CardAction>
                      <Badge
                        variant={statusToBadgeVariant(post.status)}
                        className="px-3 py-1 rounded-full text-xs"
                      >
                        {post.status}
                      </Badge>
                    </CardAction>
                  </CardHeader>

                  <CardContent className="px-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.scheduleStart.slice(0, 10)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{post.location}</span>
                    </div>
                  </CardContent>

                  <div className="px-4">
                    <Badge variant="default" className="px-2 py-1 rounded-full text-xs">
                      {post.categoryName}
                    </Badge>
                  </div>

                  <CardFooter className="px-4 pb-4 pt-2">
                    <Button variant="default" className="w-full py-2 text-sm">
                       <Link href={`/postDetail/${post.id}`}>자세히 보기</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* 프로필 사이드바 */}
        <aside className="sticky top-6 self-start mt-12 justify-self-end">
          <Card className="p-6 w-90 rounded-2xl border border-gray-22">
            <CardTitle className="text-lg font-bold mb-4">마이 프로필</CardTitle>
            <div className="flex flex-col items-center space-y-3 mb-6">
              <Avatar className="w-20 h-20">
                {avatarSrc ? (
                  <AvatarImage src={avatarSrc} alt="내 아바타" />
                ) : (
                  <AvatarFallback>ME</AvatarFallback>
                )}
              </Avatar>
              <h3 className="text-base font-semibold">{profile?.nickname}</h3>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
              <Button variant="edit" size="sm" className="mt-2 w-full">
                <Link href={`/mypage`}>프로필 수정하기</Link>
              </Button>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">관심 카테고리</div>
              <div className="flex flex-wrap gap-2">
                {profile?.interests.map((cat) => (
                  <Badge key={cat} variant="default" className="px-3 py-1 rounded-full text-sm">
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
