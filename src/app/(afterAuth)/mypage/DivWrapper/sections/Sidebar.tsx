"use client";
import React, { JSX } from "react";
import { Card, CardContent } from "../../../../../components/ui/card";

type Props = {
  activeMenu: string;
  onSelectMenu: (menu: string) => void;
};

const activityItems = [{ title: "작성한 글" }];

const sidebarItems = [
  { title: "기본 정보" },
  { title: "비밀번호" },
  { title: "계정 정보" },
  { title: "알림 설정" },
  { title: "계정 삭제" },
];

export const Sidebar = ({ activeMenu, onSelectMenu }: Props): JSX.Element => {
  return (
    <aside className="w-[200px] flex-shrink-0">
      <Card className="w-full rounded-[20px]">
        <CardContent className="p-6">
          {/* 계정 관리 섹션 */}
          <h2 className="font-bold text-l mb-4">계정 관리</h2>
          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                onClick={() => onSelectMenu(item.title)}
                className={`flex items-center p-2 rounded-xl cursor-pointer ${
                  activeMenu === item.title
                    ? "bg-primary-200 text-primary-500"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                <span className="ml-4 font-semibold text-l">{item.title}</span>
              </div>
            ))}
          </div>

          {/* 나의 활동 섹션 */}
          <h2 className="font-bold text-l mt-12 mb-6">나의 활동</h2>
          <div className="space-y-2">
            {activityItems.map((item, index) => (
              <div
                key={index}
                onClick={() => onSelectMenu(item.title)}
                className={`flex items-center p-1.5 rounded-xl cursor-pointer ${
                  activeMenu === item.title
                    ? "bg-primary-200 text-primary-500"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                <span className="ml-4 font-semibold text-l">{item.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};
