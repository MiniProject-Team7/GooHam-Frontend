"use client";

interface ApiError {
  response: {
    status: number;
    data: { message: string };
  };
}

function isApiError(err: unknown): err is ApiError {
  // 1) err가 객체인지 확인
  if (typeof err !== "object" || err === null) return false;

  // 2) response 프로퍼티가 있는지 확인
  if (!("response" in err)) return false;

  // 3) response를 unknown으로 받아서
  const response = (err as { response?: unknown }).response;
  if (typeof response !== "object" || response === null) return false;

  // 4) response.status 와 response.data 프로퍼티 검사
  if (!("status" in response) || !("data" in response)) return false;

  return true;
}

interface SignupResponse {
  status: "success" | "error" | string;
  message: string;
  data: {
    member_email: string;
    member_nickname: string;
    member_name: string;
    member_phone: string;
    member_introduce: string;
    birth_date: string;
    created_at: string;
    profile_image: string;
  };
}


import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios, { AxiosError } from "axios";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, PartyPopper } from "lucide-react";
import { ActionButtonSection } from "@/app/(afterAuth)/mypage/DivWrapper/sections/ActionButtonSection";


export default function Signup1Page() {
  // const router = useRouter();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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
    setTermsError("");

    if (!email) { setEmailError("required"); ok = false; }
    if (!password) { setPasswordError("required"); ok = false; }
    if (!confirmPwd) { setConfirmError("required"); ok = false; }

    if (!ok) return;

    if (!/^\S+@\S+\.com$/.test(email)) {
      setEmailError("invalid");
      return;
    }

    if (password !== confirmPwd) {
      setConfirmError("mismatch");
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      setTermsError("required");
      return;

    }

    setStep(2);
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  // const handleSignup = () => {
  //   setNameError("");
  //   setNicknameError("");
  //   setBirthError("");
  //   setPhoneError("");
  //   setCategoryError("");

  //   let ok = true;
  //   if (!name)    { setNameError("required"); ok = false; }
  //   if (!nickname){ setNicknameError("required"); ok = false; }
  //   if (!birth)   { setBirthError("required"); ok = false; }
  //   if (!phone)   { setPhoneError("required"); ok = false; }
  //   if (selectedCats.length < 1 || selectedCats.length > 3) {
  //     setCategoryError("required");
  //     ok = false;
  //   }
  //   if (!ok) return;

  //   setStep(3);
  // };

  const handleSignup = async () => {
    // 클라이언트 유효성 검사
    setNameError(""); setNicknameError(""); setBirthError(""); setPhoneError(""); setCategoryError("");
    let ok = true;
    if (!name)    { setNameError("required"); ok = false; }
    if (!nickname){ setNicknameError("required"); ok = false; }
    if (!birth)   { setBirthError("required"); ok = false; }
    if (!phone)   { setPhoneError("required"); ok = false; }
    if (selectedCats.length < 1 || selectedCats.length > 3) {
      setCategoryError("required");
      ok = false;
    }
    if (!ok) return;

    // payload 구성
    const payload = {
      member_email: email,
      member_password: password,
      member_name: name,
      member_nickname: nickname,
      member_phone: phone,
      member_introduce: "",
      profile_image: "",
      birth_date: birth,
    };

    try {
  setIsLoading(true);
  const res = await axiosInstance.post<SignupResponse>("/gooham/users/join", payload);
  if (res.data.status === "success") {
    setStep(3);
  } else {
    alert(res.data.message);
  }
} catch (error: unknown) {
  if (isApiError(error)) {
    const { status, data: { message } } = error.response;
    if (status === 409) {
      if (message.includes("이메일")) setEmailError("duplicate");
      else if (message.includes("닉네임")) setNicknameError("duplicate");
      else alert(message);
    } else {
      alert(message || "회원가입 중 오류가 발생했습니다.");
    }
  } else {
    console.error("알 수 없는 오류:", error);
    alert("회원가입 중 알 수 없는 오류가 발생했습니다.");
  }
} finally {
  setIsLoading(false);
}


  };

  const handleCatChange = (newSelected: string[]) => {
    if (newSelected.length <= 3) {
      setSelectedCats(newSelected);
      setCategoryError("");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFCCCC]">
      <div className="flex items-center">
        <Image src="/login.png" alt="GooHam Logo" width={800} height={800} className="ml-[1px] mt-[50px] object-contain" />
        {step === 1 && (
        <Card className="w-[500px] h-[700px] mt-[50px] mr-[100px] p-6 flex flex-col border-none shadow-none">
          <h1 className="text-center text-2xl font-bold mt-[20px] mb-[30px]">GooHam 회원가입</h1>
          <CardContent className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="signup-email" className="mb-1 font-bold">이메일</label>
              <Input
                id="signup-email"
                type="email"
                placeholder="이메일을 입력해 주세요"
                value={email}
                className={emailError ? "border-red-500 focus:border-red-500" : ""}
                onChange={e => { setEmail(e.target.value); setEmailError(""); }}
              />
            </div>

            <div className="mt-8 flex flex-col">
              <label htmlFor="signup-password" className="mb-1 font-bold">비밀번호</label>
              <div className="relative">
              <Input
                id="signup-password"
                type={showPwd ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                className={passwordError ? "border-red-500 focus:border-red-500" : ""}
                onChange={e => { setPassword(e.target.value); setPasswordError(""); }}
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute inset-y-0 right-3 flex items-center p-1">
                {showPwd ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
          </div>
            <div className="flex flex-col">
              <div className="relative">
              <Input
                id="signup-confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="비밀번호를 확인해 주세요"
                value={confirmPwd}
                className={confirmError ? "border-red-500 focus:border-red-500" : ""}
                onChange={e => { setConfirmPwd(e.target.value); setConfirmError(""); }}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-3 flex items-center p-1">
                {showConfirm ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
          </div>
          </CardContent>

          <div className="px-6">

              {emailError === "required" ? (
                <p className="text-center text-sm text-red-500">이메일을 입력해 주세요.</p>
              ) : emailError === "invalid" ? (
                <p className="text-center text-sm text-red-500">이메일 양식을 확인해 주세요.</p>
              ) : passwordError === "required" ? (
                <p className="text-center text-sm text-red-500">비밀번호를 입력해 주세요.</p>
              ) : confirmError === "required" ? (
                <p className="text-center text-sm text-red-500">비밀번호를 입력해 주세요.</p>
              ) : confirmError === "mismatch" ? (
                <p className="text-center text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
              ) : null}
          </div>
  
          <div className="mt-16 px-6">
              <label className="flex items-center">
                <Checkbox checked={agreeAll} onCheckedChange={toggleAll} />
                <span className="ml-2">전체 동의</span>
              </label>
              <div className="border-t border-gray-300 my-2" />
              <label className="flex items-center">
                <Checkbox checked={agreeTerms} onCheckedChange={val => { setAgreeTerms(val); setTermsError(""); }} />
                <span className="ml-2">이용약관 동의 *</span>
              </label>
              <label className="flex items-center">
                <Checkbox checked={agreePrivacy} onCheckedChange={val => { setAgreePrivacy(val); setTermsError(""); }} />
                <span className="ml-2">개인정보 수집 및 이용 동의 *</span>
              </label>
              <label className="flex items-center">
                <Checkbox checked={agreeMarketing} onCheckedChange={setAgreeMarketing} />
                <span className="ml-2">[선택] 마케팅 활용 및 광고 수신 동의</span>
              </label>
              {termsError === "required" && (
                <p className="mt-1 text-sm text-red-500">필수항목을 체크해 주세요.</p>
              )}
            </div>

          <CardFooter className="mt-auto flex flex-col gap-3 px-6">
            <Link href="/account/signin" className="block w-3/4 mx-auto"><Button variant="outline" className="w-full border-gray-300">로그인으로 돌아가기</Button></Link>
            <Button className="block w-3/4 mx-auto" onClick={handleNext}>다음 단계 진행하기</Button>
          </CardFooter>
        </Card>
        )}
      {step === 2 && (
        <Card className="w-[500px] mt-[50px] mr-[100px] p-6 flex flex-col border-none shadow-none">
                  <h1 className="text-center text-2xl font-bold mb-[10px]">GooHam 회원가입</h1>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col">
                      <label htmlFor="signup-name" className="mb-1 font-bold">이름*</label>
                      <Input
                        id="signup-name"
                        placeholder="이름을 입력해 주세요"
                        value={name}
                        className={nameError ? "border-red-500 focus:border-red-500" : ""}
                        onChange={e => { setName(e.target.value); setNameError(""); }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="signup-nickname" className="mb-1 font-bold">닉네임*</label>
                      <Input
                        id="signup-nickname"
                        placeholder="닉네임을 입력해 주세요"
                        value={nickname}
                        className={nicknameError ? "border-red-500 focus:border-red-500" : ""}
                        onChange={e => { setNickname(e.target.value); setNicknameError(""); }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="signup-birth" className="mb-1 font-bold">생년월일*</label>
                      <Input
                        id="signup-birth"
                        type="date"
                        value={birth}
                        className={birthError ? "border-red-500 focus:border-red-500" : ""}
                        onChange={e => { setBirth(e.target.value); setBirthError(""); }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="signup-phone" className="mb-1 font-bold">전화번호*</label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="전화번호를 입력해 주세요"
                        value={phone}
                        className={phoneError ? "border-red-500 focus:border-red-500" : ""}
                        onChange={e => { setPhone(e.target.value); setPhoneError(""); }}
                      />
                    </div>
                  </CardContent>
        
                  <div className="px-6">
                    {nameError === "required" ? (
                      <p className="text-center text-sm text-red-500">이름을 입력해 주세요.</p>
                    ) : nicknameError === "required" ? (
                      <p className="text-center text-sm text-red-500">닉네임을 입력해 주세요.</p>
                    ) : birthError === "required" ? (
                      <p className="text-center text-sm text-red-500">생년월일을 입력해 주세요.</p>
                    ) : phoneError === "required" ? (
                      <p className="text-center text-sm text-red-500">전화번호를 입력해 주세요.</p>
                    ) : null}
                  </div>
        
                  <div className="mt-4 px-6">
                    <p className="mb-1 font-bold">관심 카테고리</p>
                    <div className="border-t border-gray-300 my-2" />
                    <ActionButtonSection
                      selected={selectedCats}
                      onChange={handleCatChange}
                    />
                    {categoryError === "required" && (
                      <p className="mt-1 text-center text-sm text-red-500">최소 1개부터 최대 3개까지의 카테고리를 선택해 주세요.</p>
                    )}
                  </div>
        
                  <CardFooter className="mt-auto flex flex-col gap-3 px-6">
                    <Button variant="outline" className="block w-3/4 mx-auto border-gray-300" onClick={handleBackToStep1}>뒤로 가기</Button>
                    <Button className="block w-3/4 mx-auto" onClick={handleSignup} disabled={isLoading}>{isLoading ? "가입 중..." : "회원가입 완료하기"}</Button>
                  </CardFooter>
                </Card>
                )}

            {step === 3 && (

          <Card className="w-[500px] mt-[50px] mr-[100px] p-6 flex flex-col border-none shadow-none">
            <h1 className="text-center text-2xl font-bold mt-[30px] mb-[1px]">GooHam 회원가입</h1>
            <CardContent className="flex flex-col items-center space-y-4 py-8">
              <PartyPopper className="w-40 h-40 text-primary-500 -mt-2" />
              <p className="text-center text-lg font-bold">회원가입이 완료되었습니다!</p>
            </CardContent>
            <CardFooter className="mt-auto flex flex-col gap-3 px-6 mr-[45px] ml-[45px]">
              <Link href="/" className="block w-4/4 mx-auto"><Button variant="outline" className="w-full border-gray-300">메인 가기</Button></Link>
              <Link href="/account/signin" className="block w-4/4 mx-auto"><Button className="w-full">로그인 하기</Button></Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

