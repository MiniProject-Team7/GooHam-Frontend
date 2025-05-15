"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";

export default function RepasswordNext() {
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
        <Card className="w-[500px] mt-[50px] mr-[100px] p-6 flex flex-col border-none shadow-none">
          <h1 className="text-center text-2xl font-bold mt-[30px] mb-[1px]">비밀번호 재설정 안내</h1>
          <CardContent className="flex flex-col items-center space-y-4 py-8">
            <LockKeyhole className="w-40 h-40 text-primary-500 -mt-2" />
            <p className="text-center text-lg font-bold">비밀번호 변경이 완료되었습니다!</p>
          </CardContent>
          <CardFooter className="mt-auto flex flex-col gap-3 px-6">
            <Link href="/" className="block w-full">
              <Button variant="outline" className="w-full border-gray-300">메인 가기</Button>
            </Link>
            <Link href="/account/signin" className="block w-full">
              <Button className="w-full">로그인 하기</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
