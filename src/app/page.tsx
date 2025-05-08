import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Hello, world!</h1>
      <p className="mt-3 text-lg">Welcome to my Next.js app.</p>
      <Image
        src="/images/nextjs.png"
        alt="Next.js Logo"
        width={200}
        height={200}
      />
    </main>
  );
  
}