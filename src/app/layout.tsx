import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoldTicker } from "@/components/layout/GoldTicker";
import { SessionProvider } from "@/components/auth/SessionProvider";
import { CookieBanner } from "@/components/layout/CookieBanner";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AUREUM GOLD",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://aureumgold.com",
              description:
                "Secure, transparent, and US-focused. Buy, sell, and store physical gold with institutional-grade security.",
              foundingDate: "2025",
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@aureumgold.com",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-body antialiased bg-surface text-on-surface`}
      >
        <SessionProvider>
          <Header />
          <GoldTicker />
          <div>{children}</div>
          <Footer />
          <CookieBanner />
        </SessionProvider>
      </body>
    </html>
  );
}
