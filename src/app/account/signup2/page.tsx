"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionButtonSection } from "@/app/mypage/DivWrapper/sections/ActionButtonSection";

export default function Signup2Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [birthError, setBirthError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  const handleBack = () => router.push("/account/signup");

  const handleSignup = () => {
    setNameError("");
    setNicknameError("");
    setBirthError("");
    setPhoneError("");
    setCategoryError("");

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

    router.push("/");
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
        <Image
          src="/login.png"
          alt="GooHam Logo"
          width={800}
          height={800}
          className="ml-[1px] mt-[50px] object-contain"
        />
        <Card className="w-[500px] mt-[50px] mr-[100px] p-6 flex flex-col border-none shadow-none">
          <h1 className="text-center text-2xl font-bold mb-[10px]">GooHam 회원가입</h1>
          <CardContent className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="signup-name" className="mb-1 font-medium">이름*</label>
              <Input
                id="signup-name"
                placeholder="이름을 입력해 주세요"
                value={name}
                className={nameError ? "border-red-500 focus:border-red-500" : ""}
                onChange={e => { setName(e.target.value); setNameError(""); }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="signup-nickname" className="mb-1 font-medium">닉네임*</label>
              <Input
                id="signup-nickname"
                placeholder="닉네임을 입력해 주세요"
                value={nickname}
                className={nicknameError ? "border-red-500 focus:border-red-500" : ""}
                onChange={e => { setNickname(e.target.value); setNicknameError(""); }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="signup-birth" className="mb-1 font-medium">생년월일*</label>
              <Input
                id="signup-birth"
                type="date"
                value={birth}
                className={birthError ? "border-red-500 focus:border-red-500" : ""}
                onChange={e => { setBirth(e.target.value); setBirthError(""); }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="signup-phone" className="mb-1 font-medium">전화번호*</label>
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
            <p className="mb-1 font-medium">관심 카테고리</p>
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
            <Button variant="outline" className="w-full border-gray-300" onClick={handleBack}>뒤로 가기</Button>
            <Button className="w-full" onClick={handleSignup}>회원가입 완료하기</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
