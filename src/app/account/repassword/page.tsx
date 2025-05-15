"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const DUMMY_CODE = "123456";

export default function RepasswordPage() {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

  const [timer, setTimer] = useState(180);
  const timerRef = useRef<number | null>(null);

  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMismatch, setPwdMismatch] = useState(false);
  const [newPwdError, setNewPwdError] = useState("");
  const [confirmPwdError, setConfirmPwdError] = useState("");
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  useEffect(() => {
    if (codeSent && timer > 0 && !codeVerified) {
      timerRef.current = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [codeSent, codeVerified]);

  useEffect(() => {
    if (timer <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [timer]);

  const validateEmail = (value: string) => /^\S+@\S+\.com$/.test(value);

  const sendCode = () => {
    setCodeVerified(false);
    setCodeError("");
    if (!email) {
      setEmailError("required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("invalid");
      return;
    }
    setEmailError("");
    setCodeSent(true);
    setTimer(180);
  };

  const verifyCode = () => {
    if (!code) {
      setCodeError("required");
      return;
    }
    if (timer <= 0) {
      setCodeError("expired");
      return;
    }
    if (code !== DUMMY_CODE) {
      setCodeError("wrong");
      return;
    }
    setCodeError("");
    setCodeVerified(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const changePassword = () => {
    let ok = true;
    setNewPwdError("");
    setConfirmPwdError("");
    setPwdMismatch(false);
    if (!newPwd) { setNewPwdError("required"); ok = false; }
    if (!confirmPwd) { setConfirmPwdError("required"); ok = false; }
    if (!ok) return;
    if (newPwd !== confirmPwd) {
      setPwdMismatch(true);
      return;
    }
  };


  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
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
                className={
                  emailError ? "border-red-500 focus:border-red-500" : ""
                }
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError === "required" && (
                <p className="text-sm text-red-500 mt-1">이메일을 입력해 주세요.</p>
              )}
              {emailError === "invalid" && (
                <p className="text-sm text-red-500 mt-1">이메일 양식을 확인해 주세요.</p>
              )}
            </div>
            <Button className="w-full" onClick={sendCode}>
              인증 번호 보내기
            </Button>

            <div className="relative">
              <Input
                id="repass-code"
                placeholder="인증번호를 입력해주세요"
                value={code}
                className={
                  codeError || codeVerified
                    ? codeError === "wrong" || codeError === "expired" || codeError === "required"
                      ? "border-red-500 focus:border-red-500"
                      : codeVerified
                      ? "border-green-500 focus:border-green-500"
                      : ""
                    : ""
                }
                onChange={(e) => {
                  setCode(e.target.value);
                  setCodeError("");
                }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                {formatTime(timer)}
              </span>
            </div>
            {codeError === "required" && (
              <p className="text-sm text-red-500">인증번호를 입력해 주세요.</p>
            )}
            {codeError === "expired" && (
              <p className="text-sm text-red-500">인증 제한 시간을 초과했습니다.</p>
            )}
            {codeError === "wrong" && (
              <p className="text-sm text-red-500">인증 번호가 틀렸습니다.</p>
            )}
            {codeVerified && (
              <p className="text-sm text-green-500">인증이 완료되었습니다.</p>
            )}
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
                className={newPwdError || pwdMismatch ? "border-red-500 focus:border-red-500" : ""}
                onChange={e => { setNewPwd(e.target.value); setNewPwdError(""); setPwdMismatch(false); }}
              />
              <button type="button" onClick={() => setShowNewPwd(!showNewPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                {showNewPwd ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
            {newPwdError === "required" && <p className="text-sm text-red-500">비밀번호를 입력해 주세요.</p>}

            <div className="relative">
              <Input
                id="repass-confirm"
                type={showConfirmPwd ? "text" : "password"}
                placeholder="비밀번호 확인"
                value={confirmPwd}
                className={confirmPwdError || pwdMismatch ? "border-red-500 focus:border-red-500" : ""}
                onChange={e => { setConfirmPwd(e.target.value); setConfirmPwdError(""); setPwdMismatch(false); }}
              />
              <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                {showConfirmPwd ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
            {confirmPwdError === "required" && <p className="text-sm text-red-500">비밀번호를 입력해 주세요.</p>}
            {pwdMismatch && <p className="px-2 text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>}
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
