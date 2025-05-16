"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Notice } from "@/types/notice";

type FormattedNotice = {
  content: React.ReactNode;
  time: string;
};

const notices: Notice[] = [
  {
    id: "1",
    type: "신청",
    from: "철수",
    postTitle: "함께 등산 가실 분",
    createdAt: "2025-05-13T11:20",
    link: "/post/123",
    is_read: false,
  },
  {
    id: "2",
    type: "승인",
    postTitle: "함께 등산 가실 분",
    createdAt: "2025-05-13T12:00",
    link: "/post/123/applications",
    is_read: false,
  },
  {
    id: "3",
    type: "댓글",
    from: "영희",
    postTitle: "맛집 투어",
    createdAt: "2025-05-13T12:30",
    link: "/post/456#comments",
    is_read: true,
  },
  // … 최대 30개
];

// 알림 메시지 포맷터 (전과 동일)
function formatNoticeContent(n: Notice): FormattedNotice {
  const timeLabel = new Date(n.createdAt).toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const titleSpan = <span className="font-semibold">{n.postTitle}</span>;
  switch (n.type) {
    case "신청":
      return {
        content: (
          <>
            {n.from}님이 {titleSpan}에 신청하셨습니다.
          </>
        ),
        time: timeLabel,
      };
    case "댓글":
      return {
        content: (
          <>
            {n.from}님이 {titleSpan}에 댓글을 남기셨습니다.
          </>
        ),
        time: timeLabel,
      };
    case "승인":
      return {
        content: <> {titleSpan}에 대한 신청이 승인되었습니다.</>,
        time: timeLabel,
      };
    case "거절":
      return {
        content: <> {titleSpan}에 대한 신청이 거절되었습니다.</>,
        time: timeLabel,
      };
    default:
      return { content: null, time: timeLabel };
  }
}

export default function NotificationsPage() {
  const [items, setItems] = React.useState<Notice[]>(notices);
  const [page, setPage] = React.useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(items.length / perPage);

  const handleDeleteRead = () => {
    setItems((prev) => prev.filter((n) => !n.is_read));
  };

  const start = (page - 1) * perPage;
  const current = items.slice(start, start + perPage);

  return (
    <div className="flex flex-col flex-1 px-10 min-h-0 py-6 mx-auto max-w-400 h-full">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-pink-600">알림 메시지 목록</h1>
        <Button variant="outline" size="sm" onClick={handleDeleteRead}>
          읽은 알림 삭제
        </Button>
      </div>

      {/* 알림 목록 (고정 높이에 스크롤) */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 mb-10">
        {current.map((n, idx) => {
          const { content, time } = formatNoticeContent(n);
          return (
            <React.Fragment key={n.id}>
              <Card
                className={`
                  mb-0
                  ${n.is_read
                    ? "bg-gray-22 text-gray-500"
                    : "bg-white text-black"}
                `}
              >
                <CardContent className="py-4">
                  <Link
                    href={n.link}
                    className="flex justify-between items-start"
                  >
                    <div className="text-base">{content}</div>
                    <time className="text-xs text-gray-400 whitespace-nowrap">
                      {time}
                    </time>
                  </Link>
                </CardContent>
              </Card>
              {idx < current.length - 1 && <Separator />}
            </React.Fragment>
          );
        })}
      </div>
       <div className="mt-auto flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            <ChevronLeft />
          </Button>

          <span className="text-sm">
            {page} / {totalPages || 1}
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
