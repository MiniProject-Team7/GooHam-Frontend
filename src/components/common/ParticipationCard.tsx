"use client";

import * as React from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
  return (
    <Card className="flex items-center gap-4 p-4 rounded-lg border shadow-sm">
      {/* 신청자 아바타 + 정보 */}
      <div className="flex items-center gap-3 flex-1">
        <Avatar className="w-12 h-12">
          <AvatarImage src={data.applicantAvatar} alt={data.applicantName} />
          <AvatarFallback>
            {data.applicantName.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">{data.applicantName}</div>
          <div className="text-xs text-muted-foreground">
            신청일: {data.appliedDate}
          </div>
        </div>
      </div>

      {/* 승인/거절 버튼 */}
      <CardFooter className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onApprove && onApprove(data.id)}
        >
          승인하기
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onReject && onReject(data.id)}
        >
          거절하기
        </Button>
      </CardFooter>
    </Card>
  );
}