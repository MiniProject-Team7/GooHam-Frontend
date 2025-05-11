import { Post } from "@/types/post";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const statusStyles: Record<string, string> = {
  모집예정: "bg-yellow-100 text-yellow-700",
  모집중: "bg-green-100 text-green-800",
  모집완료: "bg-red-100 text-red-800",
  종료: "bg-gray-200 text-gray-700",
};

const PostItem = ({ post }: { post: Post }) => {
  return (
    <Card className="flex w-[600px] h-[260px] flex-col md:flex-row p-4 rounded-xl hover:shadow-md transition">
      <img
        src={post.image}
        alt={post.title}
        className="w-full md:w-[260px] h-[180px] object-cover my-3 rounded-xl"
      />

      <CardContent className="flex flex-col justify-between mt-4 md:mt-0 md:ml-6 p-0 flex-1">
        <div>
          <div className="flex items-start justify-between gap-2 py-1">
            <h2 className="text-xl font-bold truncate min-w-0 flex-1">{post.title}</h2>
            <span className={`text-sm px-3 py-1 rounded-xl shrink-0 ${statusStyles[post.status]}`}>
              {post.status}
            </span>
          </div>
          <p className="text-m text-gray-500 mt-3">{post.userName}</p>
          <p className="text-sm text-gray-600 mt-2">📅 {post.scheduleStart}</p>
          <p className="text-sm text-gray-600 mt-2">📍 {post.location}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {post.categoryName.map((category, index) => (
              <Badge key={index} variant="default">
                {category}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <Link href={`/postDetail/${post.id}`} passHref>
            <Button variant="link" size="default" className="w-full">
              자세히 보기
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostItem;
