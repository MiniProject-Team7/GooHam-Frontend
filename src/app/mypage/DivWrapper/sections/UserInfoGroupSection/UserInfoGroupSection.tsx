import React, { JSX } from "react";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Switch } from "../../../../../components/ui/switch";

export const UserInfoGroupSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[836px] my-8">
      <h2 className="mb-6 font-bold text-[28px] [font-family:'Pretendard-Bold',Helvetica] text-black">
        알림 설정
      </h2>

      <Card className="w-full border border-solid border-[#00000038] rounded-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-base text-black">
                알림
              </p>
              <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-xl text-black">
                내 활동에 관련된 알림을 받겠습니다.
              </p>
            </div>
            <Switch className="scale-[1.75] mr-[25px]" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
