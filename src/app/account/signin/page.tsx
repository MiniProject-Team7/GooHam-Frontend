"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logoImg from "public/login.png";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dummyUser = { email: "user@example.com", password: "password123" };

  const handleLogin = () => {
    if (email === dummyUser.email && password === dummyUser.password) {
      alert("로그인 성공! 환영합니다.");
    } else {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <Card className="w-full max-w-sm p-6 space-y-6">
        <div className="flex justify-center">
          <Image src={logoImg} alt="GooHam Logo" width={80} height={80} />
        </div>
        <h1 className="text-center text-2xl font-bold">GooHam 로그인</h1>
        <CardContent className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="signin-email" className="mb-1 font-medium">이메일</label>
            <Input
              id="signin-email"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="signin-password" className="mb-1 font-medium">비밀번호</label>
            <Input
              id="signin-password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" onClick={handleLogin}>
            로그인하기
          </Button>
          <Link href="/account/signup">
            <Button variant="outline" className="w-full">
              이메일로 회원가입
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}