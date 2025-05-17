"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Navigation } from "@/components/common/Navigation";
import "@/styles/global.css";
import { Footer } from "@/components/common/footer"; 

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client = {queryClient}>
      <Navigation />
      <div className = "overflow-y-scroll max-h-[calc(100vh-80px)]">
        <main className = "min-h-[calc(100vh-80px-267px)] ">{children}</main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
