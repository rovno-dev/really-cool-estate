"use client"

import { Footer } from "@/components/layout/nav/footer";
import "./globals.css";
import Header from "@/components/layout/nav/header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <>
      <Header />
      <main className={cn((pathname == '/' || pathname.startsWith('/properties/')) ? "-mt-[64px] lg:-mt-[96px]" : "mt-0", "mb-0")}>
        {children}
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        closeButton
        gap={8}
        visibleToasts={3}
      />
    </>
  );
}
