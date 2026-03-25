import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const displayFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hub 8 Industrial Park | Freehold Semi-D Factory | Ampangan",
  description:
    "Premium freehold semi-detached industrial park in Ampangan, Negeri Sembilan. 46 units across 26 acres with 2 and 3-storey configurations. Direct Lekas Highway access.",
  keywords: [
    "Hub 8",
    "Industrial Park",
    "Ampangan",
    "Freehold",
    "Factory",
    "Semi-D",
    "Negeri Sembilan",
    "Warehouse",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
