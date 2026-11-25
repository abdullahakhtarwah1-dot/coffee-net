import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPKR } from "@/lib/format-currency";
import { ProductArt } from "./ProductArt";
import { QuickAdd } from "./QuickAdd";

export function ProductCard({ product }: { product: Product }) {
  const variant = product.variants.find((v) => v.stock > 0);
  return (
    <article className="menu-card">
      <Link href={`/products/${product.slug}`} className="menu-card-link">
        <div className="menu-card-media">
          <ProductArt name={product.name} tone={product.tone} roast={product.roast} image={product.image} />
        </div>
        <h3 className="menu-card-title">{product.name}</h3>
      </Link>
      <p className="menu-card-tag">{product.shortDescription}</p>
      <p className="menu-card-price">
        {variant ? (
          <>
            {formatPKR(variant.pricePKR)} <span>/ {variant.size}</span>
          </>
        ) : (
          <span>Out of stock</span>
        )}
      </p>
      <QuickAdd product={product} />
    </article>
  );
}
