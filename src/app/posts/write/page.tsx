"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { ActionButtonSection } from "@/app/mypage/DivWrapper/sections/ActionButtonSection";

// const categories = [
//   "스포츠",
//   "일상",
//   "자기계발",
//   "공동구매",
//   "여행",
//   "음식",
//   "취미/오락",
//   "인문/예술",
//   "기타",
// ];

export default function PostWrite() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">게시글 작성하기</h1>
      <p className="text-gray-500 mb-6">게시글 필수 항목을 먼저 작성해보세요.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-6 border border-gray rounded-xl bg-white">
        <div>
          <Label htmlFor="title">게시글 제목</Label>
          <Input id="title" placeholder="게시글 제목을 입력해주세요." />
        </div>
        <div>
          <Label htmlFor="people">모집 인원</Label>
          <Input id="people" placeholder="모집 인원을 입력해주세요." />
        </div>
        <div>
          <Label htmlFor="schedule">모임 일정</Label>
          <Input id="schedule" placeholder="모임 일정을 입력해주세요." />
        </div>
        <div>
          <Label htmlFor="period">모집 기간</Label>
          <Input id="period" placeholder="모집 기간을 입력해주세요." />
        </div>
        <div>
          <Label htmlFor="location">모임 장소</Label>
          <Input id="location" placeholder="모임 장소를 입력해주세요." />
        </div>

        {/* ✅ 카테고리 버튼 */}
        <div className="col-span-full">
          <Label className="mb-2 block">카테고리</Label>
          <ActionButtonSection
            selected={selectedCategories}
            onChange={setSelectedCategories}
            className="grid-cols-10"
          />
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">게시글 정보 입력하기</h1>
        <div className="gap-4 mb-8 p-6 border border-gray rounded-xl bg-white">
          <Label className="block mb-2">이미지 추가</Label>
          <div className="w-full h-40 bg-gray-300 rounded-xl flex items-center justify-center cursor-pointer">
            <Plus className="w-8 h-8 text-black" />
          </div>
          <div className="text-sm text-right mt-2 text-gray-600 flex items-center justify-end gap-1">
            <Plus className="w-4 h-4" /> 이미지 추가
          </div>
          <div className="mb-10">
            <Label htmlFor="desc">게시글 상세 설명</Label>
            <Textarea id="desc" rows={6} placeholder="Text" className="mt-2 resize-none" />
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="default">게시글 등록하기</Button>
            <Button variant="outline">작성 취소</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
