"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ProductArt } from "@/components/ProductArt";
import { getProduct } from "@/lib/products";
import { formatPKR } from "@/lib/format-currency";

export default function CartPage() {
  const { lines, subtotal, setQty, remove } = useCart();
  const [coupon, setCoupon] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="cart-view">
      <section className="cart-hero">
        <div className="container">
          <h1>
            Your <span className="accent">Cart</span>
          </h1>
          <p>Good coffee, better mood.</p>
          <span className="banner-rule" aria-hidden="true" />
        </div>
      </section>

      <div className="container cart-layout">
        {lines.length === 0 ? (
          <div className="cart-panel cart-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="btn btn-gold">Browse our menu</Link>
          </div>
        ) : (
          <ul className="cart-panel cart-items">
            {lines.map((l) => (
              <li key={`${l.slug}-${l.size}`} className="cart-item">
                <Link href={`/products/${l.slug}`} className="cart-item-thumb" tabIndex={-1} aria-hidden="true">
                  <ProductArt name={l.name} tone={l.tone} image={l.image} />
                </Link>
                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <div>
                      <Link href={`/products/${l.slug}`} className="cart-item-name">{l.name}</Link>
                      <p className="cart-item-tag">
                        {getProduct(l.slug)?.shortDescription}
                        <span> · {l.size}</span>
                      </p>
                    </div>
                    <strong className="cart-item-price">{formatPKR(l.lineTotal)}</strong>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-pill" role="group" aria-label={`Quantity of ${l.name} ${l.size}`}>
                      <button type="button" onClick={() => setQty(l.slug, l.size, l.qty - 1)} disabled={l.qty <= 1} aria-label="Decrease quantity">−</button>
                      <output aria-live="polite">{l.qty}</output>
                      <button type="button" onClick={() => setQty(l.slug, l.size, l.qty + 1)} disabled={l.qty >= l.stock} aria-label="Increase quantity">+</button>
                    </div>
                    <button type="button" className="cart-remove" onClick={() => remove(l.slug, l.size)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <aside className="cart-panel cart-summary" aria-label="Order summary">
          <h2>Summary</h2>
          <div className="sum-row"><span>Subtotal</span><strong>{formatPKR(subtotal)}</strong></div>
          <div className="sum-row">
            <span>Shipping<small>(Pakistan-wide)</small></span>
            <span className="sum-free">Free</span>
          </div>
          <div className="sum-row"><span>Discount</span><span>—</span></div>
          <hr />
          <div className="sum-row sum-total"><span>Estimated total</span><strong>{formatPKR(subtotal)}</strong></div>

          <form
            className="coupon"
            onSubmit={(e) => {
              e.preventDefault();
              setNote(coupon.trim() ? "Coupon codes aren't active yet." : "Please enter a coupon code.");
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Zm4.5-6A1.5 1.5 0 1 0 7.5 9 1.5 1.5 0 0 0 7.5 6Z" />
            </svg>
            <label htmlFor="coupon-code" className="sr-only">Coupon code</label>
            <input id="coupon-code" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Enter coupon code" autoComplete="off" />
            <button type="submit">Apply</button>
          </form>

          <button
            type="button"
            className="btn btn-gold btn-block"
            disabled={lines.length === 0}
            onClick={() => setNote("Online checkout isn't live yet — it opens soon.")}
          >
            Checkout <span aria-hidden="true">→</span>
          </button>
          {note && <p className="cart-note" role="status">{note}</p>}
          <Link href="/shop" className="cart-back">
            <span aria-hidden="true">←</span> Back to menu
          </Link>
        </aside>
      </div>
    </div>
  );
}
