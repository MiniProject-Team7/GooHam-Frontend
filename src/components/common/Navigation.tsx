"use client";
import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Bell, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Notice } from "@/types/notice";

const navItems = [
  { name: "게시글", href: "/posts" },
  { name: "참여관리", href: "/participation" },
  { name: "마이페이지", href: "/mypage" },
];

  const notices: Notice[] = [
  {
    id: "1",
    type: "신청",
    from: "철수",
    postTitle: "함께 등산 가실 분",
    createdAt: "2025-05-13T11:20:00Z",
    link: "/post/123",
  },
  {
    id: "2",
    type: "승인",
    postTitle: "함께 등산 가실 분",
    createdAt: "2025-05-13T12:00:00Z",
    link: "/post/123/applications",
  },
  {
    id: "3",
    type: "댓글",
    from: "영희",
    postTitle: "맛집 투어",
    createdAt: "2025-05-13T12:30:00Z",
    link: "/post/456#comments",
  },
  // … 최대 30개
];

// 알림 메시지 포맷터
function formatNoticeContent(n: Notice) {
  const timeLabel = new Date(n.createdAt).toLocaleString();
  switch (n.type) {
    case "신청":
      return {
        text: `${n.from}님이 "${n.postTitle}"에 신청하셨습니다.`,
        time: timeLabel,
      };
    case "댓글":
      return {
        text: `${n.from}님이 "${n.postTitle}"에 댓글을 남기셨습니다.`,
        time: timeLabel,
      };
    case "승인":
      return {
        text: `"${n.postTitle}"이(가) 승인되었습니다.`,
        time: timeLabel,
      };
    case "거절":
      return {
        text: `"${n.postTitle}"이(가) 거절되었습니다.`,
        time: timeLabel,
      };
    default:
      return { text: "", time: timeLabel };
  }
}

export function Navigation() {
  const pathname = usePathname();
  const isLoggedIn = true; // TODO: 실제 인증 상태로 대체

  const sorted = React.useMemo(
      () =>
        notices
          .slice(0, 30)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      [notices]
  );




  const [avatarUrl, setAvatarUrl] = useState<string | null>("/images/default_profile.png");

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* 
        sticky       : 화면 상단에 고정
        top-0        : 위에서 0 위치
        z-50         : 위에 떠야 하는 z-index
        w-full       : 전체 너비
        border-b     : 하단 테두리
        bg-background: Tailwind theme 배경색 사용
      */}
      <div className="mx-auto w-full flex h-20 max-w-7xl items-center justify-between ">
        {/*
          mx-auto     : 중앙 정렬
          flex        : 가로 정렬
          h-16        : 높이 64px
          max-w-7xl   : 최대 너비 제한
          items-center: 수직 가운데 정렬
          justify-between: 좌우 끝 정렬
          px-6        : 좌우 패딩
        */}

        {/* 왼쪽: 로고 + 메뉴 */}
        <div className="flex items-center gap-15">
          {/* gap-10: 로고와 메뉴 사이 간격 */}
          <Link href="/">
            <Avatar className="w-40 h-40 focus:outline-none focus:ring-0 cursor-pointer">
              <AvatarImage src="/logo.png" alt="GooHam Logo" />
              <AvatarFallback>GH</AvatarFallback>
            </Avatar>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-8 py-1.5 text-heading-sm font-medium transition-colors hover:text-primary-500!",
                      // 기본 스타일:
                      // relative: after 요소를 위한 기준 위치
                      // px-3: 좌우 여백
                      // py-1.5: 상하 여백
                      // text-sm: 작은 글씨
                      // font-medium: 기본 중간 굵기
                      // transition-colors: 색상 변화 애니메이션
                      // hover:text-primary: 호버 시 주요 색상

                      pathname === item.href &&
                        `text-primary-500! font-bold after:absolute after:-bottom-5.5 after:left-1/2 after:translate-x-[-50%] after:h-0.5 after:w-full after:bg-primary-500 after:content-[""]`
                      // SELECTED_ITEM_CLASSNAME
                      // 선택된 메뉴 스타일:
                      // text-primary: 텍스트 강조
                      // font-bold: 글자 두껍게
                      // after:absolute: after 하단 라인 위치
                      // after:bottom-0: 아래쪽 정렬
                      // after:left-1/2 + after:-translate-x-1/2: 가운데 정렬
                      // after:h-0.5: 2px 높이
                      // after:bg-primary: 강조색
                    )}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* 오른쪽: 로그인 or 알림/프로필 */}
        <div className="flex ml-auto items-center gap-8">
          {isLoggedIn ? (
            <>
              {/* 알림 아이콘 */}
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md p-3 focus:outline-none hover:bg-muted">
                <Bell className="h-6 w-6 text-foreground stroke-1.5" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={4}
              className="w-80 bg-popover text-popover-foreground p-2 overflow-hidden"
            >
              <h4 className="px-2 py-1 text-sm font-semibold">알림 목록</h4>
              <DropdownMenuSeparator />

              {sorted.length === 0 ? (
                <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                  새로운 알림이 없습니다.
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {sorted.map((n) => {
                    const { text, time } = formatNoticeContent(n);
                    return (
                      <DropdownMenuItem asChild key={n.id} className="p-0">
                        <Link
                          href={n.link}
                          className="block w-full px-2 py-2 hover:bg-accent/10 rounded"
                        >
                          <p className="text-sm">{text}</p>
                          <time className="text-xs text-muted-foreground">{time}</time>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              )}

              <DropdownMenuSeparator />

                  <div className="px-2 py-2 text-title-md">
                    <Link href="/notification">
                        전체 알림 보기
                    </Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* 프로필 이미지 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                {/* Avatar 컴포넌트 사용 */}
                  <Avatar className="w-10 h-10 cursor-pointer">
                    {avatarUrl ? (
                      <AvatarImage
                        src={avatarUrl}
                        alt="User Avatar"
                        onError={() => setAvatarUrl(null)} // 실패 시 null로
                      />
                    ) : (
                      <AvatarFallback>
                        {/* Fallback에는 이니셜 또는 기본 아이콘 */}
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    )}
                </Avatar>
              </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/mypage" className="flex items-center gap-2">
                      <User className="h-4 w-4" href="/mypage"/> 마이페이지
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="h-4 w-4 mr-2" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/account/signin" className="text-md text-muted-foreground hover:text-primary">
              {/* 로그인 링크: 흐린 색 → hover 시 강조색 */}
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
