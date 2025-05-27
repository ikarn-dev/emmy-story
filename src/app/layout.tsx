import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import FontLoader from "@/components/FontLoader";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import MobileDetector from "@/components/MobileDetector";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emmy's Story",
  description: "Join Emmy on her quest to become the ultimate staking champion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <FontLoader />
      </head>
      <body className={inter.className}>
        <MobileDetector />
        <CustomCursor />
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </body>
    </html>
  );
}
