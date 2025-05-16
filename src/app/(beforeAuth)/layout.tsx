import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "GooHam",
  description: "구함",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className = "overflow-y-scroll max-h-[calc(100vh)]">
      {children}
    </div>
  );
}
