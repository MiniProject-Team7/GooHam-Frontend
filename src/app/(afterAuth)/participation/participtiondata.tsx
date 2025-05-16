export interface Post {
  id: number;
  image: string;
  title: string;
  status: "모집 중" | "마감";
  userName: string;
  scheduleStart: string;
  location: string;
  categoryName: string[];
}

export interface Application {
  id: number;
  postId: number;
  applicantName: string;
  applicantAvatar: string;
  appliedDate: string;
}

// 게시물 더미 데이터
export const allPosts: Post[] = [
  {
    id: 1,
    image: "/images/spaghetti.jpg",
    title: "맛집 탐방 같이 가실 분",
    status: "모집 중",
    userName: "홍길동",
    scheduleStart: "2025-05-15",
    location: "서울 강남구",
    categoryName: ["음식", "여행", "친목"],
  },
  {
    id: 2,
    image: "/images/basketball.jpg",
    title: "주말 농구 파티",
    status: "모집 중",
    userName: "김철수",
    scheduleStart: "2025-05-18",
    location: "서울 송파구",
    categoryName: ["스포츠", "건강", "친목"],
  },
  {
    id: 3,
    image: "/images/hiking.jpg",
    title: "등산 동호회 6월 모임",
    status: "마감",
    userName: "이영희",
    scheduleStart: "2025-06-01",
    location: "경기 북한산",
    categoryName: ["등산", "자연", "운동"],
  },
  {
    id: 4,
    image: "/images/movie.jpg",
    title: "영화 같이 볼 사람",
    status: "모집 중",
    userName: "박민수",
    scheduleStart: "2025-05-20",
    location: "서울 용산구",
    categoryName: ["영화", "문화", "친목"],
  },
];

// 신청 더미 데이터 (postId별)
export const allApplications: Record<number, Application[]> = {
  1: [
    { id: 101, postId: 1, applicantName: "최지원", applicantAvatar: "/avatars/choi.png", appliedDate: "2025-05-10" },
    { id: 102, postId: 1, applicantName: "정유진", applicantAvatar: "/avatars/jung.png", appliedDate: "2025-05-11" },
    { id: 103, postId: 1, applicantName: "박준형", applicantAvatar: "/avatars/park.png", appliedDate: "2025-05-12" },
    { id: 104, postId: 1, applicantName: "한지민", applicantAvatar: "/avatars/han.png", appliedDate: "2025-05-13" },
    { id: 105, postId: 1, applicantName: "송지효", applicantAvatar: "/avatars/song.png", appliedDate: "2025-05-14" },
    { id: 106, postId: 1, applicantName: "전지현", applicantAvatar: "/avatars/jeon.png", appliedDate: "2025-05-15" },
    { id: 107, postId: 1, applicantName: "이수근", applicantAvatar: "/avatars/lee.png", appliedDate: "2025-05-16" },
  ],
  2: [
    { id: 201, postId: 2, applicantName: "윤아름", applicantAvatar: "/avatars/yoon.png", appliedDate: "2025-05-12" },
    { id: 202, postId: 2, applicantName: "송강호", applicantAvatar: "/avatars/song2.png", appliedDate: "2025-05-13" },
    { id: 203, postId: 2, applicantName: "김태희", applicantAvatar: "/avatars/kim2.png", appliedDate: "2025-05-14" },
  ],
  3: [
    { id: 301, postId: 3, applicantName: "이승기", applicantAvatar: "/avatars/lee2.png", appliedDate: "2025-05-16" },
  ],
  4: [
    { id: 401, postId: 4, applicantName: "송혜교", applicantAvatar: "/avatars/song3.png", appliedDate: "2025-05-17" },
    { id: 402, postId: 4, applicantName: "전도연", applicantAvatar: "/avatars/jeon2.png", appliedDate: "2025-05-18" },
    { id: 403, postId: 4, applicantName: "박보검", applicantAvatar: "/avatars/park2.png", appliedDate: "2025-05-19" },
    { id: 404, postId: 4, applicantName: "조인성", applicantAvatar: "/avatars/jo.png", appliedDate: "2025-05-20" },
    { id: 405, postId: 4, applicantName: "김혜수", applicantAvatar: "/avatars/kim3.png", appliedDate: "2025-05-21" },
    { id: 406, postId: 4, applicantName: "이정재", applicantAvatar: "/avatars/lee3.png", appliedDate: "2025-05-22" },
  ],
};
