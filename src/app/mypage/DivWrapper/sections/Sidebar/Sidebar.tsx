import React, { JSX } from "react";

import { Card, CardContent } from "../../../../../components/ui/card";

// Activity menu items
const activityItems = [{ title: "작성한 글", isActive: false }];

// Sidebar menu items
const sidebarItems = [
  { title: "기본 정보", isActive: true },
  { title: "비밀번호", isActive: false },
  { title: "알림 설정", isActive: false },
  { title: "계정 삭제", isActive: false },
];

export const Sidebar = (): JSX.Element => {
  return (
    <aside className="w-[200px] flex-shrink-0">
      <Card className="w-full rounded-[20px] border border-[#00000038]">
        <CardContent className="p-6">
          <h2 className="font-bold text-l mb-4">계정 관리</h2>

          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center p-2 rounded-xl ${
                  item.isActive ? "bg-primary-200 text-primary-500" : "bg-white text-black"
                }`}
              >
                <span
                  className={`ml-4 font-semibold text-l ${
                    item.isActive ? "text-primaryvarientprimaryvarient-500" : "text-black"
                  }`}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          <h2 className="font-bold text-l mt-12 mb-6">나의 활동</h2>

          <div className="space-y-2">
            {activityItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center p-1.5 rounded-xl ${
                  item.isActive ? "bg-primaryvarientprimaryvarient-500 text-white" : "bg-white"
                }`}
              >
                <span
                  className={`ml-4 font-semibold text-l ${
                    item.isActive ? "text-primaryvarientprimaryvarient-500" : "text-black"
                  }`}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};
