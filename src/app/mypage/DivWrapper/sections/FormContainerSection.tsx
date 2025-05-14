// FormContainerSection.tsx
"use client";
import React, { JSX } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { DeleteMessage } from "./DeleteMessage";

export const FormContainerSection = (): JSX.Element => {
  const handleDelete = () => {
    console.log("계정 삭제 처리 실행");
    // 실제 삭제 로직 (예: API 호출)
  };

  return (
    <section className="w-full max-w-[834px] my-8">
      <h2 className="text-heading-md font-bold text-black mb-6">계정 삭제</h2>

      <Card className="border border-gray-22 rounded-xl">
        <CardContent className="p-6 flex justify-between items-center">
          <p className="text-label-lg text-black">
            계정 삭제 시 프로필 및 활동한 정보가 삭제됩니다.
          </p>

          {/* 버튼을 ConfirmDialog의 trigger로 전달 */}
          <DeleteMessage
            title="정말 계정을 삭제하시겠습니까?"
            onConfirm={handleDelete}
            trigger={<Button className="rounded-xl px-8 py-3">삭제하기</Button>} // trigger로 버튼 전달
          />
        </CardContent>
      </Card>
    </section>
  );
};
