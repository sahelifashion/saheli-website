import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Saheli Fashion Jewellery | Timeless Elegance",
  description: "Discover Saheli Fashion Jewellery - Handcrafted and curated premium fashion jewellery that brings out your inner elegance. Anti-tarnish, neckpieces, earrings, and more.",
  keywords: ["fashion jewellery", "saheli", "jewellery", "anti-tarnish", "neckpieces", "earrings", "traditional craftsmanship"],
  icons: {
    icon: [
      { url: "/logo.jpg" },
      { url: "/logo.jpg", sizes: "32x32" },
      { url: "/logo.jpg", sizes: "16x16" },
    ],
    apple: [
      { url: "/logo.jpg" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
