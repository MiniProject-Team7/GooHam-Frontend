"use client";
import React, { JSX, useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import { useAuthStore } from "@/components/common/useAuthStore";
import axiosInstance from "@/utils/axiosInstance";

type MyPageData = {
  created_at: string;
  updated_at: string;
};

const formatDateTime = (datetime: string) => {
  return new Date(datetime).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const SettingsGroupSection = (): JSX.Element => {
  const [data, setData] = useState<MyPageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const email = useAuthStore((state) => state.email);
  console.log("email:", email);

  useEffect(() => {
    if (!email) {
      setError("로그인이 필요합니다.");
      return;
    }
    setLoading(true);

    setLoading(true);
    axiosInstance
      .get<MyPageData>(`/users/mypage/detail?member_email=${email}`)
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setError("데이터를 불러오는 데 실패했습니다.");
        console.error(err);
      });
    setLoading(false);
  }, [email]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <section className="w-full max-w-[836px] my-8">
      <h2 className="text-heading-md font-semibold text-black mb-6">계정 정보</h2>

      <Card className="w-full border border-solid border-gray-22 rounded-xl">
        <CardContent className="p-0">
          <div className="flex justify-between items-center p-8">
            <div className="flex flex-col gap-4">
              <p className="text-title-md text-black text-base">
                계정 생성 일자:{" "}
                <span className="text-label-lg font-normal">
                  {" "}
                  {formatDateTime(data.created_at)}
                </span>
              </p>
              <p className="text-title-md text-black">
                계정 정보 업데이트 일자:
                <span className="text-label-lg font-normal">{formatDateTime(data.updated_at)}</span>
              </p>
            </div>

            <Button
              variant="default" // 버튼의 variant를 설정 (primary 버튼 스타일)
              size="default" // 버튼의 크기 설정 (기본 크기)
              className="text-white rounded-xl py-[13px] px-8" // 추가적인 클래스 적용
            >
              비밀번호 변경
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
