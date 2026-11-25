"use client";

import Link from "next/link";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Our Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function CupLogo() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 13h16v5a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7v-5Z" />
        <path d="M22 15h2a3 3 0 0 1 0 6h-2.4" />
        <path d="M4 28h20" />
        <ellipse cx="14" cy="18.5" rx="2.4" ry="3.2" transform="rotate(25 14 18.5)" fill="currentColor" stroke="none" />
        <path d="M12 4c-1 2 1 3 0 5M17 4c-1 2 1 3 0 5" />
      </svg>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const close = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={close}>
          <CupLogo />
          <span className="brand-name">Coffee Craft</span>
        </Link>

        <nav id="primary-nav" className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) || (item.href === "/shop" && pathname.startsWith("/products"));
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={close}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-link"
            aria-label="Search the menu"
            aria-expanded={searchOpen}
            aria-controls="header-search"
            onClick={() => {
              setSearchOpen((o) => !o);
              setMenuOpen(false);
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <Link href="/account" className="icon-link" aria-label="My account" onClick={close}>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>
          </Link>
          <button className="icon-link" onClick={open} aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" />
              <circle cx="10" cy="20.5" r="1.3" />
              <circle cx="17" cy="20.5" r="1.3" />
            </svg>
            <span className="cart-count">{count}</span>
          </button>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => {
              setMenuOpen((o) => !o);
              setSearchOpen(false);
            }}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="search-drop">
          <Form action="/shop" id="header-search" className="container header-search" role="search" onSubmit={close}>
            <label htmlFor="site-search" className="sr-only">Search the menu</label>
            <input
              ref={searchRef}
              id="site-search"
              name="q"
              type="search"
              placeholder="Search coffee..."
              onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
            />
            <button type="submit" className="btn btn-gold">Search</button>
          </Form>
        </div>
      )}
    </header>
  );
}
