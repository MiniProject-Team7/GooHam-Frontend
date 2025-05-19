"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/components/common/useAuthStore";
import { usePresignedUrls } from "@/components/hooks/usePresignedImage";

// 타입 정의
type MyPageData = {
  member_name: string;
  birth_date: string;
  member_nickname: string;
  member_phone: string;
  member_email: string;
  member_introduce: string;
  interests: { category_id: number; name: string }[];
  profile_image: string; // S3 Key
};

export const ReadOnlyView = ({
  setIsEditing,
}: {
  setIsEditing: (v: boolean) => void;
}) => {
  const [data, setData] = useState<MyPageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const email = useAuthStore((s) => s.email);

  // 1) 사용자 프로필 이미지 presign URL 훅
  //    data?.profile_image 에 S3 키가 들어있다면
  const presignedProfile = usePresignedUrls(data?.profile_image ?? null);
  // 2) presign 결과가 string|null|string[] 이므로
  //    단일 이미지이니 string|null 타입으로 간주
  console.log(presignedProfile);
  const avatarSrc =
    typeof presignedProfile === "string"
      ? presignedProfile
      : "/images/default_profile.png";

  useEffect(() => {
    if (!email) {
      setError("로그인이 필요합니다.");
      return;
    }
    setLoading(true);

    axiosInstance
      .get<MyPageData>(
        `/users/mypage/detail?member_email=${encodeURIComponent(email)}`
      )
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("데이터를 불러오는 데 실패했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div>
      <Card className="w-[787px] border border-gray-22 rounded-xl mb-10">
        <CardContent className="p-10">
          {/* 프로필 아바타만 presigned URL */}
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage
                src={avatarSrc}
                alt={data.member_name}
                className="object-cover"
              />
              <AvatarFallback>
                {data.member_name[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="grid grid-cols-[max-content_1fr_max-content_1fr] gap-y-10 gap-x-6">
            <div className="text-title-md font-semibold text-gray-40">이름</div>
            <div className="text-title-md font-medium">{data.member_name}</div>

            <div className="text-title-md font-semibold text-gray-40">
              생년월일
            </div>
            <div className="text-title-md font-medium">{data.birth_date}</div>

            <div className="text-title-md font-semibold text-gray-40">
              닉네임
            </div>
            <div className="text-title-md font-medium">
              {data.member_nickname}
            </div>

            <div className="text-title-md font-semibold text-gray-40">
              전화번호
            </div>
            <div className="text-title-md font-medium">{data.member_phone}</div>

            <div className="text-title-md font-semibold text-gray-40">이메일</div>
            <div className="text-title-md font-medium">
              {data.member_email}
            </div>

            <div className="text-title-md font-semibold text-gray-40">
              카테고리
            </div>
            <div className="flex gap-2 flex-wrap">
              {data.interests.map((interest, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="px-4 py-[7px] rounded-[20px] bg-white border-gray-50"
                >
                  {interest.name}
                </Badge>
              ))}
            </div>

            <div className="text-title-md font-semibold text-gray-40">
              자기소개
            </div>
            <div className="text-title-md font-medium col-span-3">
              {data.member_introduce}
            </div>
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
