// src/components/PresignedMedia.tsx
"use client";
import * as React from "react";
import { usePresignedUrls } from "@/components/hooks/usePresignedImage";

interface PresignedMediaProps {
  /** S3 객체 키 혹은 키 배열 (or null) */
  s3Key?: string | string[] | null;
  /** 이미지에 공통 적용할 클래스 */
  className?: string;
  /** 로딩/에러 시 fallback URL */
  fallback?: string;
  /** 배열일 때 그리드 레이아웃을 직접 지정하고 싶다면 부모에서 제어 */
}

export function PresignedMedia({
  s3Key = null,
  className,
  fallback = "/images/default.png",
}: PresignedMediaProps) {
  const urls = usePresignedUrls(s3Key);

  // 단일 키 → string 또는 null
  if (typeof urls === "string" || urls === null) {
    return <img src={urls ?? fallback} className={className} alt="" />;
  }

  // 배열 키 → string[] or (null)[]
  return (
    <>
      {urls.map((url, i) => (
        <img
          key={i}
          src={url ?? fallback}
          className={className}
          alt={`image-${i}`}
        />
      ))}
    </>
  );
}
