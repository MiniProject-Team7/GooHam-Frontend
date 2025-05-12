import PostItem from "@/components/posts/PostItem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Post } from "@/types/post";

export default function Posts() {
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

  return (
    <main className="px-8 py-12 max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-left">게시글</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {[
          "전체",
          "스포츠",
          "일상",
          "자기계발",
          "공동구매",
          "여행",
          "음식",
          "취미/오락",
          "인문/예술",
          "기타",
        ].map((category) => (
          <Badge key={category} variant="default">
            {category}
          </Badge>
        ))}
        <Button variant="outline" className="ml-auto mr-8 flex items-center gap-1">
          ✏️ 글쓰기
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyPost.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
