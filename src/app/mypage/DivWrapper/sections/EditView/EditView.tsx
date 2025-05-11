import React, { useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { ActionButtonSection } from "../ActionButtonSection";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";

// 타입 정의
type FormDataType = {
  name: string;
  birth: string;
  nickname: string;
  email: string;
  intro: string;
  avatar: string;
  categories: string[];
};

type FormField = {
  key: keyof FormDataType;
  label: string;
  placeholder: string;
  isTextarea?: boolean;
  noInput?: boolean;
};

const formFields: FormField[] = [
  { key: "name", label: "이름", placeholder: "Name" },
  { key: "birth", label: "생년월일", placeholder: "Birth" },
  { key: "nickname", label: "닉네임", placeholder: "NickName" },
  { key: "email", label: "이메일", placeholder: "E-Mail" },
  { key: "intro", label: "자기소개", placeholder: "Text", isTextarea: true },
  { key: "categories", label: "카테고리", placeholder: "", noInput: true },
];

export const EditView = ({ setIsEditing }: { setIsEditing: (v: boolean) => void }) => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    birth: "",
    nickname: "",
    email: "",
    intro: "",
    avatar: "https://c.animaapp.com/yTfAUR4U/img/image-4@2x.png",
    categories: [],
  });

  const handleChange = (key: keyof FormDataType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAvatarChange = () => {
    const newUrl = prompt("새 프로필 이미지 URL을 입력하세요", formData.avatar);
    if (newUrl) {
      setFormData((prev) => ({ ...prev, avatar: newUrl }));
    }
  };

  return (
    <Card className="border border-solid border-[#00000038] rounded-xl mb-[24px]">
      <CardContent className="p-[48px_0_24px]">
        <div className="flex flex-col items-center mb-10">
          <Avatar className="w-[100px] h-[100px]">
            <AvatarImage src={formData.avatar} alt="Profile" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <Button variant="ghost" className="mt-5" onClick={handleAvatarChange}>
            <img
              className="w-10 h-[35px]"
              alt="Create"
              src="https://c.animaapp.com/yTfAUR4U/img/create@2x.png"
            />
            <span className="text-base text-gray-600">프로필 사진 수정하기</span>
          </Button>
        </div>

        <div className="space-y-8 px-[133px]">
          {formFields.map(({ key, label, placeholder, isTextarea, noInput }) =>
            noInput ? (
              <div key={key}>
                <label className="font-semibold text-2xl text-gray-500">{label}</label>
                <div>
                  <ActionButtonSection
                    selected={formData.categories}
                    onChange={(selected: string[]) =>
                      setFormData((prev) => ({ ...prev, categories: selected }))
                    }
                  />
                </div>
              </div>
            ) : (
              <div key={key} className="flex items-start">
                <label className="w-[109px] font-semibold text-2xl text-gray-500">{label}</label>
                {isTextarea ? (
                  <Textarea
                    className="flex-1 ml-[109px] h-[297px] rounded-lg border border-gray-300"
                    placeholder={placeholder}
                    value={formData[key] as string}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                ) : (
                  <Input
                    className="flex-1 ml-[109px] h-12 rounded-lg border border-gray-300"
                    placeholder={placeholder}
                    value={formData[key] as string}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                )}
              </div>
            )
          )}
        </div>

        <div className="flex justify-end gap-4 mb-[24px] mt-[26px]">
          <Button variant="default" size="lg" className="text-white rounded-xl px-12 py-3">
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
  );
};
