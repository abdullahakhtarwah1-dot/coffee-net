import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, products, relatedProducts } from "@/lib/products";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { AddToCart } from "@/components/AddToCart";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.shortDescription } : { title: "Not found" };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.categorySlug);

  return (
    <>
      <section className="pdp-hero" style={{ background: `linear-gradient(135deg, ${product.tone[1]}, #1E120A)` }}>
        <div className="container pdp-grid">
          <div className="pdp-media">
            <ProductArt name={product.name} tone={product.tone} roast={product.roast} image={product.image} large />
          </div>
          <div className="pdp-info">
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <Link href="/shop">Our Menu</Link> / <Link href={`/shop?category=${product.categorySlug}`}>{category?.name}</Link>
            </nav>
            <h1>{product.name}</h1>
            <p className="lead">{product.shortDescription}</p>
            <AddToCart product={product} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container pdp-details">
          <div>
            <h2>About this coffee</h2>
            <p>{product.description}</p>
          </div>
          <dl className="spec">
            <div><dt>Roast</dt><dd>{product.roast ?? "—"}</dd></div>
            <div><dt>Category</dt><dd>{category?.name}</dd></div>
            <div><dt>Tasting notes</dt><dd>{product.notes.join(", ")}</dd></div>
            <div><dt>Sizes</dt><dd>Small · Medium · Large</dd></div>
          </dl>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Ratings &amp; reviews</h2>
          <div className="empty">
            <p>No reviews yet.</p>
            <p className="small muted">Customer reviews open once accounts are live (next development slice).</p>
          </div>
        </div>
      </section>

      <section className="section menu-section">
        <div className="container">
          <div className="menu-section-head">
            <h2>You may <span className="accent">also like</span></h2>
          </div>
          <div className="menu-grid">
            {relatedProducts(product).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
