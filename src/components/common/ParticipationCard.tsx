"use client";

import * as React from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/app/(afterAuth)/participation/Alertmessage";

export interface Application {
  id: number;
  applicantName: string;
  applicantAvatar: string;
  appliedDate: string;
}

interface ParticipationCardProps {
  data: Application;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

export function ParticipationCard({
  data,
  onApprove,
  onReject,
}: ParticipationCardProps) {    

const handleApprove = () => {
     console.log("Approve clicked for", data.id)
     onApprove?.(data.id)  // 여기서 prop 호출
  };
  const handleReject = () => {
     console.log("Reject clicked for", data.id);
     onReject?.(data.id)   // 여기서 prop 호출
  };

  return (
    <Card className="flex flex-col w-full gap-4 p-4 rounded-lg border border-gray-22">
      {/* 신청자 아바타 + 정보 */}
      <div className="flex items-center gap-3">
        <div>
          <div className="text-sm font-medium">{data.applicantName}</div>
          <div className="text-xs text-muted-foreground">신청일: {data.appliedDate}</div>
        </div>
      </div>

      {/* 승인/거절 버튼 */}
      <CardFooter className="flex justify-start gap-2 px-2">
        <ConfirmDialog
            trigger={<Button variant="default" size="sm">승인하기</Button>}
            title="승인하시겠습니까?"
            description="신청자를 승인합니다."
            onConfirm={() => handleApprove()}
            />
            <ConfirmDialog
            trigger={<Button variant="outline" size="sm">거절하기</Button>}
            title="거절하시겠습니까?"
            description="이 작업은 돌이킬 수 없습니다."
            onConfirm={() => handleReject()}
            />
      </CardFooter>
    </Card>
  );
}
