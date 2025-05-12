"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";


interface PostCardProps {
  post: {
    id: number;
    image: string;
    title: string;
    status: "모집 중" | "마감";
    userName: string;
    scheduleStart: string;
    location: string;
    categoryName: string[];
  };
}

const statusStyles: Record<string, string> = {
  "모집 중": "bg-orange-100 text-orange-800",
  마감: "bg-gray-100 text-gray-500",
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex w-[600px] h-[260px] flex-col md:flex-row p-4 rounded-xl hover:shadow-md transition">
      <img
        src={post.image}
        alt={post.title}
        className="w-full md:w-[260px] h-[180px] object-cover my-3 rounded-xl"
      />

      <CardContent className="flex flex-col justify-between mt-4 md:mt-0 md:ml-6 p-0 flex-1">
        <div>
          <div className="flex items-start justify-between gap-2 py-1">
            <h2 className="text-xl font-bold truncate min-w-0 flex-1">
              {post.title}
            </h2>
            <span
              className={`text-sm px-3 py-1 rounded-xl shrink-0 ${
                statusStyles[post.status]
              }`}
            >
              {post.status}
            </span>
          </div>

          <p className="text-m text-gray-500 mt-3">{post.userName}</p>
          <div className="text-sm text-gray-600 mt-2">
            <Calendar className="w-4 h-4" />
            <span>{post.scheduleStart} </span>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            <MapPin className = "w-4 h-4" />
            <span>{post.location}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {post.categoryName.map((category, index) => (
              <Badge key={index} variant="default">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <Link href={`/postDetail/${post.id}`} passHref>
            <Button variant="link" size="default" className="w-full">
              자세히 보기
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}