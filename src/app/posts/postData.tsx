import { Post } from "@/types/post";
import { Member } from "@/types/user";

export const dummyPosts: Post[] = [
  {
    id: 1,
    userName: "홍길동",
    title: "서울 한강 러닝 같이 하실 분 ! 어쩌구 저쩌구 ",
    content: "이번 주말에 한강에서 러닝하실 분을 모집합니다!",
    images: ["/images/baseball.jpg", "/images/cat.jpg"],
    maxParticipants: 5,
    currentParticipants: 2,
    categoryName: "스포츠",
    status: "모집 중",
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
    images: ["/images/cat.jpg", "/images/baseball.jpg", "/images/cat.jpg"],
    maxParticipants: 3,
    currentParticipants: 1,
    categoryName: "음식",
    status: "모집 예정",
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
    images: ["/images/cat.jpg", "/images/baseball.jpg", "/images/cat.jpg"],
    maxParticipants: 5,
    currentParticipants: 2,
    categoryName: "스포츠",
    status: "모집 완료",
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
    images: ["/images/cat.jpg"],
    maxParticipants: 3,
    currentParticipants: 1,
    categoryName: "음식",
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
    images: ["/images/cat.jpg"],
    maxParticipants: 5,
    currentParticipants: 2,
    categoryName: "스포츠",
    status: "모집 중",
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
    images: ["/images/cat.jpg"],
    maxParticipants: 3,
    currentParticipants: 1,
    categoryName: "음식",
    status: "모집 완료",
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

export const dummyParticipants: Participant[] = [
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

export type Comment = {
  userName: string;
  profileImg?: string;
  content: string;
  createdAt: string;
};

export const dummyComments: Comment[] = [
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

export const dummyUsers: Member[] = [
  {
    email: "alice@example.com",
    name: "Alice Kim",
    nickname: "alicek",
    phone: "010-1234-5678",
    birthDate: "1995-06-15",
    introduce: "안녕하세요! 프론트엔드 개발자 Alice입니다.",
  },
  {
    email: "bob@example.com",
    name: "Bob Lee",
    nickname: "bobby",
    phone: "010-2345-6789",
    birthDate: "1993-11-02",
    introduce: "Node.js와 데이터베이스에 관심이 많은 백엔드 개발자입니다.",
  },
  {
    email: "charlie@example.com",
    name: "Charlie Park",
    nickname: "charliep",
    phone: "010-3456-7890",
    birthDate: "1990-04-28",
  },
  {
    email: "diana@example.com",
    name: "Diana Choi",
    nickname: "dianac",
    phone: "010-4567-8901",
    birthDate: "1998-09-10",
    introduce: "사용자 경험을 중시하는 풀스택 개발자입니다.",
  },
  {
    email: "eric@example.com",
    name: "Eric Jung",
    nickname: "ericj",
    phone: "010-5678-9012",
    birthDate: "1992-12-05",
  },
];
