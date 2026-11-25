"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { CartLines } from "./CartLines";
import { formatPKR } from "@/lib/format-currency";

export function CartDrawer() {
  const { isOpen, close, lines, subtotal } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <div className={`drawer-root ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
      <div className="drawer-backdrop" onClick={close} />
      <div
        ref={panelRef}
        className="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        inert={!isOpen}
      >
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button className="icon-button" onClick={close} aria-label="Close cart">✕</button>
        </div>

        {lines.length === 0 ? (
          <div className="empty">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="btn btn-primary" onClick={close}>Browse coffee</Link>
          </div>
        ) : (
          <>
            <div className="drawer-body">
              <CartLines compact />
            </div>
            <div className="drawer-foot">
              <div className="row-between">
                <span>Subtotal</span>
                <strong>{formatPKR(subtotal)}</strong>
              </div>
              <p className="small muted">Shipping and discounts are calculated at checkout.</p>
              <Link href="/cart" className="btn btn-primary btn-block" onClick={close}>View cart</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
