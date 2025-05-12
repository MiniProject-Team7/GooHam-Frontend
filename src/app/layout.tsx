import type { Metadata } from "next";
import { Navigation } from "@/components/common/Navigation";
import "../styles/global.css";
import { Footer } from "@/components/common/footer";

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
        <Footer />
      </body>
    </html>
  );
}
