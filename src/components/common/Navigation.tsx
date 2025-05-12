"use client";

import Link from "next/link";
import Image from "next/image";
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
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "게시글", href: "/posts" },
  { name: "참여관리", href: "/participation" },
  { name: "마이페이지", href: "/mypage" },
];

export function Navigation() {
  const pathname = usePathname();
  const isLoggedIn = true; // TODO: 실제 인증 상태로 대체

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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-10">
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
            <Image src="/logo.png" alt="logo" width={40} height={40} className="rounded-full" />
            {/* rounded-full: 원형 이미지 */}
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
        <div className="flex items-center gap-12">
          {isLoggedIn ? (
            <>
              {/* 알림 아이콘 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-md p-2 hover:bg-muted">
                    {/* 
                      rounded-md: 버튼 라운딩
                      p-2       : 패딩
                      hover:bg-muted: 호버 시 연한 배경
                    */}
                    <Bell className="h-5 w-5 text-foreground" />
                    {/* h/w-5: 아이콘 크기 / text-foreground: 기본 글자색 */}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>새 알림 없음</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* 프로필 이미지 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    src="/avatar.png"
                    alt="avatar"
                    width={32}
                    height={32}
                    className="rounded-full cursor-pointer border"
                    // 원형, 커서, 테두리 추가
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/mypage" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> 마이페이지
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
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
              {/* 로그인 링크: 흐린 색 → hover 시 강조색 */}
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
