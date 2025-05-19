import CommentItem from "@/components/comments/CommentItem";
import { Comment } from "@/types/comment";

const CommentList = ({ comments, postId }: { comments: Comment[]; postId: number }) => {
  return (
    <div>
      {comments?.map((comment, index) => (
        <CommentItem key={index} comment={comment} postId={postId} />
      ))}
    </div>
  );
};

export default CommentList;
