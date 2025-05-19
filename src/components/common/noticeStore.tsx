import React from "react";
import type { Notice, RawNotification } from "@/types/notification";

type FormattedNotice = {
  content: React.ReactNode;
  time: string;
};

export function mapRawToNotice(raw: RawNotification): Notice {
  // link를 타입별로 다르게 만듭니다.
  const link = `/posts/${raw.postId}`;

  return {
    id: raw.id.toString(),
    type: raw.type,
    from: raw.participantName,  // 신청자/참여자 이름
    postTitle: raw.postTitle,
    createdAt: raw.createdAt,
    link,
    is_read: raw.read,
  };
}

export function mapRawListToNotices(raws: RawNotification[]): Notice[] {
  return raws.map(mapRawToNotice);
}

// 2) Notice → 화면에 쓰기 좋게 포맷팅
export function formatNoticeContent(n: Notice): FormattedNotice {
  const timeLabel = new Date(n.createdAt).toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const titleSpan = <span className="font-semibold">{n.postTitle}</span>;

  let content: React.ReactNode = null;
  switch (n.type) {
    case "신청":
      content = (
        <>
          {n.from}님이 {titleSpan}에 신청하셨습니다.
        </>
      );
      break;
    case "댓글":
      content = (
        <>
          {n.from}님이 {titleSpan}에 댓글을 남기셨습니다.
        </>
      );
      break;
    case "승인":
      content = (
        <>
          {titleSpan}에 대한 신청이 승인되었습니다.
        </>
      );
      break;
    case "거절":
      content = (
        <>
          {titleSpan}에 대한 신청이 거절되었습니다.
        </>
      );
      break;
  }

  return { content, time: timeLabel };
}