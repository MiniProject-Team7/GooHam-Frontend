"use client";

import React, { JSX, useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
// import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
// import { Input } from "../../../components/ui/input";
// import { Textarea } from "../../../components/ui/textarea";
// import { ActionButtonSection } from "./sections/ActionButtonSection";
import { FormContainerSection } from "./sections/FormContainerSection";
import { ProfileViewSection } from "./sections/ProfileViewSection/ProfileViewSection";
import { SettingsGroupSection } from "./sections/SettingsGroupSection";
import { UserInfoGroupSection } from "./sections/UserInfoGroupSection";
import { Sidebar } from "./sections/Sidebar";
import { EditView } from "./sections/EditView";
import { ReadOnlyView } from "./sections/ReadOnlyView";

export const DivWrapper = (): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="bg-gray-50 flex flex-row justify-center w-full " data-model-id="103:1784">
      <div className="bg-app-background w-full max-w-[1440px] relative">
        {/* Main content */}
        <div className="flex px-[50px] gap-[75px] mt-[69px]">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content area */}
          <div className="max-w-[890px]">
            <h1 className="font-bold text-[32px] mb-[50px]">계정 관리</h1>

            <Card className="border border-solid border-[#00000038] rounded-xl">
              <CardContent className="p-0">
                <h2 className="text-[28px] font-semibold p-[63px_52px_36px]">기본 정보</h2>

                <div className="px-[55px]">
                  {isEditing ? (
                    <EditView setIsEditing={setIsEditing} />
                  ) : (
                    <ReadOnlyView setIsEditing={setIsEditing} />
                  )}

                  <SettingsGroupSection />
                  <UserInfoGroupSection />
                  <FormContainerSection />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile view section */}
        <div className=" mt-[69px] ">
          {" "}
          {/* 마진 추가*/}
          <ProfileViewSection />
        </div>
      </div>
    </main>
  );
};
