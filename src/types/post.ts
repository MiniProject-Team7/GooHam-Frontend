export interface RawPost {
  id: number;
  userName: string;
  title: string;
  content: string;
  maxParticipants: number;
  currentParticipants: number;
  categoryName: string;
  status: string;
  scheduleStart: string;
  scheduleEnd: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  eventStart: string;
  postImage: string[]; // 서버 필드
  postImageJson: string; // (필요시)
}

export interface RawPageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
}

export interface Post {
  id: number;
  userName: string;
  title: string;
  content: string;
  maxParticipants: number;
  currentParticipants: number;
  categoryName: string;
  status: string;
  scheduleStart: string;
  scheduleEnd: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  eventStart: string;
  images: string[];
}

export interface FetchPostsResult {
  posts: Post[];
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
  };
}

export interface CreatePostRequest {
  userId: number;
  title: string;
  content: string;
  categoryId: number;
  maxParticipants: number;
  status: string;
  scheduleStart: string;
  scheduleEnd: string;
  location: string;
  eventStart: string;
  images: File[];
}
