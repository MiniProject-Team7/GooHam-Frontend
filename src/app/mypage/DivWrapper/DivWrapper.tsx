"use client";

import React, { JSX, useState, useRef } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { FormContainerSection } from "./sections/FormContainerSection";
import { SettingsGroupSection } from "./sections/SettingsGroupSection";
import { UserInfoGroupSection } from "./sections/UserInfoGroupSection";
import { Sidebar } from "./sections/Sidebar";
import { EditView } from "./sections/EditView";
import { ReadOnlyView } from "./sections/ReadOnlyView";
import { MyPost } from "./sections/MyPost";

export const DivWrapper = (): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeMenu, setActiveMenu] = useState("기본 정보");

  // 각 섹션 ref
  const basicInfoRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);
  const alarmRef = useRef<HTMLDivElement>(null);
  const deleteRef = useRef<HTMLDivElement>(null);

  const scrollMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
    "기본 정보": basicInfoRef,
    비밀번호: passwordRef,
    "알림 설정": alarmRef,
    "계정 삭제": deleteRef,
  };

  const handleSelectMenu = (menu: string) => {
    setActiveMenu(menu);
    const targetRef = scrollMap[menu];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="bg-background flex flex-row justify-center w-full " data-model-id="103:1784">
      <div className="bg-app-background w-full max-w-[1440px] relative">
        {/* Main content */}
        <div className="flex px-[50px] gap-[75px] mt-[69px]">
          {/* Sidebar */}
          <Sidebar activeMenu={activeMenu} onSelectMenu={handleSelectMenu} />

          {/* Main content area */}
          <div className="max-w-[890px]">
            <h1 className="font-bold text-heading-lg mb-[50px]">
              {activeMenu === "작성한 글" ? "나의 활동" : "계정 관리"}
            </h1>

            {activeMenu === "기본 정보" ||
            activeMenu === "비밀번호" ||
            activeMenu === "알림 설정" ||
            activeMenu === "계정 삭제" ? (
              <Card className="rounded-xl">
                <CardContent className="p-[48px]">
                  <h2 className="text-heading-md font-semibold mb-[36px]">기본 정보</h2>

                  <div ref={basicInfoRef}>
                    {isEditing ? (
                      <EditView setIsEditing={setIsEditing} />
                    ) : (
                      <ReadOnlyView setIsEditing={setIsEditing} />
                    )}
                  </div>

                  <div ref={passwordRef}>
                    <SettingsGroupSection />
                  </div>

                  <div ref={alarmRef}>
                    <UserInfoGroupSection />
                  </div>

                  <div ref={deleteRef}>
                    <FormContainerSection />
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {activeMenu === "작성한 글" && (
              <Card className="w-[882px] rounded-xl p-10 mx-auto">
                <MyPost />
              </Card>
            )}
          </div>
        </div>

        {/* Profile view section */}
        <div className=" mt-[69px] "></div>
      </div>
    </main>
  );
};
