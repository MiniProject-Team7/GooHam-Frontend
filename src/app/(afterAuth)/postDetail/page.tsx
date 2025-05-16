import CommentForm from "@/components/comments/CommentForm";
import CommentList from "@/components/comments/CommentList";
import JoinProfileCard from "@/components/posts/JoinProfileCard";
import ParticipantList from "@/components/posts/ParticipantList";
import PostDetailCard from "@/components/posts/PostDetailItem";
import { Comment } from "@/types/comment";
import { Post } from "@/types/post";

const dummyPost: Post[] = [
  {
    id: 1,
    userName: "홍길동",
    title: "서울 한강 러닝 같이 하실 분 ! 어쩌구 저쩌구 ",
    content: "이번 주말에 한강에서 러닝하실 분을 모집합니다!",
    image: "/images/baseball.jpg",
    maxParticipants: 5,
    currentParticipants: 2,
    categoryName: ["스포츠", "일상"],
    status: "모집중",
    scheduleStart: "2025-05-10 09:00",
    scheduleEnd: "2025-05-10T11:00:00",
    location: "서울 여의도 한강공원",
    createdAt: "2025-05-01T14:00:00",
    updatedAt: "2025-05-01T14:00:00",
  },
  {
    id: 2,
    userName: "이영희",
    title: "비건 카페 탐방 같이 가실 분",
    content: "비건 디저트를 좋아하시는 분들과 소모임을 갖고 싶어요!",
    image: "/images/cat.jpg",
    maxParticipants: 3,
    currentParticipants: 1,
    categoryName: ["일상", "음식"],
    status: "모집예정",
    scheduleStart: "2025-05-15 14:00",
    scheduleEnd: "2025-05-15T16:00:00",
    location: "서울 성수동 카페 거리",
    createdAt: "2025-05-05T10:30:00",
    updatedAt: "2025-05-05T10:30:00",
  },
  {
    id: 3,
    userName: "홍길동",
    title: "서울 한강 러닝 같이 하실 분",
    content: "이번 주말에 한강에서 러닝하실 분을 모집합니다!",
    image: "/images/cat.jpg",
    maxParticipants: 5,
    currentParticipants: 2,
    categoryName: ["스포츠", "일상"],
    status: "모집완료",
    scheduleStart: "2025-05-10 09:00",
    scheduleEnd: "2025-05-10T11:00:00",
    location: "서울 여의도 한강공원",
    createdAt: "2025-05-01T14:00:00",
    updatedAt: "2025-05-01T14:00:00",
  },
  {
    id: 4,
    userName: "이영희",
    title: "비건 카페 탐방 같이 가실 분",
    content: "비건 디저트를 좋아하시는 분들과 소모임을 갖고 싶어요!",
    image: "",
    maxParticipants: 3,
    currentParticipants: 1,
    categoryName: ["일상", "음식"],
    status: "종료",
    scheduleStart: "2025-05-15 14:00",
    scheduleEnd: "2025-05-15 16:00:00",
    location: "서울 성수동 카페 거리",
    createdAt: "2025-05-05T10:30:00",
    updatedAt: "2025-05-05T10:30:00",
  },
  {
    id: 5,
    userName: "홍길동",
    title: "서울 한강 러닝 같이 하실 분",
    content: "이번 주말에 한강에서 러닝하실 분을 모집합니다!",
    image: "",
    maxParticipants: 5,
    currentParticipants: 2,
    categoryName: ["스포츠", "일상"],
    status: "모집중",
    scheduleStart: "2025-05-10 09:00",
    scheduleEnd: "2025-05-10T11:00:00",
    location: "서울 여의도 한강공원",
    createdAt: "2025-05-01T14:00:00",
    updatedAt: "2025-05-01T14:00:00",
  },
  {
    id: 6,
    userName: "이영희",
    title: "비건 카페 탐방 같이 가실 분",
    content: "비건 디저트를 좋아하시는 분들과 소모임을 갖고 싶어요!",
    image: "",
    maxParticipants: 3,
    currentParticipants: 1,
    categoryName: ["일상", "음식"],
    status: "모집완료",
    scheduleStart: "2025-05-15 14:00",
    scheduleEnd: "2025-05-15T16:00:00",
    location: "서울 성수동 카페 거리",
    createdAt: "2025-05-05T10:30:00",
    updatedAt: "2025-05-05T10:30:00",
  },
];

export type Participant = {
  id: number;
  name: string;
  profileImg?: string;
};

const dummyParticipants: Participant[] = [
  {
    id: 1,
    name: "홍길동",
    profileImg: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "김철수",
    profileImg: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "이영희",
    // profileImg: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "박지민",
    // profileImg: "https://i.pravatar.cc/150?img=4",
  },
];

const dummyComments: Comment[] = [
  {
    userName: "김코딩",
    profileImg: "https://i.pravatar.cc/150?img=12",
    content: "좋은 글 감사합니다!",
    createdAt: "1시간 전",
  },
  {
    userName: "이자바",
    // profileImg: "https://i.pravatar.cc/150?img=12",
    content: "참여하고 싶어요!",
    createdAt: "2시간 전",
  },
];

export default function PostDetailPage() {
  return (
    <div className="flex justify-center px-6 py-10 gap-6">
      <div className="w-full max-w-[60%]">
        <PostDetailCard post={dummyPost[0]} />

        <h3 className="mt-10 mb-3 text-lg font-semibold">댓글</h3>
        <CommentForm />
        <CommentList comments={dummyComments} />
      </div>

      <div className="w-full max-w-[20%] flex flex-col gap-4">
        <JoinProfileCard post={dummyPost[0]} />
        <ParticipantList participants={dummyParticipants} />
      </div>
    </div>
  );
}
