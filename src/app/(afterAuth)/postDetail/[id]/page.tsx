import PostDetailPageClient from "./PostDetailPageClient";

export default function PostDetail({ params }: { params: { id: string } }) {
  return <PostDetailPageClient postId={Number(params.id)} />;
}
