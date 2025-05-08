import type { Metadata } from "next";
import { Navigation } from "@/components/common/Navigation";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "GooHam",
  description: "구함",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
