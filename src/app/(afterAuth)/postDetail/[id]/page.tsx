import { dummyComments, dummyParticipants, dummyPosts } from "@/app/(afterAuth)/posts/postData";
import CommentForm from "@/components/comments/CommentForm";
import CommentList from "@/components/comments/CommentList";
import JoinProfileCard from "@/components/posts/JoinProfileCard";
import ParticipantList from "@/components/posts/ParticipantList";
import PostDetailItem from "@/components/posts/PostDetailItem";

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = dummyPosts.find((p) => p.id === Number(params.id));
  console.log(post);
  if (!post) {
    return <div className="p-10">존재하지 않는 게시글입니다.</div>;
  }

  return (
    <div className="flex justify-center px-6 py-10 gap-6">
      <div className="w-[50%]">
        <PostDetailItem post={post} />

        <h3 className="mt-10 mb-3 text-lg font-semibold">댓글</h3>
        <CommentForm />
        <CommentList comments={dummyComments} />
      </div>

      <div className="w-[15%] relative">
        <div className="sticky top-28 flex flex-col gap-4">
          <JoinProfileCard post={dummyPosts[0]} />
          <ParticipantList participants={dummyParticipants} />
        </div>
      </div>
    </div>
  );
}
