// types.ts
export type NoticeType = "신청" | "승인" | "거절" | "댓글";

export interface Notice {
  id: string;
  type: NoticeType;
  from?: string;   // 신청·댓글 시 작성자 이름
  postTitle: string;     // 게시물 제목
  createdAt: string;     // ISO timestamp
  link: string;          // 클릭 시 이동할 URL
  is_read: boolean;
}