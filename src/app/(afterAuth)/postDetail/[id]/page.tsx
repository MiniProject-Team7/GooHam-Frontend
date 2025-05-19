import PostDetailPageClient from "./PostDetailPageClient";

export default function Page({ params }: { params: { id: string } }) {
  return <PostDetailPageClient postId={Number(params.id)} />;
}
