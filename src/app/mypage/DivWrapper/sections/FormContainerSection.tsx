import React, { JSX } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const FormContainerSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[834px] my-8">
      <h2 className="text-[28px] font-bold [font-family:'Pretendard-Bold',Helvetica] text-black mb-6">
        계정 삭제
      </h2>

      <Card className="border border-solid border-[#00000038] rounded-xl">
        <CardContent className="p-6 flex justify-between items-center">
          <p className="text-xl [font-family:'Pretendard-Regular',Helvetica] text-black">
            계정 삭제 시 프로필 및 활동한 정보가 삭제 됩니다.
          </p>
          <Button className="rounded-xl px-8 py-3">삭제하기</Button>
        </CardContent>
      </Card>
    </section>
  );
};
