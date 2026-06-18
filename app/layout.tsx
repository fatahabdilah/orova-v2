import type { Metadata, Viewport } from "next";
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
  title: "Orova Group — Built with patience. Held with conviction.",
  description:
    "Orova Group builds and holds companies designed to outlast the moment they were made in.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  // Extend under the iOS safe areas so the home-indicator strip uses our
  // black background instead of the browser's default white.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-pt-16 antialiased md:scroll-pt-20 lg:scroll-pt-24`}
    >
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
