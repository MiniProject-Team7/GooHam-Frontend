"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import { useAuthStore } from "@/components/common/useAuthStore";

// Data for category badges
// const categories = ["스포츠", "일상", "자기계발"];

// 타입 정의
type MyPageData = {
  member_name: string;
  birth_date: string;
  member_nickname: string;
  member_phone: string;
  member_email: string;
  member_introduce: string;
  interests: { category_id: number; name: string }[];
  profile_image: string;
};

export const ReadOnlyView = ({ setIsEditing }: { setIsEditing: (v: boolean) => void }) => {
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
        console.log(data?.interests);
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
    <div>
      {/* Basic Information Section */}

      <Card className="w-[787px] box-border border border-gray-22 rounded-xl mb-10 ">
        <CardContent className="p-10">
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage src={data.profile_image} alt="Profile" />
              <AvatarFallback>{data.member_name}</AvatarFallback>
            </Avatar>
          </div>

          <div className="grid grid-cols-[max-content_1fr_max-content_1fr] gap-y-10 gap-x-6">
            {/* 이름 */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1">이름</div>
            <div className="text-title-md font-medium col-span-1">{data.member_name}</div>

            {/* 생년월일 */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1">생년월일</div>
            <div className="text-title-md font-medium col-span-1">{data.birth_date}</div>

            {/* 닉네임 */}

            <div className="text-title-md font-semibold text-gray-40 col-span-1 mt-[10px]">
              닉네임
            </div>
            <div className="text-title-md font-medium col-span-1 mt-[10px]">
              {data.member_nickname}
            </div>

            {/* 전화번호호 */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1 mt-[10px]">
              전화번호
            </div>
            <div className="text-title-md font-medium col-span-1 mt-[10px]">
              {data.member_phone}
            </div>

            {/* 이메일 */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1 mt-[10px]">
              이메일
            </div>
            <div className="text-title-md font-medium col-span-1 mt-[10px]">
              {data.member_email}
            </div>

            {/* 카테고리 (1줄 전체) */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1 mt-[10px]">
              카테고리
            </div>
            <div className="flex gap-2 flex-wrap col-span-1 mt-[5px]">
              {data.interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-4 py-[7px] rounded-[20px] bg-white border border-gray-50"
                >
                  {interest.name}
                </Badge>
              ))}
            </div>

            {/* 자기소개 (1줄 전체) */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1">자기소개</div>
            <div className="text-title-md font-medium col-span-3">{data.member_introduce}</div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              variant="default"
              className="rounded-xl px-8 py-3 text-white"
              onClick={() => setIsEditing(true)}
            >
              수정
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
