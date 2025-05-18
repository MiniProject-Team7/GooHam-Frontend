// app/(afterAuth)/participation/page.tsx
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ParticipationCard } from "@/components/common/ParticipationCard";
import PostCard from "@/components/common/PostCard";
import { useUserPosts } from "@/components/hooks/usePosts";
import {
  useParticipations,
  useApproveParticipation,
  useRejectParticipation,
} from "@/components/hooks/useParticipation";
import type { Post } from "@/types/post";
import type { RawParticipation, ParticipationMutationVars } from "@/types/participation";

const postsPerPage = 2;
const appsPerPost = 8;

export default function ParticipationManagementPage() {
  const userId = 1;
  const { data: posts = [], isLoading, isError } = useUserPosts(userId);
  const [page, setPage] = React.useState(1);

  if (isLoading) return <p className="p-8">게시물을 불러오는 중…</p>;
  if (isError) return <p className="p-8 text-red-500">게시물 불러오기 실패</p>;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIdx = (page - 1) * postsPerPage;
  const currentPosts = posts.slice(startIdx, startIdx + postsPerPage);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-6 space-y-6">
      {currentPosts.map((post) => (
        <PostWithApplications
          key={post.id}
          post={post}
          appsPerPost={appsPerPost}
          userId={userId}
        />
      ))}

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
      </div>
    </div>
  );
}

interface PostWithApplicationsProps {
  post: Post;
  appsPerPost: number;
  userId: number;
}

const PostWithApplications: React.FC<PostWithApplicationsProps> = ({
  post,
  appsPerPost,
  userId,
}) => {
  const [appsPage, setAppsPage] = React.useState(0);

  const { data: pageResp, isLoading: appsLoading, isError: appsError } =
    useParticipations(post.id, appsPage, appsPerPost);

  const approve = useApproveParticipation();
  const reject = useRejectParticipation();

  if (appsLoading) return <p className="p-4">참여 신청 불러오는 중…</p>;
  if (appsError) return <p className="p-4 text-red-500">참여 신청 불러오기 실패</p>;

  const applications = pageResp.content.map((r: RawParticipation) => ({
    id: r.userId,
    postId: r.postId,
    applicantName: r.userName,
    appliedDate: r.joinedAt.slice(0, 10),
  }));

  const { pageNumber, totalPages } = pageResp;

  return (
    <div className="space-y-6">
      <PostCard post={post} />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {applications.map((app) => {
          const vars: ParticipationMutationVars = {
            userId: app.id,
            postId: post.id,
            participantId: 0,
            page: appsPage,
            size: appsPerPost,
          };

          return (
            <ParticipationCard
              key={app.id}
              data={app}
              onApprove={() => approve.mutate(vars)}
              onReject={() => reject.mutate(vars)}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            disabled={appsPage === 0}
            onClick={() => setAppsPage((p) => Math.max(p - 1, 0))}
          >
            이전
          </Button>
          <span className="text-sm">
            {pageNumber + 1} / {totalPages}
          </span>
          <Button
            size="sm"
            variant="ghost"
            disabled={appsPage + 1 >= totalPages}
            onClick={() => setAppsPage((p) => Math.min(p + 1, totalPages - 1))}
          >
            다음
          </Button>
        </div>
      )}

      <Separator />
    </div>
  );
};
