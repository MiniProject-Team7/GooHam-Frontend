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
import { useRouter } from "next/navigation";
// import axios from "axios";
import { useAuthStore } from "./useAuthStore";
import axiosInstance from "@/utils/axiosInstance";

const navItems = [
  { name: "게시글", href: "/posts" },
  { name: "참여관리", href: "/participation" },
  { name: "마이페이지", href: "/mypage" },
];

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const clearAuth = useAuthStore((state) => state.clear); // 로그아웃 상태 초기화용
  //const email = useAuthStore((state) => state.email); // email 값 가져오기

  const handleLogout = async () => {
    try {
      const email = useAuthStore.getState().email; // 현재 이메일 직접 가져오기

      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.warn("No access token found in localStorage");
        return;
      }
      // axios 대신 axiosInstance 사용
      const response = await axiosInstance.post(
        "/users/logout",
        {}, // body
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // 로그아웃 성공 시 쿠키 및 localStorage 삭제
        // document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        // document.cookie = "Refresh_Token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        localStorage.removeItem("accessToken");

        clearAuth();
        console.log("로그아웃 성공" + email);
        router.push("/account/signin");
      }
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-10">
        <div className="flex items-center gap-15">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={40} height={40} className="rounded-full" />
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-8 py-1.5 text-heading-sm font-medium transition-colors hover:text-primary-500!",
                      pathname === item.href &&
                        `text-primary-500! font-bold after:absolute after:-bottom-5.5 after:left-1/2 after:translate-x-[-50%] after:h-0.5 after:w-full after:bg-primary-500 after:content-[""]`
                    )}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-12">
          {isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-md p-2 hover:bg-muted">
                    <Bell className="h-5 w-5 text-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>새 알림 없음</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    src="/avatar.png"
                    alt="avatar"
                    width={32}
                    height={32}
                    className="rounded-full cursor-pointer border"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/mypage" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> 마이페이지
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link
              href="/account/signin"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
