import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";

const PostDetailCard = ({ post }: { post: Post }) => {
  return (
    <Card className="w-full p-6 rounded-xl mx-auto bg-white">
      <img src={post.image} alt={post.title} className="w-full h-80 object-cover rounded-xl" />
      <div className="text-2xl font-bold mb-1">{post.title}</div>
      <div className="text-sm text-gray-500">
        {post.userName} · {post.createdAt}
      </div>

      <div className="flex gap-2 mt-2">
        {post.categoryName.map((category, idx) => (
          <Badge key={idx}>{category}</Badge>
        ))}
      </div>

      <div className="mt-4 bg-pink-50 rounded-xl p-4 text-sm grid grid-cols-2 gap-y-2">
        <div>
          <span className="font-semibold">이벤트 일정</span>
          <br />
          {post.scheduleStart}
        </div>
        <div>
          <span className="font-semibold">참여 인원</span>
          <br />
          {post.currentParticipants}명
        </div>
        <div>
          <span className="font-semibold">이벤트 장소</span>
          <br />
          {post.location}
        </div>
        <div>
          <span className="font-semibold">모집 마감</span>
          <br />
          {post.status}
        </div>
      </div>

      <div className="mt-6 text-gray-700 whitespace-pre-wrap">{post.content}</div>
    </Card>
  );
};

export default PostDetailCard;
