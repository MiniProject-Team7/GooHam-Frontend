"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function RepasswordPage() {
  // const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [pwdMismatch, setPwdMismatch] = useState(false);

  const sendCode = () => {
  };

  const verifyCode = () => {
  };

  const changePassword = () => {
    if (newPwd !== confirmPwd) {
      setPwdMismatch(true);
    } else {
      setPwdMismatch(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFCCCC]">
      <div className="flex items-center">
        <Image src="/login.png" alt="GooHam Logo" width={800} height={800} className="ml-[1px] mt-[50px] object-contain"/>
        <Card className="w-[500px] mt-[50px] mr-[100px] p-6 flex flex-col border-none shadow-none">
          <h1 className="text-center text-2xl font-bold mt-[20px] mb-[8px]">
            비밀번호 재설정 안내
          </h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            회원가입에 사용된 이메일을 입력해주세요.<br />
            해당 이메일로 비밀번호 변경을 위한 인증번호가 발송됩니다.
          </p>
          <hr className="border-gray-300 mb-6" />

          <CardContent className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="repass-email" className="text-sm font-medium mb-1">
                비밀번호를 재설정할 이메일
              </label>
              <Input
                id="repass-email"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={sendCode}>
              인증 번호 보내기
            </Button>

            <div className="flex items-center gap-2">
              <Input
                id="repass-code"
                placeholder="인증번호를 입력해주세요"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <span className="text-sm text-gray-500">00:00</span>
            </div>
            <Button className="w-full" onClick={verifyCode}>
              인증하기
            </Button>

            <p className="text-sm font-medium mt-4 mb-2">새 비밀번호 설정</p>
            <div className="relative">
              <Input
                id="repass-new"
                type={showNewPwd ? "text" : "password"}
                placeholder="비밀번호"
                value={newPwd}
                onChange={(e) => {
                  setNewPwd(e.target.value);
                  setPwdMismatch(false);
                }}
              />
              <button
                type="button"
                onClick={() => setShowNewPwd(!showNewPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              >
                {showNewPwd ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
            <div className="relative">
              <Input
                id="repass-confirm"
                type={showConfirmPwd ? "text" : "password"}
                placeholder="비밀번호 확인"
                value={confirmPwd}
                onChange={(e) => {
                  setConfirmPwd(e.target.value);
                  setPwdMismatch(false);
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              >
                {showConfirmPwd ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>

            {pwdMismatch && (
              <p className="px-2 text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
            )}
          </CardContent>

          <CardFooter className="mt-auto flex flex-col gap-3">
            <Button className="w-full" onClick={changePassword}>
              비밀번호 변경하기
            </Button>
            <Link href="/account/signin" className="block w-full">
              <Button
                variant="outline"
                className="w-full border-gray-300 focus:border-gray-300"
              >
                처음으로 돌아가기
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
