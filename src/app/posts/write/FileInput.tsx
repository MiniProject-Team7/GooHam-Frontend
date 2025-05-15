"use client";

import React, { useRef } from "react";
import { Plus, X } from "lucide-react";

interface FileInputProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileInput({ files, setFiles }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const validFiles: File[] = [];

    for (const file of Array.from(selectedFiles)) {
      if (validateFile(file)) {
        console.log(`유효한 파일: ${file.name}`);
        validFiles.push(file);
      } else {
        console.warn(`유효하지 않은 파일: ${file.name}`);
      }
    }

    // 유효한 파일만 기존 상태에 추가
    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
    }

    // // 동일 파일 다시 선택 가능하게 초기화
    // e.target.value = "";
  };

  const handleDelete = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  // 이미지 파일 유효성 확인
  const validateFile = (file: File): boolean => {
    console.log("validateFile");
    // 허용되는 이미지 확장자 리스트
    const allowedExtensions = ["png", "jpg", "jpeg", "gif"];

    // 파일 크기 제한: 1MB
    const maxSize = 1024 * 1024; // -> 1MB , 10 * 1024 * 1024; // 10MB

    // 파일 확장자를 추출하고 소문자로 변환
    const extension = file.name.split(".").pop()?.toLowerCase();

    // 확장자가 없거나 허용된 확장자가 아닌 경우
    if (!extension || !allowedExtensions.includes(extension)) {
      alert("이미지는 PNG, JPG, GIF 형식만 업로드 가능합니다.");
      return false;
    }

    // 파일 크기가 최대 허용 용량을 초과하는 경우
    if (file.size > maxSize) {
      alert("파일 크기는 최대 10MB를 넘을 수 없습니다.");
      return false;
    }

    // 모든 유효성 검사를 통과한 경우 true 반환
    return true;
  };

  return (
    <div>
      <div
        className="w-full h-50 rounded-lg p-4 mb-4 bg-gray-22 flex items-center "
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {/* <p className="text-center text-gray-500">
        클릭 또는 드래그 앤 드롭으로 이미지를 업로드하세요
      </p> */}
        {/* <Plus className="w-8 h-8 text-black" /> */}
        <div className="flex flex-wrap gap-4 mt-4">
          {files.map((file) => {
            const url = URL.createObjectURL(file);
            return (
              <div key={file.name} className="relative w-28 h-28 rounded overflow-hidden">
                <img src={url} alt={file.name} className="object-cover w-full h-full" />
                <button
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                  onClick={(e) => {
                    e.stopPropagation(); // input 클릭 막기
                    handleDelete(file.name);
                    URL.revokeObjectURL(url);
                  }}
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="text-sm text-right mt-2 text-gray-600 flex items-center justify-end gap-1 cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <Plus className="w-4 h-4" /> 이미지 추가
      </div>
    </div>
  );
}
