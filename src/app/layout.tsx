import type { Metadata } from "next";
import { Familjen_Grotesk } from "next/font/google";
import "./globals.css";

import PageTransition from "@/providers/PageTransition";
import MainNavbar from "../shared/components/layouts/header/MainNavbar";
import SmoothScroller from "@/shared/components/ui/SmoothScroller";

const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen-grotesk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${familjenGrotesk.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning>
        <SmoothScroller>
          <MainNavbar />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}