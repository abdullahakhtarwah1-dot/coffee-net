"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { QuantityInput } from "./QuantityInput";
import { formatPKR } from "@/lib/format-currency";
import type { Product, SizeLabel } from "@/lib/products";

export function AddToCart({ product }: { product: Product }) {
  const { add, lines } = useCart();
  const firstAvailable = product.variants.find((v) => v.stock > 0)?.size ?? product.variants[0].size;
  const [size, setSize] = useState<SizeLabel>(firstAvailable);
  const [qty, setQty] = useState(1);

  const variant = product.variants.find((v) => v.size === size)!;
  const inCart = lines.find((l) => l.slug === product.slug && l.size === size)?.qty ?? 0;
  const remaining = Math.max(0, variant.stock - inCart);
  const soldOut = variant.stock === 0;

  return (
    <form
      className="buy-box"
      onSubmit={(e) => {
        e.preventDefault();
        if (remaining <= 0) return;
        add(product.slug, size, Math.min(qty, remaining));
        setQty(1);
      }}
    >
      <p className="buy-price">{formatPKR(variant.pricePKR)}</p>

      <fieldset className="size-picker">
        <legend>Size</legend>
        <div className="size-options">
          {product.variants.map((v) => (
            <label key={v.size} className={`size-option ${v.stock === 0 ? "is-disabled" : ""}`}>
              <input
                type="radio"
                name="size"
                value={v.size}
                checked={size === v.size}
                disabled={v.stock === 0}
                onChange={() => {
                  setSize(v.size);
                  setQty(1);
                }}
              />
              <span>
                {v.size}
                <small>{v.stock === 0 ? "Sold out" : formatPKR(v.pricePKR)}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="buy-row">
        <QuantityInput value={qty} max={Math.max(1, remaining)} onChange={setQty} label="Quantity" />
        <button type="submit" className="btn btn-primary btn-grow" disabled={soldOut || remaining <= 0}>
          {soldOut ? "Out of stock" : remaining <= 0 ? "All stock in cart" : "Add to cart"}
        </button>
      </div>
      {!soldOut && variant.stock <= 5 && <p className="small warn">Only {variant.stock} left in this size (sample stock).</p>}
    </form>
  );
}
