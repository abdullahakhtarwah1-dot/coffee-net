"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { ProductArt } from "./ProductArt";
import { QuantityInput } from "./QuantityInput";
import { formatPKR } from "@/lib/format-currency";

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { lines, setQty, remove, close } = useCart();

  return (
    <ul className={`cart-lines ${compact ? "is-compact" : ""}`}>
      {lines.map((l) => (
        <li key={`${l.slug}-${l.size}`} className="cart-line">
          <Link href={`/products/${l.slug}`} className="cart-thumb" onClick={close} tabIndex={-1} aria-hidden="true">
            <ProductArt name={l.name} tone={l.tone} image={l.image} />
          </Link>
          <div className="cart-info">
            <Link href={`/products/${l.slug}`} className="cart-name" onClick={close}>{l.name}</Link>
            <p className="small muted">{l.size} · {formatPKR(l.unitPrice)} each</p>
            <div className="cart-actions">
              <QuantityInput
                value={l.qty}
                max={l.stock}
                onChange={(q) => setQty(l.slug, l.size, q)}
                label={`Quantity of ${l.name} ${l.size}`}
              />
              <button className="link-button" onClick={() => remove(l.slug, l.size)}>Remove</button>
            </div>
          </div>
          <strong className="cart-total">{formatPKR(l.lineTotal)}</strong>
        </li>
      ))}
    </ul>
  );
}
