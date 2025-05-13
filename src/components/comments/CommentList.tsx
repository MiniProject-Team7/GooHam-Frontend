import CommentItem from "@/components/comments/CommentItem";
import { Comment } from "@/types/comment";

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <CommentItem key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
