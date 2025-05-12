import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "../ui/card";
import { Comment } from "@/types/comment";

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <Card className="p-4 mb-4 bg-white">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={comment.profileImg} />
          <AvatarFallback>{comment.userName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{comment.userName}</p>
          <p className="text-sm text-black">{comment.createdAt}</p>
        </div>
      </div>
      <p className="mt-2 text-black">{comment.content}</p>
    </Card>
  );
};

export default CommentItem;
