export interface Post {
  id: number;
  userName: string;
  title: string;
  content: string;
  images: string[];
  maxParticipants: number;
  currentParticipants: number;
  categoryName: string;
  status: string;
  scheduleStart: string;
  scheduleEnd: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

// export interface PostSearchParams {
//   key?: string;
//   word?: string;
//   pageNo?: number;
// }
