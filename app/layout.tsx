import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DHSI - Dewan Hukum Siber Indonesia",
  description:
    "Platform pelatihan dan edukasi hukum digital, keamanan siber, dan perlindungan data",
};

import TanstackProvider from "@/lib/tanstack-provider";
import { Toaster } from "sonner";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster richColors position="bottom-right" />
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
