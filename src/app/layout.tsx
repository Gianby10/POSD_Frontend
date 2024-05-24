import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "POSD",
  description: "Privacy e Sicurezza nel Ciclo di Vita del Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex flex-1 flex-col h-full">{children}</div>
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
