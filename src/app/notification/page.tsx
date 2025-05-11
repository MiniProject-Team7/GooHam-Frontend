"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "@@님이 내 게시물에 댓글을 달았습니다.",
    message: "안녕하세요… 저도 참여하고 싶습니다!",
    date: "2025년 1월 8일 01:08",
    read: false,
  },
  {
    id: 2,
    title: "##님이 내 게시물에 참여 신청을 보냈습니다.",
    message: "알림 내용",
    date: "2025년 1월 8일 01:08",
    read: false,
  },
  {
    id: 3,
    title: "알림 제목",
    message: "알림 내용",
    date: "2025년 1월 8일 01:08",
    read: false,
  },
  {
    id: 4,
    title: "읽은 알림 제목",
    message: "알림 내용",
    date: "2025년 1월 8일 01:08",
    read: true,
  },
];

export default function NotificationsPage() {
  const [items, setItems] = React.useState<Notification[]>(notifications);

  const handleDeleteRead = () => {
    setItems((prev) => prev.filter((n) => !n.read));
  };

  return (
    <div className="px-10 py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-600">알림</h1>
        <Button variant="outline" size="sm" onClick={handleDeleteRead}>
          읽은 알림 삭제
        </Button>
      </div>

      {items.map((n, idx) => (
        <React.Fragment key={n.id}>
          <Card
            className={`
              border-gray-300
              mb-0
              ${n.read ? "text-muted-foreground bg-gray-50" : "bg-white"}
            `}
          >
            <CardContent className="py-4">
              <h2 className={`text-title-md ${n.read && "opacity-60"}`}>
                {n.title}
              </h2>
              <p className={`mt-1 ${n.read ? "opacity-50" : ""}`}>
                {n.message}
              </p>
              <div className={`mt-2 text-xs ${n.read ? "opacity-50" : "text-gray-500"}`}>
                {n.date}
              </div>
            </CardContent>
          </Card>
          {idx < items.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
}
