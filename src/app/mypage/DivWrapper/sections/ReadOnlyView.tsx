import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

// Data for category badges
const categories = ["스포츠", "일상", "자기계발"];

export const ReadOnlyView = ({ setIsEditing }: { setIsEditing: (v: boolean) => void }) => {
  return (
    <div>
      {/* Basic Information Section */}

      <Card className="border border-gray-22 rounded-xl mb-10">
        <CardContent className="p-10">
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage src="https://c.animaapp.com/3EAByKyp/img/image-4@2x.png" alt="Profile" />
              <AvatarFallback>홍길동</AvatarFallback>
            </Avatar>
          </div>

          <div className="grid grid-cols-[max-content_1fr_max-content_1fr] gap-y-6 gap-x-6">
            {/* 이름 */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1">이름</div>
            <div className="text-title-md font-medium col-span-1">홍길동</div>

            {/* 생년월일 */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1">생년월일</div>
            <div className="text-title-md font-medium col-span-1">2000.00.00</div>

            {/* 닉네임 */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1">닉네임</div>
            <div className="text-title-md font-medium col-span-1">길동짱</div>

            {/* 이메일 */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1">이메일</div>
            <div className="text-title-md font-medium col-span-1">honghong@test.com</div>

            {/* 자기소개 (1줄 전체) */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1">자기소개</div>
            <div className="text-title-md font-medium col-span-3">
              안녕하세요! 취미로 코딩하는 남자, 홍길동입니다. 좋은 인연 많이 만들고 싶습니다~
            </div>

            {/* 카테고리 (1줄 전체) */}
            <div className="text-title-md font-semibold text-gray-40 col-span-1">카테고리</div>
            <div className="flex gap-2 flex-wrap col-span-3">
              {categories.map((category, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-4 py-[7px] rounded-[20px] bg-white border border-gray-50"
                >
                  {category}
                </Badge>
              ))}
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
