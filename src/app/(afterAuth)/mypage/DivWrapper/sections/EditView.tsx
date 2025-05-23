"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ActionButtonSection, categories } from "./ActionButtonSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/components/common/useAuthStore";
import { CheckDialog } from "@/app/(afterAuth)/participation/Alertmessage";
import axiosInstance from "@/utils/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";

type FormDataType = {
  id: string;
  member_name: string;
  birth_date: string;
  member_nickname: string;
  member_phone: string;
  member_email: string;
  member_introduce: string;
  interests: { category_id: number; name: string }[];
  profile_image: string;
};

type FormField = {
  key: keyof FormDataType;
  label: string;
  placeholder: string;
  isTextarea?: boolean;
  noInput?: boolean;
};

const formFields: FormField[] = [
  { key: "member_name", label: "이름", placeholder: "Name" },
  { key: "birth_date", label: "생년월일", placeholder: "Birth" },
  { key: "member_nickname", label: "닉네임", placeholder: "NickName" },
  { key: "member_phone", label: "전화번호", placeholder: "Phone" },
  { key: "member_email", label: "이메일", placeholder: "E-Mail" },
  { key: "member_introduce", label: "자기소개", placeholder: "Text", isTextarea: true },
  { key: "interests", label: "카테고리", placeholder: "", noInput: true },
];

export const EditView = ({ setIsEditing }: { setIsEditing: (v: boolean) => void }) => {
  const [form, setForm] = useState<FormDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({ title: "", description: "" });

  const email = useAuthStore((state) => state.email);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!email) return;
    axiosInstance
      .get<FormDataType>(`/users/mypage/detail?member_email=${email}`)
      .then((res) => {
        const currentInterests = res.data.interests
          .map((interest) => {
            const matchingCategory = categories.find((cat) => cat.name === interest.name);
            return matchingCategory
              ? { id: matchingCategory.id, name: matchingCategory.name }
              : null;
          })
          .filter(Boolean);

        setForm({ ...res.data, interests: [] });

        setTimeout(() => {
          document
            .querySelector(".action-button-section")
            ?.dispatchEvent(new CustomEvent("set-interests", { detail: currentInterests }));
        }, 100);
      })
      .catch(console.error);
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !form) return;
    const previewURL = URL.createObjectURL(file);
    setForm({ ...form, profile_image: previewURL });
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!form) return;
    setLoading(true);

    const categoryIds = form.interests.map((i) => i.category_id);
    if (categoryIds.every((id) => id === 0)) {
      setDialogMessage({
        title: "카테고리 선택 오류",
        description: "유효한 카테고리를 선택해주세요.",
      });
      setDialogOpen(true);
      setLoading(false);
      return;
    }

    let imageUrl = form.profile_image;

    try {
      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append("profileImage", selectedFile);
        imageFormData.append("member_id", form.id);
        const res = await axiosInstance.post<{ url: string }>(
          "/users/mypage/uploadProfileImage",
          imageFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = res.data.url;
      }

      const payload = { ...form, profile_image: imageUrl, categoryIds };
      await axiosInstance.post("/users/mypage/updateInfo", payload);

      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      setDialogMessage({
        title: "수정 완료",
        description: "프로필이 정상적으로 수정되었습니다.",
      });
      setDialogOpen(true);
    } catch (err: any) {
      console.error("API 오류:", err);
      setDialogMessage({
        title: "수정 실패",
        description: err.response?.data?.message || err.message,
      });
      setDialogOpen(true);
    }

    setLoading(false);
  };

  if (!form) return <div>로딩 중...</div>;

  return (
    <>
      <Card className="w-[787px] box-border border border-solid border-gray-22 rounded-xl mb-[24px]">
        <CardContent className="px-[12px] pt-[48px] pb-[24px]">
          <div className="flex flex-col items-center mb-10">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage src={form.profile_image} alt="Profile" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <Button variant="ghost" className="mt-5" onClick={() => fileInputRef.current?.click()}>
              <img
                className="w-10 h-[35px]"
                alt="Create"
                src="https://c.animaapp.com/yTfAUR4U/img/create@2x.png"
              />
              <span className="text-base text-gray-50">프로필 사진 수정하기</span>
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>

          <div className="space-y-8 px-[110px]">
            {formFields.map(({ key, label, placeholder, isTextarea, noInput }) =>
              noInput ? (
                <div key={key}>
                  <label className="text-title-md text-gray-50">{label}</label>
                  <div className="action-button-section">
                    <ActionButtonSection
                      selected={form.interests.map((i) => ({
                        id: i.category_id,
                        name: i.name,
                      }))}
                      onChange={(selected) =>
                        setForm((prev) =>
                          prev
                            ? {
                                ...prev,
                                interests: selected.map((c) => ({
                                  category_id: c.id,
                                  name: c.name,
                                })),
                              }
                            : prev
                        )
                      }
                    />
                  </div>
                </div>
              ) : (
                <div key={key} className="flex items-start">
                  <label className="w-[109px] text-title-md text-gray-50">{label}</label>
                  {isTextarea ? (
                    <Textarea
                      className="flex-1 ml-[109px] h-[297px] rounded-lg border border-gray-300"
                      placeholder={placeholder}
                      value={form[key] as string}
                      onChange={handleChange}
                      name={key}
                    />
                  ) : (
                    <Input
                      className="flex-1 ml-[109px] h-12 rounded-lg border border-gray-22"
                      placeholder={placeholder}
                      value={form[key] as string}
                      onChange={handleChange}
                      name={key}
                    />
                  )}
                </div>
              )
            )}
          </div>

          <div className="flex justify-end gap-4 mb-[24px] mt-[26px]">
            <Button
              variant="default"
              size="lg"
              className="text-white rounded-xl px-12 py-3"
              onClick={handleSubmit}
              disabled={loading}
            >
              수정
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-500 text-primary-500 rounded-xl px-12 py-3 mr-[24px]"
              onClick={() => setIsEditing(false)}
            >
              취소
            </Button>
          </div>
        </CardContent>
      </Card>

      <CheckDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        title={dialogMessage.title}
        description={dialogMessage.description}
        onConfirm={() => {
          if (dialogMessage.title === "수정 완료") setIsEditing(false);
        }}
      />
    </>
  );
};
