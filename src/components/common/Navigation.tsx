// src/components/Navigation.tsx
"use client";
import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Bell, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "./useAuthStore";
import axiosInstance from "@/utils/axiosInstance";


// Hooks & utils for notifications
import { useFetchUserProfile } from "@/components/common/useProfileStore";
import { useNotifications, useMarkAsRead } from "@/components/hooks/useNotification";
import { mapRawListToNotices, formatNoticeContent } from "@/components/common/noticeStore";
import type { Notice } from "@/types/notification";

const navItems = [
  { name: "게시글", href: "/posts" },
  { name: "참여관리", href: "/participation" },
  { name: "마이페이지", href: "/mypage" },
];

export function Navigation() {
  const { data: profile, isLoading: profileLoading } = useFetchUserProfile();

  const router = useRouter();
  const pathname = usePathname();

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const clearAuth  = useAuthStore((s) => s.clear);
  const userId     = profile?.id;

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "/users/logout", {}, { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        clearAuth();
        router.push("/account/signin");
      }
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  // Fetch notifications and markRead mutation
  const { data: raws = [], isLoading } = useNotifications(userId);
  const markRead = useMarkAsRead();
  // Map, sort, limit to 10
  const sorted = React.useMemo<Notice[]>(() =>
    mapRawListToNotices(raws)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10),
    [raws]
  );

  const [avatarUrl, setAvatarUrl] = useState<string | null>("/images/default_profile.png");
  const userName  = "홍길동";
  const userIntro = "안녕하세요. 20살 홍길동입니다.";

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto w-full flex h-20 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-15">
          <Link href="/">
            <Avatar className="w-40 h-40 focus:outline-none cursor-pointer">
              <AvatarImage src="/logo.png" alt="GooHam Logo" />
              <AvatarFallback>GH</AvatarFallback>
            </Avatar>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.filter(item =>
                isLoggedIn || (item.name !== "마이페이지" && item.name !== "참여관리")
              ).map(item => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-8 py-1.5 text-heading-sm font-medium transition-colors hover:text-primary-500!",
                      pathname === item.href &&
                        "text-primary-500! font-bold after:absolute after:-bottom-5.5 after:left-1/2 after:translate-x-[-50%] after:h-0.5 after:w-full after:bg-primary-500"
                    )}
                  >{item.name}</Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="select-none flex ml-auto items-center gap-8">
          {isLoggedIn ? (
            <>
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-md p-3 hover:bg-muted">
                    <Bell className="h-6 w-6 text-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={4} className="w-100 h-90 bg-white border-gray-22 p-2 overflow-hidden">
                  <div className="px-3 py-3 text-title-md">알림 목록</div>
                  <DropdownMenuSeparator />
                  {isLoading ? (
                    <div className="flex h-40 items-center justify-center">로딩 중…</div>
                  ) : sorted.length === 0 ? (
                    <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">새로운 알림이 없습니다.</div>
                  ) : (
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {sorted.map(n => {
                        const { content, time } = formatNoticeContent(n);
                        return (
                          <DropdownMenuItem asChild key={n.id} className="p-0">
                            <Link
                              href={n.link}
                              onClick={() => markRead.mutate({ id: Number(n.id), userId })}
                              className="flex w-full items-start justify-between px-2 py-2 hover:bg-accent/10 rounded"
                            >
                              <p className="text-sm flex-1">{content}</p>
                              <time className="text-xs text-gray-400 whitespace-nowrap">{time}</time>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </div>
                  )}
                  <DropdownMenuSeparator />
                  <div className="px-2 pb-2 pt-3 text-center text-primary-500 text-title-md">
                    <Link href="/notification">전체 알림 보기</Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-10 h-10 cursor-pointer">
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt="User Avatar" onError={() => setAvatarUrl(null)} />
                    ) : (
                      <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={4} className="w-80 h-70 bg-white border-gray-22 p-2">
                  <div className="flex flex-col items-center px-4 py-3 gap-3">
                    <div className="text-title-md text-black self-start mb-2">나의 정보</div>
                    <Avatar className="w-15 h-15">
                      {avatarUrl ? (
                        <AvatarImage src={profile?.profileImage} alt="User Avatar" />
                      ) : (
                        <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                      )}
                    </Avatar>
                    <div className="text-title-md text-black truncate">{profile?.nickname}</div>
                    <div className="text-lable-md text-gray-22 truncate">{profile?.introduce}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/mypage" className="flex items-center gap-2 px-2 py-1 hover:bg-accent/10 rounded">
                      <User className="w-4 h-4 text-title-md" /> 마이페이지
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 px-2 py-1 hover:bg-destructive/10 text-destructive rounded">
                    <LogOut className="w-4 h-4 text-title-md" /> 로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/account/signin" className="text-md text-muted-foreground hover:text-primary">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
