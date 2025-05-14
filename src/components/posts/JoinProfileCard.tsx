import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Member } from "@/types/user";
import { Calendar, MapPin, Shapes, Users } from "lucide-react";

const JoinProfileCard = ({ post }: { post: Post }) => {
  return (
    <Card className="p-4 w-full rounded-xl text-sm bg-white gap-2">
      <div className="flex items-center gap-2">
        <Avatar className="w-24 h-24">
          <AvatarImage src="/public/images/cat.jpg" />
          <AvatarFallback>{post.userName}</AvatarFallback>
        </Avatar>
        <div>
          <div className="pl-2 pt-2 text-lg font-semibold mb-2">{post.userName}</div>
          <p className="text-sm text-gray-500">2001.01.08</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-50 mt-2">
        <Calendar className="w-4 h-4" />
        <span>{post.scheduleStart}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-50 mt-2">
        <Users className="w-4 h-4" />
        <span>{post.location}</span>
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
        <Button variant="default" className="flex w-[80%] mb-2 ">
          참여 신청하기
        </Button>
      </div>
    </Card>
  );
};

export default JoinProfileCard;
