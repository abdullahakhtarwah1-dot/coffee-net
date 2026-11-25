"use client";

import { useCart } from "./CartProvider";
import type { Product } from "@/lib/products";

/** One-tap add of the smallest in-stock size. Size choice lives on the product page. */
export function QuickAdd({ product }: { product: Product }) {
  const { add, lines } = useCart();
  const variant = product.variants.find((v) => v.stock > 0);
  const inCart = variant ? lines.find((l) => l.slug === product.slug && l.size === variant.size)?.qty ?? 0 : 0;
  const disabled = !variant || inCart >= variant.stock;

  return (
    <button
      type="button"
      className="btn-cart"
      disabled={disabled}
      onClick={() => variant && add(product.slug, variant.size, 1)}
      aria-label={variant ? `Add ${product.name}, ${variant.size}, to cart` : `${product.name} is out of stock`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" />
        <circle cx="10" cy="20.5" r="1.3" />
        <circle cx="17" cy="20.5" r="1.3" />
      </svg>
      {!variant ? "Out of Stock" : disabled ? "All in Cart" : "Add to Cart"}
    </button>
  );
}
