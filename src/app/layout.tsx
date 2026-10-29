import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/blocks";

export const metadata: Metadata = {
  title: { default: "SecretWish — Wishlists & secret surprise gifts", template: "%s · SecretWish" },
  description: "Share a wishlist or send a secret surprise from approved vendors. SecretWish keeps addresses private and the surprise a surprise.",
  openGraph: { title: "SecretWish", description: "Wishlists and secret surprise gifts from approved vendors.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#fbfafc]">
        <div className="pt-3">
          <SiteHeader />
        </div>
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
