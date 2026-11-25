import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ActiveLink } from "@/components/ActiveLink";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Coffee Craft — Small-batch coffee in Pakistan", template: "%s · Coffee Craft" },
  description: "Discover small-batch coffee from Coffee Craft. Prices in PKR.",
};

export const viewport: Viewport = { themeColor: "#1A110B" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <CartProvider>
          <div className="topbar">
            <div className="container topbar-inner">
              <p role="note">
                <span aria-hidden="true">☕</span> Preview build — products &amp; prices are <strong>sample data</strong>. Checkout is not live yet.
              </p>
              <ul className="topbar-links">
                <li><Link href="/contact">Help &amp; Contact</Link></li>
                <li><ActiveLink href="/policies/shipping">Shipping</ActiveLink></li>
              </ul>
            </div>
          </div>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
