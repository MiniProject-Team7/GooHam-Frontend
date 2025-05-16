import type { Metadata } from "next";
import { Navigation } from "@/components/common/Navigation";
import "@/styles/global.css";
import { Footer } from "@/components/common/footer";


export const metadata: Metadata = {
  title: "GooHam",
  description: "구함",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <div className = "overflow-y-scroll max-h-[calc(100vh-80px)]">
        <main className = "min-h-[calc(100vh-80px-267px)] ">{children}</main>
        <Footer />
      </div>
    </>
  );
}
