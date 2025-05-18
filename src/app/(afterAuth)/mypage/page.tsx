"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // next/navigation에서 useRouter 사용
import { DivWrapper } from "./DivWrapper/DivWrapper";

const MyPage = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트 환경에서만 렌더링
  }, []);

  useEffect(() => {
    if (!isClient) return; // 클라이언트 환경이 아니면 리다이렉트 로직 실행 안 함

    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (!token) {
      router.push("/account/signin"); // 로그인 페이지로 리다이렉트
    }
  }, [router, isClient]);

  if (!isClient) {
    return <div>Loading...</div>; // 클라이언트 환경이 아니면 로딩 화면
  }

  return <DivWrapper />;
};

export default MyPage;
