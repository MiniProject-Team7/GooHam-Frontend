"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ActionButtonSection } from "@/app/(afterAuth)/mypage/DivWrapper/sections/ActionButtonSection";
import { useRouter } from "next/navigation";
import FileInput from "./FileInput";

export default function PostWrite() {
  const [selected, setSelected] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();
  const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];
    if (img) {
      const formData = new FormData();
      formData.append("file", img);
      console.log(formData); // FormData {}
      for (const keyValue of formData) console.log(keyValue);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    participant: "",
    schedule: "",
    period: "",
    location: "",
    categoryName: "",
  });

  const requiredItems = [
    "게시글 제목",
    "모집 인원",
    "모임 일정",
    "모집 기간",
    "모임 장소",
    "카테고리",
  ] as const;

  type RequiredItem = (typeof requiredItems)[number];

  const isFilled: Record<RequiredItem, boolean> = {
    "게시글 제목": formData.title.trim() !== "",
    "모집 인원": formData.participant.trim() !== "",
    "모임 일정": formData.schedule.trim() !== "",
    "모집 기간": formData.period.trim() !== "",
    "모임 장소": formData.location.trim() !== "",
    카테고리: formData.categoryName.length > 0,
  };

  // const handleRegister = () => {
  //   // 등록 로직
  //   router.push("/posts");
  // };

  const handleRegister = async () => {
    if (files.length > 0) {
      const uploadFormData = new FormData();
      files.forEach((file) => uploadFormData.append("files", file));
      console.log("업로드된 이미지 URL들:", uploadFormData);
      try {
        const res = await fetch("/posts/??????", {
          method: "POST",
          body: uploadFormData,
        });

        if (!res.ok) throw new Error("이미지 업로드 실패");

        const data = await res.json();
        console.log("업로드된 이미지 URL들:", data);
      } catch (error) {
        console.error(error);
      }
    }

    // 게시글 등록 로직
    router.push("/posts");
  };

  // useEffect(() => {
  //   console.log("선택된 카테고리 상태:", selected);
  //   console.log("formData.categoryName:", formData);
  // }, [selected, formData.categoryName]);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-6">
      <h1 className="text-heading-lg font-bold mb-6">게시글 작성하기</h1>
      <div className="grid grid-cols-1 gap-4 mb-8 p-8 rounded-xl bg-white">
        <p className="text-title-lg text-black mb-2">게시글 필수 항목을 먼저 작성해보세요.</p>
        <div className="flex gap-2">
          {requiredItems.map((name) => (
            <Badge key={name} variant={isFilled[name] ? "editSelected" : "editDefault"}>
              {name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 pb-0">
          <div>
            <Label htmlFor="title" className="mb-2">
              게시글 제목
            </Label>
            <Input
              id="title"
              placeholder="게시글 제목을 입력해주세요."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
          <div>
            <Label htmlFor="people" className="mb-2">
              모집 인원
            </Label>
            <Input
              id="people"
              type="number"
              placeholder="모집 인원을 입력해주세요."
              value={formData.participant}
              onChange={(e) => setFormData({ ...formData, participant: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="schedule" className="mb-2">
              모임 일정
            </Label>
            <Input
              id="schedule"
              type="datetime-local"
              placeholder="모임 일정을 입력해주세요."
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="period" className="mb-2">
              모집 기간
            </Label>
            <Input
              id="period"
              type="date"
              placeholder="모집 기간을 입력해주세요."
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="location" className="mb-2">
              모임 장소
            </Label>
            <Input
              id="location"
              placeholder="모임 장소를 입력해주세요."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>
        <div className="mb-8 p-8 pt-0">
          <Label className="mb-1 block">카테고리</Label>
          <ActionButtonSection
            selected={selected}
            onChange={(selectedArr) => {
              // 배열에서 마지막 클릭된 값 하나만 사용
              const latest = selectedArr[selectedArr.length - 1] ?? "";
              setSelected(latest ? [latest] : []);
              setFormData((prev) => ({
                ...prev,
                categoryName: latest,
              }));
            }}
            className="w-[80%] grid-cols-10"
          />
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-heading-lg font-bold mb-6">게시글 정보 입력하기</h1>
        <div className="gap-4 mb-8 p-6 rounded-xl bg-white">
          <Label className="block mb-2">이미지 추가</Label>
          <FileInput files={files} setFiles={setFiles} />
          {/* <div className="w-full h-50 bg-gray-22 rounded-xl flex items-center justify-center cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              name="post_img"
              onChange={handleImg}
            ></input>
            <Plus className="w-8 h-8 text-black" />
          </div> */}
          {/* <div className="text-sm text-right mt-2 text-gray-600 flex items-center justify-end gap-1">
            <Plus className="w-4 h-4" /> 이미지 추가
          </div> */}
          <div className="mb-10">
            <Label htmlFor="desc">게시글 상세 설명</Label>
            <Textarea id="desc" rows={6} placeholder="Text" className="mt-2 resize-none" />
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="default" onClick={handleRegister}>
              게시글 등록하기
            </Button>
            <Button variant="outline" onClick={router.back}>
              작성 취소
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
