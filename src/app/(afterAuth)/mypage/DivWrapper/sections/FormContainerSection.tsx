// FormContainerSection.tsx
"use client";
import React, { JSX } from "react";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import { DeleteMessage } from "./DeleteMessage";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/components/common/useAuthStore";

type DeleteResponse = {
  success: boolean;
  message: string;
};

export const FormContainerSection = (): JSX.Element => {
  const router = useRouter();
  const email = useAuthStore((state) => state.email);
  const clearAuth = useAuthStore((state) => state.clear);

  const handleDelete = async (password: string): Promise<boolean> => {
    try {
      if (!email) {
        alert("로그인 정보가 없습니다.");
        return false;
      }
      const response = await axiosInstance.post<DeleteResponse>(
        "/users/delete_account",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { success, message } = response.data;

      if (success) {
        alert(message); // "계정이 성공적으로 삭제되었습니다."
        clearAuth();
        sessionStorage.clear();
        router.push("/");
        return true;
      } else {
        return false; // "이메일 또는 비밀번호가 올바르지 않습니다."
      }
    } catch (error) {
      console.error("계정 삭제 실패:", error);
      alert("서버 오류로 인해 계정 삭제에 실패했습니다.");
      return false;
    }
  };

  return (
    <section className="w-full max-w-[834px] my-8">
      <h2 className="text-heading-md font-bold text-black mb-6">계정 삭제</h2>

      <Card className="border border-gray-22 rounded-xl">
        <CardContent className="p-6 flex justify-between items-center">
          <p className="text-label-lg text-black">
            계정 삭제 시 프로필 및 활동한 정보가 삭제됩니다.
          </p>

          {/* 버튼을 ConfirmDialog의 trigger로 전달 */}
          <DeleteMessage
            title="정말 계정을 삭제하시겠습니까?"
            onConfirm={handleDelete}
            trigger={<Button className="rounded-xl px-8 py-3">삭제하기</Button>} // trigger로 버튼 전달
          />
        </CardContent>
      </Card>
    </section>
  );
};
