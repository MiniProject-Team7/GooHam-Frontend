import React, { JSX } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Switch } from "../../../../components/ui/switch";

export const UserInfoGroupSection = (): JSX.Element => {
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
            <Switch className="mr-[5px]" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
