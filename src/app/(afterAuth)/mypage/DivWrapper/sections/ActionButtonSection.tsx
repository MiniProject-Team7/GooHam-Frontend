"use client";


import React, { useState, useEffect } from "react";
import { Button } from "../../../../../components/ui/button";
import {
  Bike,
  BookOpen,
  MapPin,
  House,
  ShoppingCart,
  Coffee,
  Gamepad,
  Palette,
  CircleEllipsis,
  PartyPopper,
} from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
  스포츠: <Bike size={40} />,
  자기계발: <BookOpen size={40} />,
  여행: <MapPin size={40} />,
  일상: <House size={40} />,
  공동구매: <ShoppingCart size={40} />,
  음식: <Coffee size={40} />,
  "취미/오락": <Gamepad size={40} />,
  "인문/예술": <Palette size={40} />,
  행사: <PartyPopper size={40} />,
  기타: <CircleEllipsis size={40} />,
};


export const categories = [
  { id: 1, name: "스포츠" },
  { id: 2, name: "일상" },
  { id: 3, name: "자기계발" },
  { id: 4, name: "공동구매" },
  { id: 5, name: "여행" },
  { id: 6, name: "음식" },
  { id: 7, name: "취미/오락" },
  { id: 8, name: "인문/예술" },
  { id: 9, name: "행사" },
  { id: 10, name: "기타" },
];

type Category = { id: number; name: string };

type Props = {
  selected: Category[];
  onChange: (selected: Category[]) => void;
  className?: string;
};

export const ActionButtonSection = ({ selected, onChange, className }: Props) => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleSetInterests = (event: CustomEvent<Category[]>) => {
      if (event.detail && Array.isArray(event.detail)) {
        console.log("이벤트로 설정된 관심사:", event.detail);
        onChange(event.detail);
      }
    };

    const element = document.querySelector(".action-button-section");
    if (element) {
      element.addEventListener("set-interests", handleSetInterests as EventListener);
    }

    return () => {
      if (element) {
        element.removeEventListener("set-interests", handleSetInterests as EventListener);
      }
    };
  }, [onChange]);

  const handleCategoryClick = (category: Category) => {
    const isSelected = selected.some((c) => c.name === category.name);
    if (isSelected) {
      onChange(selected.filter((c) => c.name !== category.name));
      setShowWarning(false);
    } else {
      if (selected.length >= 3) {
        setShowWarning(true);
        return;
      }

      onChange([...selected, { id: category.id, name: category.name }]);
      setShowWarning(false);
    }
  };

  console.log("렌더링 시 선택된 카테고리:", selected);

  return (
    <section className="w-full py-5 rounded-[5px] overflow-hidden">
      <div className={`grid gap-[10px] px-1 ${className ?? "grid-cols-5"}`}>
        {categories.map((category) => {
          const isSelected = selected.some((c) => c.name === category.name);
          return (
            <Button
              key={category.id}
              variant="outline"
              onClick={() => handleCategoryClick(category)}
              className={`flex flex-col items-center justify-center w-[70px] h-[70px] py-[6px] px-[15px] rounded-lg border shrink-0 bg-white${
                isSelected
                  ? " border-primary-500 text-primary-500"
                  : " border border-[rgba(0,0,0,0.22)] text-black hover:bg-gray-100"
              }`}
            >
              <div className={`mb-1 ${isSelected ? "text-primary-500" : "text-black"}`}>
                {iconMap[category.name]}
              </div>
              <span className="font-medium text-[12.8px] leading-[17.9px]">{category.name}</span>
            </Button>
          );
        })}
      </div>
    </section>
  );
};
