// import { Post } from "@/types/post";

// export default function PostDetail() {
//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <img
//         src={dummyPost[0].image}
//         alt={dummyPost[0].title}
//         className="w-full h-60 object-cover rounded-xl"
//       />
//       <h1 className="text-2xl font-bold mt-4">{dummyPost[0].title}</h1>
//       <p className="text-sm text-gray-500 mt-1">{dummyPost[0].userName}</p>
//       <p className="text-gray-600 mt-2">📅 {dummyPost[0].scheduleStart}</p>
//       <p className="text-gray-600">📍 {dummyPost[0].location}</p>
//       <p className="text-gray-800 mt-4">{dummyPost[0].content}</p>
//     </div>
//   );
// }

import { dummyComments, dummyParticipants, dummyPosts } from "@/app/posts/postData";
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
