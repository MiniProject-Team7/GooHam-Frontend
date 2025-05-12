import React, { JSX } from "react";

// Footer links data
const footerLinks = ["이용약관", "개인정보처리방침", "자주 묻는 질문"];

export const ProfileViewSection = (): JSX.Element => {
  return (
    <footer className="w-full py-10 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Footer navigation links */}
        <nav className="mb-6">
          <ul className="flex flex-wrap gap-2 [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8e8e93] text-xl">
            {footerLinks.map((link, index) => (
              <React.Fragment key={link}>
                <li>
                  <a href="#" className="hover:underline">
                    {link}
                  </a>
                </li>
                {index < footerLinks.length - 1 && <li>|</li>}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        {/* Copyright information */}
        <div className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8e8e93] text-xl mb-2">
          © 2025 GooHam. All rights reserved.
        </div>

        {/* Company name and tagline */}
        <div className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8e8e93] text-xl mb-6">
          구함(GooHam)
          <br />
          함께하는 즐거움, 구함과 시작하세요!
        </div>

        {/* Contact information */}
        <div className="flex items-center mt-4">
          <div className="relative w-[54px] h-[46px]">
            <img
              className="w-full h-full object-contain"
              alt="Contacts"
              src="https://c.animaapp.com/yTfAUR4U/img/contacts@2x.png"
            />
          </div>
          <div className="ml-2 [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#8e8e93] text-xl">
            문의사항: miniprojectstart7@gmail.com
          </div>
        </div>
      </div>
    </footer>
  );
};
