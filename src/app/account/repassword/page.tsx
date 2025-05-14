"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);

  const toggleAll = () => {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgreeTerms(next);
    setAgreePrivacy(next);
    setAgreeMarketing(next);
  };

  const handleNext = () => {
    let ok = true;
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
    if (!email) { setEmailError("required"); ok = false; }
    if (!password) { setPasswordError("required"); ok = false; }
    if (!confirmPwd) { setConfirmError("required"); ok = false; }
    if (password && confirmPwd && password !== confirmPwd) {
      setConfirmError("mismatch"); ok = false;
    }
    if (!agreeTerms || !agreePrivacy) {
      ok = false;
    }
    if (!ok) return;
    setStep(2);
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
        <Card className="w-[500px] h-auto mt-[50px] mr-[100px] p-6 flex flex-col border-none shadow-none">
          <h1 className="text-center text-2xl font-bold mt-[20px] mb-[30px]">GooHam 회원가입</h1>

          {step === 1 && (
            <>

              <CardContent className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="signup-email" className="mb-1 font-medium">이메일</label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="이메일을 입력해 주세요"
                    value={email}
                    className={emailError ? "border-red-500 focus:border-red-500" : ""}
                    onChange={e => { setEmail(e.target.value); setEmailError(""); }}
                  />
                </div>

                <div className="relative flex flex-col">
                  <label htmlFor="signup-password" className="mb-1 font-medium">비밀번호</label>
                  <Input
                    id="signup-password"
                    type={showPwd ? "text" : "password"}
                    placeholder="비밀번호를 입력해 주세요"
                    value={password}
                    className={passwordError ? "border-red-500 focus:border-red-500" : ""}
                    onChange={e => { setPassword(e.target.value); setPasswordError(""); }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  >
                    {showPwd ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>

                <div className="relative flex flex-col">
                  <Input
                    id="signup-confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="비밀번호를 확인해 주세요"
                    value={confirmPwd}
                    className={confirmError ? "border-red-500 focus:border-red-500" : ""}
                    onChange={e => { setConfirmPwd(e.target.value); setConfirmError(""); }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </CardContent>

              <div className="px-6 space-y-2">
                {emailError === "required" && (
                  <p className="text-center text-sm text-red-500">이메일을 입력해 주세요.</p>
                )}
                {passwordError === "required" && (
                  <p className="text-center text-sm text-red-500">비밀번호를 입력해 주세요.</p>
                )}
                {confirmError === "required" && (
                  <p className="text-center text-sm text-red-500">비밀번호를 입력해 주세요.</p>
                )}
                {confirmError === "mismatch" && (
                  <p className="text-center text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
                )}
              </div>

              <div className="mt-4 px-6">
                <label className="flex items-center">
                  <Checkbox checked={agreeAll} onCheckedChange={toggleAll} />
                  <span className="ml-2">전체 동의</span>
                </label>
                <div className="border-t border-gray-300 my-2" />
                <label className="flex items-center">
                  <Checkbox checked={agreeTerms} onCheckedChange={setAgreeTerms} />
                  <span className="ml-2">이용약관 동의 *</span>
                </label>
                <label className="flex items-center">
                  <Checkbox checked={agreePrivacy} onCheckedChange={setAgreePrivacy} />
                  <span className="ml-2">개인정보 수집 및 이용 동의 *</span>
                </label>
                <label className="flex items-center">
                  <Checkbox checked={agreeMarketing} onCheckedChange={setAgreeMarketing} />
                  <span className="ml-2">[선택] 마케팅 활용 및 광고 수신 동의</span>
                </label>
              </div>

              <CardFooter className="mt-auto flex flex-col gap-3 px-6">
                <Link href="/account/signin" className="block w-full">
                  <Button variant="outline" className="w-full border-gray-300">로그인으로 돌아가기</Button>
                </Link>
                <Button className="w-full" onClick={handleNext}>다음 단계 진행하기</Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
