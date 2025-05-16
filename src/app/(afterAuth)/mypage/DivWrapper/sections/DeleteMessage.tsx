// components/DeleteMessage.tsx
"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"; // Dialog 컴포넌트
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

interface DeleteMessageProps {
  title: string;
  onConfirm: () => void;
  trigger: React.ReactNode; // trigger 버튼으로 사용할 ReactNode
}

export const DeleteMessage = ({ title, onConfirm, trigger }: DeleteMessageProps) => {
  const [checked, setChecked] = React.useState(false); // 체크박스 상태

  const userData = { email: "miniprojectstart7@gmail.com", name: "홍길동" };
  const deletionInfo = [
    "• 회원 가입 시 입력하신 이름, 이메일, 생년월일 등의 모든 개인정보를 삭제합니다.",
    "• 작성하신 모든 게시글, 댓글, 참여 신청 등을 모두 삭제합니다.",
  ];

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> {/* trigger 버튼 */}
      <AlertDialogContent className="w-full max-w-[700px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">{title}</AlertDialogTitle>
        </AlertDialogHeader>

        <main className="mt-[10px]">
          <p className="">
            {userData.name} 님 ({userData.email})의 구함(GooHam) 계정 관련 정보를 모두 삭제합니다.
          </p>
          <h2 className="mt-[25px]">다음과 같은 정보를 모두 삭제합니다.</h2>
          <Card className="mt-[10px] border border-primary-500 rounded-lg">
            <CardContent className="p-3 pt-[10px]">
              <ul className="space-y-4">
                {deletionInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </main>

        <div className="flex items-start space-x-2 mt-4">
          <Checkbox
            id="confirm-delete"
            checked={checked}
            onCheckedChange={setChecked}
            className="mt-1"
          />
          <label htmlFor="confirm-delete" className="text-sm text-black leading-6 cursor-pointer">
            계정 삭제 시 되돌릴 수 없으며, 삭제한 데이터를 복구할 수 없습니다.
          </label>
        </div>

        <AlertDialogFooter className="mt-6">
          <Button disabled={!checked} onClick={onConfirm}>
            계정 삭제하기
          </Button>
          <AlertDialogCancel>취소하기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
