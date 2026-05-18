import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoldTicker } from "@/components/layout/GoldTicker";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AUREUM GOLD | The Gold Standard of Modern Bullion Trading",
  description:
    "Secure, transparent, and US-focused. Buy, sell, and store physical gold with institutional-grade security and uncompromising discretion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-body antialiased bg-surface text-on-surface`}
      >
        <Header />
        <GoldTicker />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
