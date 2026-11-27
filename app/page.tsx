import Link from "next/link";
import { categories, inStock, minPrice, products } from "@/lib/products";
import { formatPKR } from "@/lib/format-currency";
import { ProductCard } from "@/components/ProductCard";
import { HeroScene } from "@/components/HeroScene";
import { CategoryIcon } from "@/components/CategoryIcon";

function categoryFromPrice(slug: string): number | null {
  const items = products.filter((p) => p.categorySlug === slug);
  return items.length ? Math.min(...items.map(minPrice)) : null;
}

export default function HomePage() {
  const featured = products.filter(inStock).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="pill-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  <ellipse cx="12" cy="12" rx="7" ry="10" transform="rotate(30 12 12)" />
                </svg>
                Premium Quality
              </p>
              <h1>
                Good Coffee.
                <br />
                <span className="accent">Better Mood.</span>
              </h1>
              <p className="hero-lead">
                Discover the rich taste of small-batch coffee, crafted with passion at Coffee Craft.
              </p>
              <div className="hero-actions">
                <Link href="/shop" className="btn btn-gold">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" />
                    <circle cx="10" cy="20.5" r="1.3" />
                    <circle cx="17" cy="20.5" r="1.3" />
                  </svg>
                  Explore Menu <span aria-hidden="true">→</span>
                </Link>
                <Link href="/about" className="btn btn-outline-light">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 6.5C10.3 5.2 7.8 4.5 4 4.5v13c3.8 0 6.3.7 8 2 1.7-1.3 4.2-2 8-2v-13c-3.8 0-6.3.7-8 2z" />
                    <path d="M12 6.5v13" />
                  </svg>
                  Our Story
                </Link>
              </div>
            </div>
            <div className="hero-media">
              <HeroScene />
            </div>
          </div>

          <nav className="category-strip" aria-label="Shop by category">
            {categories.map((c) => {
              const from = categoryFromPrice(c.slug);
              return (
                <Link key={c.slug} href={`/shop?category=${c.slug}`} className="category-item">
                  <span className="category-icon"><CategoryIcon slug={c.slug} /></span>
                  <span>
                    <strong>{c.name}</strong>
                    <small>{from !== null ? `From ${formatPKR(from)}` : "Coming soon"}</small>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      <section className="section menu-section">
        <div className="container">
          <div className="menu-section-head">
            <h2>
              Our <span className="accent">Menu</span>
            </h2>
            <p>Discover our premium coffee creations, crafted for true coffee lovers.</p>
            <span className="banner-rule" aria-hidden="true" />
          </div>
          <div className="menu-grid">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="menu-section-foot">
            <Link href="/shop" className="btn btn-gold">
              View Full Menu <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container story">
          <div>
            <p className="eyebrow">About Coffee Craft</p>
            <h2>Warm cups, honest beans.</h2>
            <p>
              Coffee Craft is an online coffee shop for coffee lovers across Pakistan. We focus on
              freshly roasted beans, clear tasting notes and simple ordering.
            </p>
            <div className="hero-actions">
              <Link href="/about" className="btn btn-ghost">Read more</Link>
              <Link href="/contact" className="btn btn-ghost">Get in touch</Link>
            </div>
          </div>
          <ul className="pillars">
            <li><strong>Fresh roasts</strong><span>Small batches, roasted to order.</span></li>
            <li><strong>Three sizes</strong><span>Small, Medium or Large for every coffee.</span></li>
            <li><strong>Priced in PKR</strong><span>Clear rupee pricing, no conversions.</span></li>
          </ul>
        </div>
      </section>
    </>
  );
}
