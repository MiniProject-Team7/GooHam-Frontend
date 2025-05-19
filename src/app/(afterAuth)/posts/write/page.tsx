"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ActionButtonSection,
  Category,
} from "@/app/(afterAuth)/mypage/DivWrapper/sections/ActionButtonSection";
import { useRouter } from "next/navigation";
import FileInput from "./FileInput";
import { CreatePostRequest } from "@/types/post";
import { createPost } from "@/components/api/PostWriteApi";
import { useAuthStore } from "@/components/common/useAuthStore";
import { CheckDialog } from "../../participation/Alertmessage";

export default function PostWrite() {
  const [selected, setSelected] = useState<Category[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [imageError, setImageError] = useState<string>("");
  const userId = useAuthStore((state) => state.userId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({ title: "", description: "" });

  const categories = [
    { id: 1, name: "스포츠" },
    { id: 2, name: "일상" },
    { id: 3, name: "자기계발" },
    { id: 4, name: "공동구매" },
    { id: 5, name: "여행" },
    { id: 6, name: "음식" },
    { id: 7, name: "취미/오락" },
    { id: 8, name: "인문/예술" },
    { id: 9, name: "행사" },
    { id: 10, name: "기타" },
  ];

  const router = useRouter();

  const [myPostData, setMyPostData] = useState({
    title: "",
    location: "",
    categoryName: "",
    content: "",
    maxParticipants: 0,
    status: "모집 중",
    scheduleStart: "",
    scheduleEnd: "",
    eventStart: "",
  });

  const requiredItems = [
    {
      label: "게시글 제목",
      key: "title",
      id: "title",
      value: myPostData.title,
      isFilled: myPostData.title.trim() !== "",
    },
    {
      label: "모집 인원",
      key: "maxParticipants",
      id: "maxParticipants",
      value: myPostData.maxParticipants,
      isFilled: myPostData.maxParticipants > 1,
    },
    {
      label: "모임 일정",
      key: "eventStart",
      id: "eventStart",
      value: myPostData.eventStart,
      isFilled: myPostData.eventStart.trim() !== "",
    },
    {
      label: "모집 시작",
      key: "scheduleStart",
      id: "scheduleStart",
      value: myPostData.scheduleStart,
      isFilled: myPostData.scheduleStart.trim() !== "",
    },
    {
      label: "모집 종료",
      key: "scheduleEnd",
      id: "scheduleEnd",
      value: myPostData.scheduleEnd,
      isFilled: myPostData.scheduleEnd.trim() !== "",
    },
    {
      label: "모임 장소",
      key: "location",
      id: "location",
      value: myPostData.location,
      isFilled: myPostData.location.trim() !== "",
    },
    {
      label: "카테고리",
      key: "categoryName",
      id: "categoryName",
      value: myPostData.categoryName,
      isFilled: myPostData.categoryName.length > 0,
    },
  ] as const;

  const validateFields = () => {
    const newErrors: { [key: string]: boolean } = {};

    for (const item of requiredItems) {
      if (!item.isFilled) {
        newErrors[item.key] = true;
        // alert(`${item.label}을(를) 입력해주세요.`);
        const el = document.getElementById(item.id);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        (el as HTMLInputElement)?.focus();
        break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    try {
      if (!validateFields()) return;
      if (!userId) return;
      const req: CreatePostRequest = {
        userId: userId,
        title: myPostData.title,
        content: myPostData.content,
        categoryId: categories.find((cat) => cat.name === myPostData.categoryName)!.id,
        maxParticipants: myPostData.maxParticipants,
        status: "모집 중",
        scheduleStart: myPostData.scheduleStart + "T00:00:00",
        scheduleEnd: myPostData.scheduleStart + "T00:00:00",
        location: myPostData.location,
        eventStart: myPostData.eventStart,
        images: files,
      };
      await createPost(req);
      alert("게시글 등록 성공!");
      setDialogMessage({
        title: "게시글 등록 성공!",
        description: "게시글이 정상적으로 등록되었습니다.",
      });
      setDialogOpen(true);

      //  TODO. 이거 dialog로 변경
      router.push("/posts");
    } catch (e) {
      console.error(e);
      alert("실패!");
      setDialogMessage({
        title: "등록 실패",
        description: "게시글 등록 중 문제가 발생했습니다.",
      });
      setDialogOpen(true);
      //  TODO. 이거 dialog로 변경
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-6">
      <h1 className="text-heading-lg font-bold mb-6">게시글 작성하기</h1>
      <div className="grid grid-cols-1 gap-4 mb-8 p-10 rounded-xl bg-white">
        <p className="text-title-lg text-black mb-2">게시글 필수 항목을 먼저 작성해보세요.</p>
        <div className="flex gap-2">
          {requiredItems.map((item) => (
            <Badge key={item.key} variant={item.isFilled ? "editSelected" : "editDefault"}>
              {item.label}
            </Badge>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10 pb-0">
          <div>
            <Label htmlFor="title" variant="title">
              게시글 제목
            </Label>
            <Input
              id="title"
              placeholder="게시글 제목을 입력해주세요."
              value={myPostData.title}
              onChange={(e) => setMyPostData({ ...myPostData, title: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
          <div>
            <Label htmlFor="maxParticipants" variant="title">
              모집 인원
            </Label>
            <Input
              id="maxParticipants"
              type="number"
              min="0"
              placeholder="모집 인원을 입력해주세요."
              value={myPostData.maxParticipants}
              onChange={(e) =>
                setMyPostData({ ...myPostData, maxParticipants: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <Label htmlFor="eventStart" variant="title">
              모임 일정
            </Label>
            <Input
              id="eventStart"
              type="datetime-local"
              placeholder="모임 일정을 입력해주세요."
              value={myPostData.eventStart}
              min={new Date().toISOString().substring(0, 16)}
              onChange={(e) => setMyPostData({ ...myPostData, eventStart: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="scheduleStart" variant="title">
              모집 기간
            </Label>
            <div className="flex items-center gap-2 mb-2">
              <Input
                id="scheduleStart"
                type="date"
                className="flex-1"
                placeholder="모집 시작일"
                value={myPostData.scheduleStart}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setMyPostData({ ...myPostData, scheduleStart: e.target.value })}
              />
              <span className="text-gray-500">~</span>
              <Input
                id="scheduleEnd"
                type="date"
                className="flex-1"
                placeholder="모집 종료일"
                min={myPostData.scheduleStart}
                value={myPostData.scheduleEnd}
                onChange={(e) => setMyPostData({ ...myPostData, scheduleEnd: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location" variant="title">
              모임 장소
            </Label>
            <Input
              id="location"
              placeholder="모임 장소를 입력해주세요."
              value={myPostData.location}
              onChange={(e) => setMyPostData({ ...myPostData, location: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-8 p-10 pt-0">
          <Label className="mb-1 block" variant="title" id="categoryName">
            카테고리
          </Label>
          <ActionButtonSection
            selected={selected}
            onChange={(selectedArr) => {
              const latest = selectedArr[selectedArr.length - 1] ?? { id: 0, name: "" };
              setSelected(latest.name ? [latest] : []);
              setMyPostData((prev) => ({
                ...prev,
                categoryName: latest.name,
              }));
            }}
            className="w-[80%] grid-cols-10"
          />
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-heading-lg font-bold mb-6">게시글 정보 입력하기</h1>
        <div className="gap-4 mb-8 p-10 rounded-xl bg-white">
          <Label variant="title">
            이미지 추가
            {imageError && <span className="text-sm text-primary-600">! {imageError} !</span>}
          </Label>
          <FileInput files={files} setFiles={setFiles} setImageError={setImageError} />
          <div className="mb-10">
            <Label htmlFor="desc" variant="title">
              게시글 상세 설명
            </Label>
            <Textarea
              id="desc"
              rows={6}
              placeholder="Text"
              className="mt-2 resize-none"
              value={myPostData.content}
              onChange={(e) => setMyPostData({ ...myPostData, content: e.target.value })}
            />
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
      <CheckDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        title={dialogMessage.title}
        description={dialogMessage.description}
        onConfirm={() => {
          if (dialogMessage.title === "게시글 등록 성공!") {
            router.push("/posts");
          }
        }}
      />
    </div>
  );
}
