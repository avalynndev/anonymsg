import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PT_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "a",
  description: "s",
  openGraph: {
    type: "website",
    url: "https://c.vercel.app",
    title: "s",
    description: "s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${ptSans.variable} antialiased relative`}
      >
        <Providers>
          <Toaster/>
          <div className="texture" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
