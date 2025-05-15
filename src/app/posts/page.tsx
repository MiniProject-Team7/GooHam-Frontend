"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// import { Post } from "@/types/post";
import { Pen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { dummyPosts } from "./postData";
import { Post } from "@/types/post";
import PostCard from "@/components/common/PostCard";

const exCategories = [
  "전체",
  "스포츠",
  "일상",
  "자기계발",
  "공동구매",
  "여행",
  "음식",
  "취미/오락",
  "인문/예술",
  "기타",
];

export default function Posts() {
  const [allPosts, setAllPosts] = useState<Post[]>([]); // API에서 받아온 전체 게시글
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); // 카테고리에 따라 필터링된 게시글
  /*
  const fetchPosts = async () => {
    try {
      const response = await fetch("/posts");
      const data = await response.json();

      setAllPosts(data);
      setFilteredPosts(data); // 초기에는 전체 게시글 보여줌
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
*/

  const filterPostsByCategory = (category: string) => {
    if (category === "전체") {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(allPosts.filter((post: Post) => post.categoryName === category));
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("전체");

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    // 여기에 게시글 필터 함수 호출 또는 API 요청
    filterPostsByCategory(category);
  };

  useEffect(() => {
    setAllPosts(dummyPosts);
  }, []);

  useEffect(() => {
    filterPostsByCategory("전체");
  }, [allPosts]);

  return (
    <main className="px-8 py-12 max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-left">게시글</h1>
      <div className="flex flex-row  justify-between ">
        <div className="flex flex-wrap gap-2 mb-10">
          {exCategories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "selected" : "default"}
              className={`px-5 mx-0.5 text-lg cursor-pointer rounded-full transition duration-200 ease-in-out
              ${selectedCategory === category ? "scale-105 shadow-md" : ""}`}
              onClick={() => handleSelect(category)}
            >
              {category}
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
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
