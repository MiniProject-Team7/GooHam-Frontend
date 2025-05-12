import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

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
      <div className="pl-2 text-gray-500 mb-1">📅 {post.scheduleStart}</div>
      <div className="pl-2 text-gray-500 mb-1">
        👥 {post.currentParticipants}/{post.maxParticipants}
      </div>
      <div className="pl-2 text-gray-500 mb-1">📍 {post.location}</div>
      <div className="mt-2 flex flex-wrap mb-2">
        {post.categoryName.map((cat, i) => (
          <Badge key={i}>{cat}</Badge>
        ))}
      </div>

      <Button variant="default" className="w-full mb-2">
        참여 신청하기
      </Button>
    </Card>
  );
};

export default JoinProfileCard;
