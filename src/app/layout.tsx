import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import FontLoader from "@/components/FontLoader";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

const inter = Inter({ subsets: ["latin"] });

// Add Founders Grotesk font
const foundersGrotesk = {
  fontFamily: 'Founders Grotesk',
  src: `url('/fonts/FoundersGrotesk-Regular.woff2') format('woff2'),
        url('/fonts/FoundersGrotesk-Regular.woff') format('woff')`,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontDisplay: 'swap',
};

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
        <CustomCursor />
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </body>
    </html>
  );
}
