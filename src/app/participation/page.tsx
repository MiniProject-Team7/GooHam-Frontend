"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { allPosts, allApplications } from "./participtiondata";
import { ParticipationCard } from "@/components/common/ParticipationCard";
import PostCard from "@/components/common/PostCard";
import { dummyPosts } from "../posts/postData";

export default function ParticipationManagementPage() {
  // 더미 데이터 예시

  const postsPerPage = 2;
  const appsPerPost = 8;
  const totalPages = Math.ceil(dummyPosts.length / postsPerPage);

  const [page, setPage] = React.useState(1);

  const startIdx = (page - 1) * postsPerPage;
  const currentPosts = dummyPosts.slice(startIdx, startIdx + postsPerPage);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-6">
      {currentPosts.map((post) => {
        // 해당 게시물의 신청 리스트, 최대 6개
        const apps = (allApplications[post.id] || []).slice(0, appsPerPost);

        return (
          <div key={post.id} className="space-y-6">
            {/* 게시물 카드 */}
            <PostCard post={post} />

            {/* 참여 신청 카드 그리드: 2행 x 3열 */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {apps.map((app) => (
                <ParticipationCard key={app.id} data={app} />
              ))}
            </div>

            {/* 구분선 */}
            <Separator />
          </div>
        );
      })}

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="ghost"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          <ChevronLeft />
        </Button>

        <span className="text-sm">
          {page} / {totalPages}
        </span>

        <Button
          variant="ghost"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        >
          <ChevronRight />
        </Button>

        {/* <Select value={String(page)} onValueChange={(v) => setPage(Number(v))}>
          <SelectTrigger className="w-16">
            <SelectValue placeholder="Page" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: totalPages }, (_, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
    </div>
  );
}
