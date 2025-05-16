"use client";
import React, { JSX, useEffect, useState } from "react";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Switch } from "../../../../../components/ui/switch";
import axiosInstance from "@/utils/axiosInstance";
import { useAuthStore } from "@/components/common/useAuthStore";

type MyPageData = {
  notification_enable: "0" | "1";
};

export const UserInfoGroupSection = (): JSX.Element => {
  const email = useAuthStore((state) => state.email);
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // 초기 알림 설정 값 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<MyPageData>(
          `/users/mypage/detail?member_email=${email}`
        );
        const enable = res.data.notification_enable === "1";
        setNotificationEnabled(enable);
      } catch (err) {
        console.error("알림 설정 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchData();
  }, [email]);

  // 알림 토글 핸들러
  const handleToggle = async () => {
    const newValue = !notificationEnabled;
    setNotificationEnabled(newValue);

    try {
      await axiosInstance.patch("/users/mypage/notification", {
        member_email: email,
        notification_enable: newValue ? "1" : "0",
      });
      console.log("알림 설정 변경 완료");
    } catch (err) {
      console.error("알림 설정 변경 실패:", err);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <section className="w-full max-w-[836px] my-8">
      <h2 className="mb-6 font-bold text-heading-md text-black">알림 설정</h2>

      <Card className="w-full border border-solid border-gray-22 rounded-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-title-sm text-black">알림</p>
              <p className="text-label-lg text-black">내 활동에 관련된 알림을 받겠습니다.</p>
            </div>
            <Switch
              checked={notificationEnabled}
              onCheckedChange={handleToggle}
              className="mr-[5px]"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
