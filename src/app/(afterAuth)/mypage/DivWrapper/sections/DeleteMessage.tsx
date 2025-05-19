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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/components/common/useAuthStore";

interface DeleteMessageProps {
  title: string;
  onConfirm: (password: string) => Promise<boolean>;
  trigger: React.ReactNode;
}

export const DeleteMessage = ({ title, onConfirm, trigger }: DeleteMessageProps) => {
  const [checked, setChecked] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const email = useAuthStore((state) => state.email);
  const name = useAuthStore((state) => state.name);

  const inputBaseClass = "w-full rounded-md border px-3 py-2 bg-white";
  const errorBorderClass = "border-primary-500";

  const userData = { email, name };

  const deletionInfo = [
    "• 회원 가입 시 입력하신 이름, 이메일, 생년월일 등의 모든 개인정보를 삭제합니다.",
    "• 작성하신 모든 게시글, 댓글, 참여 신청 등을 모두 삭제합니다.",
  ];

  const handleDelete = async () => {
    if (!checked) {
      setError("안내 사항에 동의해주세요.");
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    const success = await onConfirm(password);
    if (!success) {
      setError("비밀번호가 일치하지 않습니다.");
    } else {
      setPassword("");
      setError("");
    }

    if (!email) {
      setError("로그인 정보가 없습니다.");
    }

    onConfirm(password);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-[700px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">{title}</AlertDialogTitle>
        </AlertDialogHeader>

        <main className="mt-[10px]">
          <p>
            {userData.name ?? "회원"} 님 ({userData.email})의 구함(GooHam) 계정 관련 정보를 모두
            삭제합니다.
          </p>
          <p className="text-sm text-gray-700">탈퇴를 위해 아래에 비밀번호를 다시 입력해주세요.</p>

          {/* 이메일 / 비밀번호 입력 필드 추가 위치 */}
          <div className="mt-4 space-y-3">
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className={`${inputBaseClass} ${
                !password && error ? errorBorderClass : "border-gray-300"
              }`}
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

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
          <Button disabled={!checked} onClick={handleDelete}>
            계정 삭제하기
          </Button>
          <AlertDialogCancel>취소하기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
