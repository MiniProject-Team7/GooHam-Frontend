import CommentItem from "@/components/comments/CommentItem";
import { Comment } from "@/types/comment";

const CommentList = ({ comments, postId }: { comments: Comment[]; postId: number }) => {
  return (
    <div>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} postId={postId} />
      ))}
    </div>
  );
};

export default CommentList;
