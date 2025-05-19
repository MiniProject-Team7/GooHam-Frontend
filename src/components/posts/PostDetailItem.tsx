"use client";
import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePresignedUrls } from "@/components/hooks/usePresignedImage";
import { Post } from "@/types/post";
import { useCallback, useState } from "react";
import { useAuthStore } from "../common/useAuthStore";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import { useUserPosts } from "../hooks/usePosts";

const DEFAULT_POST_IMAGE = "/images/default_post.png";

const PostDetailItem = ({ post }: { post: Post }) => {
  // 1) presigned URL 훅 호출 (post.images: string[])
  const presigned = usePresignedUrls(post.images);
  
    // 2) carousel state
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
  const userId = useAuthStore((state) => state.userId);
  const {
    data: posts = [],
    isLoading: userPostIsLoading,
    isError: userPostIsError,
  } = useUserPosts(userId);


  const handleApiInit = React.useCallback((api: CarouselApi) => {
    setEmblaApi(api);
    setSlideCount(api.scrollSnapList().length);
    api.on("select", () => setSelectedIndex(api.selectedScrollSnap()));
  }, []);

  // 3) 필요한 만큼만 URL 배열로 정규화
  const urls = React.useMemo<string[]>(() => {
    if (!presigned) return post.images.map(() => DEFAULT_POST_IMAGE);
    if (Array.isArray(presigned)) {
      return presigned.map((u) => u ?? DEFAULT_POST_IMAGE);
    }
    // (string) 단일값이 들어왔다면 첫 요소로 복제
    return post.images.map(() => presigned);
  }, [presigned, post.images]);

  return (
    <Card className="w-full p-6 rounded-xl mx-auto bg-white">
      <div>
        <Carousel
          opts={{ loop: true, align: "center" }}
          className="relative w-full max-w-full mx-auto h-64"
          setApi={handleApiInit}
        >
          <CarouselContent className="flex gap-6 h-64">
            {urls.map((src, idx) => (
              <CarouselItem key={idx} className="pl-4">
                <div className="h-full w-full overflow-hidden rounded-xl">
                  <img
                    src={src}
                    alt={`${post.title} - ${idx + 1}`}
                    className="w-full h-64 object-cover"
                  />
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
      <div className="flex items-center justify-between mb-1">
        <div className="text-2xl font-bold mb-1">{post.title}</div>
        {!userPostIsLoading &&
          posts.some((userPost) => String(userPost.id) === String(post.id)) && (
            <div className="flex flex-row">
              <Link href="/posts/write">
                <Button
                  variant="outline"
                  className="ml-auto flex items-center gap-1 text-md rounded-[20px] mx-2"
                  onClick={() => {
                    console.log("글 수정 버튼 클릭");
                  }}
                >
                  <Pen className="w-2 h-2" /> 수정
                </Button>
              </Link>
              <Link href="/posts/write">
                <Button
                  variant="outline"
                  className="ml-auto flex items-center gap-1 text-md rounded-[20px]"
                  onClick={() => {
                    console.log("글 수정 버튼 클릭");
                  }}
                >
                  삭제
                </Button>
              </Link>
            </div>
          )}
      </div>
      <div className="text-sm text-gray-500">
        {post.userName} · {post.createdAt}
      </div>
      <div className="flex gap-2 mt-2">
        <Badge>{post.categoryName}</Badge>
      </div>
      <div className="mt-4 bg-pink-50 rounded-xl p-4 text-sm grid grid-cols-2 gap-y-2">
        <div>
          <span className="font-semibold">이벤트 일정</span>
          <br />
          {post.eventStart.replace("T", " ").slice(0, 16)}
        </div>
        <div>
          <span className="font-semibold">참여 인원</span>
          <br />
          {post.currentParticipants}명
        </div>
        <div>
          <span className="font-semibold">이벤트 장소</span>
          <br />
          {post.location}
        </div>
        <div>
          <span className="font-semibold">모집 상태</span>
          <br />
          {post.status}
        </div>
      </div>
      <div className="mt-6 text-gray-700 whitespace-pre-wrap">{post.content}</div>
    </Card>
  );
};

export default PostDetailItem;
