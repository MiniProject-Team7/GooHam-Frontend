"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  useMarkAsRead,
  useNotifications,
  useClearNotifications,
} from "@/components/hooks/useNotification";
import { mapRawListToNotices, formatNoticeContent } from "@/components/common/noticeStore";
import type { Notice } from "@/types/notification";
import { useFetchUserProfile } from "@/components/common/useProfileStore";

export default function NotificationsPage() {
  // ✅ 사용자 정보 가져오기
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useFetchUserProfile();

  const userId = profile?.id;

  // ✅ 알림 목록 가져오기
  const {
    data: raws = [],
    isLoading: isNotiLoading,
    isError: isNotiError,
  } = useNotifications(userId ?? 0);

  const notices: Notice[] = React.useMemo(() => mapRawListToNotices(raws), [raws]);

  const markRead = useMarkAsRead();
  const clearAll = useClearNotifications();

  const [page, setPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(notices.length / perPage);
  const start = (page - 1) * perPage;
  const current = notices.slice(start, start + perPage);

  // ✅ 로딩/에러 처리
  if (isProfileLoading || isNotiLoading) return <p className="p-8">알림을 불러오는 중…</p>;
  if (isProfileError || isNotiError) return <p className="p-8 text-red-500">알림 불러오기 실패</p>;

  // ✅ 읽은 알림 삭제 핸들러
  const handleDeleteRead = () => {
    if (!userId) return;
    clearAll.mutate(userId);
  };

  return (
    <div className="flex flex-col flex-1 px-10 min-h-0 py-6 mx-auto max-w-400 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-pink-600">알림 메시지 목록</h1>
        <Button variant="outline" size="sm" onClick={handleDeleteRead}>
          읽은 알림 삭제
        </Button>
      </div>

      {/* 알림 리스트 */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 mb-10">
        {current.length === 0 ? (
          <p className="text-center text-gray-500">알림이 없습니다.</p>
        ) : (
          current.map((n) => {
            const { content, time } = formatNoticeContent(n);
            return (
              <React.Fragment key={n.id}>
                <Card
                  className={`mb-0 ${
                    n.is_read ? "bg-gray-22 text-gray-500" : "bg-white text-black"
                  }`}
                >
                  <CardContent className="py-4">
                    <Link
                      href={n.link}
                      onClick={() => markRead.mutate({ id: Number(n.id), userId: userId! })}
                      className="flex justify-between items-start"
                    >
                      <div className="text-base">{content}</div>
                      <time className="text-xs text-gray-400 whitespace-nowrap">{time}</time>
                    </Link>
                  </CardContent>
                </Card>
                {n !== current[current.length - 1] && <Separator />}
              </React.Fragment>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="mt-auto flex items-center justify-center space-x-4">
        <Button
          variant="ghost"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          <ChevronLeft />
        </Button>

        <span className="text-sm">{page} / {totalPages || 1}</span>

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
