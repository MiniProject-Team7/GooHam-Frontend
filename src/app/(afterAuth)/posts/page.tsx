"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// import { Post } from "@/types/post";
import { ChevronLeft, ChevronRight, Pen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { dummyPosts } from "./postData";
import { Post } from "@/types/post";
import PostCard from "@/components/common/PostCard";
import axiosInstance from "@/utils/axiosInstance";
import { Separator } from "@/components/ui/separator";
import { fetchAllPosts, fetchAllPostsPaged, fetchPostsByCategory } from "@/components/api/PostApi";

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
  const [allPosts, setAllPosts] = useState<Post[]>([]); // API에서 받아온 전체 게시글
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); // 카테고리에 따라 필터링된 게시글
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 8,
    totalPages: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState(0);

  const perPage = 8;
  const totalPages = Math.ceil(filteredPosts.length / perPage);

  const fetchPosts = async (categoryId: number, page = 0) => {
    try {
      let res;
      if (categoryId === 0) {
        res = await fetchAllPostsPaged({ page, size: pageInfo.size });
      } else {
        res = await fetchPostsByCategory({
          page,
          size: pageInfo.size,
          categoryId,
        });
      }
      setPosts(res.posts);
      setPageInfo((prev) => ({
        ...prev,
        page: res.pagination.pageNumber,
        totalPages: res.pagination.totalPages,
      }));
    } catch (error) {
      console.error("게시글 요청 실패:", error);
    }
  };

  useEffect(() => {
    fetchPosts(selectedCategory);
  }, [selectedCategory]);

  const handleSelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handlePageChange = (newPage: number) => {
    fetchPosts(selectedCategory, newPage);
  };

  return (
    <main className="px-8 py-12 max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-left">게시글</h1>
      <div className="flex flex-row  justify-between ">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Separator className="my-5" />

      {/* 페이징 */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="ghost"
          disabled={pageInfo.page === 0}
          onClick={() => handlePageChange(pageInfo.page - 1)}
        >
          <ChevronLeft />
        </Button>

        <span className="text-sm">
          {pageInfo.totalPages === 0 ? "0 / 0" : `${pageInfo.page + 1} / ${pageInfo.totalPages}`}
        </span>

        <Button
          variant="ghost"
          disabled={pageInfo.page + 1 >= pageInfo.totalPages}
          onClick={() => handlePageChange(pageInfo.page + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </main>
  );
}
