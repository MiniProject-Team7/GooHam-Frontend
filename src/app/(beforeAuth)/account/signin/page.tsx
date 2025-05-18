"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { useAuthStore } from "@/components/common/useAuthStore";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  type LoginResponse = {
    status: "success" | "fail";
    data?: {
      user: {
        member_email: string;
        member_name: string;
      };
      token: string;
    };
    message?: string;
  };

  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setAuthEmail = useAuthStore((state) => state.setEmail); // 이름 변경

  const handleLogin = async () => {
    setEmailEmpty(false);
    setPasswordEmpty(false);
    setLoginError(false);
    let hasEmpty = false;
    if (!email) {
      setEmailEmpty(true);
      hasEmpty = true;
    }
    if (!password) {
      setPasswordEmpty(true);
      hasEmpty = true;
    }
    if (hasEmpty) return;

    if (!validateEmail(email)) {
      setLoginError(true);
      return;
    }

    try {
      const response = await axiosInstance.post<LoginResponse>(
        "/users/login",
        {
          member_email: email,
          member_password: password,
        },
        { withCredentials: true }
      );

      const result = response.data;
      console.log("API 응답:", JSON.stringify(result, null, 2)); // 전체 응답 확인
      if (result.status === "success") {
        console.log("데이터 확인:", result.data); // data 객체 확인
        const userEmail = result.data?.user?.member_email;

        const accessToken = result.data?.token;
        if (userEmail && accessToken) {
          setAuthEmail(userEmail); // Zustand 저장
          setIsLoggedIn(true);

          localStorage.setItem("accessToken", accessToken); // 쿠키에서 accessToken 추출
          localStorage.setItem("userEmail", userEmail); // 이메일 저장

          router.push("/");
        } else {
          console.log("로그인실패");
          setLoginError(true);
        }
      }
    } catch (err) {
      console.error("Login failed", err);
      setLoginError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFCCCC]">
      <div className="flex items-center">
        <Image
          src="/login.png"
          alt="GooHam Logo"
          width={800}
          height={800}
          className="ml-[1px] mt-[50px] object-contain"
        />
        <Card className="w-[500px] h-[450px] mt-[50px] mr-[100px] p-6 flex flex-col border-none shadow-none">
          <h1 className="text-center text-2xl font-bold mt-[20px] mb-[30px]">GooHam 로그인</h1>
          <CardContent className="space-y-4">
            <div className="flex flex-col">
              {/* <label htmlFor="signin-email" className="mb-1 font-medium">이메일</label> */}
              <Input
                id="signin-email"
                type="email"
                placeholder="이메일을 입력해 주세요"
                value={email}
                className={emailEmpty || loginError ? "border-red-500 focus:border-red-500" : ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailEmpty(false);
                  setLoginError(false);
                }}
              />
            </div>

            <div className="relative flex flex-col">
              {/* <label htmlFor="signin-password" className="mb-1 font-medium">비밀번호</label> */}
              <Input
                id="signin-password"
                type={showPwd ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                className={passwordEmpty || loginError ? "border-red-500 focus:border-red-500" : ""}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordEmpty(false);
                  setLoginError(false);
                }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              >
                {showPwd ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            <div className="flex justify-end">
              <Link href="/account/repassword" className="text-sm text-gray-300 hover:underline">
                비밀번호 재설정
              </Link>
            </div>
          </CardContent>

          {emailEmpty && (
            <p className="px-6 text-center text-sm text-red-500">이메일을 입력해 주세요.</p>
          )}
          {!emailEmpty && passwordEmpty && (
            <p className="px-6 text-center text-sm text-red-500">비밀번호를 입력해 주세요.</p>
          )}
          {loginError && !emailEmpty && !passwordEmpty && (
            <p className="px-6 text-center text-sm text-red-500">
              이메일 또는 비밀번호가 잘못 되었습니다. 이메일과 비밀번호를 정확히 입력해 주세요.
            </p>
          )}

          <CardFooter className="mt-auto mb-5 flex flex-col gap-3">
            <Button className="block w-3/4 mx-auto" onClick={handleLogin}>
              로그인하기
            </Button>
            <Link href="/account/signup" className="block w-3/4 mx-auto">
              <Button variant="outline" className="w-full border-gray-300 focus:border-gray-300">
                이메일로 회원가입
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}