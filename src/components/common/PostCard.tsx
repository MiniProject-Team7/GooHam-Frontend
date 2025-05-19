"use client";  // 훅을 쓰려면 클라이언트 컴포넌트여야 합니다.

import React from "react";
import { Post } from "@/types/post";
import Link from "next/link";
import { usePresignedUrls } from "@/components/hooks/usePresignedImage";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { statusToBadgeVariant } from "@/utils/statusVariant";

const PostCard = ({ post }: { post: Post }) => {
  // 1) presign 훅 호출 (string[] → string|string[]|null)
  const presigned = usePresignedUrls(post.images);

  // 2) 첫 번째 이미지 URL 또는 기본 대체(src)
  const defaultImg = "/images/default_image.png";
  const firstImageUrl = React.useMemo(() => {
    if (presigned === null) return defaultImg;
    if (Array.isArray(presigned)) return presigned[0] ?? defaultImg;
    return presigned;
  }, [presigned]);

  return (
    <Card className="flex w-[690px] h-[260px] flex-col md:flex-row p-4 rounded-xl hover:shadow-md border border-gray-22 transition">
      <img
        src={firstImageUrl}
        alt={post.title}
        className="self-center w-[300px] h-[200px] flex-shrink-0 object-cover rounded-xl"
      />

      <CardContent className="flex flex-col justify-between mt-4 md:mt-0 md:ml-6 p-0 flex-1 min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2 py-1">
            <h2 className="text-xl font-bold truncate min-w-0 flex-1">{post.title}</h2>

            <Badge
              variant={statusToBadgeVariant(post.status)}
              className="px-3 py-1 rounded-xl text-sm"
            >
              {post.status}
            </Badge>
          </div>

          <p className="text-title-md text-gray-50 mt-3">{post.userName}</p>

          <div className="flex items-center gap-2 text-sm text-gray-40 mt-2">
            <Calendar className="w-4 h-4" />
            <span>{post.scheduleStart}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-40 mt-2">
            <MapPin className="w-4 h-4" />
            <span>{post.location}</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>{post.categoryName}</Badge>
          </div>
        </div>

        <div className="mt-3">
          <Link href={`/postDetail/${post.id}`}>
            <Button variant="link" size="default" className="w-75">
              자세히 보기
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;