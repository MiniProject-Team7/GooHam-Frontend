"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ChevronLeft, ChevronRight, Pen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PostCard from "@/components/common/PostCard";
import { Separator } from "@/components/ui/separator";
import { useMyCategoryPosts } from "@/components/hooks/usePosts";
import { PostSkeletonCard } from "@/components/posts/PostSkeletonCard";

const categories = [
  { id: 0, name: "전체" },
  { id: 1, name: "스포츠" },
  { id: 2, name: "일상" },
  { id: 3, name: "자기계발" },
  { id: 4, name: "공동구매" },
  { id: 5, name: "여행" },
  { id: 6, name: "음식" },
  { id: 7, name: "취미/오락" },
  { id: 8, name: "인문/예술" },
  { id: 9, name: "행사" },
  { id: 10, name: "기타" },
];

export default function Posts() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 8 });

  const { data, isLoading, error } = useMyCategoryPosts(selectedCategory, {
    page: pageInfo.page,
    size: pageInfo.size,
  });

  const handleSelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setPageInfo((prev) => ({ ...prev, page: 0 })); // 카테고리 바뀌면 페이지 초기화
  };

  const handlePageChange = (newPage: number) => {
    setPageInfo((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <main className="px-8 py-12 max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-left">게시글</h1>

      <div className="flex flex-row justify-between">
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "selected" : "default"}
              className={`px-5 mx-0.5 text-lg cursor-pointer rounded-full transition duration-200 ease-in-out
            ${selectedCategory === category.id ? "scale-105 shadow-md" : ""}`}
              onClick={() => handleSelect(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
        <Link href="/posts/write">
          <Button
            variant="outline"
            className="ml-auto flex items-center gap-1 text-lg rounded-[20px]"
          >
            <Pen className="w-4 h-4" /> 글쓰기
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostSkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">에러 발생: {error.message}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <Separator className="my-5" />

          {/* 페이징 */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="ghost"
              disabled={data?.pagination.pageNumber === 0}
              onClick={() => handlePageChange(data!.pagination.pageNumber - 1)}
            >
              <ChevronLeft />
            </Button>

            <span className="text-sm">
              {data?.pagination.totalPages === 0
                ? "0 / 0"
                : `${data?.pagination.pageNumber + 1} / ${data?.pagination.totalPages}`}
            </span>

            <Button
              variant="ghost"
              disabled={data?.pagination.pageNumber + 1 >= data?.pagination.totalPages}
              onClick={() => handlePageChange(data!.pagination.pageNumber + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
