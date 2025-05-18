"use client";
import React, { JSX } from "react";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";

export const SettingsGroupSection = (): JSX.Element => {
  // Data for the password section
  const passwordData = {
    title: "비밀번호",
    lastUpdated: "xxx",
    buttonText: "비밀번호 변경",
  };

  return (
    <section className="w-full max-w-[836px] my-8">
      <h2 className="text-heading-md font-semibold text-black mb-6">{passwordData.title}</h2>

      <Card className="w-full border border-solid border-gray-22 rounded-xl">
        <CardContent className="p-0">
          <div className="flex justify-between items-center p-8">
            <div className="flex flex-col gap-4">
              <p className="text-label-lg text-black text-base">
                최근 업데이트: {passwordData.lastUpdated}
              </p>
              <p className="text-label-lg text-black">{passwordData.title}</p>
            </div>

            <Button
              variant="default" // 버튼의 variant를 설정 (primary 버튼 스타일)
              size="default" // 버튼의 크기 설정 (기본 크기)
              className="text-white rounded-xl py-[13px] px-8" // 추가적인 클래스 적용
            >
              {passwordData.buttonText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
