import React, { JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Switch } from "../../../../../components/ui/switch";

// Data for category badges
const categories = ["스포츠", "일상", "자기계발"];

export const AccountSettingsSection = (): JSX.Element => {
  return (
    <div className="w-full max-w-[980px] mx-auto mt-[222px]">
      <h1 className="text-[32px] font-bold [font-family:'Pretendard-Bold',Helvetica] mb-6">
        계정 관리
      </h1>

      <Card className="w-full border border-[#00000033] rounded-xl">
        <CardContent className="p-12">
          {/* Basic Information Section */}
          <h2 className="text-[28px] font-semibold [font-family:'Pretendard-SemiBold',Helvetica] mb-8">
            기본 정보
          </h2>

          <Card className="border border-[#00000038] rounded-xl mb-10">
            <CardContent className="p-10">
              <div className="flex flex-col items-center mb-8">
                <Avatar className="w-[100px] h-[100px]">
                  <AvatarImage
                    src="https://c.animaapp.com/3EAByKyp/img/image-4@2x.png"
                    alt="Profile"
                  />
                  <AvatarFallback>홍길동</AvatarFallback>
                </Avatar>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-16 gap-y-6">
                <div className="text-xl font-semibold text-grey [font-family:'Pretendard-SemiBold',Helvetica]">
                  이름
                </div>
                <div className="text-xl font-medium [font-family:'Pretendard-Medium',Helvetica]">
                  홍길동
                </div>

                <div className="text-xl font-semibold text-grey [font-family:'Pretendard-SemiBold',Helvetica]">
                  생년월일
                </div>
                <div className="text-xl font-medium [font-family:'Pretendard-Medium',Helvetica]">
                  2000.00.00
                </div>

                <div className="text-xl font-semibold text-grey [font-family:'Pretendard-SemiBold',Helvetica]">
                  닉네임
                </div>
                <div className="text-xl font-medium [font-family:'Pretendard-Medium',Helvetica]">
                  길동짱
                </div>

                <div className="text-xl font-semibold text-grey [font-family:'Pretendard-SemiBold',Helvetica]">
                  이메일
                </div>
                <div className="text-xl font-medium [font-family:'Pretendard-Medium',Helvetica]">
                  honghong@test.com
                </div>

                <div className="text-xl font-semibold text-grey [font-family:'Pretendard-SemiBold',Helvetica]">
                  자기소개
                </div>
                <div className="text-xl font-medium [font-family:'Pretendard-Medium',Helvetica]">
                  안녕하세요! 취미로 코딩하는 남자, 홍길동입니다. 좋은 인연 많이 만들고 싶습니다~
                </div>

                <div className="text-xl font-semibold text-grey [font-family:'Pretendard-SemiBold',Helvetica]">
                  카테고리
                </div>
                <div className="flex gap-2">
                  {categories.map((category, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-4 py-[7px] rounded-[20px] bg-surface text-on-surface border-stroke"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-primaryvarientprimaryvarient-500 text-app-background rounded-xl px-8 h-auto py-3">
                  수정
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Password Section */}
          <h2 className="text-[28px] font-semibold [font-family:'Pretendard-SemiBold',Helvetica] mb-8">
            비밀번호
          </h2>

          <Card className="border border-[#00000038] rounded-xl mb-10">
            <CardContent className="p-10 flex justify-between items-center">
              <div>
                <p className="text-base font-normal [font-family:'Pretendard-Regular',Helvetica] mb-4">
                  최근 업데이트: xxx
                </p>
                <p className="text-xl font-normal [font-family:'Pretendard-Regular',Helvetica]">
                  비밀번호
                </p>
              </div>
              <Button className="bg-primaryvarientprimaryvarient-500 text-app-background rounded-xl px-8 h-auto py-3">
                비밀번호 변경
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings Section */}
          <h2 className="text-[28px] font-bold [font-family:'Pretendard-Bold',Helvetica] mb-8">
            알림 설정
          </h2>

          <Card className="border border-[#00000038] rounded-xl mb-10">
            <CardContent className="p-10 flex justify-between items-center">
              <div>
                <p className="text-base font-normal [font-family:'Pretendard-Regular',Helvetica] mb-4">
                  알림
                </p>
                <p className="text-xl font-normal [font-family:'Pretendard-Regular',Helvetica]">
                  내 활동에 관련된 알림을 받겠습니다.
                </p>
              </div>
              <Switch className="h-[35px] w-[75px] bg-[#d9d9d9] data-[state=checked]:bg-primaryvarientprimaryvarient-500" />
            </CardContent>
          </Card>

          {/* Account Deletion Section */}
          <h2 className="text-[28px] font-bold [font-family:'Pretendard-Bold',Helvetica] mb-8">
            계정 삭제
          </h2>

          <Card className="border border-[#00000038] rounded-xl">
            <CardContent className="p-10 flex justify-between items-center">
              <p className="text-xl font-normal [font-family:'Pretendard-Regular',Helvetica]">
                계정 삭제 시 프로필 및 활동한 정보가 삭제 됩니다.
              </p>
              <Button className="bg-primaryvarientprimaryvarient-500 text-app-background rounded-xl px-8 h-auto py-3">
                삭제하기
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
