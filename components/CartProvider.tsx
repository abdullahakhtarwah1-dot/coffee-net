"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type SizeLabel } from "@/lib/products";

export interface CartLine {
  slug: string;
  size: SizeLabel;
  qty: number;
}

export interface CartLineDetail extends CartLine {
  name: string;
  unitPrice: number;
  lineTotal: number;
  stock: number;
  tone: [string, string];
  image?: string;
}

interface CartContextValue {
  lines: CartLineDetail[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, size: SizeLabel, qty: number) => void;
  setQty: (slug: string, size: SizeLabel, qty: number) => void;
  remove: (slug: string, size: SizeLabel) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "coffee-craft-cart-v1";

function readStored(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Clamp a quantity to 1..stock (stock comes from the catalogue, not the browser). */
function clamp(slug: string, size: SizeLabel, qty: number): number {
  const stock = getProduct(slug)?.variants.find((v) => v.size === size)?.stock ?? 0;
  return Math.max(0, Math.min(Math.floor(qty), stock));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setRaw(readStored());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      /* storage unavailable — cart lives in memory only */
    }
  }, [raw, loaded]);

  const lines = useMemo<CartLineDetail[]>(() => {
    const out: CartLineDetail[] = [];
    for (const line of raw) {
      const p = getProduct(line.slug);
      const variant = p?.variants.find((x) => x.size === line.size);
      if (!p || !variant) continue;
      const qty = Math.min(line.qty, variant.stock);
      if (qty <= 0) continue;
      out.push({ ...line, qty, name: p.name, unitPrice: variant.pricePKR, lineTotal: variant.pricePKR * qty, stock: variant.stock, tone: p.tone, image: p.image });
    }
    return out;
  }, [raw]);

  const add = useCallback((slug: string, size: SizeLabel, qty: number) => {
    setRaw((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.size === size);
      const nextQty = clamp(slug, size, (existing?.qty ?? 0) + qty);
      if (nextQty <= 0) return prev;
      if (existing) return prev.map((l) => (l === existing ? { ...l, qty: nextQty } : l));
      return [...prev, { slug, size, qty: nextQty }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((slug: string, size: SizeLabel, qty: number) => {
    setRaw((prev) => {
      const nextQty = clamp(slug, size, qty);
      if (nextQty <= 0) return prev.filter((l) => !(l.slug === slug && l.size === size));
      return prev.map((l) => (l.slug === slug && l.size === size ? { ...l, qty: nextQty } : l));
    });
  }, []);

  const remove = useCallback((slug: string, size: SizeLabel) => {
    setRaw((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQty,
      remove,
    }),
    [lines, isOpen, add, setQty, remove],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
