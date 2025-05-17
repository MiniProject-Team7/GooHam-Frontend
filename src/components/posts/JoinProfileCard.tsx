"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Member } from "@/types/user";
import { Calendar, MapPin, Shapes, Users } from "lucide-react";
import { ConfirmDialog } from "@/app/(afterAuth)/participation/Alertmessage";
import { useState } from "react";

const JoinProfileCard = ({ post }: { post: Post }) => {
  const [applied, setApplied] = useState(false);
  const handleApply = () => {
    console.log("참여 신청 완료!");
    setApplied(true);
  };

  return (
    <Card className="p-4 w-full rounded-xl text-sm bg-white gap-2">
      <div className="flex items-center gap-2">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/public/images/cat.jpg" />
          <AvatarFallback>{post.userName}</AvatarFallback>
        </Avatar>
        <div>
          <div className="pl-2 pt-2 text-lg font-semibold mb-2">{post.userName}</div>
          {/* <p className="text-sm text-gray-500">2001.01.08</p> */}
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-50 mt-2">
        <Calendar className="w-4 h-4" />
        <span>{post.scheduleStart}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-50 mt-2">
        <Users className="w-4 h-4" />
        <span>
          {post.currentParticipants} / {post.maxParticipants}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-50 mt-2">
        <MapPin className="w-4 h-4" />
        <span>{post.location}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-40 mt-2">
        <Shapes className="w-4 h-4" />
        <span>category</span>
      </div>
      <div className="flex flex-wrap gap-2 m-1 mt-2 mb-3">
        <Badge>{post.categoryName}</Badge>
      </div>
      <div className="flex justify-center">
        {applied ? (
          <Button disabled className="flex w-[80%] mb-2 bg-gray-300 cursor-not-allowed">
            신청 완료
          </Button>
        ) : (
          <ConfirmDialog
            trigger={
              <Button variant="default" className="flex w-[80%] mb-2">
                참여 신청하기
              </Button>
            }
            title="참여 신청하시겠습니까?"
            description="신청 후 주최자의 승인을 기다려야 합니다."
            onConfirm={handleApply}
          />
        )}
      </div>
    </Card>
  );
};

export default JoinProfileCard;
