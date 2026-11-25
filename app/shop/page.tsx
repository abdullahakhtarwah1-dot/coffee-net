import type { Metadata } from "next";
import { ShopClient } from "@/components/ShopClient";
import { getCategory } from "@/lib/products";

export const metadata: Metadata = { title: "Our Menu" };

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const { category, q } = await searchParams;
  const initial = category && getCategory(category) ? category : "";
  const query = typeof q === "string" ? q.slice(0, 80) : "";
  return (
    <div className="menu-page">
      <section className="menu-banner">
        <div className="container">
          <h1>
            Our <span className="accent">Menu</span>
          </h1>
          <p>Discover our premium coffee creations, crafted for true coffee lovers.</p>
          <span className="banner-rule" aria-hidden="true" />
        </div>
      </section>
      <div className="container menu-body">
        <ShopClient key={`${initial}|${query}`} initialCategory={initial} initialQuery={query} />
      </div>
    </div>
  );
}
