"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

const PAGE_SIZE = 8;

export function ShopClient({ initialCategory = "", initialQuery = "" }: { initialCategory?: string; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(1);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (q && !`${p.name} ${p.shortDescription} ${p.notes.join(" ")}`.toLowerCase().includes(q)) return false;
      if (category && p.categorySlug !== category) return false;
      return true;
    });
  }, [query, category]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const pick = (slug: string) => {
    setCategory(slug);
    setPage(1);
  };
  const reset = () => {
    setQuery("");
    setCategory("");
    setPage(1);
  };

  return (
    <div className="menu-browser">
      <div className="pill-filters" role="group" aria-label="Filter by category">
        {[{ slug: "", name: "All" }, ...categories].map((c) => (
          <button key={c.slug || "all"} type="button" className="pill-filter" aria-pressed={category === c.slug} onClick={() => pick(c.slug)}>
            {c.name}
          </button>
        ))}
      </div>

      {query && (
        <p className="search-chip">
          Results for “{query}”
          <button type="button" onClick={() => { setQuery(""); setPage(1); }} aria-label="Clear search">✕</button>
        </p>
      )}

      <section aria-live="polite" aria-label="Menu items">
        {visible.length === 0 ? (
          <div className="menu-empty">
            <p>Nothing on the menu matches this.</p>
            <button type="button" className="btn btn-gold" onClick={reset}>Show full menu</button>
          </div>
        ) : (
          <div className="menu-grid">
            {visible.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>

      {pageCount > 1 && (
        <nav className="page-dots" aria-label="Pagination">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button key={n} type="button" aria-current={n === current ? "page" : undefined} onClick={() => setPage(n)}>
              {n}
            </button>
          ))}
          <button type="button" disabled={current === pageCount} onClick={() => setPage(current + 1)} aria-label="Next page">›</button>
        </nav>
      )}
    </div>
  );
}
