"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/common/Navigation";
import "../styles/global.css";
import { Footer } from "@/components/common/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNav = pathname.startsWith("/account");

  return (
    <html lang="en">
      <body>
        {!hideNav && <Navigation />}
        <main>{children}</main>
        {!hideNav && <Footer />}
      </body>
    </html>
  );
}
