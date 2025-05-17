import { CreatePostRequest } from "@/types/post";
import axiosInstance from "@/utils/axiosInstance";

/**
 *  게시글 작성
 */
export const createPost = async (postData: CreatePostRequest): Promise<void> => {
  const formData = new FormData();

  // JSON 객체를 Blob으로 변환
  const jsonBlob = new Blob(
    [
      JSON.stringify({
        userId: postData.userId,
        title: postData.title,
        content: postData.content,
        categoryId: postData.categoryId,
        maxParticipants: postData.maxParticipants,
        status: postData.status,
        scheduleStart: postData.scheduleStart,
        scheduleEnd: postData.scheduleEnd,
        location: postData.location,
        eventStart: postData.eventStart,
      }),
    ],
    { type: "application/json" }
  );

  formData.append("data", jsonBlob);

  // 이미지 파일들을 'files' 키로 추가
  postData.images.forEach((file) => {
    formData.append("files", file);
  });

  await axiosInstance.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
