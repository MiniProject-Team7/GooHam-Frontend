"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { useAuthStore } from "@/components/common/useAuthStore";

export default function RepasswordPage() {
  const [step, setStep] = useState(1);

  const email = useAuthStore((state) => state.email);
  const setEmail = useAuthStore((state) => state.setEmail);
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
  const [confirmPwdError, setConfirmPwdError] = useState("");
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (timer <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [timer]);

  const validateEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(180);
    timerRef.current = window.setInterval(() => setTimer((prev) => prev - 1), 1000);
  };

  const sendCode = async () => {
    setCodeVerified(false);
    setCodeError("");
    setCode("");
    if (!email) {
      setEmailError("required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("invalid");
      return;
    }

    try {
      // 백엔드 API 경로로 수정: /gooham/users/generateCode
      const response = await axiosInstance.post("/users/generateCode", { email });

      // 타입스크립트 타입 처리
      const responseData = response.data as string;

      // 백엔드 응답 처리
      if (responseData === "없는 계정의 이메일입니다.") {
        setEmailError("notfound");
        return;
      } else if (responseData === "이미 삭제된 계정입니다.") {
        setEmailError("deleted");
        return;
      }

      setEmailError("");
      setCodeSent(true);
      startTimer();
    } catch (err) {
      console.error(err);
      setEmailError("sendfail"); // 서버 에러 처리
    }
  };

  const verifyCode = async () => {
    if (!code) {
      setCodeError("required");
      return;
    }
    if (timer <= 0) {
      setCodeError("expired");
      return;
    }
    try {
      // 백엔드 API 경로로 수정: /gooham/users/verifyCode
      // 백엔드는 code를 int로 받으므로 parseInt 사용
      const response = await axiosInstance.post("/users/verifyCode", {
        email,
        code: parseInt(code, 10),
      });

      // 타입스크립트 타입 처리
      const responseData = response.data as string;

      // 백엔드 응답 처리
      if (responseData === "인증 성공") {
        setCodeError("");
        setCodeVerified(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        setCodeError("wrong");
      }
    } catch (err) {
      console.error(err);
      setCodeError("wrong"); // 서버가 인증 실패 응답하면
    }
  };

  const changePassword = async () => {
    setConfirmPwdError("");
    setPwdMismatch(false);
    if (!newPwd || !confirmPwd) {
      setConfirmPwdError("required");
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMismatch(true);
      return;
    }
    try {
      // 백엔드 API 경로로 수정: /gooham/users/change_password
      // 백엔드 요청 파라미터에 맞게 수정
      const response = await axiosInstance.post("/users/change_password", {
        member_email: email, // 백엔드에서 'member_email'로 받음
        newPassword: newPwd,
      });

      // 타입스크립트 타입 처리 - 응답 데이터 타입 추가
      interface ResponseType {
        message?: string;
        [key: string]: unknown;
      }

      // 응답 처리 (타입 단언 사용)
      const responseData = response.data as ResponseType;

      if (responseData.message && responseData.message.includes("성공")) {
        setStep(2); // 완료 화면으로 이동
      } else {
        // 에러 처리
        setConfirmPwdError("changefail");
      }
    } catch (err) {
      console.error(err);
      setConfirmPwdError("changefail");
    }
  };

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      {step === 1 && (
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
                회원가입에 사용된 이메일을 입력해주세요.
                <br />
                해당 이메일로 비밀번호 변경을 위한 인증번호가 발송됩니다.
              </p>
              <hr className="border-gray-300 mt-[-30px] mb-6 w-4/5 mx-auto " />

              <CardContent className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="repass-email" className="text-sm font-bold mt-[-20px] mb-1 ">
                    비밀번호를 재설정할 이메일
                  </label>
                  <Input
                    id="repass-email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    value={email ?? ""}
                    disabled={false}
                    className={emailError ? "border-red-500 focus:border-red-500" : ""}
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
                  {emailError === "notfound" && (
                    <p className="text-sm text-red-500 mt-1">등록되지 않은 이메일입니다.</p>
                  )}
                  {emailError === "deleted" && (
                    <p className="text-sm text-red-500 mt-1">삭제된 계정입니다.</p>
                  )}
                  {emailError === "sendfail" && (
                    <p className="text-sm text-red-500 mt-1">인증번호 발송에 실패했습니다.</p>
                  )}
                </div>
                <Button className="block w-3/4 mx-auto " onClick={sendCode}>
                  인증 번호 보내기
                </Button>

                <div className="relative mt-10 ">
                  <Input
                    id="repass-code"
                    placeholder="인증번호를 입력해주세요"
                    value={code}
                    disabled={!codeSent || codeVerified}
                    className={
                      codeError || codeVerified
                        ? codeError
                          ? "border-red-500 focus:border-red-500"
                          : "border-green-500 focus:border-green-500"
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
                {codeVerified && <p className="text-sm text-green-500">인증이 완료되었습니다.</p>}
                <Button
                  className="block w-3/4 mx-auto"
                  onClick={verifyCode}
                  disabled={!codeSent || codeVerified}
                >
                  인증하기
                </Button>

                <p className="text-sm font-bold mt-20 mb-2">새 비밀번호 설정</p>
                <div className="relative">
                  <Input
                    id="repass-new"
                    type={showNewPwd ? "text" : "password"}
                    placeholder="비밀번호"
                    value={newPwd}
                    disabled={!codeVerified}
                    className={
                      (confirmPwdError && !newPwd) || pwdMismatch
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }
                    onChange={(e) => {
                      setNewPwd(e.target.value);
                      setConfirmPwdError("");
                      setPwdMismatch(false);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPwd(!showNewPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  >
                    {showNewPwd ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="repass-confirm"
                    type={showConfirmPwd ? "text" : "password"}
                    placeholder="비밀번호 확인"
                    value={confirmPwd}
                    disabled={!codeVerified}
                    className={
                      (confirmPwdError && !confirmPwd) || pwdMismatch
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }
                    onChange={(e) => {
                      setConfirmPwd(e.target.value);
                      setConfirmPwdError("");
                      setPwdMismatch(false);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  >
                    {showConfirmPwd ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>

                {confirmPwdError === "required" && (
                  <p className="px-2 text-sm text-red-500">비밀번호를 입력해 주세요.</p>
                )}
                {confirmPwdError === "changefail" && (
                  <p className="px-2 text-sm text-red-500">비밀번호 변경에 실패했습니다.</p>
                )}
                {pwdMismatch && (
                  <p className="px-2 text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
                )}
              </CardContent>

              <CardFooter className="mt-10 flex flex-col gap-3">
                <Button
                  type="button"
                  className="block w-3/4 mx-auto"
                  onClick={changePassword}
                  disabled={!codeVerified}
                >
                  비밀번호 변경하기
                </Button>
                <Link href="/account/signin" className="block w-3/4 mx-auto">
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
      )}

      {step === 2 && (
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
              <h1 className="text-center text-2xl font-bold mt-[30px] mb-[1px]">
                비밀번호 재설정 안내
              </h1>
              <CardContent className="flex flex-col items-center space-y-4 py-8">
                <LockKeyhole className="w-40 h-40 text-primary-500 -mt-2" />
                <p className="text-center text-lg font-bold">비밀번호 변경이 완료되었습니다!</p>
              </CardContent>
              <CardFooter className="mt-auto flex flex-col gap-3 px-6">
                <Link href="/" className="block w-3/4 mx-auto">
                  <Button variant="outline" className="w-full border-gray-300">
                    메인 가기
                  </Button>
                </Link>
                <Link href="/account/signin" className="block w-3/4 mx-auto">
                  <Button className="w-full">로그인 하기</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
