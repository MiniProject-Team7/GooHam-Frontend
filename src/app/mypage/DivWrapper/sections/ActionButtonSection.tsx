import React from "react";
import { Button } from "../../../../components/ui/button";
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
} from "lucide-react";

// Props 타입 선언
type Props = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

const iconMap: { [key: string]: React.ReactNode } = {
  스포츠: <Bike size={40} />,
  자기계발: <BookOpen size={40} />,
  여행: <MapPin size={40} />,
  일상: <House size={40} />,
  공동구매: <ShoppingCart size={40} />,
  음식: <Coffee size={40} />,
  "취미/오락": <Gamepad size={40} />,
  "인문/예술": <Palette size={40} />,
  기타: <CircleEllipsis size={40} />,
};

const categories = [
  { id: 1, name: "스포츠" },
  { id: 2, name: "일상" },
  { id: 3, name: "자기계발" },
  { id: 4, name: "공동구매" },
  { id: 5, name: "여행" },
  { id: 6, name: "음식" },
  { id: 7, name: "취미/오락" },
  { id: 8, name: "인문/예술" },
  { id: 9, name: "기타" },
];

export const ActionButtonSection = ({ selected, onChange }: Props) => {
  const handleCategoryClick = (name: string) => {
    if (selected.includes(name)) {
      onChange(selected.filter((category) => category !== name));
    } else {
      onChange([...selected, name]);
    }
  };

  return (
    <section className="w-full py-5 rounded-[5px] overflow-hidden">
      <div className="flex flex-row flex-nowrap gap-[10px] px-1 overflow-x-auto scrollbar-hide">
        {categories.map((category) => {
          const isSelected = selected.includes(category.name);

          return (
            <Button
              key={category.id}
              variant="outline"
              onClick={() => handleCategoryClick(category.name)}
              className={`flex flex-col items-center justify-center w-[70px] h-[70px] py-[6px] px-[15px] rounded-lg border shrink-0 bg-white${
                isSelected
                  ? "border-primary-500 text-primary-500"
                  : "border border-[rgba(0,0,0,0.22)] text-black hover:bg-gray-100"
              }`}
            >
              <div className={`mb-1 ${isSelected ? "text-primary-500" : "text-black"}`}>
                {iconMap[category.name]}
              </div>
              <span className="font-medium text-[12.8px] leading-[17.9px] [font-family:'Pretendard-Medium',Helvetica]">
                {category.name}
              </span>
            </Button>
          );
        })}
      </div>
    </section>
  );
};
