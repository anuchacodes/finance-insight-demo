import type { Metadata } from "next";
import { Geist_Mono, Kanit } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactQueryProvider } from "@/lib/query/react-query-provider";

import "./globals.css";

const kanit = Kanit({
  display: "swap",
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Insight Demo",
  description: "Portfolio-ready finance analytics dashboard demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kanit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
