"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);
  
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [step2Empty, setStep2Empty] = useState({ name: false, nickname: false, birth: false, phone: false });
  const categories = [
    "스포츠", "자기계발", "여행", "일상",
    "공동구매", "음식", "취미/요리", "인문/예술", "기타"
  ];
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  const toggleAll = () => {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgreeTerms(next);
    setAgreePrivacy(next);
    setAgreeMarketing(next);
  };

  const handleNext = () => {
    let ok = true;
    setEmailEmpty(false);
    if (!email) { setEmailEmpty(true); ok = false; }
    if (!password || !confirmPwd) ok = false;
    if (password !== confirmPwd) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!agreeTerms || !agreePrivacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    if (!ok) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSignup = () => {
    const empties = { name: false, nickname: false, birth: false, phone: false };
    let ok = true;
    if (!name) { empties.name = true; ok = false; }
    if (!nickname) { empties.nickname = true; ok = false; }
    if (!birth) { empties.birth = true; ok = false; }
    if (!phone) { empties.phone = true; ok = false; }
    setStep2Empty(empties);
    if (!ok) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    alert(`회원가입 완료! 환영합니다, ${nickname}님.`);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFCCCC]">
      <div className="flex items-center">
        <Image src="/login.png" alt="GooHam Logo" width={800} height={800} className="ml-[1px] mt-[50px] object-contain" />
        <Card className="w-[500px] mt-[50px] mr-[100px] p-6 flex flex-col border-none shadow-none">
          <h1 className="text-center text-2xl font-bold mt-[20px] mb-[30px]">GooHam 회원가입</h1>
          {step === 1 ? (
            <>
              <CardContent className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="signup-email" className="mb-1 font-medium">이메일</label>
                  <Input id="signup-email" type="email" placeholder="이메일을 입력해 주세요" value={email}
                    className={emailEmpty ? "border-red-500 focus:border-red-500" : ""}
                    onChange={e => { setEmail(e.target.value); setEmailEmpty(false); }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="signup-password" className="mb-1 font-medium">비밀번호</label>
                  <Input id="signup-password" type="password" placeholder="영문자, 숫자, 특수문자 포함 8-20자" value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="signup-confirm" className="mb-1 font-medium"></label>
                  <Input id="signup-confirm" type="password" placeholder="비밀번호를 확인해 주세요" value={confirmPwd}
                    onChange={e => setConfirmPwd(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center"><Checkbox checked={agreeAll} onCheckedChange={toggleAll}/> <span className="ml-2">전체 동의</span></label>
                  <label className="flex items-center"><Checkbox checked={agreeTerms} onCheckedChange={setAgreeTerms}/> <span className="ml-2">이용약관 동의 *</span></label>
                  <label className="flex items-center"><Checkbox checked={agreePrivacy} onCheckedChange={setAgreePrivacy}/> <span className="ml-2">개인정보 수집 및 이용 동의 *</span></label>
                  <label className="flex items-center"><Checkbox checked={agreeMarketing} onCheckedChange={setAgreeMarketing}/> <span className="ml-2">[선택] 마케팅 활용 및 광고 수신 동의</span></label>
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex flex-col gap-3">
                <Link href="/account/signin" className="block w-full"><Button variant="outline" className="w-full border-gray-300">로그인으로 돌아가기</Button></Link>
                <Button className="w-full" onClick={handleNext}>다음 단계 진행하기</Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardContent className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="signup-name" className="mb-1 font-medium">이름</label>
                  <Input id="signup-name" placeholder="이름을 입력해 주세요" value={name}
                    className={step2Empty.name?"border-red-500":""}
                    onChange={e=> setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="signup-nickname" className="mb-1 font-medium">닉네임</label>
                  <Input id="signup-nickname" placeholder="닉네임을 입력해 주세요" value={nickname}
                    className={step2Empty.nickname?"border-red-500":""}
                    onChange={e=> setNickname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="signup-birth" className="mb-1 font-medium">생년월일</label>
                  <Input id="signup-birth" type="date" value={birth}
                    className={step2Empty.birth?"border-red-500":""}
                    onChange={e=> setBirth(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="signup-phone" className="mb-1 font-medium">전화번호</label>
                  <Input id="signup-phone" type="tel" placeholder="전화번호를 입력해 주세요" value={phone}
                    className={step2Empty.phone?"border-red-500":""}
                    onChange={e=> setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <p className="mb-1 font-medium">관심 카테고리</p>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map(cat=>(
                      <Button key={cat} variant={selectedCats.includes(cat)?undefined:"outline"} className="py-2"
                        onClick={_=> setSelectedCats(prev=> prev.includes(cat)? prev.filter(c=>c!==cat):[...prev,cat])}
                      >{cat}</Button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex flex-col gap-3">
                <Button variant="outline" className="w-full border-gray-300" onClick={handleBack}>뒤로 가기</Button>
                <Button className="w-full" onClick={handleSignup}>회원가입 완료하기</Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
